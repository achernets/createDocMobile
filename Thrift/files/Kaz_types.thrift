include "common.thrift"
include "HB.thrift"
include "ex.thrift"

namespace java core


/** Ключи настроек аккаунтов */
enum AccountDefineConf {
  /** группа по ВСЕ */
  GROUP_ALL,
  /** справочник по умолчанию */
  DECISION_DICT,
  /** А4 контент по умолчанию */
  A4_TEMPLATE_DICT
}

/** Аккаунт */
struct Account {
  /** Идентификатор аккаунта */
  1: optional common.ID id;
  /** Дата создания аккаунта */
  2: optional common.kazDate createDate;
  /** Название аккаунта */
  3: optional string accountName;
  /** основной аккаунт */
  4: bool main;
  /** признак секретности аккаунта */
  5: bool confidential;
  /** признак зашифрованности аккаунта в данный момент */
  6: bool encrypted;
  /** настройки аккаунта */
  7: optional map<AccountDefineConf, common.ID> accountCof;
  /** All file storages */
  8: optional list<FileStorage> storages;
  /** идентификатор группы */
  9: optional common.ID accountGroupId;
  /** Порядковый номер аккаунта */
  10: i32 orderNum;
  /** Признак внешнего модуля, только чтение */
  11: optional string extType;
  /** идентификатор сервиса авторизации */
  12: optional string authServiceId;
  /** Название аккаунта */
  13: optional map<string,string> accountNameLoc;
}

/** Группа аккаунтов */
struct AccountGroup {
  /** идентификатор */
  1: optional common.ID id;
  /** название */
  2: string oName;
  /** список аккаунтов */
  3: optional list<Account> accounts;
  /** признак заблокирован или нет */
  4: bool blocked;
  /** можно просматривать все аккауты группы или нет */
  5: bool visibleAllAccounts;
}

/** Вид отчета */
enum ReportType {
  HTML,
  PDF,
  XLSX,
  DOCX
}

/** Тип использования отчета */
enum ReportTemplateType{
  /** Общий */
  COMMON,
  /** Прикрепленный к паттерну */
  PATTERN
}

/** Параметры шаблона отчета */
struct ReportParams {
    1: optional common.ID id;
   /** Уникальный ключ */
    2: optional string key;
    /** Данные шаблона */
    3: optional string value;
    /** Тип */
    4: i32 type;
    /** Флаг обязательности заполнения */
    5: bool requared;
    /** Название */
    6: optional string oName;
    /** идентификатор справочника */
    7: optional HB.HandBook handbook;
    8: optional string handbookLookupCol;
    9: optional string handbookSelectColumn;
    10: optional HB.HBRow row;
    11: optional common.UserOrGroup user;
    12: optional common.Department department;
    /** Название на разных языках */
    13: optional map<string, string> oNameLoc;
}

/** Шаблон отчета */
struct ReportTemplate {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания */
  2: optional common.kazDate createDate;
  /** Название */
  3: optional string reportName;
  /** Признак быстрой печати отчета, при этом параметры отчета запрещены! */
  4: optional bool fastPrint;
  /** Счетчик сколько раз вызывался отчет */
  5: common.count reportCount;
  /** Параметры */
  6: optional list<ReportParams> adParams;
  /** Группа */
  7: optional string group;
  /** Тип использования отчета */
  8: optional ReportTemplateType reportType;
  /** Аккаунты в которых отчет генерируется */
  9: optional set<common.ID> accountIds;
  /** Список разрешенных форматов отчета */
  10: set<ReportType> reportTypes;
  /** Добавить водяной знак */
  11: optional bool addWatermark;
  /** Описание, переводы на зарегистрированные языки*/
  12: optional map<string, string> reportNameLoc;
  /** Категория, переводы на зарегистрированные языки*/
  13: optional map<string, string> groupLoc;
  14: optional bool viaHtml;
}

/** Гриф секретности */
struct SecurityClassification {
  1: optional common.ID id;
  /** название */
  2: optional string gname;
  /** описание */
  3: optional string scDescription;
  /** группа */
  4: optional string group;
  /** флаг, разрешающий ознакамливать с документом */
  5: bool share;
  /** маска */
  6: optional string scMask;
}

/** Новость */
struct News {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания */
  2: optional common.kazDate createDate;
  /** Название */
  3: optional string theNewsName;
  /** Описание */
  4: optional string theNewsDescription;
  /** Список аккаунтов, к которым прикреплена новость */
  5: optional set<common.ID> accountIds;
  /** Ссылка предварительного просмотра */
  6: optional string previewUrl;
  /** Список ссылок ресурсов  */
  7: optional list<string> urls;
}

/** Тип файлового хранилища */
enum FileStorageType {
  /** главный */
  PRIMARY,
  /** архивный */
  ARCHIVE
}

struct AvailableFileStorageParam {
  1: string key;
  2: string name;
  3: string value;
}

struct AvailableFileStorage {
  1: string key;
  2: string name;
  3: optional binary settingsFile;
  4: list<AvailableFileStorageParam> params;
}

/** Файловое хранилище документов */
struct FileStorage {
  /** Идентификатор */
  1: optional common.ID id;
  /** URI к хранилищу */
  2: optional string uri;
  /** Дата создания */
  3: optional common.kazDate createDate;
  /** Тип файлового хранилища */
  4: optional FileStorageType type;
  /** Приоритет */
  5: i32 priority;
  /** Разрешение на чтение/запись или только на чтение */
  6: bool readOnly;
  /** Описание */
  7: optional string descriptionFileStorage;
  /**Емкость*/
  8: i64 capacity;
  /**Доступный объем*/
  9: i64 freeSpace;
  /** Признак, указывающий на разрешение редактирования хранилища */
  11: bool allowEdit;
  /** Прикрепленные аккаунты */
  12: list<Account> accountList;
  /** Тип хранилища по способу хранения и настройки */
  13: AvailableFileStorage availableFileStorage;
}

/** Тип уведомления */
enum NotificationType {
  /** Совещание создано */
  MEETING_CREATE,
  /** Совещание изменено */
  MEETING_UPDATE,
  /** Совещание отменено */
  MEETING_CANCEL,
  /** Встреча перенесена */
  MEETING_SUGGESTION_OTHER_TIME,
  /** Приглашение на совещание секретарям */
  MEETING_INVITATION_SECRETARY,
  /** Начало этапа "Голосование за повестку" */
  MEETING_MOVE_TO_PRE_VOTE,
  MEETING_MOVE_TO_PREPARE,
  MEETING_MOVE_TO_VOTE,

  DOCUMENT_MOVE_TO_NEXT_STAGE,
  DOCUMENT_REASSIGN,
  DOCUMENT_REASSIGN_WITH_CONTROL,
  DOCUMENT_REGISTERED,
  /** Execution card was closed automatically  */
  DOCUMENT_EXECUTION_CARD_AUTO_CLOSED,
  DOCUMENT_DECISION,
  DOCUMENT_ADDITIONAL_DECISION,
  /** Added additional decision executors */
  DOCUMENT_ADD_ADDITIONAL_CONFIRMER,
  DOCUMENT_ADD_ANSWERERS,
  DOCUMENT_ANSWER_TO_QUESTION,
  DOCUMENT_EXECUTION_CARD_CLOSED,
  DOCUMENT_ON_CONTROL_RETURNED,
  DOCUMENT_EXECUTION_DELETED,
  DOCUMENT_DEADLINE_OVERDUE,
  DOCUMENT_EXPIRED,
  DOCUMENT_FAMILIARIZATION,
  DOCUMENT_ATTACHMENT_LOADED,
  REASSIGN_DOCUMENT_EXECUTION_CARD_CLOSED,
  REASSIGN_DOCUMENT_EXECUTION_CARD_REVOKED,
  DOCUMENT_DEADLINE_ONCOMING,
  DOCUMENT_PERIODICAL_REMINDER,
  DOCUMENT_EXECUTOR_REMINDER,
  DOCUMENT_REASSIGN_DEADLINE_ONCOMING,

  /* Password group */
  RESET_PASSWORD,
  RECOVERY_PASSWORD,
  SET_PASSWORD_FOR_NEW_USER,
  REGISTRATION_LDAP_USER,
  AUTHENTICATE,

  EVENT_CREATE,
  /** Встреча изменена */
  EVENT_UPDATE,
  /** Встреча отменена */
  EVENT_CANCEL,

  NEWS_CREATE,

  /* Certificate group */
  COMING_USER_CERTIFICATE_DEADLINE,
  USER_CERTIFICATE_DEADLINE,
  USER_CERTIFICATE_DELETED,
  CERTIFICATE_APPROVED,
  CERTIFICATE_DECLINED,

  AUTHOR_ANSWER_COMMENT,

  KNOWLEDGE_DOCUMENT_BIND,
  /** Обновлен документ в базе знаний*/
  KNOWLEDGE_DOCUMENT_UPDATE,
  KNOWLEDGE_TREE_VISIBLE,
  VOTE_STARTED,
  VOTE_USERS_ANSWERED,
  VOTE_APPROVAL,

  STOP_CONTROL_INCOMPLITE
}

/** Статус публичного ключа */
enum KeyState {
  /** загружен */
  LOADED,
  /** подтвержден */
  CONFIRM,
  /** не подтвержден*/
  PROHIBITED
  /** нет фыйла*/
  NO_FILE,
  /** без описания */
  DELETED
}

/** Информация о сертификате */
struct CertificateInfo
{
  1: optional string serialNumber;
  2: optional string legalNumber;
  3: optional string individualNumber;
  4: optional string issuerDN;
  5: optional string subjectDN;
  6: optional common.kazDate signDate;
  7: optional common.kazDate beforeDate;
  8: optional common.kazDate afterDate;
  9: optional string signature;
  10: optional string email;
  11: optional string organization;
  12: optional string fullName;
  13: optional string base64PublicKey;
  14: optional KeyState keyState;
  15: optional list<string> keyUsage;
}

/** Функции для поиска по содержимому документа */
enum SearchType {
    /** вхождение строки */
    S_LIKE,
    /** неполное вхождение строки */
    S_LIKE_SEMANTIC,
    /** вся строка */
    S_ALL,
    /** неполная вся строка */
    S_ALL_SEMANTIC,
    /** любое слово */
    S_ANY,
    /** неполное совпадение по любому слову */
    S_ANY_SEMANTIC
}

/** Тип действия при изменении исполнителей */
enum ExecutorActionType {
  /** добавить */
    ADD,
    /** удалить */
    DELETE
}

/** Описание ключа для подписи */
struct SignKeyInfo {
  /* Идентификатор в защищенном хранилище */
  1: optional common.ID keyId;
  /* Base64 от ключа, должен быть защифрован, согласно параметру SERVER_PUBLIC_RSA_KEY */
  2: optional string key;
  /* Расширение приватного ключа */
  3: optional string fileExt;
  /* Пароль от приватного ключа, должен быть защифрован, согласно параметру SERVER_PUBLIC_RSA_KEY */
  4: optional string password;
  /* Ключ сервиса внешнего подписания */
  5: optional string remoteServiceKey;
  /* Логин/идентификатор пользователя во внешней системе */
  6: optional string userIdentifier;
}

/** Данные для подписи */
struct SignData {
  /* Идентификатор вложения для подписи */
  1: optional common.ID attachmentIdIn;
  /* Строка для подписания */
  2: optional string stringIn;
  /* Строка для подписания в Base64 стандарте */
  3: optional string stringBase64In;
  /* Hash строка от данных */
  6: optional string digitHashOut;
  /* Сигнатура(при подписании вложения, возвращается конверт без данных, при подписании строки, возвращается конверт с данными */
  9: optional string signatureOut;
  /* Ошибка, возникшая при подписании или проверке доступа */
  10: optional ex.PreconditionException errorOut;
  /* Название действия (для отображения на сторонних сервисах подписи, напр. eGov Mobile) */
  11: optional string actionName;
}

/** Тип сортировки */
enum SortDirection {
  /** в порядке возрастания */
  ASC,
  /** в порядке убывания */
  DESC
}

/** Тип колонки */
enum DocColumnType {
  TEXT,
  NUMBER,
}

struct DocColumn {
  /** идентификатор */
  1: optional common.ID id;
  /** поле */
  2: optional string field;
  /** название */
  3: optional string displayName;
  /** название */
  4: optional map<string, string> displayNameLoc;
  /** разрешена сортировка */
  5: bool enableSorting;
  /** видимость колонки */
  6: bool visible;
  /** ширина колонки */
  7: optional string width;
  /** цвет текста */
  8: optional string color;
  /** порядковый номер */
  9: i32 columnOrder;
  /** по умолчанию */
  10: bool isDefault;

  /** применить для всех шаблонов */
  11: bool allowForAnyPattern;
  /** для каких шаблонов применима колонка */
  12: optional list<common.ID> allowedPatternIds;
  /** порядок сортировки */
  13: optional SortDirection sortDirection;
  /** тип колонки */
  14: optional DocColumnType docColType;
}

enum PDFPostDecoratorType {
  DECORATOR,
  WATERMARK
}

/**Разделитель вложений в документе на типы*/
enum AttachmentExtStatus {
  PRIMARY,
  SECONDARY,
  CARD,
  CONTENT,
  REPORT
}

struct PDFPostDecorator {
  1: common.ID id;
  2: string key;
  3: bool enabled;
  4: PDFPostDecoratorType postDecoratorType;
  5: string postProcessorName;
  6: bool useByDefault;
  7: bool useInEmptyPrint;
  8: optional map<string, string> postProcessorNameLoc;
  9: optional set<AttachmentExtStatus> attachmentExtStatuses;
}

struct PDFPostDecoratorPage {
  1: list<PDFPostDecorator> postProcessorList;
  /** Общее количество записей */
  2: common.count totalCount;
}