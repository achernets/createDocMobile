namespace java core


typedef string ID
/** Дата в миллисекундах, начиная от 01.01.1970, -1 указывает что дата не установлена" */
typedef i64 kazDate
/** Значение токена сессии (идентификатора сессии), которое является набором байт и для удобства использования используется в виде строки в кодировке base64 */
typedef string AuthTokenBase64
/** Числовое значение, используется для определения количества записей */
typedef i64 count

/**Тип исполнителя */
enum UserOrGroupType {
  /** Пользователь */
  USER,
  /** Группа */
  GROUP,
  /** Внешний пользователь*/
  USER_GUEST,
  /** Процессная роль */
  PROCESS_ROLE
}

/** Групповой селектор */
enum GroupSelector {
  /** Вся группа */
  ALL,
  /** Минимально загруженный в группе */
  MAX_FREE,
  /** Кто был исполнителем в прошлый раз */
  LAST_EXEC,
  /** Любой из участников */
  ANY
}

/** Иерархический тип пользователя */
enum UserType {
  /** руководитель структурного подразделения */
  CHIEF,
  /** заместитель руководителя структурного подразделения */
  DEPUTY,
  /** сотрудник */
  EMPLOYEE,
  /** технический */
  TECHNICAL,
  /** системная запись */
  SYSTEM
}
/** Статус загрузки вложения */
enum AttachmentUploadStatus {
  /** Создана запись, нет данных */
  NONE,
  /** Частичная загрузка данных */
  PARTIAL,
  /** Файл загружен полностью */
  LOADED
}

/** Статус конвертации вложения (не влияет на подписание файла) */
enum AttachmentProcessingStatus {
  /** Начальный статус вложения, конвертация не запускается */
  NONE,
  /** Ожидает конвертацию(согласно настроек перехода между этапами + флага "Черновик") */
  PREPARED,
  /** Конвертируется... */
  PROCESSING,
  /** Сконвертирован успешно */
  PROCESSED,
  /** Сконвертирован с ошибкой */
  FAIL
  /** Статус меняется через API */
  MANUAL
}

/** Deprecated: Статус загрузки вложения */
enum AttachmentStatus {
  /** Создан */
  CREATED,
  /** Загружен */
  LOADED,
  /** Обработан */
  PROCESSED,
  /** Ожидает обработки после подписывания */
  REBUILD,
  /** Игнорирует обработку */
  IGNORE,
  /** Обработан с ошибкой */
  FAIL,
  /** В процессе обработки шедулером */
  PROCESSING,
  /** Старая удаленная версия вложения */
  DEPRECATED,
  /** Waiting for processing after publishing */
  PUBLISHED
}

/* Тип файла */
enum FileType{
  /** Картинка */
  PICTURE,// {READONLY}
  /** PDF */
  PDF,// {READONLY}
  /** Офисный */
  OFFICE,// {READONLY, REVIEW, EDIT}
  /** Другое */
  OTHER,// {NOPREVIEW}
}

/** Кто может редактировать вложение */
enum AttachmentEditMode{
  /** Только автор */
  SINGLE,
  /** Все участники */
  MULTIPLE,
  /** Никто */
  PUBLISHED,
}

/**Provider for sign needs*/
enum SignProviderType {
    UA_SIGN, 
    KAZ_SIGN
}

/** Требования к этапу шаблона документа*/
enum DocPatternStageRequirement {
  /* Необязательно */
  OPTIONAL,
  /** Обязательно требуется */
  REQUIRED,
  /** Обязательно не требуется */
  PROHIBITED
}

/** Структура пользователь или группа */
struct UserOrGroup {
  /** Тип */
  1: optional UserOrGroupType type;
  /** Идентификатор */
  2: optional ID userOrGroupId;
  /** Название группы */
  3: optional string nameGroup;
  /** Описание группы */
  4: optional string descriptionGroup;
  /** Имя */
  5: optional string userFirstName;
  /** Фамилия */
  6: optional string userLastName;
  /** Отчество */
  7: optional string userMiddleName;
  /**! Атрибуты для хранения дополнительной информации */
  8: optional map<string,string> attrs;
  /** Дата удаления */
  9: optional kazDate deleteDate;
  /** Ссылка на аватар */
  10: optional string avatarUrl;
  /** Дополнительный выбор из группы */
  11: optional GroupSelector groupSelector;
  /** Должность */
  12: optional string position;
  /** Количество людей в группе */
  13: i32 userCount;
  /** Email */
  14: optional string email;
  /** Рабочий телефон */
  15: optional string workPhone;
  /** Есть доступ к СЭД */
  16: bool haveAccess;
  /* Маска для грифа секретности */
  17: optional string scMask;
  /** Номер сотрудника */
  18: optional string employeeNumber
  /** список департаментов */
  19: optional list<Department> departments;
  /** Признак неизменяемости */
  20: bool fixed;
  /** Признак указывающий о неистекающем пароле */
  21: bool endlessPassword;
  /** Признак указывающий о смене пароля */
  22: bool needChangePassword;
  /** Аккаунт группы */
  23: optional string accountIdGroup;
  /** Тип пользователя */
  24: optional UserType userType;
  /** Идентификатор */
  25: optional ID id;
  /** LDAP ID */
  26: optional string ldapId;
  /** Компания */
  27: optional string company;
  /** Мобильный телефон */
  28: optional string mobilePhone;
  /** Признак указывающий о наличии пользователя в списке избранных */
  29: bool favorite;
  /** Примечание */
  30: optional string remark;
  /** Признак того что исполнителя нельзя изменить(фиксированный исполнитель этапа) */
  31: bool fixedExec;
  /** Идентификатор руководителя(альтернативный метод) */
  32: optional string chiefId;
  /** Название группы */
  33: optional map<string, string> nameGroupLoc;
  /** Описание группы */
  34: optional map<string, string> descriptionGroupLoc;
  /** Предпочитаемый язык */
  35: optional string preferredLang;
  /** Уникальный uuid */
  36: optional string uuid;
}

/* Организационная структура */
struct OrgStructure {
    /** Идетнификатор */
    1: optional ID id;
    /** Идентификатор группы аккаунтов */
    2: optional ID accountGroupId;
    /** Название */
    3: optional string name;
    /** порядок сортировки */
    4: optional i32 order;
    /** признак главной структуры */
    5: optional bool main;
}

/** Организационная структура */
struct Department {
  /** Идетнификатор */
  1: optional ID id;
  /** идентификатор родительского подразделения */
  2: optional ID parentId;
  /** название */
  3: optional string name;
  /** код */
  4: optional string orgStructureCode;
  /** идентификатор организационной структуры */
  5: optional ID orgStructureId;
  /** количество сотрудников */
  6: count userCount;
  /** полный путь к учреждению */
  7: optional string path;
  /** основной департамент */
  8: optional bool main;
  /** порядок сортировки */
  9: optional i32 order;
  /** уровень вложенности*/
  10: optional i32 rank;
  /** краткое название */
  11: optional string shortName
}

/** Тип решения (Надо переименовать)*/
enum DecisionType {
  /** Пусто */
  NULL,
  /** Согласен */
  YES,
  /** Не согласен */
  NO,
  /** Другое время */
  OTHER_TIME
}

/** Способ удаления сущности */
enum RemoveActionType {
  /** Связи игнорировать */
  IGNORE,
  /** Связи удалить */
  CASCADE
}

/** Композитный идентификатор */
struct CompositeId {
  /** Идентификатор */
  1: ID id;
  /** Версия */
  2: i32 version;
}

/* Поддерживаемый тип thrift транспорта */
enum ThriftTransportType {
  HTTP,
  SOCKET
}

/* Поддерживаемый тип thrift протокола */
enum ThriftProtocolType {
  JSON,
  BIN
}