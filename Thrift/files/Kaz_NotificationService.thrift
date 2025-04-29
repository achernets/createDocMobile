include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"

namespace java core


/** Тип назначения канала отправки нотификаций */
enum NotificationTransportDestinationType {
  NONE,
  MOBILE,
  WEB
}

/** Тип параметра */
enum AttributeParamType {
    /** Document */
    DOCUMENT,
    /** Document pattern stage */
    DOC_PAT_STAGE,
    /** Document execution */
    DOCUMENT_EXECUTION,
    /** Meeting */
    MEETING_DEPRACATED,
    /** Meeting participant */
    MEETING_PARTICIPANT_DEPRACATED,
    /** Attachment */
    ATTACHMENT,
    /** Client */
    CLIENT,
    /** String representation */
    STRING,
    /** Long representation */
    LONG,
    /** News */
    NEWS,
    /** Certificate */
    CERTIFICATE
}

/** Тип канала отправки нотификаций */
struct NotificationTransportType {
  /** Название ключа */
  1: optional string key;
  /** Строковое название конфига, в зависимости от локали пользователя */
  2: optional string caption;
  /** Тип назначения канала отправки нотификаций */
  3: optional set<NotificationTransportDestinationType> destination
}

/** Атрибуты уведомления */
struct NotificationAttribute {
  /** идентификатор */
  1: optional common.ID id;
  /** идентификатор уведомления */
  2: optional common.ID notificationId;
  /** ключ */
  3: optional string key;
  /** значение */
  4: optional string value;
  /** Тип параметра */
  5: optional AttributeParamType type;
}

/** Статус уведомления */
enum NotificationStatus {
  /** Создан */
  CREATED,
  /** В работе */
  IN_WORK,
  /** Успех */
  SUCCESS,
  /** Провал */
  FAIL,
  /**Отключено */
  IN_BLACKLIST,
  /** Документ удален */
  DOCUMENT_DELETED,
  /** Дубликат */
  DUPLICATE,
  /** В обработке */
  PROCESSING,
  /** Запрет отправки */
  IGNORE,
  /** Запрет по статусу */
  IGNORED_BY_SETTINGS;
}

/** Тип получателя уведомления */
enum RecipientTypeEnum {
    /* Meeting group */
    MEETING_AUTHOR,
    MEETING_PARTICIPANT,
    MEETING_SECRETARY,

    /* Document group */
    DOCUMENT_AUTHOR,
    DOCUMENT_PARTICIPANT,
    DOCUMENT_RESPONSIBLE,
    DOCUMENT_ASSIGNMENT,

    /* Password */
    PASSWORD_RECIPIENT,

    /* Other types */
    USER_DELEGATE,
    USER_IN_WHITE_LIST,
    UNSOLVED,
    /* For news needs*/
    USER_BY_MAIN_ACCOUNT,
    /* Certificate group */
    CERTIFICATE_RECIPIENT
}

/** User notification */
struct NotificationRecipient {
    /** Identifier */
    1: optional common.ID id;
    /** Created date */
    2: optional common.kazDate createDate;
    /** User */
    3: optional common.UserOrGroup recipient;
    /** Original user */
    5: optional common.UserOrGroup originalClient;
    /** Date processing */
    6: optional common.kazDate processedDate;
    /** Status of notification */
    7: optional NotificationStatus status;
    /** Flag to determine whether a message has been read */
    8: bool readed;
    /** Type of the recipient */
    9: optional RecipientTypeEnum type;
}

/** Уведомление */
struct NotificationQueue {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания уведомления */
  2: optional common.kazDate createDate;
  /** Тип уведомления */
  3: optional Kaz_types.NotificationType type;
  /** Атрибуты */
  4: optional list<NotificationAttribute> attributes;
  /** List of recipients */
  5: optional list<NotificationRecipient> recipients;
}

/** Настройки пользовательских уведомлений */
struct NotificationConfig {
  /** Название ключа */
  1: string key;
  /** Название отправляемого события в зависимости от локали */
  2: string caption;
  /** Разрешенные типы нотификаций*/
  3: map<string, bool> allowedForUser
  /** Настраиваемые типы нотификаций для пользователя*/
  4: map<string, bool> selectedForUser
  /** Настраиваемые типы нотификаций для делегата*/
  5: map<string, bool> selectedForDelegate
}

/** Сервис работы с уведомлениями */
service NotificationService {
  /** Получение списка уведомлений */
  list<NotificationQueue> getAllNotifications(1: common.AuthTokenBase64 token, 2: bool unreadOnly, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Отметить уведомление как обработанное/прочитанное */
  bool markNotificationAsRead(1: common.AuthTokenBase64 token, 2: common.ID notificationId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение всех типов нотификаций */
  list<NotificationTransportType> getAllNotificationTransportTypes(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение настроек рассылок
   * key - по ключу
  **/
  list<NotificationConfig> getNotificationConfig(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление настройки рассылок */
  list<NotificationConfig> updateNotificationConfig(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: list<NotificationConfig> notificationConfigs)  throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}