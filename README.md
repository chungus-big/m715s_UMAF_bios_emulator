## Создание версии под свою материнку (amd)
1. Получить дамп вашего bios
2. Поиск нужного модуля
	1. Откройте ваш дамп BIOS в программе **[UEFITool](https://github.com/LongSoft/UEFITool/)**
	2. Нажмите `Ctrl + F` (Поиск) и перейдите во вкладку **Text**.
	3. Введите в поиск `AmdfPlatformSetupDxe` или `AMD CBS`
	4. Утилита подсветит вам модуль (обычно это `Setup` или отдельный PE32-драйвер AMD).
3. Экспорт «тела» модуля
	1. Нажмите правой кнопкой мыши по найденному разделу `PE32 image section` (внутри подсвеченного модуля) и выберите **Extract body** (Экспортировать тело).
	2. Сохраните файл с расширением `.efi` или `.bin` (например, `bios_setup.efi`).
4. Конвертация в читаемый текст
	1. Скачайте утилиту **[IFRExtractor](https://github.com/LongSoft/IFRExtractor-RS)**
	2. Перетащите ваш сохраненный файл `bios_setup.efi` на исполняемый файл `ifrextractor.exe` через командную строку:
```sh
ifrextractor.exe bios_setup.efi
```
5. Парсим в json
```
python bios_parser.py bios_setup.efi.0.0.en-US.uefi.ifr.txt
```
6. Заменяем мой `bios_menu.js` своими данными (const bios_menu = ) в начале строки оставляем