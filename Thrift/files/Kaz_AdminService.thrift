include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_AuthService.thrift"
include "Kaz_DocumentService.thrift"
include "Kaz_DocumentPatternService.thrift"
include "Kaz_NotificationService.thrift"

namespace java core


/** Статусы запланированных задач*/
enum JobTaskStatus {
  CREATE,
  IN_PROCESS,
  FAILED,
  SUCCESS,
  CANCEL
}

/** Типы запланированных задач*/
enum JobTaskType {
  HANDOVER,
  UPDATE_MASK_FOR_PATTERN,
  UPDATE_MASK_FOR_DOCUMENT,
  UPDATE_MASK_FOR_USER,
  UPDATE_MASK_FOR_GROUP,
  UPDATE_MASK_FOR_USERS_GROUP,
  ADD_SC_TO_USER_OR_GROUPS,
  UPDATE_DOC_ITEMS_SEARCH_VALUE,
  UPDATE_DOC_ADDITIONAL_FIELDS;
}

/** Запланированная задача*/
struct JobTask {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания */
  2: optional common.kazDate createDate;
  /** Дата обработки */
  3: optional common.kazDate processedDate;
  /** Статус */
  4: optional JobTaskStatus status;
  /** Тип */
  5: optional JobTaskType type;
  /** Ошибка выполнения */
  6: optional string taskError;
}

/** Внешний модуль */
struct ExternalModule {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания */
  2: optional common.kazDate createDate;
  /** URL */
  3: optional string url;
  /** Название */
  4: optional string nameExternalModule;
  /** Описание */
  5: optional string descriptionExternalModule;
  /** Пользователь, который связанный с внешним модулем */
  6: optional common.UserOrGroup user;
  /** Ошибка, мешающая нормальной работе модуля */
  7: optional string error;
  /** Аккаунты, для available pattern stages */
  9: optional list<Kaz_types.Account> accounts;
  /** Название */
  10: optional map<string, string> nameExternalModuleLoc;
  /** Описание */
  11: optional map<string, string> descriptionExternalModuleLoc;
  /** Тип транспорта передачи данных */
  12: optional common.ThriftTransportType transportType;
  /** Тип протокола передачи данных */
  13: optional common.ThriftProtocolType protocolType;
  /** список зарегистрированыъ этапов */
  14: optional list<Kaz_DocumentPatternService.AvailablePatternStage> availableStageList;
  /** список зарегистрированных динамических действий */
  15: optional list<Kaz_DocumentService.AvailableAction> availableActionList;
}

/** Структура Лицинзия */
struct License {
  /** Дата начала действия */
  1: common.kazDate validFrom;
  /** Дата окончания действия */
  2: common.kazDate validTo;
  /** Ключ */
  3: string key;
  /** Группа аккаунтов, в пределах которых лицензия может быть использована */
  4: optional Kaz_types.AccountGroup accountGroup;
  /** Аккаунт, в котором лицинзия может быть использована */
  5: optional Kaz_types.Account account;
  /** Пользователь которому лицензия назначена */
  6: common.UserOrGroup user;
  /** Флаг, разрешающий системе автовыдачу лицензии */
  7: bool autoAssignment;
  /** Флаг, разрешающий системе автовыдачу лицензии */
  8: i32 autoAssignmentOrder;
  /** Кол-во пользователей(для конкурентной лицензии) */
  9: i32 userCount;
  /** Флаг: персональная/конкурентная лицензия */
  10: optional bool personal;
  /** Кол-во доступных пользователей(для конкурентной лицензии) */
  11: i32 availableUserCount;
}

struct LicenseModule {
    1: common.ID id;
    /** Дата начала действия */
    2: common.kazDate validFrom;
    /** Дата окончания действия */
    3: common.kazDate validTo;
    /** Ключ */
    4: string key;
    /* Название модуля */
    5: string moduleName;
}

struct LicenseModulePage {
  /** История */
  1: list<LicenseModule> licenseList;
  /** Общее количество записей */
  2: common.count totalCount;
}

/** Словарь соответствия символов */
struct CharMatchingDictionary {
/** идентификатор */
  1: common.ID id;
  /** символ который заменить */
  2: string charSource;
  /** символ на который заменить */
  3: string charReplace;
}

/** Привязка пользователя к аккаунтам */
struct UserAcc {
  /** Пользователь */
  1: optional common.UserOrGroup userOrGroup;
  /** Список аккаунтов */
  2: optional list<Kaz_types.Account> acounts;
}

/** Расширенный пользователь */
struct UserExt {
  /** Пользователь */
  1: optional common.UserOrGroup userOrGroup;
  /** Логин */
  2: optional string login;
  /** Есть публичный ключ  */
  3: bool hasPublicKey;
  /** Список делегатов пользователя */
  4: optional list<common.UserOrGroup> delegates;
  /** Дата окончания лицензии */
  5: common.kazDate licenceEndDate;
}

/**Настройки передачи документов*/
struct CopyDocumentAccessSettingDetail {
    /**Группа документов*/
    1: optional Kaz_types.Account account;
    /**Группа документов*/
    2: optional Kaz_DocumentService.DocumentPatternGroup patternGroup;
    /**Тип документов*/
    3: optional Kaz_DocumentService.DocumentPattern pattern;
}

/**Настройки передачи документов*/
struct CopyDocumentAccessSettings{
    /**за все время*/
    1: optional bool forAllTime,
    /**за период - дата ОТ*/
    2: optional i64 dateStart,
    /**за период - дата ДО*/
    3: optional i64 dateEnd,
    4: list<CopyDocumentAccessSettingDetail> details;
}

/**Настройки передачи дел от пользователя к пользователю*/
struct CopyPersonalAccessSettings{
    /**Передать аккаунты */
    1: bool accounts,
    /**Передать роли */
    2: bool roles,
    /**Передать группы */
    3: bool groups,
    /**Передать грифы секретности */
    4: bool securityClassifications,
    /**Настройки передачи документов */
    5: optional CopyDocumentAccessSettings documentPeriod,
    /**Заменить в БПМ */
    7: bool bpm
    /**Блокировать пользователя */
    8: bool blockUser,
    /**Удалить пользователя */
    9: bool deleteUser,
    /**Отсоединить лицензию */
    10: bool detachLicense,
    /**Причина удаления пользователя*/
    11: optional string reasonForRemoval,
    /**Пользователь получающий доступ*/
    12: optional string userIdTo,
    /**Пользователь передающий доступ*/
    13: optional string userIdFrom,
    /** Заменить пользователя в поле Выбор пользователя */
    14: bool changeInUserChooser,
    /** Сохранить доступ к документов после передачи */
    15: bool saveAccessToDocuments,
    /** Дата окончания доступа */
    16: optional i64 accessDateTo
}

struct UserOptions {
    /** Аккаунт пользователей  */
    1: common.ID accountId;
    /** Создавать и обновлять пользователей */
    2: bool createOrUpdate;
    /** createOrUpdate = false: запретить вход в систему переданным
      * createOrUpdate = true: запретить вход в систему остальным
    **/
    3: bool disable;
    /** менять версию пользователей (например при смене фамилии) */
    4: bool changeVersion;
    /** при создании, отправлять ли почту на смену пароля */
    5: bool sendEmail;
}

/** Сервис для выполнения административных операций */
service AdminService {
  list<Kaz_types.AvailableFileStorage> getAvailableFileStorageList(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание/изменение файлового хранилища */
  Kaz_types.FileStorage createOrUpdateFileStorage(1: common.AuthTokenBase64 token, 2: Kaz_types.FileStorage fileStorage, 3:list<Kaz_types.Account> accountsToAdd, 4:list<Kaz_types.Account> accountsToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка дисковых хранилищ
  * accountGroupId - по группе аккаунтов
  * accountId - по аккаунту
  * type - по типу
  * description - по названию
  **/
  list<Kaz_types.FileStorage> getAllFileStorages(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение количества дисковых хранилищ */
  i32 getCountAllFileStorages(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление файлового хранилища */
  bool removeFileStorages(1: common.AuthTokenBase64 token, 2: list<common.ID> fileStorageIds) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Перемещение вложения в новое хранилище */
  bool moveAttachment(1: common.AuthTokenBase64 token, 2: common.ID docId, 3: common.ID fileStorageId, 4: bool onlyLatest) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание/изменение новости */
  Kaz_types.News createOrUpdateNews(1: common.AuthTokenBase64 token, 2:Kaz_types.News news, 3: set<common.ID> accountIDsToAdd, 4: set<common.ID> accountIDsToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление новости */
  bool removeNews(1: common.AuthTokenBase64 token, 2:common.ID newsId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Получение списка внешних модулей */
  list<ExternalModule> getAllExternalModules(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Получение количества внешних модулей */
  i32 getCountAllExternalModules(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Получение деталей внешнего модуля */
  ExternalModule getExternalModuleById(1: common.AuthTokenBase64 token, 2: common.ID extModuleId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Создание/изменение внешнего модуля */
  ExternalModule createOrUpdateExternalModule(1: common.AuthTokenBase64 token, 2:ExternalModule externalModule, 3:string userLoginForNewRegistration, 4: string secretKey, 5: set<common.ID> addAccountIds, 6: set<common.ID> deleteAccountIds) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Обновление внешнего модуля */
  ExternalModule refreshExternalModule(1: common.AuthTokenBase64 token, 2: common.ID extModuleId, 3: bool removeDeletedStages) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Удаление внешнего модуля */
  bool removeExternalModule(1: common.AuthTokenBase64 token, 2: common.ID extModuleId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Пинг внешнего модуля */
  bool pingExternalModule(1: common.AuthTokenBase64 token, 2: common.ID extModuleId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Понг внешнего модуля */
  bool pongExternalModule(1: common.AuthTokenBase64 token, 2: string extModuleCheckValue) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка всех вложений.
   * Есть возможность фильтровать по:
   *  - пользователю (fieldname: "creatorId", fType: STRING, fieldCondition: EQUAL)
   *  - документу (fieldname: "documentId", fType: STRING, fieldCondition: EQUAL) */
  list<Kaz_DocumentService.Attachment> getAllDocumentAttachments(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка этапов слепка */
  list<Kaz_DocumentService.DocumentPatternStage> getAllFilledDocumentPatternStages(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Сбросить ошибки, для документов которые не смогли перейти на следующий этап */
  i32 resetDocumentForceMoveError(1: common.AuthTokenBase64 token, 2: common.ID documentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Возможность администратору заменять исполнителей для паттерна */
  bool changeExecutorForPatternStages(1: common.AuthTokenBase64 token, 2: list<common.ID> patternIds, 3: common.UserOrGroup userOrGroup, 4: list<common.UserOrGroup> usersOrGroups) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Установить/заменить пользовательский публичный ключ */
  common.ID setUserPublicKey(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: string publicKey) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удалить пользовательский публичный ключ */
  bool removeUserPublicKey(1: common.AuthTokenBase64 token, 2: common.ID keyId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

/**
 *  с фильтром accountId возвращает только тех пользователей, которые прикреплены к аккаунту, без фильтра - абсолютно всех
 *  accountId - по идутнификатору аккаунта
 *  userId - по идентификатору пользователя
 **/
  list<UserAcc> getAllUsersRelativeToAccount(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** количество пользователей, прикрепленных к аккаунту*/
  i32 getCountAllUsersRelativeToAccount(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение привязки пользователя и аккаунтов*/
  bool changeUserAccounts(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: set<common.ID> accountIdsToAdd, 4: set<common.ID> accountIdsToRemove, 5: common.ID accountMainId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Принудительный запуск шедулера
        convertAttachments
        forceStartMoveDocumentNextStage
        notification
        periodCard
        periodicalEnable
        startArchiveDocuments
        securityClassificationDeclassification
        documetJobTask
        checkNotifPeriodicalRemember
        jobTask
        archiveMechanism
**/
  bool runScheduler(1: common.AuthTokenBase64 token, 2: string oName, 3: bool wait) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Загрузка ключа шифрования */
  bool changeEncryptKey(1: common.AuthTokenBase64 token, 2: string key, 3:common.ID accountId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка расширенных пользователей
   * licenceDateTo - по дате окончания лицензии
   * type - по типу(NORMAL,EXT_MODULE,IMPORTED)
 **/
  list<UserExt> getAllUsersExt(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение количества расширенных пользователей */
  i32 getCountAllUsersExt(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка уведомлений */
  list<Kaz_NotificationService.NotificationQueue> getAllUserNotifications(1: common.AuthTokenBase64 token, 2:common.ID userId, 3: bool unreadOnly, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Get all notification by filter */
  list<Kaz_NotificationService.NotificationQueue> getAllNotifications(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Перемещение документа на любой этап */
  bool moveDocumentOnOtherPatternStage(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: common.ID stageId, 4: bool resetMoveError) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Повторная отправка документа во внешний модуль */
  bool resendDocumentToExternalModule(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:Kaz_DocumentService.DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка сессий
  * Есть возможность фильтровать по:
    *  - пользователю (fieldname: "clientId", fType: STRING, fieldCondition: EQUAL)
    *  - дате начала (fieldname: "startDate", fType: DATE, fieldCondition: EQUAL)
    *  - дате окончания (fieldname: "expireDate", fType: DATE, fieldCondition: EQUAL)
    *  - активности (fieldname: "isClosed", fType: BOOLEAN, fieldCondition: EQUAL)
    *  - устройству (fieldname: "deviceId", fType: STRING, fieldCondition: EQUAL)
    *  - типу устройства: deviceType
  **/
  list<Kaz_AuthService.AuthSession> getAllSessions(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение количества сессий */
  i32 getCountAllSessions(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Принять или нет ключ пользователя */
  bool confirmUserPublicKey(1: common.AuthTokenBase64 token, 2: common.ID id, 3: bool confirm) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Закрытие сессии пользователя */
  bool closeSession(1: common.AuthTokenBase64 token, 2: common.ID sessionId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Метод передачи дел другому пользователю */
  bool copyPersonalAccess(1: common.AuthTokenBase64 token, 2: CopyPersonalAccessSettings copyPersonalAccessSettings) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка лицензий
   * accountGroupId
   * accountId
  **/
  list<License> getAllLicenses(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Количество для метода getAllLicenses */
  i32 getCountAllLicenses(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Загрузка лицензий на сервер */
  list<License> uploadLicenses(1: common.AuthTokenBase64 token, 2: binary fileContentBytes, 3:Kaz_types.AccountGroup accountGroup, 4:Kaz_types.Account account, 5:bool autoAssignment, 6:i32 autoAssignmentOrder) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление лицензий с сервера */
  bool removeLicenses(1: common.AuthTokenBase64 token, 2: list<string> lkeys) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение данных лицензии */
  License updateLicense(1: common.AuthTokenBase64 token, 2:License license) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Открепления лицензии от пользователя и закрытие сессий */
  bool releaseLicence(1:common.AuthTokenBase64 token, 2:common.ID userId, 3:bool cancelAutoAssignment) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка лицензий для модулей */
  LicenseModulePage getLicenseModulePage(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Загрузка лицензий для модулей  */
  LicenseModule uploadLicenseModule(1: common.AuthTokenBase64 token, 2: binary fileContentBytes) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление лицензий для модулей */
  bool removeLicenseModule(1: common.AuthTokenBase64 token, 2: common.ID id) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Создание словаря соответствия символов*/
  CharMatchingDictionary createOrUpdate(1: common.AuthTokenBase64 token, 2: CharMatchingDictionary dictionary) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Получение словаря соответствий символов*/
  list<CharMatchingDictionary> getAllCharMatchingDictionaries(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Удаление словаря соответствий символов*/
  bool deleteCharMatchingDictionary(1: common.AuthTokenBase64 token, 2: common.ID dictionary) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить файл переводов для выбранного языка */
  binary getTranslations(1: common.AuthTokenBase64 token, 2: string langCode) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Загрузить файл переводов для выбранного языка */
  bool setTranslations(1: common.AuthTokenBase64 token, 2: string langCode, 3: binary langFile) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Скачать файл логов DROOL по документу */
  binary getDroolLogFile(1: common.AuthTokenBase64 token, 2:common.ID docId, 3: Kaz_DocumentService.DocumentAccessPolicy policy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Шифрование строки */
  string cryptValue(1: common.AuthTokenBase64 token, 2: string value) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение всех запланированных задач
  * Есть возможность фильтровать по:
    *  - createDate - Дата создания;
    *  - processedDate - Дата обработки;
    *  - status - Статус;
    *  - type - Тип;
  **/
  list<JobTask> getAllJobTasks(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение количества всех запланированных задач*/
  i32 getCountAllJobTasks(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Удаление запланированной задачи*/
  bool deleteJobTask(1: common.AuthTokenBase64 token, 2: common.ID jobTaskId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Переконвертация вложения */
  bool rebuildAttachment(1: common.AuthTokenBase64 token, 2: common.ID attachmentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Метод на получение списка доп полей для карточки пользователя */
  list<Kaz_DocumentService.ContentItem> getAllUserContentItems(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Метод на изменение списка доп полей для карточки пользователя */
  list<Kaz_DocumentService.ContentItem> changeUserContentItems(1: common.AuthTokenBase64 token, 2: list<Kaz_DocumentService.ContentItem> contentItems) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Получение списка "Холдеров" пользовательских полей */
  list<Kaz_DocumentService.ContentHolder> getAllUserContentHolders(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Изменение "Холдеров" пользовательских полей */
  list<Kaz_DocumentService.ContentHolder> changeUserContentHolders(1: string token, 2: list<Kaz_DocumentService.ContentHolder> toUpdate, 3: list<string> toRemoveIds) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление лицензий с сервера
  * accountGroupId - required
  * dateFrom, dateTo для Дата до
  **/
  bool removeLicensesEx(1: common.AuthTokenBase64 token, 2: common.ID accountGroupId, 3: common.ID accountId, 4: common.kazDate dateFrom, 5: common.kazDate dateTo) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение данных лицензии для пользователя */
  License getLicenseForUser(1: common.AuthTokenBase64 token, 2: common.ID userId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка ролей по лицензии */
  set<string> getAllowedRolesForLicense(1: common.AuthTokenBase64 token, 2: common.ID licenseKey) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Назначить лицензию пользователю */
  License assignLicenseToUser(1: common.AuthTokenBase64 token, 2: common.ID licenseKey, 3: common.ID userId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Выполнение запроса с выводом статистики */
  map<string, string> executeCustomQuery(1: common.AuthTokenBase64 token, 2: string query) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /*** !! UserOrGroup.uuid = login  */
  list<string> createOrUpdateUsers(1: common.AuthTokenBase64 token, 2: list<common.UserOrGroup> users, 3: UserOptions options) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}
