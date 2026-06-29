import re
import json
import os
import sys

def preprocess_ifr_lines(raw_lines):
    """
    Объединяет строки с многострочным текстом Help в одну логическую строку,
    чтобы регулярные выражения не спотыкались на переносах.
    """
    keywords = (
        'FormSet', 'DefaultStore', 'VarStore', 'Form', 'Subtitle', 
        'Ref', 'OneOf', 'OneOfOption', 'Numeric', 'Text', 
        'SuppressIf', 'GrayOutIf', 'End', 'Default'
    )
    
    logical_lines = []
    for line in raw_lines:
        cleaned = line.strip()
        if not cleaned:
            continue
            
        # Если строка начинается с известного ключевого слова UEFI IFR
        if any(cleaned.startswith(kw) for kw in keywords):
            logical_lines.append(cleaned)
        else:
            # Иначе это продолжение многострочного текста (например, Help)
            if logical_lines:
                logical_lines[-1] += " " + cleaned
            else:
                logical_lines.append(cleaned)
                
    return logical_lines

def parse_ifr_to_json(file_path, output_json_path):
    if not os.path.exists(file_path):
        print(f"❌ Ошибка: Исходный файл '{file_path}' не найден.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        raw_lines = f.readlines()

    # Склеиваем многострочные участки
    logical_lines = preprocess_ifr_lines(raw_lines)

    bios_data = {
        "title": "BIOS Settings",
        "guid": "",
        "forms": {}
    }

    current_form = None
    current_oneof = None

    # Компилируем регулярные выражения для ускорения работы
    form_set_pat = re.compile(r'FormSet Guid: (.*?), Title: "(.*?)"')
    form_pat = re.compile(r'Form FormId: (0x[0-9A-Fa-f]+), Title: "(.*?)"')
    ref_pat = re.compile(r'Ref Prompt: "(.*?)", Help: "(.*?)",.*FormId: (0x[0-9A-Fa-f]+)')
    oneof_pat = re.compile(r'OneOf Prompt: "(.*?)", Help: "(.*?)",.*VarOffset: (0x[0-9A-Fa-f]+)')
    oneof_option_pat = re.compile(r'OneOfOption Option: "(.*?)" Value: (\d+)(, Default)?')
    numeric_pat = re.compile(r'Numeric Prompt: "(.*?)", Help: "(.*?)",.*VarOffset: (0x[0-9A-Fa-f]+)')
    subtitle_pat = re.compile(r'Subtitle Prompt: "(.*?)"')
    text_pat = re.compile(r'Text Prompt: "(.*?)", Help: "(.*?)"')

    for line in logical_lines:
        m = form_set_pat.match(line)
        if m:
            bios_data["guid"] = m.group(1)
            bios_data["title"] = m.group(2)
            continue

        m = form_pat.match(line)
        if m:
            form_id = m.group(1)
            current_form = {
                "id": form_id,
                "title": m.group(2),
                "items": []
            }
            bios_data["forms"][form_id] = current_form
            current_oneof = None
            continue

        if not current_form:
            continue

        m = ref_pat.search(line)
        if m:
            current_form["items"].append({
                "type": "ref",
                "prompt": m.group(1),
                "help": m.group(2),
                "formId": m.group(3)
            })
            current_oneof = None
            continue

        m = oneof_pat.search(line)
        if m:
            current_oneof = {
                "type": "oneof",
                "prompt": m.group(1),
                "help": m.group(2).replace('\\n', ' '),
                "offset": m.group(3),
                "options": []
            }
            current_form["items"].append(current_oneof)
            continue

        m = oneof_option_pat.search(line)
        if m and current_oneof:
            current_oneof["options"].append({
                "name": m.group(1),
                "value": int(m.group(2)),
                "isDefault": bool(m.group(3))
            })
            continue

        m = numeric_pat.search(line)
        if m:
            current_form["items"].append({
                "type": "numeric",
                "prompt": m.group(1),
                "help": m.group(2),
                "offset": m.group(3)
            })
            current_oneof = None
            continue

        m = subtitle_pat.search(line)
        if m:
            prompt = m.group(1).strip()
            if prompt:
                current_form["items"].append({
                    "type": "subtitle",
                    "prompt": prompt
                })
            current_oneof = None
            continue

        m = text_pat.search(line)
        if m:
            current_form["items"].append({
                "type": "text",
                "prompt": m.group(1),
                "help": m.group(2)
            })
            current_oneof = None
            continue

        if line == "End" and current_oneof:
            current_oneof = None

    with open(output_json_path, 'w', encoding='utf-8') as json_f:
        json.dump(bios_data, json_f, ensure_ascii=False, indent=2)
        
    print(f"🚀 Успех! Данные сохранены в: {output_json_path}")

# Умный интерактивно-автоматический блок запуска
if __name__ == "__main__":
    print("=== Умный UEFI IFR в JSON Конвертер ===")
    
    txt_input = None
    json_output = None

    # Сценарий 1: Переданы аргументы командной строки
    if len(sys.argv) >= 2:
        txt_input = sys.argv[1]
        if len(sys.argv) == 3:
            json_output = sys.argv[2]
            
    # Сценарий 2: Интерактивный режим (без аргументов)
    else:
        # Ищем все .txt файлы в текущей директории скрипта
        txt_files = [f for f in os.listdir('.') if f.lower().endswith('.txt') and os.path.isfile(f)]
        
        if len(txt_files) == 1:
            # Если файл всего один — магия автоматизации
            txt_input = txt_files[0]
            print(f"-> В папке найден один TXT-файл, выбираю его: '{txt_input}'")
        elif len(txt_files) > 1:
            # Если файлов несколько — выводим удобное меню выбора
            print("\nНайдено несколько файлов. Выберите нужный, нажав цифру:")
            for idx, file_name in enumerate(txt_files, 1):
                print(f"  {idx}) {file_name}")
            
            choice = input("\nВведите номер файла (или полный путь к другому файлу): ").strip()
            
            if choice.isdigit() and 1 <= int(choice) <= len(txt_files):
                txt_input = txt_files[int(choice) - 1]
                print(f"-> Выбран файл: '{txt_input}'")
            else:
                txt_input = choice # Если ввели имя вручную
        else:
            # Файлов нет вообще
            txt_input = input("В текущей папке TXT файлы не найдены. Введите путь вручную: ").strip()

    # Автоматическая генерация имени выходного файла + защита от перезаписи
    if txt_input and not json_output:
        base_name = os.path.splitext(txt_input)[0]
        json_output = f"{base_name}.json"
        
        # Проверка: существует ли уже такой JSON-файл?
        if os.path.exists(json_output):
            counter = 1
            # Цикл подбирает свободный суффикс (_1, _2 и т.д.)
            while os.path.exists(f"{base_name}_{counter}.json"):
                counter += 1
            
            old_output = json_output
            json_output = f"{base_name}_{counter}.json"
            print(f"⚠️ Предупреждение: Файл '{old_output}' уже существует!")
            print(f"   Чтобы не затереть старые данные, результат запишем в: '{json_output}'")
        else:
            print(f"-> Выходной файл: '{json_output}'")

    # Финальный запуск парсинга
    if not txt_input or not json_output:
        print("❌ Ошибка: Не удалось определить входной или выходной файл.")
    else:
        print("-" * 50)
        parse_ifr_to_json(txt_input, json_output)