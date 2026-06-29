const bios_menu = {
  forms: {
    "0x7000": {
      id: "0x7000",
      title: "AMD CBS",
      items: [
        {
          type: "subtitle",
          prompt: "AMD CBS",
        },
        {
          type: "ref",
          prompt: "Zen Common Options",
          help: "Zen Common Options / Общие параметры процессоров Zen",
          formId: "0x7001",
        },
        {
          type: "ref",
          prompt: "DF Common Options",
          help: "DF Common Options / Общие параметры шины Data Fabric (DF)",
          formId: "0x7002",
        },
        {
          type: "ref",
          prompt: "UMC Common Options",
          help: "UMC Common Options / Общие параметры контроллера памяти UMC",
          formId: "0x7003",
        },
        {
          type: "ref",
          prompt: "NBIO Common Options",
          help: "NBIO Common Options / Общие параметры контроллера ввода-вывода NBIO",
          formId: "0x7004",
        },
        {
          type: "ref",
          prompt: "FCH Common Options",
          help: "FCH Common Options / Общие параметры южного моста FCH",
          formId: "0x7005",
        },
        {
          type: "ref",
          prompt: "NTB Common Options",
          help: "NTB Common Options / Общие параметры неблокирующего моста NTB",
          formId: "0x7007",
        },
        {
          type: "numeric",
          prompt: "Combo CBS",
          help: "No help string / Интегрированная настройка параметров AMD CBS BIOS",
          offset: "0x20",
        },
      ],
    },
    "0x7001": {
      id: "0x7001",
      title: "Zen Common Options",
      items: [
        {
          type: "subtitle",
          prompt: "Zen Common Options",
        },
        {
          type: "oneof",
          prompt: "RedirectForReturnDis",
          help: "From a workaround for GCC/C000005 issue for XV Core on CZ A0, setting MSRC001_1029 Decode Configuration (DE_CFG) bit 14 [DecfgNoRdrctForReturns] to 1 / Временное решение для проблемы GCC/C000005 на ядрах XV степпинга CZ A0: устанавливает бит 14 [DecfgNoRdrctForReturns] в MSRC001_1029 Decode Configuration (DE_CFG) в 1\nВлияние опций:\n - Auto: Автоматический выбор BIOS.\n - 1 (Enabled): Включить обход ошибки (повышает стабильность на старых версиях компиляторов/ОС).\n - 0 (Disabled): Отключить обход ошибки (стандартный режим).",
          offset: "0x21",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "1",
              value: 1,
              isDefault: false,
            },
            {
              name: "0",
              value: 0,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "L2 TLB Associativity",
          help: "0 - L2 TLB ways [11:8] are fully associative.  1 - =L2 TLB ways [11:8] are 4K-only. / 0 - пути L2 TLB [11:8] полностью ассоциативны; 1 - пути L2 TLB [11:8] выделены только под страницы 4K\nВлияние опций:\n - 0: Полная ассоциативность путей L2 TLB (максимальная производительность).\n - 1: Ассоциативность L2 TLB только для страниц 4K (отладочный режим).",
          offset: "0x22",
          options: [
            {
              name: "0",
              value: 0,
              isDefault: false,
            },
            {
              name: "1",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Platform First Error Handling",
          help: "Enable/disable PFEH, cloak individual banks, and mask deferred error interrupts from each bank. This feature must be disabled on B1 stepping / Включение/отключение PFEH, маскирование отдельных банков памяти и отложенных прерываний ошибок для каждого банка. Должно быть отключено на степпинге B1",
          offset: "0x23",
          options: [
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Core Performance Boost",
          help: "Disable CPB / Отключить Core Performance Boost (автоматический разгон процессора)\nВлияние опций:\n - Auto / Enabled: Авторазгон процессора включен. Частоты ядер динамически повышаются выше базовых при наличии запаса по охлаждению и питанию (максимальная производительность).\n - Disabled: Авторазгон выключен. Процессор жестко ограничен базовой частотой (минимизирует нагрев, уровень шума и энергопотребление).",
          offset: "0x24",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 1,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Enable IBS",
          help: "Enables IBS through MSRC001_1005[42] and disables SpecLockMap through MSRC001_1020[54] / Включает трассировку на основе инструкций (IBS) через регистр MSRC001_1005[42] и отключает SpecLockMap через MSRC001_1020[54]",
          offset: "0x25",
          options: [
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Global C-state Control",
          help: "Controls IO based C-state generation and DF C-states. / Управляет генерацией C-state на основе ввода-вывода (IO) и C-state шины Data Fabric (DF)\nВлияние опций:\n - Auto / Enabled: Энергосберегающие состояния включены. Ядра переходят в режим глубокого сна при простое (снижает нагрев в простое).\n - Disabled: Энергосберегающие состояния отключены. Ядра всегда активны на максимальной частоте (устраняет задержки перехода ядер из сна, повышает плавность и стабильность разгона, но повышает энергопотребление).",
          offset: "0x26",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Power Supply Idle Control",
          help: "Power Supply Idle Control. / Управление энергопотреблением процессора в режиме простоя (Power Supply Idle Control)\nВлияние опций:\n - Auto / Low Current Idle: Энергосберегающий режим C6 включен. Требуется современный блок питания с поддержкой низких токов в простое.\n - Typical Current Idle: Процессор искусственно поддерживает минимальный ток потребления в простое. Рекомендуется включить, если система внезапно перезагружается или вылетает в простое (решает проблемы несовместимости со старыми БП).",
          offset: "0x27",
          options: [
            {
              name: "Low Current Idle",
              value: 1,
              isDefault: false,
            },
            {
              name: "Typical Current Idle",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Opcache grayout flag",
          help: "No help string / Флаг блокировки интерфейса настроек кэша операций Opcache",
          offset: "0x28",
          options: [
            {
              name: "0",
              value: 0,
              isDefault: true,
            },
            {
              name: "1",
              value: 1,
              isDefault: false,
            },
            {
              name: "Display",
              value: 2,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Opcache Control",
          help: "Enables or disables the Opcache / Включает или отключает кэш операций процессора (Opcache)\nВлияние опций:\n - Auto / Enabled: Кэш декодированных микроопераций включен. Увеличивает скорость выполнения инструкций и энергоэффективность процессора (настоятельно рекомендуется).\n - Disabled: Opcache выключен. Процессор декодирует инструкции при каждом обращении (снижает производительность, используется только для тестов).",
          offset: "0x29",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "OC Mode",
          help: "No help string / Режим разгона процессора (Overclock Mode)",
          offset: "0x2A",
          options: [
            {
              name: "Normal Operation",
              value: 0,
              isDefault: true,
            },
            {
              name: "OC1",
              value: 1,
              isDefault: false,
            },
            {
              name: "OC2",
              value: 2,
              isDefault: false,
            },
            {
              name: "OC3",
              value: 3,
              isDefault: false,
            },
            {
              name: "Customized",
              value: 5,
              isDefault: false,
            },
          ],
        },
        {
          type: "ref",
          prompt: "Custom Pstates / Throttling",
          help: "Custom Pstates / Throttling / Пользовательские Pstates и троттлинг",
          formId: "0x700C",
        },
        {
          type: "ref",
          prompt: "Core/Thread Enablement",
          help: "Core/Thread Enablement / Включение ядер и потоков процессора",
          formId: "0x700D",
        },
        {
          type: "numeric",
          prompt: "SEV-ES ASID Space Limit",
          help: "SEV VMs using ASIDs below the SEV-ES ASID Space Limit must enable the SEV-ES feature. The valid values for this field are from 0x1 (1) - 0x10 (16). / Виртуальные машины SEV, использующие ASID ниже лимита пространства ASID SEV-ES, должны иметь включенную функцию SEV-ES. Допустимые значения: от 0x1 (1) до 0x10 (16)",
          offset: "0x2B",
        },
        {
          type: "oneof",
          prompt: "Streaming Stores Control",
          help: "Enables or disables the streaming stores functionality / Включает или отключает функцию потоковой записи (Streaming Stores)",
          offset: "0x2F",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "ACPI _CST C1 Declaration",
          help: "Determines whether or not to declare the C1 state to the OS. / Определяет, передавать ли состояние энергосбережения C1 операционной системе",
          offset: "0x30",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "ref",
          prompt: "Prefetcher settings",
          help: "Prefetcher settings / Настройки предварительной выборки (Prefetcher)",
          formId: "0x700E",
        },
      ],
    },
    "0x700C": {
      id: "0x700C",
      title: "Custom Pstates / Throttling",
      items: [
        {
          type: "subtitle",
          prompt: "Custom Pstates / Throttling",
        },
        {
          type: "text",
          prompt:
            "WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY.",
          help: "Legal Disclaimer",
        },
        {
          type: "text",
          prompt:
            "Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.",
          help: "Legal Disclaimer",
        },
        {
          type: "ref",
          prompt: "Decline",
          help: "Decline / Отклонить изменения и лицензионное соглашение",
          formId: "0x7001",
        },
        {
          type: "ref",
          prompt: "Accept",
          help: "Accept / Принять изменения и лицензионное соглашение",
          formId: "0x7010",
        },
      ],
    },
    "0x700F": {
      id: "0x700F",
      title: "Decline",
      items: [
        {
          type: "subtitle",
          prompt: "Decline",
        },
      ],
    },
    "0x7010": {
      id: "0x7010",
      title: "Accept",
      items: [
        {
          type: "subtitle",
          prompt: "Accept",
        },
        {
          type: "oneof",
          prompt: "Custom Pstate0",
          help: "Disable - disable this Pstate Custom - customize this Pstate, applicable only if PcdOcDisable=FALSE WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY. Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.  / Disabled — отключить это Pstate; Custom — настроить Pstate вручную (доступно только если PcdOcDisable=FALSE). ВНИМАНИЕ: Повреждения процессора в результате разгона лишают гарантии!",
          offset: "0x33",
          options: [
            {
              name: "Custom",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Frequency (MHz)",
          help: "Current core frequency in MHz / Текущая частота ядра в МГц",
          offset: "0x34",
        },
        {
          type: "numeric",
          prompt: "Voltage (uV)",
          help: "Voltage in uV (1V = 1000 * 1000 uV) / Напряжение в микровольтах (1 В = 1 000 000 мкВ)",
          offset: "0x38",
        },
        {
          type: "numeric",
          prompt: "Pstate0 FID",
          help: "Specifies the core frequency multiplier. COF = 200MHz * FID / DID / Задает множитель частоты ядра. Итоговая частота = 200 МГц * FID / DID",
          offset: "0x3C",
        },
        {
          type: "numeric",
          prompt: "Pstate0 DID",
          help: "Specifies the core frequency divisor (DID[0] should zero if DID[5:0]>1Ah). / Задает делитель частоты ядра (биты DID[0] должны быть равны нулю, если DID[5:0] больше 1Ah)",
          offset: "0x3D",
        },
        {
          type: "numeric",
          prompt: "Pstate0 VID",
          help: "Specifies the core voltage. / Задает напряжение ядра процессора",
          offset: "0x3E",
        },
        {
          type: "oneof",
          prompt: "Custom Pstate1",
          help: "Disabled - disable this Pstate Custom - customize this Pstate, applicable only if PcdOcDisable=FALSE WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY. Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.  / Disabled — отключить это Pstate; Custom — настроить Pstate вручную (доступно только если PcdOcDisable=FALSE). ВНИМАНИЕ: Повреждения процессора в результате разгона лишают гарантии!",
          offset: "0x3F",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Custom",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Frequency (MHz)",
          help: "Current core frequency in MHz / Текущая частота ядра в МГц",
          offset: "0x40",
        },
        {
          type: "numeric",
          prompt: "Voltage (uV)",
          help: "Voltage in uV (1V = 1000 * 1000 uV) / Напряжение в микровольтах (1 В = 1 000 000 мкВ)",
          offset: "0x44",
        },
        {
          type: "numeric",
          prompt: "Pstate1 FID",
          help: "Specifies the core frequency multiplier. COF = 200MHz * FID / DID / Задает множитель частоты ядра. Итоговая частота = 200 МГц * FID / DID",
          offset: "0x48",
        },
        {
          type: "numeric",
          prompt: "Pstate1 DID",
          help: "Specifies the core frequency divisor (DID[0] should zero if DID[5:0]>1Ah). / Задает делитель частоты ядра (биты DID[0] должны быть равны нулю, если DID[5:0] больше 1Ah)",
          offset: "0x49",
        },
        {
          type: "numeric",
          prompt: "Pstate1 VID",
          help: "Specifies the core voltage. / Задает напряжение ядра процессора",
          offset: "0x4A",
        },
        {
          type: "oneof",
          prompt: "Custom Pstate2",
          help: "Disabled - disable this Pstate Custom - customize this Pstate, applicable only if PcdOcDisable=FALSE WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY. Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.  / Disabled — отключить это Pstate; Custom — настроить Pstate вручную (доступно только если PcdOcDisable=FALSE). ВНИМАНИЕ: Повреждения процессора в результате разгона лишают гарантии!",
          offset: "0x4B",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Custom",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Frequency (MHz)",
          help: "Current core frequency in MHz / Текущая частота ядра в МГц",
          offset: "0x4C",
        },
        {
          type: "numeric",
          prompt: "Voltage (uV)",
          help: "Voltage in uV (1V = 1000 * 1000 uV) / Напряжение в микровольтах (1 В = 1 000 000 мкВ)",
          offset: "0x50",
        },
        {
          type: "numeric",
          prompt: "Pstate2 FID",
          help: "Specifies the core frequency multiplier. COF = 200MHz * FID / DID / Задает множитель частоты ядра. Итоговая частота = 200 МГц * FID / DID",
          offset: "0x54",
        },
        {
          type: "numeric",
          prompt: "Pstate2 DID",
          help: "Specifies the core frequency divisor (DID[0] should zero if DID[5:0]>1Ah). / Задает делитель частоты ядра (биты DID[0] должны быть равны нулю, если DID[5:0] больше 1Ah)",
          offset: "0x55",
        },
        {
          type: "numeric",
          prompt: "Pstate2 VID",
          help: "Specifies the core voltage. / Задает напряжение ядра процессора",
          offset: "0x56",
        },
        {
          type: "oneof",
          prompt: "Custom Pstate3",
          help: "Disabled - disable this Pstate Custom - customize this Pstate, applicable only if PcdOcDisable=FALSE WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY. Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.  / Disabled — отключить это Pstate; Custom — настроить Pstate вручную (доступно только если PcdOcDisable=FALSE). ВНИМАНИЕ: Повреждения процессора в результате разгона лишают гарантии!",
          offset: "0x57",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Custom",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Frequency (MHz)",
          help: "Current core frequency in MHz / Текущая частота ядра в МГц",
          offset: "0x58",
        },
        {
          type: "numeric",
          prompt: "Voltage (uV)",
          help: "Voltage in uV (1V = 1000 * 1000 uV) / Напряжение в микровольтах (1 В = 1 000 000 мкВ)",
          offset: "0x5C",
        },
        {
          type: "numeric",
          prompt: "Pstate3 FID",
          help: "Specifies the core frequency multiplier. COF = 200MHz * FID / DID / Задает множитель частоты ядра. Итоговая частота = 200 МГц * FID / DID",
          offset: "0x60",
        },
        {
          type: "numeric",
          prompt: "Pstate3 DID",
          help: "Specifies the core frequency divisor (DID[0] should zero if DID[5:0]>1Ah). / Задает делитель частоты ядра (биты DID[0] должны быть равны нулю, если DID[5:0] больше 1Ah)",
          offset: "0x61",
        },
        {
          type: "numeric",
          prompt: "Pstate3 VID",
          help: "Specifies the core voltage. / Задает напряжение ядра процессора",
          offset: "0x62",
        },
        {
          type: "oneof",
          prompt: "Custom Pstate4",
          help: "Disabled - disable this Pstate Custom - customize this Pstate, applicable only if PcdOcDisable=FALSE WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY. Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.  / Disabled — отключить это Pstate; Custom — настроить Pstate вручную (доступно только если PcdOcDisable=FALSE). ВНИМАНИЕ: Повреждения процессора в результате разгона лишают гарантии!",
          offset: "0x63",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Custom",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Frequency (MHz)",
          help: "Current core frequency in MHz / Текущая частота ядра в МГц",
          offset: "0x64",
        },
        {
          type: "numeric",
          prompt: "Voltage (uV)",
          help: "Voltage in uV (1V = 1000 * 1000 uV) / Напряжение в микровольтах (1 В = 1 000 000 мкВ)",
          offset: "0x68",
        },
        {
          type: "numeric",
          prompt: "Pstate4 FID",
          help: "Specifies the core frequency multiplier. COF = 200MHz * FID / DID / Задает множитель частоты ядра. Итоговая частота = 200 МГц * FID / DID",
          offset: "0x6C",
        },
        {
          type: "numeric",
          prompt: "Pstate4 DID",
          help: "Specifies the core frequency divisor (DID[0] should zero if DID[5:0]>1Ah). / Задает делитель частоты ядра (биты DID[0] должны быть равны нулю, если DID[5:0] больше 1Ah)",
          offset: "0x6D",
        },
        {
          type: "numeric",
          prompt: "Pstate4 VID",
          help: "Specifies the core voltage. / Задает напряжение ядра процессора",
          offset: "0x6E",
        },
        {
          type: "oneof",
          prompt: "Custom Pstate5",
          help: "Disabled - disable this Pstate Custom - customize this Pstate, applicable only if PcdOcDisable=FALSE WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY. Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.  / Disabled — отключить это Pstate; Custom — настроить Pstate вручную (доступно только если PcdOcDisable=FALSE). ВНИМАНИЕ: Повреждения процессора в результате разгона лишают гарантии!",
          offset: "0x6F",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Custom",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Frequency (MHz)",
          help: "Current core frequency in MHz / Текущая частота ядра в МГц",
          offset: "0x70",
        },
        {
          type: "numeric",
          prompt: "Voltage (uV)",
          help: "Voltage in uV (1V = 1000 * 1000 uV) / Напряжение в микровольтах (1 В = 1 000 000 мкВ)",
          offset: "0x74",
        },
        {
          type: "numeric",
          prompt: "Pstate5 FID",
          help: "Specifies the core frequency multiplier. COF = 200MHz * FID / DID / Задает множитель частоты ядра. Итоговая частота = 200 МГц * FID / DID",
          offset: "0x78",
        },
        {
          type: "numeric",
          prompt: "Pstate5 DID",
          help: "Specifies the core frequency divisor (DID[0] should zero if DID[5:0]>1Ah). / Задает делитель частоты ядра (биты DID[0] должны быть равны нулю, если DID[5:0] больше 1Ah)",
          offset: "0x79",
        },
        {
          type: "numeric",
          prompt: "Pstate5 VID",
          help: "Specifies the core voltage. / Задает напряжение ядра процессора",
          offset: "0x7A",
        },
        {
          type: "oneof",
          prompt: "Custom Pstate6",
          help: "Disabled - disable this Pstate Custom - customize this Pstate, applicable only if PcdOcDisable=FALSE WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY. Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.  / Disabled — отключить это Pstate; Custom — настроить Pstate вручную (доступно только если PcdOcDisable=FALSE). ВНИМАНИЕ: Повреждения процессора в результате разгона лишают гарантии!",
          offset: "0x7B",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Custom",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Frequency (MHz)",
          help: "Current core frequency in MHz / Текущая частота ядра в МГц",
          offset: "0x7C",
        },
        {
          type: "numeric",
          prompt: "Voltage (uV)",
          help: "Voltage in uV (1V = 1000 * 1000 uV) / Напряжение в микровольтах (1 В = 1 000 000 мкВ)",
          offset: "0x80",
        },
        {
          type: "numeric",
          prompt: "Pstate6 FID",
          help: "Specifies the core frequency multiplier. COF = 200MHz * FID / DID / Задает множитель частоты ядра. Итоговая частота = 200 МГц * FID / DID",
          offset: "0x84",
        },
        {
          type: "numeric",
          prompt: "Pstate6 DID",
          help: "Specifies the core frequency divisor (DID[0] should zero if DID[5:0]>1Ah). / Задает делитель частоты ядра (биты DID[0] должны быть равны нулю, если DID[5:0] больше 1Ah)",
          offset: "0x85",
        },
        {
          type: "numeric",
          prompt: "Pstate6 VID",
          help: "Specifies the core voltage. / Задает напряжение ядра процессора",
          offset: "0x86",
        },
        {
          type: "oneof",
          prompt: "Custom Pstate7",
          help: "Disabled - disable this Pstate Custom - customize this Pstate, applicable only if PcdOcDisable=FALSE WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY. Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.  / Disabled — отключить это Pstate; Custom — настроить Pstate вручную (доступно только если PcdOcDisable=FALSE). ВНИМАНИЕ: Повреждения процессора в результате разгона лишают гарантии!",
          offset: "0x87",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Custom",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Frequency (MHz)",
          help: "Current core frequency in MHz / Текущая частота ядра в МГц",
          offset: "0x88",
        },
        {
          type: "numeric",
          prompt: "Voltage (uV)",
          help: "Voltage in uV (1V = 1000 * 1000 uV) / Напряжение в микровольтах (1 В = 1 000 000 мкВ)",
          offset: "0x8C",
        },
        {
          type: "numeric",
          prompt: "Pstate7 FID",
          help: "Specifies the core frequency multiplier. COF = 200MHz * FID / DID / Задает множитель частоты ядра. Итоговая частота = 200 МГц * FID / DID",
          offset: "0x90",
        },
        {
          type: "numeric",
          prompt: "Pstate7 DID",
          help: "Specifies the core frequency divisor (DID[0] should zero if DID[5:0]>1Ah). / Задает делитель частоты ядра (биты DID[0] должны быть равны нулю, если DID[5:0] больше 1Ah)",
          offset: "0x91",
        },
        {
          type: "numeric",
          prompt: "Pstate7 VID",
          help: "Specifies the core voltage. / Задает напряжение ядра процессора",
          offset: "0x92",
        },
        {
          type: "oneof",
          prompt: "Relaxed EDC throttling",
          help: "Disabled - Part-specific EDC throttling protection enabled Enabled - Reduce the amount of time the processor will throttle Auto - AMD's recommendation (Disabled)  / Disabled — включена специфическая защита троттлинга по току EDC; Enabled — сократить время троттлинга процессора; Auto — рекомендация AMD (Disabled)",
          offset: "0x93",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x700D": {
      id: "0x700D",
      title: "Core/Thread Enablement",
      items: [
        {
          type: "subtitle",
          prompt: "Core/Thread Enablement",
        },
        {
          type: "text",
          prompt:
            "WARNING - S3 is NOT SUPPORTED on systems where cores/threads have been removed/disabled.",
          help: "Legal Disclaimer",
        },
        {
          type: "ref",
          prompt: "Disagree",
          help: "Disagree",
          formId: "0x7001",
        },
        {
          type: "ref",
          prompt: "Agree",
          help: "Agree",
          formId: "0x7033",
        },
      ],
    },
    "0x7032": {
      id: "0x7032",
      title: "Disagree",
      items: [
        {
          type: "subtitle",
          prompt: "Disagree",
        },
      ],
    },
    "0x7033": {
      id: "0x7033",
      title: "Agree",
      items: [
        {
          type: "subtitle",
          prompt: "Agree",
        },
        {
          type: "oneof",
          prompt: "Downcore control",
          help: "Sets the number of cores to be used. Once this option has been used to remove any cores, a POWER CYCLE is required in order for future selections to take effect. / Задает количество активных ядер процессора. После отключения ядер требуется полное выключение и включение питания (Power Cycle) для применения изменений",
          offset: "0x95",
          options: [
            {
              name: "ONE (1 + 0)",
              value: 1,
              isDefault: false,
            },
            {
              name: "TWO (1 + 1)",
              value: 2,
              isDefault: false,
            },
            {
              name: "TWO (2 + 0)",
              value: 3,
              isDefault: false,
            },
            {
              name: "THREE (3 + 0)",
              value: 4,
              isDefault: false,
            },
            {
              name: "FOUR (2 + 2)",
              value: 5,
              isDefault: false,
            },
            {
              name: "FOUR (4 + 0)",
              value: 6,
              isDefault: false,
            },
            {
              name: "SIX (3 + 3)",
              value: 7,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "SMTEN",
          help: "Can be used to disable symmetric multithreading. To re-enable SMT, a POWER CYCLE is needed after selecting the 'Auto' option. WARNING - S3 is NOT SUPPORTED on systems where SMT is disabled. / Позволяет отключить технологию одновременной мультипоточности (SMT). Для повторного включения SMT требуется полное выключение и включение питания (Power Cycle) после выбора 'Auto'. ВНИМАНИЕ: Спящий режим S3 НЕ ПОДДЕРЖИВАЕТСЯ при отключенном SMT\nВлияние опций:\n - Auto / Enabled: Включает виртуальную многопоточность SMT (2 потока на ядро). Повышает скорость в рабочих задачах (рендеринг, архивация, видеомонтаж).\n - Disabled: Отключает многопоточность (1 поток на ядро). Может снизить нагрев процессора и немного улучшить стабильность FPS в некоторых старых играх.",
          offset: "0x96",
          options: [
            {
              name: "Disable",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 1,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Die0 DownCore Bitmap",
          help: "No help string / Битовая маска отключения ядер для первого кристалла (Die 0)",
          offset: "0x1B7",
        },
        {
          type: "numeric",
          prompt: "Die1 DownCore Bitmap",
          help: "No help string / Битовая маска отключения ядер для второго кристалла (Die 1)",
          offset: "0x1B4",
        },
        {
          type: "numeric",
          prompt: "Die2 DownCore Bitmap",
          help: "No help string / Битовая маска отключения ядер для третьего кристалла (Die 2)",
          offset: "0x1B5",
        },
        {
          type: "numeric",
          prompt: "Die3 DownCore Bitmap",
          help: "No help string / Битовая маска отключения ядер для четвертого кристалла (Die 3)",
          offset: "0x1B6",
        },
      ],
    },
    "0x700E": {
      id: "0x700E",
      title: "Prefetcher settings",
      items: [
        {
          type: "subtitle",
          prompt: "Prefetcher settings",
        },
        {
          type: "oneof",
          prompt: "L1 Stream HW Prefetcher",
          help: "Option to Enable | Disable L1 Stream HW Prefetcher / Включение или отключение L1 Stream HW Prefetcher (аппаратный предвыборщик L1)",
          offset: "0x97",
          options: [
            {
              name: "Disable",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enable",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "L2 Stream HW Prefetcher",
          help: "Option to Enable | Disable L2 Stream HW Prefetcher / Включение или отключение L2 Stream HW Prefetcher (аппаратный предвыборщик L2)",
          offset: "0x98",
          options: [
            {
              name: "Disable",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enable",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x7002": {
      id: "0x7002",
      title: "DF Common Options",
      items: [
        {
          type: "subtitle",
          prompt: "DF Common Options",
        },
        {
          type: "oneof",
          prompt: "DRAM scrub time",
          help: "Provide a value that is the number of hours to scrub memory. / Задает периодичность фоновой очистки (скраббинга) памяти в часах",
          offset: "0x99",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "1 hour",
              value: 1,
              isDefault: false,
            },
            {
              name: "4 hours",
              value: 2,
              isDefault: false,
            },
            {
              name: "8 hours",
              value: 3,
              isDefault: false,
            },
            {
              name: "16 hours",
              value: 4,
              isDefault: false,
            },
            {
              name: "24 hours",
              value: 5,
              isDefault: false,
            },
            {
              name: "48 hours",
              value: 6,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 7,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Redirect scrubber control",
          help: "Control DF::RedirScrubCtrl[EnRedirScrub] / Управление параметром DF::RedirScrubCtrl[EnRedirScrub] (перенаправление очистки памяти)",
          offset: "0x9A",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Disable DF sync flood propagation",
          help: "Control DF::PIEConfig[DisSyncFloodProp] / Управление параметром DF::PIEConfig[DisSyncFloodProp] (отключение лавины синхронизации шины DF при ошибках)",
          offset: "0x9B",
          options: [
            {
              name: "Sync flood disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Sync flood enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Freeze DF module queues on error",
          help: "Controls DF::PIEConfig[DisImmSyncFloodOnFatalError] Disabling this option sets DF:PIEConfig[DisImmSyncFloodOnFatalError] / Управляет замораживанием очередей Data Fabric при фатальной ошибке через параметр DF::PIEConfig[DisImmSyncFloodOnFatalError]",
          offset: "0x9C",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "GMI encryption control",
          help: "Control GMI link encryption / Управление шифрованием интерфейса GMI (Global Memory Interconnect)",
          offset: "0x9D",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "xGMI encryption control",
          help: "Control xGMI link encryption / Управление шифрованием интерфейса xGMI (межпроцессорное соединение)",
          offset: "0x9E",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "CC6 memory region encryption",
          help: "Control whether or not the CC6 save/restore memory is encrypted / Определяет, зашифрована ли память сохранения/восстановления энергосберегающего состояния CC6",
          offset: "0x9F",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Location of private memory regions",
          help: "Controls whether or not the private memory regions (PSP, SMU and CC6) are at the top of DRAM or distributed. Note that distributed requires memory on all dies. Note that it will always be at the top of DRAM if some dies don't have memory regardless of this option's setting. / Определяет расположение приватных регионов памяти (PSP, SMU, CC6): вверху адресного пространства DRAM или распределенно. Распределенный режим требует наличия памяти на всех кристаллах (dies)",
          offset: "0xA0",
          options: [
            {
              name: "Distributed",
              value: 0,
              isDefault: false,
            },
            {
              name: "Consolidated",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "System probe filter",
          help: "Controls whether or not the probe filter is enabled. Has no effect on parts where the probe filter is fuse disabled. / Управляет включением фильтра опроса кэшей (Probe Filter). Не имеет эффекта на процессорах, где фильтр отключен на аппаратном уровне (fuse-disabled)",
          offset: "0xA1",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Memory interleaving",
          help: "Controls fabric level memory interleaving (AUTO, none, channel, die, socket). Note that channel, die, and socket has requirements on memory populations and it will be ignored if the memory doesn't support the selected option. / Управляет чередованием памяти на уровне Data Fabric (AUTO, отключено, по каналам, по кристаллам, по сокетам). Требует соответствующей конфигурации ОЗУ",
          offset: "0xA2",
          options: [
            {
              name: "None",
              value: 0,
              isDefault: false,
            },
            {
              name: "Channel",
              value: 1,
              isDefault: false,
            },
            {
              name: "Die",
              value: 2,
              isDefault: false,
            },
            {
              name: "Socket",
              value: 3,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 7,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Memory interleaving size",
          help: "Controls the memory interleaving size. The valid values are AUTO, 256 bytes, 512 bytes, 1 Kbytes or 2Kbytes. This determines the starting address of the interleave (bit 8, 9, 10 or 11). / Управляет размером чередования памяти. Допустимые значения: AUTO, 256 байт, 512 байт, 1 КБ или 2 КБ. Определяет стартовый адрес чередования",
          offset: "0xA3",
          options: [
            {
              name: "256 Bytes",
              value: 0,
              isDefault: false,
            },
            {
              name: "512 Bytes",
              value: 1,
              isDefault: false,
            },
            {
              name: "1 KB",
              value: 2,
              isDefault: false,
            },
            {
              name: "2 KB",
              value: 3,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 7,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Channel interleaving hash",
          help: "Controls whether or not the address bits are hashed during channel interleave mode. This field should not be used unless the interleaving is set to channel and the interleaving size is 256 or 512 bytes. / Определяет, хэшируются ли биты адреса в режиме чередования каналов. Используется только при чередовании по каналам с размером 256 или 512 байт",
          offset: "0xA4",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Memory Clear",
          help: "When this feature is disabled, BIOS does not implement MemClear after memory training (only if non-ECC DIMMs are used). / Если отключено, BIOS не производит очистку памяти (MemClear) после тренировки памяти (применимо только для модулей без поддержки ECC)",
          offset: "0xA5",
          options: [
            {
              name: "Enabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 3,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "ACPI SLIT Distance Control",
          help: "Determines how the SLIT distances are declared. / Определяет, как объявляются дистанции в таблице ACPI SLIT (System Locality Distance Information Table)",
          offset: "0xA6",
          options: [
            {
              name: "Hardware",
              value: 0,
              isDefault: false,
            },
            {
              name: "Local",
              value: 1,
              isDefault: false,
            },
            {
              name: "Max 2 Distances",
              value: 2,
              isDefault: false,
            },
            {
              name: "Max 3 Distances",
              value: 3,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "ACPI SLIT non-self distance",
          help: "Specify the distance to other domains. / Задает дистанцию (задержку) доступа к другим NUMA-доменам",
          offset: "0xA7",
        },
        {
          type: "numeric",
          prompt: "ACPI SLIT same socket distance",
          help: "Specify the distance to other domains within the same socket. / Задает дистанцию доступа к NUMA-доменам в пределах одного сокета",
          offset: "0xA8",
        },
        {
          type: "numeric",
          prompt: "ACPI SLIT remote socket distance",
          help: "Specify the distance to other domains on the remote socket. / Задает дистанцию доступа к NUMA-доменам на удаленном сокете",
          offset: "0xA9",
        },
      ],
    },
    "0x7003": {
      id: "0x7003",
      title: "UMC Common Options",
      items: [
        {
          type: "subtitle",
          prompt: "UMC Common Options",
        },
        {
          type: "ref",
          prompt: "DDR4 Common Options",
          help: "DDR4 Common Options / Общие параметры памяти DDR4",
          formId: "0x7035",
        },
        {
          type: "ref",
          prompt: "DRAM Memory Mapping",
          help: "DRAM Memory Mapping / Отображение памяти DRAM",
          formId: "0x7036",
        },
        {
          type: "ref",
          prompt: "NVDIMM",
          help: "NVDIMM",
          formId: "0x7037",
        },
        {
          type: "ref",
          prompt: "Memory MBIST",
          help: "Memory MBIST / Тестирование памяти MBIST",
          formId: "0x7038",
        },
      ],
    },
    "0x7035": {
      id: "0x7035",
      title: "DDR4 Common Options",
      items: [
        {
          type: "subtitle",
          prompt: "DDR4 Common Options",
        },
        {
          type: "ref",
          prompt: "DRAM Timing Configuration",
          help: "DRAM Timing Configuration / Настройка таймингов DRAM",
          formId: "0x7039",
        },
        {
          type: "ref",
          prompt: "DRAM Controller Configuration",
          help: "DRAM Controller Configuration / Настройка контроллера DRAM",
          formId: "0x703A",
        },
        {
          type: "ref",
          prompt: "CAD Bus Configuration",
          help: "CAD Bus Configuration / Конфигурация шины CAD Bus",
          formId: "0x703B",
        },
        {
          type: "ref",
          prompt: "Data Bus Configuration",
          help: "Data Bus Configuration / Конфигурация шины данных Data Bus",
          formId: "0x703C",
        },
        {
          type: "ref",
          prompt: "Common RAS",
          help: "Common RAS / Общие параметры надежности памяти (RAS)",
          formId: "0x703D",
        },
        {
          type: "ref",
          prompt: "Security",
          help: "Security / Безопасность",
          formId: "0x703E",
        },
      ],
    },
    "0x7039": {
      id: "0x7039",
      title: "DRAM Timing Configuration",
      items: [
        {
          type: "subtitle",
          prompt: "DRAM Timing Configuration",
        },
        {
          type: "text",
          prompt:
            "WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY.",
          help: "No help string / Нет описания",
        },
        {
          type: "text",
          prompt:
            "Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.",
          help: "No help string / Нет описания",
        },
        {
          type: "ref",
          prompt: "I Decline",
          help: "I Decline",
          formId: "0x7035",
        },
        {
          type: "ref",
          prompt: "I Accept",
          help: "I Accept",
          formId: "0x7040",
        },
      ],
    },
    "0x703F": {
      id: "0x703F",
      title: "I Decline",
      items: [
        {
          type: "subtitle",
          prompt: "I Decline",
        },
      ],
    },
    "0x7040": {
      id: "0x7040",
      title: "I Accept",
      items: [
        {
          type: "subtitle",
          prompt: "I Accept",
        },
        {
          type: "oneof",
          prompt: "Overclock",
          help: "Memory Overclock Settings / Параметры разгона оперативной памяти",
          offset: "0xAC",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Memory Clock Speed",
          help: "Set the memory clock frequency. / Задает рабочую частоту оперативной памяти",
          offset: "0xAD",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "667MHz",
              value: 20,
              isDefault: false,
            },
            {
              name: "800MHz",
              value: 24,
              isDefault: false,
            },
            {
              name: "933MHz",
              value: 28,
              isDefault: false,
            },
            {
              name: "1067MHz",
              value: 32,
              isDefault: false,
            },
            {
              name: "1200MHz",
              value: 36,
              isDefault: false,
            },
            {
              name: "1333MHz",
              value: 40,
              isDefault: false,
            },
            {
              name: "1367MHz",
              value: 41,
              isDefault: false,
            },
            {
              name: "1400MHz",
              value: 42,
              isDefault: false,
            },
            {
              name: "1433MHz",
              value: 43,
              isDefault: false,
            },
            {
              name: "1467MHz",
              value: 44,
              isDefault: false,
            },
            {
              name: "1500MHz",
              value: 45,
              isDefault: false,
            },
            {
              name: "1533MHz",
              value: 46,
              isDefault: false,
            },
            {
              name: "1567MHz",
              value: 47,
              isDefault: false,
            },
            {
              name: "1600MHz",
              value: 48,
              isDefault: false,
            },
            {
              name: "1633MHz",
              value: 49,
              isDefault: false,
            },
            {
              name: "1667MHz",
              value: 50,
              isDefault: false,
            },
            {
              name: "1700MHz",
              value: 51,
              isDefault: false,
            },
            {
              name: "1733MHz",
              value: 52,
              isDefault: false,
            },
            {
              name: "1767MHz",
              value: 53,
              isDefault: false,
            },
            {
              name: "1800MHz",
              value: 54,
              isDefault: false,
            },
            {
              name: "1833MHz",
              value: 55,
              isDefault: false,
            },
            {
              name: "1867MHz",
              value: 56,
              isDefault: false,
            },
            {
              name: "1900MHz",
              value: 57,
              isDefault: false,
            },
            {
              name: "1933MHz",
              value: 58,
              isDefault: false,
            },
            {
              name: "1967MHz",
              value: 59,
              isDefault: false,
            },
            {
              name: "2000MHz",
              value: 60,
              isDefault: false,
            },
            {
              name: "2033MHz",
              value: 61,
              isDefault: false,
            },
            {
              name: "2067MHz",
              value: 62,
              isDefault: false,
            },
            {
              name: "2100MHz",
              value: 63,
              isDefault: false,
            },
            {
              name: "333MHz",
              value: 4,
              isDefault: false,
            },
            {
              name: "400MHz",
              value: 6,
              isDefault: false,
            },
            {
              name: "533MHz",
              value: 10,
              isDefault: false,
            },
            {
              name: "1050MHz",
              value: 25,
              isDefault: false,
            },
            {
              name: "1066MHz",
              value: 26,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Tcl",
          help: "Sets the tCL time. / Задает тайминг tCL (CAS Latency)",
          offset: "0xAE",
          options: [
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh Clk",
              value: 15,
              isDefault: false,
            },
            {
              name: "10h Clk",
              value: 16,
              isDefault: false,
            },
            {
              name: "11h Clk",
              value: 17,
              isDefault: false,
            },
            {
              name: "12h Clk",
              value: 18,
              isDefault: false,
            },
            {
              name: "13h Clk",
              value: 19,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "14h Clk",
              value: 20,
              isDefault: false,
            },
            {
              name: "15h Clk",
              value: 21,
              isDefault: false,
            },
            {
              name: "16h Clk",
              value: 22,
              isDefault: false,
            },
            {
              name: "17h Clk",
              value: 23,
              isDefault: false,
            },
            {
              name: "18h Clk",
              value: 24,
              isDefault: false,
            },
            {
              name: "19h Clk",
              value: 25,
              isDefault: false,
            },
            {
              name: "1Ah Clk",
              value: 26,
              isDefault: false,
            },
            {
              name: "1Bh Clk",
              value: 27,
              isDefault: false,
            },
            {
              name: "1Ch Clk",
              value: 28,
              isDefault: false,
            },
            {
              name: "1Dh Clk",
              value: 29,
              isDefault: false,
            },
            {
              name: "1Eh Clk",
              value: 30,
              isDefault: false,
            },
            {
              name: "1Fh Clk",
              value: 31,
              isDefault: false,
            },
            {
              name: "20h Clk",
              value: 32,
              isDefault: false,
            },
            {
              name: "21h Clk",
              value: 33,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Trcdrd",
          help: "This sets the RAS# Active to CAS# read/write delay. / Задает тайминг задержки от Active до Read/Write (tRCD)",
          offset: "0xAF",
          options: [
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh Clk",
              value: 15,
              isDefault: false,
            },
            {
              name: "10h Clk",
              value: 16,
              isDefault: false,
            },
            {
              name: "14h Clk",
              value: 20,
              isDefault: false,
            },
            {
              name: "15h Clk",
              value: 21,
              isDefault: false,
            },
            {
              name: "16h Clk",
              value: 22,
              isDefault: false,
            },
            {
              name: "17h Clk",
              value: 23,
              isDefault: false,
            },
            {
              name: "18h Clk",
              value: 24,
              isDefault: false,
            },
            {
              name: "19h Clk",
              value: 25,
              isDefault: false,
            },
            {
              name: "1Ah Clk",
              value: 26,
              isDefault: false,
            },
            {
              name: "11h Clk",
              value: 17,
              isDefault: false,
            },
            {
              name: "12h Clk",
              value: 18,
              isDefault: false,
            },
            {
              name: "13h Clk",
              value: 19,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "1Bh Clk",
              value: 27,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Trcdwr",
          help: "This sets the RAS# Active to CAS# read/write delay. / Задает тайминг задержки от Active до Read/Write (tRCD)",
          offset: "0xB0",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0xA Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0xB Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0xC Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0xD Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0xE Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0xF Clk",
              value: 15,
              isDefault: false,
            },
            {
              name: "10h Clk",
              value: 16,
              isDefault: false,
            },
            {
              name: "11h Clk",
              value: 17,
              isDefault: false,
            },
            {
              name: "12h Clk",
              value: 18,
              isDefault: false,
            },
            {
              name: "13h Clk",
              value: 19,
              isDefault: false,
            },
            {
              name: "14h Clk",
              value: 20,
              isDefault: false,
            },
            {
              name: "15h Clk",
              value: 21,
              isDefault: false,
            },
            {
              name: "16h Clk",
              value: 22,
              isDefault: false,
            },
            {
              name: "17h Clk",
              value: 23,
              isDefault: false,
            },
            {
              name: "18h Clk",
              value: 24,
              isDefault: false,
            },
            {
              name: "19h Clk",
              value: 25,
              isDefault: false,
            },
            {
              name: "1Ah Clk",
              value: 26,
              isDefault: false,
            },
            {
              name: "1Bh Clk",
              value: 27,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Trp",
          help: "Specify the row precharge time. / Задает тайминг предварительного заряда строки (tRP)",
          offset: "0xB1",
          options: [
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh Clk",
              value: 15,
              isDefault: false,
            },
            {
              name: "10h Clk",
              value: 16,
              isDefault: false,
            },
            {
              name: "11h Clk",
              value: 17,
              isDefault: false,
            },
            {
              name: "12h Clk",
              value: 18,
              isDefault: false,
            },
            {
              name: "13h Clk",
              value: 19,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "14h Clk",
              value: 20,
              isDefault: false,
            },
            {
              name: "15h Clk",
              value: 21,
              isDefault: false,
            },
            {
              name: "16h Clk",
              value: 22,
              isDefault: false,
            },
            {
              name: "17h Clk",
              value: 23,
              isDefault: false,
            },
            {
              name: "18h Clk",
              value: 24,
              isDefault: false,
            },
            {
              name: "19h Clk",
              value: 25,
              isDefault: false,
            },
            {
              name: "1Ah Clk",
              value: 26,
              isDefault: false,
            },
            {
              name: "1Bh Clk",
              value: 27,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Tras",
          help: "Specify the min RAS# active time. / Задает минимальное время активности строки (tRAS)",
          offset: "0xB2",
          options: [
            {
              name: "15h Clk",
              value: 21,
              isDefault: false,
            },
            {
              name: "16h Clk",
              value: 22,
              isDefault: false,
            },
            {
              name: "17h Clk",
              value: 23,
              isDefault: false,
            },
            {
              name: "18h Clk",
              value: 24,
              isDefault: false,
            },
            {
              name: "19h Clk",
              value: 25,
              isDefault: false,
            },
            {
              name: "1Ah Clk",
              value: 26,
              isDefault: false,
            },
            {
              name: "1Bh Clk",
              value: 27,
              isDefault: false,
            },
            {
              name: "1Ch Clk",
              value: 28,
              isDefault: false,
            },
            {
              name: "1Dh Clk",
              value: 29,
              isDefault: false,
            },
            {
              name: "1Eh Clk",
              value: 30,
              isDefault: false,
            },
            {
              name: "1Fh Clk",
              value: 31,
              isDefault: false,
            },
            {
              name: "20h Clk",
              value: 32,
              isDefault: false,
            },
            {
              name: "21h Clk",
              value: 33,
              isDefault: false,
            },
            {
              name: "22h Clk",
              value: 34,
              isDefault: false,
            },
            {
              name: "23h Clk",
              value: 35,
              isDefault: false,
            },
            {
              name: "24h Clk",
              value: 36,
              isDefault: false,
            },
            {
              name: "25h Clk",
              value: 37,
              isDefault: false,
            },
            {
              name: "26h Clk",
              value: 38,
              isDefault: false,
            },
            {
              name: "27h Clk",
              value: 39,
              isDefault: false,
            },
            {
              name: "28h Clk",
              value: 40,
              isDefault: false,
            },
            {
              name: "29h Clk",
              value: 41,
              isDefault: false,
            },
            {
              name: "2Ah Clk",
              value: 42,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "2Bh Clk",
              value: 43,
              isDefault: false,
            },
            {
              name: "2Ch Clk",
              value: 44,
              isDefault: false,
            },
            {
              name: "2Dh Clk",
              value: 45,
              isDefault: false,
            },
            {
              name: "2Eh Clk",
              value: 46,
              isDefault: false,
            },
            {
              name: "2Fh Clk",
              value: 47,
              isDefault: false,
            },
            {
              name: "30h Clk",
              value: 48,
              isDefault: false,
            },
            {
              name: "31h Clk",
              value: 49,
              isDefault: false,
            },
            {
              name: "32h Clk",
              value: 50,
              isDefault: false,
            },
            {
              name: "33h Clk",
              value: 51,
              isDefault: false,
            },
            {
              name: "34h Clk",
              value: 52,
              isDefault: false,
            },
            {
              name: "35h Clk",
              value: 53,
              isDefault: false,
            },
            {
              name: "36h Clk",
              value: 54,
              isDefault: false,
            },
            {
              name: "37h Clk",
              value: 55,
              isDefault: false,
            },
            {
              name: "38h Clk",
              value: 56,
              isDefault: false,
            },
            {
              name: "39h Clk",
              value: 57,
              isDefault: false,
            },
            {
              name: "3Ah Clk",
              value: 58,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Trc Ctrl",
          help: "Specify Trc / Настройка тайминга tRC",
          offset: "0xB3",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Trc",
          help: "Active to Active/Refresh Delay Time. Valid values 87h-1Dh. / Тайминг задержки Active to Active/Refresh (tRC). Допустимые значения от 1Dh до 87h",
          offset: "0xB4",
        },
        {
          type: "oneof",
          prompt: "TrrdS",
          help: "Activate to Activate Delay Time, different bank group (tRRD_S) / Задержка между активациями разных групп банков памяти (tRRD_S)",
          offset: "0xB5",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "TrrdL",
          help: "Activate to Activate Delay Time, same bank group (tRRD_L) / Задержка между активациями в пределах одной группы банков памяти (tRRD_L)",
          offset: "0xB6",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Tfaw Ctrl",
          help: "Specify Tfaw / Настройка тайминга tFAW",
          offset: "0xB7",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Tfaw",
          help: "Four Activate Window Time. Valid values 36h-6h. / Тайминг tFAW (окно четырех активаций). Допустимые значения от 6h до 36h",
          offset: "0xB8",
        },
        {
          type: "oneof",
          prompt: "TwtrS",
          help: "Minimum Write to Read Time, different bank group / Минимальное время перехода от записи к чтению для разных групп банков памяти (tWTR_S)",
          offset: "0xB9",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "TwtrL",
          help: "Minimum Write to Read Time, same bank group / Минимальное время перехода от записи к чтению для одной группы банков (tWTR_L)",
          offset: "0xBA",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Twr Ctrl",
          help: "Specify Twr / Настройка тайминга tWR",
          offset: "0xBB",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Twr",
          help: "Minimum Write Recovery Time. Valid value 51h-Ah / Минимальное время восстановления после записи (tWR). Допустимые значения от Ah до 51h",
          offset: "0xBC",
        },
        {
          type: "oneof",
          prompt: "Trcpage Ctrl",
          help: "Specify Trcpage / Настройка тайминга tRCpage",
          offset: "0xBD",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Trcpage",
          help: "SDRAM Optional Features (tMAW, MAC). Valid value 3FFh - 0h / Дополнительные параметры SDRAM (tMAW, MAC). Допустимые значения от 0h до 3FFh",
          offset: "0xBE",
        },
        {
          type: "oneof",
          prompt: "TrdrdScL Ctrl",
          help: "Specify TrdrdScL / Настройка тайминга tRDRD_scL",
          offset: "0xC0",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "TrdrdScL",
          help: "CAS to CAS Delay Time, same bank group. Valid values Fh-1h / Задержка CAS to CAS в пределах одной группы банков (tRDRD_scL). Допустимые значения от 1h до Fh",
          offset: "0xC1",
        },
        {
          type: "oneof",
          prompt: "TwrwrScL Ctrl",
          help: "Specify TwrwrScL / Настройка тайминга tWRWR_scL",
          offset: "0xC2",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "TwrwrScL",
          help: "CAS to CAS Delay Time, same bank group. Valid values 3Fh-1h / Задержка CAS to CAS в пределах одной группы банков при записи (tWRWR_scL). Допустимые значения от 1h до 3Fh",
          offset: "0xC3",
        },
        {
          type: "oneof",
          prompt: "Trfc Ctrl",
          help: "Specify Trfc / Настройка тайминга tRFC",
          offset: "0xC4",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Trfc",
          help: "Refresh Recovery Delay Time (tRFC1). Valid values 3DEh-3Ch / Время восстановления после регенерации памяти tRFC1. Допустимые значения от 3Ch до 3DEh",
          offset: "0xC5",
        },
        {
          type: "oneof",
          prompt: "Trfc2 Ctrl",
          help: "Specify Trfc2 / Настройка тайминга tRFC2",
          offset: "0xC7",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Trfc2",
          help: "Refresh Recovery Delay Time (tRFC2).  Valid values 3DEh-3Ch / Время восстановления после регенерации памяти tRFC2. Допустимые значения от 3Ch до 3DEh",
          offset: "0xC8",
        },
        {
          type: "oneof",
          prompt: "Trfc4 Ctrl",
          help: "Specify Trfc4 / Настройка тайминга tRFC4",
          offset: "0xCA",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Trfc4",
          help: "Refresh Recovery Delay Time (tRFC4). Valid values 3DEh-3Ch / Время восстановления после регенерации памяти tRFC4. Допустимые значения от 3Ch до 3DEh",
          offset: "0xCB",
        },
        {
          type: "numeric",
          prompt: "Fail_CNT",
          help: "The number of training failure/retries required before boot from recovery mode / Количество неудачных попыток/повторов тренировки памяти перед переходом в режим восстановления",
          offset: "0x1B3",
        },
        {
          type: "oneof",
          prompt: "ProcODT",
          help: "Specifies the Processor ODT / Задает импеданс терминации процессора (Processor ODT)",
          offset: "0xCD",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "High Impedance",
              value: 0,
              isDefault: false,
            },
            {
              name: "480 ohm",
              value: 1,
              isDefault: false,
            },
            {
              name: "240 ohm",
              value: 2,
              isDefault: false,
            },
            {
              name: "160 ohm",
              value: 3,
              isDefault: false,
            },
            {
              name: "120 ohm",
              value: 8,
              isDefault: false,
            },
            {
              name: "96 ohm",
              value: 9,
              isDefault: false,
            },
            {
              name: "80 ohm",
              value: 10,
              isDefault: false,
            },
            {
              name: "68.6 ohm",
              value: 11,
              isDefault: false,
            },
            {
              name: "60 ohm",
              value: 24,
              isDefault: false,
            },
            {
              name: "53.3 ohm",
              value: 25,
              isDefault: false,
            },
            {
              name: "48 ohm",
              value: 26,
              isDefault: false,
            },
            {
              name: "43.6 ohm",
              value: 27,
              isDefault: false,
            },
            {
              name: "40 ohm",
              value: 56,
              isDefault: false,
            },
            {
              name: "36.9 ohm",
              value: 57,
              isDefault: false,
            },
            {
              name: "34.3 ohm",
              value: 58,
              isDefault: false,
            },
            {
              name: "32 ohm",
              value: 59,
              isDefault: false,
            },
            {
              name: "30 ohm",
              value: 62,
              isDefault: false,
            },
            {
              name: "28.2 ohm",
              value: 63,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Tcwl",
          help: "No help string / Тайминг задержки записи CAS (tCWL) в тактах памяти",
          offset: "0xCE",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "10h Clk",
              value: 16,
              isDefault: false,
            },
            {
              name: "12h Clk",
              value: 18,
              isDefault: false,
            },
            {
              name: "14h Clk",
              value: 20,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Trtp",
          help: "Specifies the read CAS# to precharge time. / Задает задержку от чтения (CAS#) до предварительного заряда (тайминг tRTP)",
          offset: "0xCF",
          options: [
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Trdwr",
          help: "This sets the tWRTTO time. / Задает тайминг tWRTTO (время перехода от записи к чтению)",
          offset: "0xD0",
          options: [
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh Clk",
              value: 15,
              isDefault: false,
            },
            {
              name: "10h Clk",
              value: 16,
              isDefault: false,
            },
            {
              name: "11h Clk",
              value: 17,
              isDefault: false,
            },
            {
              name: "12h Clk",
              value: 18,
              isDefault: false,
            },
            {
              name: "13h Clk",
              value: 19,
              isDefault: false,
            },
            {
              name: "14h Clk",
              value: 20,
              isDefault: false,
            },
            {
              name: "15h Clk",
              value: 21,
              isDefault: false,
            },
            {
              name: "16h Clk",
              value: 22,
              isDefault: false,
            },
            {
              name: "17h Clk",
              value: 23,
              isDefault: false,
            },
            {
              name: "18h Clk",
              value: 24,
              isDefault: false,
            },
            {
              name: "19h Clk",
              value: 25,
              isDefault: false,
            },
            {
              name: "1Ah Clk",
              value: 26,
              isDefault: false,
            },
            {
              name: "1Bh Clk",
              value: 27,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "1 Clk",
              value: 1,
              isDefault: false,
            },
            {
              name: "1Ch Clk",
              value: 28,
              isDefault: false,
            },
            {
              name: "1Dh Clk",
              value: 29,
              isDefault: false,
            },
            {
              name: "1Eh Clk",
              value: 30,
              isDefault: false,
            },
            {
              name: "1Fh Clk",
              value: 31,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Twrrd",
          help: "Specify the write to read delay when accessing different DIMMs. / Задает задержку от записи к чтению (tWRRD) при обращении к разным модулям памяти",
          offset: "0xD1",
          options: [
            {
              name: "1 Clk",
              value: 1,
              isDefault: false,
            },
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "0Ch",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh",
              value: 15,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "TwrwrSc",
          help: "write to write timing same DIMM same chip select. / Тайминг записи к записи для одного модуля памяти и одного ранга (chip select)",
          offset: "0xD2",
          options: [
            {
              name: "1 Clk",
              value: 1,
              isDefault: false,
            },
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh Clk",
              value: 15,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "TwrwrSd",
          help: "write to write timing same DIMM same chip select. / Тайминг записи к записи для одного модуля памяти и одного ранга (chip select)",
          offset: "0xD3",
          options: [
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "1 Clk",
              value: 1,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh Clk",
              value: 15,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "TwrwrDd",
          help: "write to write timing same DIMM same chip select. / Тайминг записи к записи для одного модуля памяти и одного ранга (chip select)",
          offset: "0xD4",
          options: [
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "1 Clk",
              value: 1,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh Clk",
              value: 15,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "TrdrdSc",
          help: "write to write timing same DIMM same chip select. / Тайминг записи к записи для одного модуля памяти и одного ранга (chip select)",
          offset: "0xD5",
          options: [
            {
              name: "1 Clk",
              value: 1,
              isDefault: false,
            },
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "TrdrdSd",
          help: "write to write timing same DIMM same chip select. / Тайминг записи к записи для одного модуля памяти и одного ранга (chip select)",
          offset: "0xD6",
          options: [
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "1 Clk",
              value: 1,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh Clk",
              value: 15,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "TrdrdDd",
          help: "write to write timing same DIMM same chip select. / Тайминг записи к записи для одного модуля памяти и одного ранга (chip select)",
          offset: "0xD7",
          options: [
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "1 Clk",
              value: 1,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh Clk",
              value: 15,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Tcke",
          help: "Specifies the CKE minimum high and low pulse width in memory clock cycles. / Задает минимальную ширину импульса CKE высокого и низкого уровня в тактах памяти",
          offset: "0xD8",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "1 Clk",
              value: 1,
              isDefault: false,
            },
            {
              name: "2 Clk",
              value: 2,
              isDefault: false,
            },
            {
              name: "3 Clk",
              value: 3,
              isDefault: false,
            },
            {
              name: "4 Clk",
              value: 4,
              isDefault: false,
            },
            {
              name: "5 Clk",
              value: 5,
              isDefault: false,
            },
            {
              name: "6 Clk",
              value: 6,
              isDefault: false,
            },
            {
              name: "7 Clk",
              value: 7,
              isDefault: false,
            },
            {
              name: "8 Clk",
              value: 8,
              isDefault: false,
            },
            {
              name: "9 Clk",
              value: 9,
              isDefault: false,
            },
            {
              name: "0Ah Clk",
              value: 10,
              isDefault: false,
            },
            {
              name: "0Bh Clk",
              value: 11,
              isDefault: false,
            },
            {
              name: "0Ch Clk",
              value: 12,
              isDefault: false,
            },
            {
              name: "0Dh Clk",
              value: 13,
              isDefault: false,
            },
            {
              name: "0Eh Clk",
              value: 14,
              isDefault: false,
            },
            {
              name: "0Fh Clk",
              value: 15,
              isDefault: false,
            },
            {
              name: "10h Clk",
              value: 16,
              isDefault: false,
            },
            {
              name: "11h Clk",
              value: 17,
              isDefault: false,
            },
            {
              name: "12h Clk",
              value: 18,
              isDefault: false,
            },
            {
              name: "13h Clk",
              value: 19,
              isDefault: false,
            },
            {
              name: "14h Clk",
              value: 20,
              isDefault: false,
            },
            {
              name: "15h Clk",
              value: 21,
              isDefault: false,
            },
            {
              name: "16h Clk",
              value: 22,
              isDefault: false,
            },
            {
              name: "17h Clk",
              value: 23,
              isDefault: false,
            },
            {
              name: "18h Clk",
              value: 24,
              isDefault: false,
            },
            {
              name: "19h Clk",
              value: 25,
              isDefault: false,
            },
            {
              name: "1Ah Clk",
              value: 26,
              isDefault: false,
            },
            {
              name: "1Bh Clk",
              value: 27,
              isDefault: false,
            },
            {
              name: "1Ch Clk",
              value: 28,
              isDefault: false,
            },
            {
              name: "1Dh Clk",
              value: 29,
              isDefault: false,
            },
            {
              name: "1Eh Clk",
              value: 30,
              isDefault: false,
            },
            {
              name: "1Fh Clk",
              value: 31,
              isDefault: false,
            },
          ],
        },
      ],
    },
    "0x703A": {
      id: "0x703A",
      title: "DRAM Controller Configuration",
      items: [
        {
          type: "subtitle",
          prompt: "DRAM Controller Configuration",
        },
        {
          type: "ref",
          prompt: "DRAM Power Options",
          help: "DRAM Power Options / Параметры энергосбережения DRAM",
          formId: "0x7041",
        },
        {
          type: "text",
          prompt: "",
          help: "",
        },
        {
          type: "oneof",
          prompt: "Cmd2T",
          help: "Select between 1T and 2T mode on ADDR/CMD / Выбор режима задержки команд 1T или 2T для адресной и командной шины памяти (Command Rate)\nВлияние опций:\n - 1T: Передача команд памяти за один такт. Обеспечивает наилучшую производительность ОЗУ.\n - 2T: Передача команд за два такта. Повышает стабильность памяти при разгоне или при заполнении всех 4 слотов памяти за счет незначительного увеличения задержек.",
          offset: "0xD9",
          options: [
            {
              name: "1T",
              value: 0,
              isDefault: false,
            },
            {
              name: "2T",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Gear Down Mode",
          help: "No help string / Режим Gear Down (снижение частоты адресной шины памяти на 1/2 для повышения стабильности)\nВлияние опций:\n - Auto / Enabled: Командная шина памяти работает на половине частоты (Command Rate 1.5T). Значительно упрощает разгон оперативной памяти выше 2666-3000 МГц и повышает стабильность.\n - Disabled: Командная шина работает на полной частоте (Command Rate 1T). Дает максимальную пропускную способность памяти и минимальные задержки (latency), но требует высокого качества чипов ОЗУ.",
          offset: "0xDA",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x7041": {
      id: "0x7041",
      title: "DRAM Power Options",
      items: [
        {
          type: "subtitle",
          prompt: "DRAM Power Options",
        },
        {
          type: "oneof",
          prompt: "Power Down Enable",
          help: "Enable or disable DDR power down mode / Включение или отключение режима снижения энергопотребления памяти (Power Down Mode)\nВлияние опций:\n - Enabled: Разрешает оперативной памяти переходить в режим энергосбережения при отсутствии активности.\n - Disabled: Запрещает переход в режим энергосбережения, модули памяти всегда активны. Снижает задержку первого обращения к памяти (latency), рекомендуется при разгоне оперативной памяти.",
          offset: "0xDB",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x703B": {
      id: "0x703B",
      title: "CAD Bus Configuration",
      items: [
        {
          type: "subtitle",
          prompt: "CAD Bus Configuration",
        },
        {
          type: "oneof",
          prompt: "CAD Bus Timing User Controls",
          help: "Setup time on CAD bus signals to Auto or Manual",
          offset: "0xDC",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "AddrCmdSetup",
          help: "Setup time on CAD bus signals. Valid values 3Fh-0h. / Время установки для сигналов шины CAD. Допустимые значения от 0h до 3Fh",
          offset: "0xDD",
        },
        {
          type: "numeric",
          prompt: "CsOdtSetup",
          help: "Setup time on CAD bus signals. Valid values 3Fh-0h. / Время установки для сигналов шины CAD. Допустимые значения от 0h до 3Fh",
          offset: "0xDE",
        },
        {
          type: "numeric",
          prompt: "CkeSetup",
          help: "Setup time on CAD bus signals. Valid values 3Fh-0h. / Время установки для сигналов шины CAD. Допустимые значения от 0h до 3Fh",
          offset: "0xDF",
        },
        {
          type: "oneof",
          prompt: "CAD Bus Drive Strength User Controls",
          help: "Drive Strength on CAD bus signals to Auto or Manual / Управление силой сигнала (Drive Strength) на шине CAD: Auto или Manual",
          offset: "0xE0",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "ClkDrvStren",
          help: "No help string / Импеданс передатчиков тактового сигнала памяти (ClkDrvStren)",
          offset: "0xE1",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "120.0 Ohm",
              value: 0,
              isDefault: false,
            },
            {
              name: "60.0 Ohm",
              value: 1,
              isDefault: false,
            },
            {
              name: "40.0 Ohm",
              value: 3,
              isDefault: false,
            },
            {
              name: "30.0 Ohm",
              value: 7,
              isDefault: false,
            },
            {
              name: "24.0 Ohm",
              value: 15,
              isDefault: false,
            },
            {
              name: "20.0 Ohm",
              value: 31,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "AddrCmdDrvStren",
          help: "No help string / Импеданс передатчиков адресной и командной шины памяти (AddrCmdDrvStren)",
          offset: "0xE2",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "120.0 Ohm",
              value: 0,
              isDefault: false,
            },
            {
              name: "60.0 Ohm",
              value: 1,
              isDefault: false,
            },
            {
              name: "40.0 Ohm",
              value: 3,
              isDefault: false,
            },
            {
              name: "30.0 Ohm",
              value: 7,
              isDefault: false,
            },
            {
              name: "24.0 Ohm",
              value: 15,
              isDefault: false,
            },
            {
              name: "20.0 Ohm",
              value: 31,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "CsOdtDrvStren",
          help: "No help string / Импеданс передатчиков линий выбора ранга и терминации (CsOdtDrvStren)",
          offset: "0xE3",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "120.0 Ohm",
              value: 0,
              isDefault: false,
            },
            {
              name: "60.0 Ohm",
              value: 1,
              isDefault: false,
            },
            {
              name: "40.0 Ohm",
              value: 3,
              isDefault: false,
            },
            {
              name: "30.0 Ohm",
              value: 7,
              isDefault: false,
            },
            {
              name: "24.0 Ohm",
              value: 15,
              isDefault: false,
            },
            {
              name: "20.0 Ohm",
              value: 31,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "CkeDrvStren",
          help: "No help string / Импеданс передатчиков линии разрешения тактирования CKE (CkeDrvStren)",
          offset: "0xE4",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "120.0 Ohm",
              value: 0,
              isDefault: false,
            },
            {
              name: "60.0 Ohm",
              value: 1,
              isDefault: false,
            },
            {
              name: "40.0 Ohm",
              value: 3,
              isDefault: false,
            },
            {
              name: "30.0 Ohm",
              value: 7,
              isDefault: false,
            },
            {
              name: "24.0 Ohm",
              value: 15,
              isDefault: false,
            },
            {
              name: "20.0 Ohm",
              value: 31,
              isDefault: false,
            },
          ],
        },
      ],
    },
    "0x703C": {
      id: "0x703C",
      title: "Data Bus Configuration",
      items: [
        {
          type: "subtitle",
          prompt: "Data Bus Configuration",
        },
        {
          type: "oneof",
          prompt: "Data Bus Configuration User Controls",
          help: "Specify the mode for drive strength to Auto or Manual",
          offset: "0xE5",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "RttNom",
          help: "No help string / Номинальное значение сопротивления терминации шины данных памяти (RttNom)",
          offset: "0xE6",
          options: [
            {
              name: "Rtt_Nom Disable",
              value: 0,
              isDefault: false,
            },
            {
              name: "RZQ/4",
              value: 1,
              isDefault: false,
            },
            {
              name: "RZQ/2",
              value: 2,
              isDefault: false,
            },
            {
              name: "RZQ/6",
              value: 3,
              isDefault: false,
            },
            {
              name: "RZQ/1",
              value: 4,
              isDefault: false,
            },
            {
              name: "RZQ/5",
              value: 5,
              isDefault: false,
            },
            {
              name: "RZQ/3",
              value: 6,
              isDefault: false,
            },
            {
              name: "RZQ/7",
              value: 7,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "RttWr",
          help: "No help string / Импеданс терминации памяти при записи данных (RttWr)",
          offset: "0xE7",
          options: [
            {
              name: "Dynamic ODT Off",
              value: 0,
              isDefault: false,
            },
            {
              name: "RZQ/2",
              value: 1,
              isDefault: false,
            },
            {
              name: "RZQ/1",
              value: 2,
              isDefault: false,
            },
            {
              name: "Hi-Z",
              value: 3,
              isDefault: false,
            },
            {
              name: "RZQ/3",
              value: 4,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "RttPark",
          help: "No help string / Импеданс терминации памяти в режиме ожидания (RttPark)",
          offset: "0xE8",
          options: [
            {
              name: "Rtt_PARK Disable",
              value: 0,
              isDefault: false,
            },
            {
              name: "RZQ/4",
              value: 1,
              isDefault: false,
            },
            {
              name: "RZQ/2",
              value: 2,
              isDefault: false,
            },
            {
              name: "RZQ/6",
              value: 3,
              isDefault: false,
            },
            {
              name: "RZQ/1",
              value: 4,
              isDefault: false,
            },
            {
              name: "RZQ/5",
              value: 5,
              isDefault: false,
            },
            {
              name: "RZQ/3",
              value: 6,
              isDefault: false,
            },
            {
              name: "RZQ/7",
              value: 7,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x703D": {
      id: "0x703D",
      title: "Common RAS",
      items: [
        {
          type: "subtitle",
          prompt: "Common RAS",
        },
        {
          type: "oneof",
          prompt: "Data Poisoning",
          help: " Enable/disable data poisoning: UMC_CH::EccCtrl[UcFatalEn] UMC_CH::EccCtrl[WrEccEn] Should be enabled/disabled together. / Включение/отключение маскирования некорректируемых ошибок (Data Poisoning). Рекомендуется настраивать обе опции совместно",
          offset: "0xE9",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "ref",
          prompt: "ECC Configuration",
          help: "ECC Configuration / Конфигурация контроля ошибок ECC",
          formId: "0x7042",
        },
      ],
    },
    "0x7042": {
      id: "0x7042",
      title: "ECC Configuration",
      items: [
        {
          type: "subtitle",
          prompt: "ECC Configuration",
        },
        {
          type: "oneof",
          prompt: "DRAM ECC Symbol Size",
          help: "DRAM ECC Symbol Size (x4/x8) - UMC_CH::EccCtrl[EccSymbolSize] / Размер символа DRAM ECC (x4 или x8) — UMC_CH::EccCtrl[EccSymbolSize]",
          offset: "0xEA",
          options: [
            {
              name: "x4",
              value: 0,
              isDefault: false,
            },
            {
              name: "x8",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "DRAM ECC Enable",
          help: "Use this option to enable / disable DRAM ECC. Auto will set ECC to enable. / Включение или отключение режима коррекции ошибок DRAM ECC. Режим Auto активирует ECC при наличии аппаратной поддержки",
          offset: "0xEB",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x703E": {
      id: "0x703E",
      title: "Security",
      items: [
        {
          type: "subtitle",
          prompt: "Security",
        },
        {
          type: "oneof",
          prompt: "TSME",
          help: "Transparent SME: AddrTweakEn = 1; ForceEncrEn =0; DataEncrEn = 1 / Прозрачное шифрование памяти (TSME): шифрует оперативную память без участия операционной системы\nВлияние опций:\n - Enabled: Включает прозрачное аппаратное шифрование всей оперативной памяти. Защищает данные от считывания физическими методами при доступе к ПК. Влияние на производительность минимально (1-2%).\n - Disabled / Auto: Шифрование отключено.",
          offset: "0xEC",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Data Scramble",
          help: "Data scrambling: DataScrambleEn / Включение скремблирования данных памяти (Data Scramble) для снижения электромагнитного излучения",
          offset: "0xED",
          options: [
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x7036": {
      id: "0x7036",
      title: "DRAM Memory Mapping",
      items: [
        {
          type: "subtitle",
          prompt: "DRAM Memory Mapping",
        },
        {
          type: "oneof",
          prompt: "Chipselect Interleaving",
          help: "Interleave memory blocks across the DRAM chip selects for node 0. / Чередование блоков памяти между рангами (chip selects) для ноды 0",
          offset: "0xEE",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "BankGroupSwap",
          help: "No help string / Режим Bank Group Swap (BGS). Изменяет логику адресации для ускорения доступа к разным группам банков",
          offset: "0xEF",
          options: [
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Address Hash Bank",
          help: "Enable or disable bank address hashing / Включение или отключение хэширования адресов банков памяти",
          offset: "0xF0",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Address Hash CS",
          help: "Enable or disable CS address hashing / Включение или отключение хэширования адресов рангов (Chip Select)",
          offset: "0xF1",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "SPD Read Optimization",
          help: "Enable or disable SPD Read Optimization, Enabled - SPD reads are skipped for Reserved fields and most of upper 256 Bytes, Disabled - read all 512 SPD Bytes / Включение оптимизации чтения SPD. Enabled — пропускается чтение зарезервированных полей и верхних 256 байт; Disabled — полное чтение всех 512 байт SPD",
          offset: "0x1CF",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
          ],
        },
      ],
    },
    "0x7037": {
      id: "0x7037",
      title: "NVDIMM",
      items: [
        {
          type: "subtitle",
          prompt: "NVDIMM",
        },
      ],
    },
    "0x7038": {
      id: "0x7038",
      title: "Memory MBIST",
      items: [
        {
          type: "subtitle",
          prompt: "Memory MBIST",
        },
        {
          type: "oneof",
          prompt: "MBIST Enable",
          help: "Enable or disable Memory MBIST / Включить или отключить Тестирование памяти MBIST",
          offset: "0xF2",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: true,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "MBIST SubType Test",
          help: "Select MBIST Subtest - Single Chipselect, Multi Chipselect, Address Line Test or execute All test",
          offset: "0xF3",
          options: [
            {
              name: "Single CS",
              value: 0,
              isDefault: true,
            },
            {
              name: "Multiple CS",
              value: 1,
              isDefault: false,
            },
            {
              name: "Connectivity",
              value: 2,
              isDefault: false,
            },
            {
              name: "Data Eye",
              value: 3,
              isDefault: false,
            },
            {
              name: "All Tests",
              value: 4,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "MBIST Aggressors",
          help: "Enable or disable MBIST Aggressor test / Включить или отключить MBIST Aggressor test",
          offset: "0xF4",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "MBIST Per Bit Slave Die Reporting",
          help: "Enable or disable MBIST per bit slave die result report / Включить или отключить MBIST per bit slave die result report",
          offset: "0xF5",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x7004": {
      id: "0x7004",
      title: "NBIO Common Options",
      items: [
        {
          type: "subtitle",
          prompt: "NBIO Common Options",
        },
        {
          type: "ref",
          prompt: "NB Configuration",
          help: "NB Configuration / Конфигурация северного моста NB",
          formId: "0x7045",
        },
        {
          type: "text",
          prompt: "",
          help: "",
        },
        {
          type: "oneof",
          prompt: "System Configuration",
          help: "Warning: Select System Configuration may cause the system to hang, as some System Configuration may not be supported by your OPN.  / Внимание: Выбор нестандартной системной конфигурации может привести к зависанию, если она не поддерживается процессором",
          offset: "0xF6",
          options: [
            {
              name: "65W POR Configuration",
              value: 1,
              isDefault: false,
            },
            {
              name: "45W POR Configuration",
              value: 2,
              isDefault: false,
            },
            {
              name: "35W POR Configuration",
              value: 3,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "NBIO Internal Poison Consumption",
          help: "NBIO Internal Poison Consumption / Потребление внутренних фатальных ошибок NBIO",
          offset: "0xF7",
          options: [
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "NBIO RAS Control",
          help: "NBIO RAS Control / Управление RAS на уровне NBIO",
          offset: "0xF8",
          options: [
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Determinism Slider",
          help: "Auto = Use default performance determinism settings Power Performance / Auto — использовать настройки детерминизма производительности по умолчанию",
          offset: "0xF9",
          options: [
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
            {
              name: "Power",
              value: 0,
              isDefault: false,
            },
            {
              name: "Performance",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "cTDP Control",
          help: "Auto = Use the fused cTDP Manual = User can set customized cTDP / Auto — использовать заводской лимит cTDP; Manual — ручная настройка лимита TDP (cTDP)",
          offset: "0xFA",
          options: [
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "cTDP",
          help: "cTDP [W] 0 = Invalid value. / Лимит TDP в ваттах (cTDP). 0 — недействительное значение",
          offset: "0xFB",
        },
        {
          type: "ref",
          prompt: "Fan Control",
          help: "Fan Control / Управление скоростью вентиляторов",
          formId: "0x7046",
        },
        {
          type: "oneof",
          prompt: "PSI",
          help: "Disable PSI / Отключить функцию контроля энергопотребления фаз питания PSI (Power Status Indicator)",
          offset: "0xFF",
          options: [
            {
              name: "Disable",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "ACS Enable",
          help: "No help string / Включить поддержку Access Control Services (ACS) для изоляции линий PCIe (полезно для проброса GPU в VM)",
          offset: "0x100",
          options: [
            {
              name: "Enable",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "PCIe ARI Support",
          help: "Enables Alternative Routing-ID Interpretation / Включает спецификацию альтернативной интерпретации Routing-ID (ARI) для PCIe",
          offset: "0x101",
          options: [
            {
              name: "Disable",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enable",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "CLDO_VDDP Control",
          help: "Manual = User can set customized CLDO_VDDP voltage / Manual — ручная регулировка напряжения CLDO_VDDP",
          offset: "0x102",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "CLDO_VDDP voltage",
          help: "Warning: user must manually cold reset the system so that the CLDOs get re-latched otherwise the voltage change will not take into effect. CLDO_VDDP voltage [mV] = (supported range is 700mV to 'VDDIO-100mV'). / Внимание: требуется полное выключение системы (холодный перезапуск) для перезащелкивания CLDO, иначе изменение напряжения не вступит в силу. Диапазон CLDO_VDDP [мВ]: от 700мВ до VDDIO-100мВ",
          offset: "0x103",
        },
        {
          type: "oneof",
          prompt: "HD Audio Enable",
          help: "Enable or Disable HD Audio / Включение или отключение встроенного HD Audio аудиоконтроллера",
          offset: "0x107",
          options: [
            {
              name: "Enable",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Force PCIe gen speed",
          help: "Force PCIe gen speed to Gen1 or Gen3 / Принудительно установить скорость шины PCIe в режим Gen1 или Gen3",
          offset: "0x1B8",
          options: [
            {
              name: "Gen1",
              value: 1,
              isDefault: false,
            },
            {
              name: "Gen3",
              value: 3,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Processor temperature Control",
          help: "Auto = the default thermal throttle limit[C] for the CPU Manual = sets the thermal throttle limit[C] for the CPU / Auto — использовать температурный лимит процессора по умолчанию; Manual — ручная установка лимита температуры троттлинга",
          offset: "0x12F",
          options: [
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Processor temperature limit",
          help: "sets the thermal throttle limit[C] for the CPU / Устанавливает предел температуры (в °C) для активации тепловой защиты (троттлинга) процессора",
          offset: "0x130",
        },
        {
          type: "oneof",
          prompt: "Managed overclocking Control",
          help: "Managed overclocking Control / Управление контролируемым разгоном",
          offset: "0x1C1",
          options: [
            {
              name: "MOC_X",
              value: 1,
              isDefault: false,
            },
            {
              name: "MOC_PT",
              value: 2,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 254,
              isDefault: true,
            },
          ],
        },
        {
          type: "ref",
          prompt: "XFR Enhancement",
          help: "XFR Enhancement / Технология автоматического разгона XFR",
          formId: "0x7047",
        },
        {
          type: "numeric",
          prompt: "SOC OVERCLOCK VID",
          help: "Specifies the Voltage ID (VID) value for VDDR_SOC to support overclocking. NOTE:  This is a VID value and not a voltage level. / Задает значение идентификатора напряжения (VID) для VDDR_SOC для поддержки разгона. Примечание: это значение VID, а не конкретный уровень напряжения",
          offset: "0x109",
        },
        {
          type: "oneof",
          prompt: "Mode0",
          help: "Enable/Disable Mode0 / Включение/отключение режима Mode0",
          offset: "0x1C7",
          options: [
            {
              name: "Enable",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disable",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x7045": {
      id: "0x7045",
      title: "NB Configuration",
      items: [
        {
          type: "subtitle",
          prompt: "NB Configuration",
        },
        {
          type: "oneof",
          prompt: "IOMMU",
          help: "Enable/Disable IOMMU / Включение/отключение контроллера виртуализации ввода-вывода IOMMU\nВлияние опций:\n - Enabled / Auto: Включает поддержку IOMMU (виртуализация ввода-вывода). Необходима для прямой передачи (пасстру) физических устройств (видеокарты, контроллера) внутрь виртуальной машины.\n - Disabled: Отключает аппаратную поддержку IOMMU.",
          offset: "0x10A",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x7046": {
      id: "0x7046",
      title: "Fan Control",
      items: [
        {
          type: "subtitle",
          prompt: "Fan Control",
        },
        {
          type: "oneof",
          prompt: "Fan Control",
          help: "Auto = Use the default fan controller settings Manual = User can set customized fan controller settings / Auto — настройки вентилятора по умолчанию; Manual — ручная настройка контроллера вентиляторов",
          offset: "0x10B",
          options: [
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Force PWM Control",
          help: "Unforce = Do not force the fan PWM Force = Force the fan PWM to the use specified value / Unforce — не переопределять ШИМ вентилятора; Force — принудительно задать ШИМ вентилятора на указанное значение",
          offset: "0x10C",
          options: [
            {
              name: "Force",
              value: 1,
              isDefault: false,
            },
            {
              name: "Unforce",
              value: 0,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Force PWM",
          help: "Specify the PWM to force the fan to [0-100] / Задает уровень ШИМ в процентах [0-100] для принудительного управления вентилятором",
          offset: "0x10D",
        },
        {
          type: "oneof",
          prompt: "Fan Table Control",
          help: "Auto = Use the default fan table Manual = User can set customized fan table / Auto — использовать стандартную кривую вентиляторов; Manual — ручная настройка кривой вентиляторов",
          offset: "0x10E",
          options: [
            {
              name: "Manual",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "Low Temperature",
          help: "Low Temperature ['C] / Низкая граница температуры",
          offset: "0x10F",
        },
        {
          type: "numeric",
          prompt: "Medium Temperature",
          help: "Medium Temperature ['C] / Средняя граница температуры",
          offset: "0x110",
        },
        {
          type: "numeric",
          prompt: "High Temperature",
          help: "High Temperature ['C] / Высокая граница температуры",
          offset: "0x111",
        },
        {
          type: "numeric",
          prompt: "Critical Temperature",
          help: "Critical Temperature ['C] / Критическая температура активации экстренной защиты",
          offset: "0x112",
        },
        {
          type: "numeric",
          prompt: "Low Pwm",
          help: "Low Pwm [0-100] / Низкий уровень ШИМ вентилятора (обороты)",
          offset: "0x113",
        },
        {
          type: "numeric",
          prompt: "Medium Pwm",
          help: "Medium Pwm [0-100] / Средний уровень ШИМ вентилятора",
          offset: "0x114",
        },
        {
          type: "numeric",
          prompt: "High Pwm",
          help: "High Pwm [0-100] / Высокий уровень ШИМ вентилятора",
          offset: "0x115",
        },
        {
          type: "numeric",
          prompt: "Temperature Hysteresis",
          help: "Temperature Hysteresis ['C] / Гистерезис температуры (диапазон задержки изменения оборотов)",
          offset: "0x116",
        },
        {
          type: "oneof",
          prompt: "Pwm Frequency",
          help: "0 = 25kHz 1 = 100Hz / Частота сигнала ШИМ для вентилятора",
          offset: "0x117",
          options: [
            {
              name: "100Hz",
              value: 1,
              isDefault: false,
            },
            {
              name: "25kHz",
              value: 0,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Fan Polarity",
          help: "0 = negative 1 = positive / Полярность сигнала управления вентилятором",
          offset: "0x118",
          options: [
            {
              name: "Negative",
              value: 0,
              isDefault: true,
            },
            {
              name: "Positive",
              value: 1,
              isDefault: false,
            },
          ],
        },
      ],
    },
    "0x7047": {
      id: "0x7047",
      title: "XFR Enhancement",
      items: [
        {
          type: "subtitle",
          prompt: "XFR Enhancement",
        },
        {
          type: "text",
          prompt:
            "WARNING - DAMAGE CAUSED BY USE OF YOUR AMD PROCESSOR OUTSIDE OF SPECIFICATION OR IN EXCESS OF FACTORY SETTINGS ARE NOT COVERED UNDER YOUR AMD PRODUCT WARRANTY AND MAY NOT BE COVERED BY YOUR SYSTEM MANUFACTURER'S WARRANTY.",
          help: "No help string / Нет описания",
        },
        {
          type: "text",
          prompt:
            "Operating your AMD processor outside of specification or in excess of factory settings, including but not limited to overclocking, may damage or shorten the life of your processor or other system components, create system instabilities (e.g., data loss and corrupted images) and in extreme cases may result in total system failure. AMD does not provide support or service for issues or damages related to use of an AMD processor outside of processor specifications or in excess of factory settings.",
          help: "No help string / Нет описания",
        },
        {
          type: "ref",
          prompt: "Declined",
          help: "Declined / Изменения отклонены",
          formId: "0x7004",
        },
        {
          type: "ref",
          prompt: "Accepted",
          help: "Accepted / Изменения приняты",
          formId: "0x7049",
        },
      ],
    },
    "0x7048": {
      id: "0x7048",
      title: "Declined",
      items: [
        {
          type: "subtitle",
          prompt: "Declined",
        },
      ],
    },
    "0x7049": {
      id: "0x7049",
      title: "Accepted",
      items: [
        {
          type: "subtitle",
          prompt: "Accepted",
        },
        {
          type: "oneof",
          prompt: "Precision Boost Overdrive",
          help: "Precision Boost Overdrive: Enabled: Allows Processor to run beyond defined values for PPT, EDC and TDC to the limits of the board, and allows it to boost at higher voltages for longer durations than default operation.  / Precision Boost Overdrive: Включение позволяет процессору превышать стандартные лимиты PPT, EDC и TDC в рамках спецификации платы, обеспечивая более длительный разгон\nВлияние опций:\n - Enabled: Лимиты энергопотребления (PPT, TDC, EDC) расширяются до физических пределов материнской платы. Процессор может удерживать максимальные частоты разгона дольше.\n - Disabled: Стандартные лимиты AMD для этой модели процессора.\n - Manual: Позволяет настроить лимиты PPT, TDC и EDC вручную.",
          offset: "0x1B2",
          options: [
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
            {
              name: "Disable",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enable",
              value: 1,
              isDefault: false,
            },
          ],
        },
      ],
    },
    "0x7005": {
      id: "0x7005",
      title: "FCH Common Options",
      items: [
        {
          type: "subtitle",
          prompt: "FCH Common Options",
        },
        {
          type: "ref",
          prompt: "SATA Configuration Options",
          help: "SATA Configuration Options / Параметры конфигурации SATA",
          formId: "0x704A",
        },
        {
          type: "ref",
          prompt: "USB Configuration Options",
          help: "USB Configuration Options / Параметры конфигурации USB",
          formId: "0x704B",
        },
        {
          type: "ref",
          prompt: "SD (Secure Digital) Options",
          help: "SD (Secure Digital) Options / Параметры Secure Digital (SD)",
          formId: "0x704C",
        },
        {
          type: "ref",
          prompt: "Ac Power Loss Options",
          help: "Ac Power Loss Options / Поведение системы при восстановлении питания",
          formId: "0x704D",
        },
        {
          type: "ref",
          prompt: "I2C Configuration Options",
          help: "I2C Configuration Options / Параметры шины I2C",
          formId: "0x704E",
        },
        {
          type: "ref",
          prompt: "Uart Configuration Options",
          help: "Uart Configuration Options / Параметры портов UART",
          formId: "0x704F",
        },
        {
          type: "ref",
          prompt: "ESPI Configuration Options",
          help: "ESPI Configuration Options / Параметры шины eSPI",
          formId: "0x7050",
        },
        {
          type: "ref",
          prompt: "XGBE Configuration Options",
          help: "XGBE Configuration Options / Параметры сетевых адаптеров XGBE",
          formId: "0x7051",
        },
        {
          type: "ref",
          prompt: "eMMC Options",
          help: "eMMC Options / Параметры eMMC-накопителя",
          formId: "0x7052",
        },
      ],
    },
    "0x704A": {
      id: "0x704A",
      title: "SATA Configuration Options",
      items: [
        {
          type: "subtitle",
          prompt: "SATA Configuration Options",
        },
        {
          type: "oneof",
          prompt: "SATA Controller",
          help: "Disable or enable OnChip SATA controller / Включение или отключение встроенного SATA-контроллера\nВлияние опций:\n - Enabled: Встроенный контроллер портов SATA включен (необходим для работы SSD/HDD дисков SATA).\n - Disabled: Встроенный контроллер SATA отключен (экономит ресурсы системы, если используются только NVMe накопители).",
          offset: "0x134",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "SATA Mode",
          help: "Select OnChip SATA Type / Выбор режима работы встроенного SATA-контроллера",
          offset: "0x135",
          options: [
            {
              name: "AHCI",
              value: 2,
              isDefault: true,
            },
            {
              name: "AHCI as ID 0x7904",
              value: 5,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: false,
            },
            {
              name: "RAID",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Sata RAS Support",
          help: "Disable or enable Sata RAS Support / Включение или отключение поддержки Sata RAS (надежность, доступность, обслуживание)",
          offset: "0x136",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Sata Disabled AHCI Prefetch Function",
          help: "Disable or enable Sata Disabled AHCI Prefetch Function / Включение или отключение функции предварительной выборки AHCI для SATA",
          offset: "0x137",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Aggresive SATA Device Sleep Port 0",
          help: "No help string / Агрессивное энергосбережение DevSleep для SATA-порта 0",
          offset: "0x138",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "DevSleep0 Port Number",
          help: "DEVSLP port 0",
          offset: "0x139",
        },
        {
          type: "oneof",
          prompt: "Aggresive SATA Device Sleep Port 1",
          help: "No help string / Агрессивное энергосбережение DevSleep для SATA-порта 1",
          offset: "0x13A",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "DevSleep1 Port Number",
          help: "DEVSLP port 1",
          offset: "0x13B",
        },
      ],
    },
    "0x704B": {
      id: "0x704B",
      title: "USB Configuration Options",
      items: [
        {
          type: "subtitle",
          prompt: "USB Configuration Options",
        },
        {
          type: "oneof",
          prompt: "XHCI controller enable",
          help: "Enable or disable USB3 controller. / Включение или отключение USB 3.x контроллера (XHCI)",
          offset: "0x13C",
          options: [
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "ref",
          prompt: "MCM USB enable",
          help: "MCM USB enable / Включение USB-контроллера в многокристальном модуле (MCM USB)",
          formId: "0x7054",
        },
        {
          type: "ref",
          prompt: "XHCI Port 0 PHY Parameter Adjustment",
          help: "XHCI Port 0 PHY Parameter Adjustment / Параметры физического уровня (PHY) для порта 0 контроллера XHCI",
          formId: "0x7055",
        },
        {
          type: "ref",
          prompt: "XHCI Port 1 PHY Parameter Adjustment",
          help: "XHCI Port 1 PHY Parameter Adjustment / Параметры физического уровня (PHY) для порта 1 контроллера XHCI",
          formId: "0x7056",
        },
        {
          type: "ref",
          prompt: "XHCI Port 2 PHY Parameter Adjustment",
          help: "XHCI Port 2 PHY Parameter Adjustment / Параметры физического уровня (PHY) для порта 2 контроллера XHCI",
          formId: "0x7057",
        },
        {
          type: "ref",
          prompt: "XHCI Port 3 PHY Parameter Adjustment",
          help: "XHCI Port 3 PHY Parameter Adjustment / Параметры физического уровня (PHY) для порта 3 контроллера XHCI",
          formId: "0x7058",
        },
      ],
    },
    "0x7054": {
      id: "0x7054",
      title: "MCM USB enable",
      items: [
        {
          type: "subtitle",
          prompt: "MCM USB enable",
        },
        {
          type: "oneof",
          prompt: "XHCI Controller1 enable (Die1)",
          help: "Enable or disable USB3 controller. / Включение или отключение USB 3.x контроллера (XHCI)",
          offset: "0x13D",
          options: [
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "XHCI2 enable (MCM1/Die0)",
          help: "Enable or disable USB3 controller. / Включение или отключение USB 3.x контроллера (XHCI)",
          offset: "0x13E",
          options: [
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "XHCI3 enable (MCM1/Die1)",
          help: "Enable or disable USB3 controller. / Включение или отключение USB 3.x контроллера (XHCI)",
          offset: "0x13F",
          options: [
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x7055": {
      id: "0x7055",
      title: "XHCI Port 0 PHY Parameter Adjustment",
      items: [
        {
          type: "subtitle",
          prompt: "XHCI Port 0 PHY Parameter Adjustment",
        },
        {
          type: "oneof",
          prompt: "tx_vboost_lvl",
          help: "No help string / Уровень форсирования передатчика PHY-интерфейса (tx_vboost_lvl)",
          offset: "0x140",
          options: [
            {
              name: "3h",
              value: 3,
              isDefault: false,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
            {
              name: "5h",
              value: 5,
              isDefault: false,
            },
            {
              name: "2h",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "rx_eq",
          help: "No help string / Настройка эквалайзера приемника PHY (rx_eq)",
          offset: "0x141",
          options: [
            {
              name: "2h",
              value: 2,
              isDefault: false,
            },
            {
              name: "3h",
              value: 3,
              isDefault: true,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "los_bias",
          help: "No help string / Смещение детектора потери сигнала LOS (los_bias)",
          offset: "0x142",
          options: [
            {
              name: "1h",
              value: 1,
              isDefault: false,
            },
            {
              name: "2h",
              value: 2,
              isDefault: false,
            },
            {
              name: "3h",
              value: 3,
              isDefault: false,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
            {
              name: "5h",
              value: 5,
              isDefault: true,
            },
            {
              name: "6h",
              value: 6,
              isDefault: false,
            },
            {
              name: "7h",
              value: 7,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "pcs_tx_deemph_3p5db",
          help: "No help string / Уровень деакцента передатчика PCIe PCS на 3.5 дБ (pcs_tx_deemph_3p5db)",
          offset: "0x143",
        },
        {
          type: "numeric",
          prompt: "pcs_tx_deemph_6db",
          help: "No help string / Уровень деакцента передатчика PCIe PCS на 6.0 дБ (pcs_tx_deemph_6db)",
          offset: "0x144",
        },
        {
          type: "numeric",
          prompt: "pcs_tx_swing_full",
          help: "No help string / Амплитуда размаха сигнала (Swing) передатчика PCIe PCS (pcs_tx_swing_full)",
          offset: "0x145",
        },
      ],
    },
    "0x7056": {
      id: "0x7056",
      title: "XHCI Port 1 PHY Parameter Adjustment",
      items: [
        {
          type: "subtitle",
          prompt: "XHCI Port 1 PHY Parameter Adjustment",
        },
        {
          type: "oneof",
          prompt: "tx_vboost_lvl",
          help: "No help string / Уровень форсирования передатчика PHY-интерфейса (tx_vboost_lvl)",
          offset: "0x146",
          options: [
            {
              name: "3h",
              value: 3,
              isDefault: false,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
            {
              name: "5h",
              value: 5,
              isDefault: false,
            },
            {
              name: "2h",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "rx_eq",
          help: "No help string / Настройка эквалайзера приемника PHY (rx_eq)",
          offset: "0x147",
          options: [
            {
              name: "2h",
              value: 2,
              isDefault: false,
            },
            {
              name: "3h",
              value: 3,
              isDefault: true,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "los_bias",
          help: "No help string / Смещение детектора потери сигнала LOS (los_bias)",
          offset: "0x148",
          options: [
            {
              name: "1h",
              value: 1,
              isDefault: false,
            },
            {
              name: "2h",
              value: 2,
              isDefault: false,
            },
            {
              name: "3h",
              value: 3,
              isDefault: false,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
            {
              name: "5h",
              value: 5,
              isDefault: true,
            },
            {
              name: "6h",
              value: 6,
              isDefault: false,
            },
            {
              name: "7h",
              value: 7,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "pcs_tx_deemph_3p5db",
          help: "No help string / Уровень деакцента передатчика PCIe PCS на 3.5 дБ (pcs_tx_deemph_3p5db)",
          offset: "0x149",
        },
        {
          type: "numeric",
          prompt: "pcs_tx_deemph_6db",
          help: "No help string / Уровень деакцента передатчика PCIe PCS на 6.0 дБ (pcs_tx_deemph_6db)",
          offset: "0x14A",
        },
        {
          type: "numeric",
          prompt: "pcs_tx_swing_full",
          help: "No help string / Амплитуда размаха сигнала (Swing) передатчика PCIe PCS (pcs_tx_swing_full)",
          offset: "0x14B",
        },
      ],
    },
    "0x7057": {
      id: "0x7057",
      title: "XHCI Port 2 PHY Parameter Adjustment",
      items: [
        {
          type: "subtitle",
          prompt: "XHCI Port 2 PHY Parameter Adjustment",
        },
        {
          type: "oneof",
          prompt: "tx_vboost_lvl",
          help: "No help string / Уровень форсирования передатчика PHY-интерфейса (tx_vboost_lvl)",
          offset: "0x14C",
          options: [
            {
              name: "3h",
              value: 3,
              isDefault: false,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
            {
              name: "5h",
              value: 5,
              isDefault: false,
            },
            {
              name: "2h",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "rx_eq",
          help: "No help string / Настройка эквалайзера приемника PHY (rx_eq)",
          offset: "0x14D",
          options: [
            {
              name: "2h",
              value: 2,
              isDefault: false,
            },
            {
              name: "3h",
              value: 3,
              isDefault: true,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "los_bias",
          help: "No help string / Смещение детектора потери сигнала LOS (los_bias)",
          offset: "0x14E",
          options: [
            {
              name: "1h",
              value: 1,
              isDefault: false,
            },
            {
              name: "2h",
              value: 2,
              isDefault: false,
            },
            {
              name: "3h",
              value: 3,
              isDefault: false,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
            {
              name: "5h",
              value: 5,
              isDefault: true,
            },
            {
              name: "6h",
              value: 6,
              isDefault: false,
            },
            {
              name: "7h",
              value: 7,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "pcs_tx_deemph_3p5db",
          help: "No help string / Уровень деакцента передатчика PCIe PCS на 3.5 дБ (pcs_tx_deemph_3p5db)",
          offset: "0x14F",
        },
        {
          type: "numeric",
          prompt: "pcs_tx_deemph_6db",
          help: "No help string / Уровень деакцента передатчика PCIe PCS на 6.0 дБ (pcs_tx_deemph_6db)",
          offset: "0x150",
        },
        {
          type: "numeric",
          prompt: "pcs_tx_swing_full",
          help: "No help string / Амплитуда размаха сигнала (Swing) передатчика PCIe PCS (pcs_tx_swing_full)",
          offset: "0x151",
        },
      ],
    },
    "0x7058": {
      id: "0x7058",
      title: "XHCI Port 3 PHY Parameter Adjustment",
      items: [
        {
          type: "subtitle",
          prompt: "XHCI Port 3 PHY Parameter Adjustment",
        },
        {
          type: "oneof",
          prompt: "tx_vboost_lvl",
          help: "No help string / Уровень форсирования передатчика PHY-интерфейса (tx_vboost_lvl)",
          offset: "0x152",
          options: [
            {
              name: "3h",
              value: 3,
              isDefault: false,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
            {
              name: "5h",
              value: 5,
              isDefault: false,
            },
            {
              name: "2h",
              value: 2,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "rx_eq",
          help: "No help string / Настройка эквалайзера приемника PHY (rx_eq)",
          offset: "0x153",
          options: [
            {
              name: "2h",
              value: 2,
              isDefault: false,
            },
            {
              name: "3h",
              value: 3,
              isDefault: true,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "los_bias",
          help: "No help string / Смещение детектора потери сигнала LOS (los_bias)",
          offset: "0x154",
          options: [
            {
              name: "1h",
              value: 1,
              isDefault: false,
            },
            {
              name: "2h",
              value: 2,
              isDefault: false,
            },
            {
              name: "3h",
              value: 3,
              isDefault: false,
            },
            {
              name: "4h",
              value: 4,
              isDefault: false,
            },
            {
              name: "5h",
              value: 5,
              isDefault: true,
            },
            {
              name: "6h",
              value: 6,
              isDefault: false,
            },
            {
              name: "7h",
              value: 7,
              isDefault: false,
            },
          ],
        },
        {
          type: "numeric",
          prompt: "pcs_tx_deemph_3p5db",
          help: "No help string / Уровень деакцента передатчика PCIe PCS на 3.5 дБ (pcs_tx_deemph_3p5db)",
          offset: "0x155",
        },
        {
          type: "numeric",
          prompt: "pcs_tx_deemph_6db",
          help: "No help string / Уровень деакцента передатчика PCIe PCS на 6.0 дБ (pcs_tx_deemph_6db)",
          offset: "0x156",
        },
        {
          type: "numeric",
          prompt: "pcs_tx_swing_full",
          help: "No help string / Амплитуда размаха сигнала (Swing) передатчика PCIe PCS (pcs_tx_swing_full)",
          offset: "0x157",
        },
      ],
    },
    "0x704C": {
      id: "0x704C",
      title: "SD (Secure Digital) Options",
      items: [
        {
          type: "subtitle",
          prompt: "SD (Secure Digital) Options",
        },
        {
          type: "oneof",
          prompt: "SD Configuration Mode",
          help: "Select SD Mode / Выбор режима работы SD-кардридера",
          offset: "0x158",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: true,
            },
            {
              name: "Ver2.0",
              value: 1,
              isDefault: false,
            },
            {
              name: "SdDump",
              value: 6,
              isDefault: false,
            },
            {
              name: "Auto (Version 2.0 + Low Speed)",
              value: 15,
              isDefault: false,
            },
          ],
        },
      ],
    },
    "0x704D": {
      id: "0x704D",
      title: "Ac Power Loss Options",
      items: [
        {
          type: "subtitle",
          prompt: "Ac Power Loss Options",
        },
        {
          type: "oneof",
          prompt: "Ac Loss Control",
          help: "Select Ac Loss Control Method / Выбор режима поведения системы при восстановлении питания после его отключения",
          offset: "0x159",
          options: [
            {
              name: "Always Off",
              value: 0,
              isDefault: false,
            },
            {
              name: "Always On",
              value: 1,
              isDefault: false,
            },
            {
              name: "Reserved",
              value: 2,
              isDefault: true,
            },
            {
              name: "Previous",
              value: 3,
              isDefault: false,
            },
          ],
        },
      ],
    },
    "0x704E": {
      id: "0x704E",
      title: "I2C Configuration Options",
      items: [
        {
          type: "subtitle",
          prompt: "I2C Configuration Options",
        },
        {
          type: "oneof",
          prompt: "I2C 0 Enable",
          help: "No help string / Включить I2C контроллер 0",
          offset: "0x15A",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "I2C 1 Enable",
          help: "No help string / Включить I2C контроллер 1",
          offset: "0x15B",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "I2C 2 Enable",
          help: "No help string / Включить I2C контроллер 2",
          offset: "0x15C",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "I2C 3 Enable",
          help: "No help string / Включить I2C контроллер 3",
          offset: "0x15D",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "I2C 4 Enable",
          help: "No help string / Включить I2C контроллер 4",
          offset: "0x15E",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "I2C 5 Enable",
          help: "No help string / Включить I2C контроллер 5",
          offset: "0x15F",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x704F": {
      id: "0x704F",
      title: "Uart Configuration Options",
      items: [
        {
          type: "subtitle",
          prompt: "Uart Configuration Options",
        },
        {
          type: "oneof",
          prompt: "Uart 0 Enable",
          help: "Uart 0 has no HW FC if Uart 2 is enabled / UART 0 не будет иметь аппаратного управления потоком (HW FC), если включен UART 2",
          offset: "0x160",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Uart 0 Legacy Options",
          help: "No help string / Параметры совместимости UART 0 с устаревшими ОС",
          offset: "0x161",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: true,
            },
            {
              name: "0x2E8",
              value: 1,
              isDefault: false,
            },
            {
              name: "0x2F8",
              value: 2,
              isDefault: false,
            },
            {
              name: "0x3E8",
              value: 3,
              isDefault: false,
            },
            {
              name: "0x3F8",
              value: 4,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Uart 1 Enable",
          help: "Uart 1 has no HW FC if Uart 3 is enabled / UART 1 не будет иметь аппаратного управления потоком (HW FC), если включен UART 3",
          offset: "0x162",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Uart 1 Legacy Options",
          help: "No help string / Параметры совместимости UART 1 с устаревшими ОС",
          offset: "0x163",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: true,
            },
            {
              name: "0x2E8",
              value: 1,
              isDefault: false,
            },
            {
              name: "0x2F8",
              value: 2,
              isDefault: false,
            },
            {
              name: "0x3E8",
              value: 3,
              isDefault: false,
            },
            {
              name: "0x3F8",
              value: 4,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Uart 2 Enable (no HW FC)",
          help: "No help string / Включить UART 2 без аппаратного контроля потока",
          offset: "0x164",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Uart 2 Legacy Options",
          help: "No help string / Параметры совместимости UART 2 с устаревшими ОС",
          offset: "0x165",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: true,
            },
            {
              name: "0x2E8",
              value: 1,
              isDefault: false,
            },
            {
              name: "0x2F8",
              value: 2,
              isDefault: false,
            },
            {
              name: "0x3E8",
              value: 3,
              isDefault: false,
            },
            {
              name: "0x3F8",
              value: 4,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Uart 3 Enable (no HW FC)",
          help: "No help string / Включить UART 3 без аппаратного контроля потока",
          offset: "0x166",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Uart 3 Legacy Options",
          help: "No help string / Параметры совместимости UART 3 с устаревшими ОС",
          offset: "0x167",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: true,
            },
            {
              name: "0x2E8",
              value: 1,
              isDefault: false,
            },
            {
              name: "0x2F8",
              value: 2,
              isDefault: false,
            },
            {
              name: "0x3E8",
              value: 3,
              isDefault: false,
            },
            {
              name: "0x3F8",
              value: 4,
              isDefault: false,
            },
          ],
        },
      ],
    },
    "0x7050": {
      id: "0x7050",
      title: "ESPI Configuration Options",
      items: [
        {
          type: "subtitle",
          prompt: "ESPI Configuration Options",
        },
        {
          type: "oneof",
          prompt: "ESPI Enable",
          help: "No help string / Включить интерфейс eSPI (Enhanced Serial Peripheral Interface)",
          offset: "0x168",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x7051": {
      id: "0x7051",
      title: "XGBE Configuration Options",
      items: [
        {
          type: "subtitle",
          prompt: "XGBE Configuration Options",
        },
        {
          type: "oneof",
          prompt: "AMD XGBE Controller 0",
          help: "Enable or Disable Ethernet Controller 0 / Включение или отключение сетевого адаптера Ethernet 0",
          offset: "0x169",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "AMD XGBE Controller 1",
          help: "Enable or Disable Ethernet Controller 1 / Включение или отключение сетевого адаптера Ethernet 1",
          offset: "0x16A",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "AMD XGBE Controller 2",
          help: "Enable or Disable Ethernet Controller 2 / Включение или отключение сетевого адаптера Ethernet 2",
          offset: "0x16B",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "AMD XGBE Controller 3",
          help: "Enable or Disable Ethernet Controller 3 / Включение или отключение сетевого адаптера Ethernet 3",
          offset: "0x16C",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "AMD XGBE Controller 4",
          help: "Enable or Disable Ethernet Controller 4 / Включение или отключение сетевого адаптера Ethernet 4",
          offset: "0x16D",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "AMD XGBE Controller 5",
          help: "AMD XGBE Controller 5 / Сетевой Ethernet-адаптер AMD XGBE 5",
          offset: "0x16E",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "AMD XGBE Controller 6",
          help: "Enable or Disable Ethernet Controller 6 / Включение или отключение сетевого адаптера Ethernet 6",
          offset: "0x16F",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "AMD XGBE Controller 7",
          help: "Enable or Disable Ethernet Controller 7 / Включение или отключение сетевого адаптера Ethernet 7",
          offset: "0x170",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x7052": {
      id: "0x7052",
      title: "eMMC Options",
      items: [
        {
          type: "subtitle",
          prompt: "eMMC Options",
        },
        {
          type: "oneof",
          prompt: "eMMC/SD Configure",
          help: "No help string / Настройка интерфейса накопителей eMMC и карт SD",
          offset: "0x171",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "SD Normal Speed",
              value: 1,
              isDefault: false,
            },
            {
              name: "SD High Speed",
              value: 2,
              isDefault: false,
            },
            {
              name: "SD UHSI-SDR50",
              value: 3,
              isDefault: false,
            },
            {
              name: "SD UHSI-DDR50",
              value: 4,
              isDefault: false,
            },
            {
              name: "SD UHSI-SDR104",
              value: 5,
              isDefault: false,
            },
            {
              name: "eMMC Emmc Backward Compatibility",
              value: 6,
              isDefault: false,
            },
            {
              name: "eMMC High Speed SDR",
              value: 7,
              isDefault: false,
            },
            {
              name: "eMMC High Speed DDR",
              value: 8,
              isDefault: false,
            },
            {
              name: "eMMC HS200",
              value: 9,
              isDefault: false,
            },
            {
              name: "eMMC HS400",
              value: 10,
              isDefault: false,
            },
            {
              name: "eMMC HS300",
              value: 11,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Driver Type",
          help: "Bios will select MS driver for SD selections. / BIOS выберет драйвер Microsoft для поддержки SD-карт",
          offset: "0x172",
          options: [
            {
              name: "AMD eMMC Driver",
              value: 0,
              isDefault: false,
            },
            {
              name: "MS Driver",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "D3 Cold Support",
          help: "No help string / Поддержка глубокого энергосбережения D3 Cold для устройств",
          offset: "0x173",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "eMMC Boot",
          help: "No help string / Разрешить загрузку с eMMC-накопителя",
          offset: "0x174",
          options: [
            {
              name: "Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "Enabled",
              value: 1,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
      ],
    },
    "0x7007": {
      id: "0x7007",
      title: "NTB Common Options",
      items: [
        {
          type: "subtitle",
          prompt: "NTB Common Options",
        },
        {
          type: "oneof",
          prompt: "NTB Enable",
          help: "Enable NTB / Включить Non-Transparent Bridge (неблокирующий мост PCIe)",
          offset: "0x1AD",
          options: [
            {
              name: "Auto",
              value: 0,
              isDefault: true,
            },
            {
              name: "Enable",
              value: 1,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "NTB Location",
          help: "No help string / Физическое расположение неблокирующего моста PCIe NTB",
          offset: "0x1AE",
          options: [
            {
              name: "Auto",
              value: 255,
              isDefault: true,
            },
            {
              name: "Socket0-Die0",
              value: 0,
              isDefault: false,
            },
            {
              name: "Socket0-Die1",
              value: 1,
              isDefault: false,
            },
            {
              name: "Socket0-Die2",
              value: 2,
              isDefault: false,
            },
            {
              name: "Socket0-Die3",
              value: 3,
              isDefault: false,
            },
            {
              name: "Socket1-Die0",
              value: 4,
              isDefault: false,
            },
            {
              name: "Socket1-Die1",
              value: 5,
              isDefault: false,
            },
            {
              name: "Socket1-Die2",
              value: 6,
              isDefault: false,
            },
            {
              name: "Socket1-Die3",
              value: 7,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "NTB active on PCIeCore",
          help: "NTB enable on PCIe Core / Включение NTB на ядре PCIe",
          offset: "0x1AF",
          options: [
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
            {
              name: "Core0",
              value: 0,
              isDefault: false,
            },
            {
              name: "Core1",
              value: 16,
              isDefault: false,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "NTB Mode",
          help: "Select NTB Mode (Core 0, Port 0) / Выбор режима работы NTB (Non-Transparent Bridge) для PCIe (Ядро 0, Порт 0)",
          offset: "0x1B0",
          options: [
            {
              name: "NTB Disabled",
              value: 0,
              isDefault: false,
            },
            {
              name: "NTB Primary",
              value: 1,
              isDefault: false,
            },
            {
              name: "NTB Secondary",
              value: 2,
              isDefault: false,
            },
            {
              name: "NTB Random",
              value: 3,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
        {
          type: "oneof",
          prompt: "Link Speed",
          help: "Select Link Speed for NTB Mode (Core 0, Port 0) / Выбор скорости соединения для режима NTB (Ядро 0, Порт 0)",
          offset: "0x1B1",
          options: [
            {
              name: "Max Speed",
              value: 0,
              isDefault: false,
            },
            {
              name: "Gen 1",
              value: 1,
              isDefault: false,
            },
            {
              name: "Gen 2",
              value: 2,
              isDefault: false,
            },
            {
              name: "Gen 3",
              value: 3,
              isDefault: false,
            },
            {
              name: "Auto",
              value: 15,
              isDefault: true,
            },
          ],
        },
      ],
    },
  },
};
