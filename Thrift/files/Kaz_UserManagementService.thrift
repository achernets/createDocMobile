include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_DocumentService.thrift"

namespace java core


/** Принадлежность грифов к пользователю/группе */
struct RoleScHelper {
  /** Идентификатор */
  1: optional common.ID id;
  /** Гриф дана лично или через участие в группе */
  2: bool himself;
  /** Список групп, что дали роль пользователю*/
  3: optional list<common.UserOrGroup> usersOrGrous;
}

/** Пользовательский сертификат */
struct UserKeyData {
  /** идентификатор */
  1: optional common.ID id;
  /* пользователь */
  2: optional common.UserOrGroup user;
  /** администратор */
  3: optional common.UserOrGroup admin;
  /** дата загрузки с систему */
  4: optional common.kazDate createDate;
  /** дата подтверждения */
  5: optional common.kazDate confirmDate;
  /** статус */
  6: optional Kaz_types.KeyState keyState;
  /** детальная информация о сертификате */
  7: optional Kaz_types.CertificateInfo certificateInfo;
  8: optional common.kazDate deleteDate;
}

/** Детальная информация о делегировании */
struct ClientDelegateDetails {
  /** идентификатор */
  1: optional common.ID id;
  /** дата начала действия делегирования */
  2: common.kazDate dateStart;
  /** дата окончания действия делегирования */
  3: common.kazDate dateEnd;
  /** аккаунт */
  4: optional Kaz_types.Account account;
  /** Группа документов */
  5: optional Kaz_DocumentService.DocumentPatternGroup docPatternGroup,
  /** Тип документов */
  6: optional Kaz_DocumentService.DocumentPattern docPattern
  /** Типы действий */
  7: set<Kaz_DocumentService.DocPatternStageActionType> actionTypes;
  /** С какой даты создания/регистрации выводить документы для замещающего */
  8: optional common.kazDate documentDateFrom;
  /** По какую дату создания/регистрации выводить документы для замещающего */
  9: optional common.kazDate documentDateTo;
  /** Не отправлять Email уведомления по документам пользователю, который делегировал свои полномочия */
  10: bool notNotifyOriginalUserByEmail;
  /** идентификатор информации о делегировании*/
  11: optional common.ID clientDelegateInfoId;
}

/** Информация о делегировании */
struct ClientDelegateInfo {
  /** идентификатор */
  1: optional common.ID id;
  /** идентификатор руководителя */
  2: optional common.UserOrGroup fromUserId;
  /** идентификатор подчиненного */
  3: optional common.UserOrGroup toUserId;
  /** Количество рабочих правил делегирования на текущий момент времени */
  4: i32 actualDelegatesCount;
  /** Количество будущих правил делегирования (еще не наступило время начала) */
  5: i32 futureDelegatesCount;
  /** Передати роли */
  6: bool delegateRoles;
  /** Передати грифы секретности */
  7: bool delegateSC;
  /** Передати Реестры */
  8: bool delegateRegistry;
}

struct UserPreferences {
    1: common.ID userId;
    2: bool attachDocs;
    3: bool attachRegistry;
    /* Отображение списка документов базы знаний в виде "Плитка" */
    4: bool knlgBaseBarView;
}

enum ChiefLevel {
  DIRECT_CHIEF,
  TOP_CHIEF,
  ALL_HIERARCHY
}

enum OTPConfig {
  NONE,
  WEB,
  MOBILE,
  ALL,
  AUTO
}

/** Расширенная информация о пользователе */
struct UserAdditionalInfo {
  /** Пользователь */
  1: common.UserOrGroup user;
  /** Дополнительные поля */
  2: list<Kaz_DocumentService.ContentHolder> holdersList;
  /** Настройка использования одноразового пароля */
  3: OTPConfig otpConfig;
}

enum ExistingDocumentsAccessType {
  ALL, // до всіх документів групи
  NEW, // тільки до нових документів групи
  AMOUNT, // до певної кількості останніх документів
  FROM_DATE // починаючи з певної дати
}

struct ExistingDocumentsAccessPolicy {
   1: ExistingDocumentsAccessType acessType;
   /** AMOUNT or kazDate */
   2: i64 addAccessValue;
}

/** Делегаты пользователя */
struct UserDelegates {
   /** Пользователь */
   1: common.UserOrGroup user;
   /** Делегаты */
   2: optional list<common.UserOrGroup> delegates;
}

/** Делегирования при создании аккаунта */
struct AccountUserDelegates {
   /** Делегаты */
   1: list<UserDelegates> delegates;
   /** Информация о делегировании */
   2: ClientDelegateInfo delegateInfo;
   /** Детальная информация о делегировании */
   3: ClientDelegateDetails delegateDetails;
   /** Закрывать сессию делегатам */
   4: bool closeDelegateSession
}

/** Сервис управления пользователями */
service UserManagementService {
  /** Получение сотрудника или группы */
  common.UserOrGroup getUserOrGroup(1: common.AuthTokenBase64 token, 2: common.ID userOrGroupId, 3: common.UserOrGroupType userOrGroupType, 4: string userVersion) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка сотрудников и групп
   * docId - по документу
   * showRemovedClients - выводить только удаленных пользователей
   * showAll - выводить всех, включая удаленных и заблокированных
 **/
  list<common.UserOrGroup> getAllUsersAndGroups(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение количества сотрудников и групп */
  i32 getCountAllUsersAndGroups(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка сотрудников входящих в группу */
  list<common.UserOrGroup> getAllUsersByGroup(1: common.AuthTokenBase64 token, 2: common.ID groupId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение количества сотрудников входящих в группу */
  i32 getCountAllUsersByGroup(1: common.AuthTokenBase64 token, 2: common.ID groupId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка сотрудников (кроме удаленных)
  * Есть возможность фильтровать по:
  *  - ФИО (fieldname: "FIO", fType: STRING, fieldCondition: CONTAIN);
  *  - login (fieldname: "login", fType: STRING, fieldCondition: CONTAIN);
  *  - email (fieldname: "email", fType: STRING, fieldCondition: CONTAIN);
  *  - employeeNumber (fieldname: "externalId", fType: STRING, fieldCondition: EQUAL);
  *  - Список айдишников грифов секретности (fieldname: "securityClassificationIds", fType: STRING, fieldCondition: IN);
  *  - доступу к СЭД (fieldname: "hasAccess", fType: BOOLEAN, fieldCondition: EQUAL)
  *  - по департаменту (fieldname: "departmentId", fType: STRING, fieldCondition: EQUAL)
  *  - по огр. структуре (fieldname: "orgStructureId", fType: STRING, fieldCondition: EQUAL)
  *  - securityClassificationIds
  *  - freeClientSearch по ФИО или должности, или департаменту
  *  - VIEW
  *  - CREATE - по доступу к паттерну
  *  - INBOX
  *  - OUTBOX
  *  - mainAccount (fType: STRING, fieldCondition: EQUAL);
  *  - свободный поиск (fieldname: "freeClientSearch", fType: STRING, fieldCondition: CONTAIN);
 *
  *  Не четкий поиск
  *  - по номеру телефона (fieldname: "phone", fType: STRING, fieldCondition: SEMANTIC_ANY);
  *  - по должности (fieldname: "position", fType: STRING, fieldCondition: SEMANTIC_ANY);
  *  - по ФИО (fieldname: "position", fType: STRING, fieldCondition: SEMANTIC_ANY);
  *  - по login (fieldname: "login", fType: STRING, fieldCondition: SEMANTIC_ANY);
  *
  *   разрешена сортировка по алфавиту - alphabetical
  *   - withTech - с дополнительными техническими пользователями
  *   - allowedInContent - разрешенные для выбора в контент айтеме
  *   - userFavorite - с избранными пользователями
  *   - without_fav - без избранных пользователей
  *   - showRemovedClients - выводить только удаленных пользователей
  *   - showAll - выводить всех, включая удаленных и заблокированных
  *  */
  list<common.UserOrGroup> getAllUsers(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Количество для метода getAllUsers */
  i32 getCountAllUsers(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка групп
  *  - получить количество пользователей в группе, поле userCount
  * Есть возможность фильтровать по:
  * - получить количество (fieldname: "userCount", fType: STRING, fieldCondition: EQUAL, null)
  * - названию  (fieldname: "name", fType: STRING)
  * - по вхождению пользователя - userId
  *  - VIEW
  *  - CREATE - по доступу к паттерну
  *  - INBOX
  *  - OUTBOX
  *  - группы в которые не входит пользователь(fieldname: "userDoNotHasGroups", fType: STTRING, fieldCondition: EQUAL, userId )
  *  - mainAccount
  *  **/
  list<common.UserOrGroup> getAllGroups(1: common.AuthTokenBase64 token, 2: common.ID groupId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение количества групп */
  i32 getCountAllGroups(1: common.AuthTokenBase64 token, 2: common.ID groupId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка ролей по юзеру или группе */
  set<string> getRolesByUserOrGroup(1: common.AuthTokenBase64 token, 2: common.UserOrGroupType type, 3: common.ID userOrGroupId, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка сотрудников или групп по роли */
  list<common.UserOrGroup> getUserOrGroupsByRole(1: common.AuthTokenBase64 token, 2: string role, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание или изменение группы */
  common.UserOrGroup createOrUpdateUserGroup(1: common.AuthTokenBase64 token, 2: common.UserOrGroup userGroup, 3: string accountId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление сотрудников в группы (можно добавить сразу несколько) */
  bool addUsersToGroups(1: common.AuthTokenBase64 token, 2: list<common.ID> groupsId, 3: list<common.ID> usersId, 4: ExistingDocumentsAccessPolicy groupPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Создание или изменение сотрудника */
  common.UserOrGroup createOrUpdateUser(1: common.AuthTokenBase64 token, 2: common.UserOrGroup user, 3: string login, 4: string password, 5: common.ID accountGroupId, 6: common.ID accountId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление сотрудника */
  bool removeClient(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: string reasonForRemoval) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление сотрудников из группы (можно удалять сразу несколько сотрудников из нескольких групп) */
  bool removeUsersFromGroups(1: common.AuthTokenBase64 token, 2: list<common.ID> groupsId, 3: list<common.ID> usersId ) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление группы */
  bool removeGroup(1: common.AuthTokenBase64 token, 2: list<common.ID> groupsId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Заблокировать пользователей */
  bool blockUsers(1: common.AuthTokenBase64 token, 2:list<common.ID> userIds) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Разблокировать пользователей */
  bool unBlockUsers(1: common.AuthTokenBase64 token, 2:list<common.ID> userIds) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);


  /** Получение списка всех возможный ролей */
  list<string> getAllExistingRoles(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление ролей к пользователям или группам. В common.UserOrGroup должно быть заполнено тип+идентификатор */
  bool addRolesToUsersOrGroups(1: common.AuthTokenBase64 token, 2: list<common.UserOrGroup> usersOrGroups, 3: list<string> roles) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление ролей у пользователя или группы. В common.UserOrGroup должно быть заполнено тип+идентификатор */
  bool revokeRolesFromUsersOrGroups(1: common.AuthTokenBase64 token, 2: list<common.UserOrGroup> usersOrGroups, 3: list<string> roles) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение карты ролей по пользователю */
  map<string, RoleScHelper> getRolesByUser(1: common.AuthTokenBase64 token, 2: common.ID userId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Установить/заменить пользовательский публичный ключ */
  bool loadUserPublicKey(1: common.AuthTokenBase64 token, 2: string publicKey, 3:string signature) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Информация о загруженных публичных ключах пользователей
   *  filter: id, userId, serial, keyState (LOADED, CONFIRM, PROHIBITED), accountId
  **/
  list<UserKeyData> getAllUserPublicKeyInfo(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Информация о количестве загруженных публичных ключах пользователей
   *  filter: id, userId, serial, keyState (LOADED, CONFIRM, PROHIBITED), accountId
  **/
  i32 getCountAllUserPublicKeyInfo(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение деталей делегирования */
  list<ClientDelegateDetails> changeClientDelegateDetailsInfo(1: common.AuthTokenBase64 token, 2: ClientDelegateInfo clientDelegateInfo, 3: list<ClientDelegateDetails> listDetailsToAdd, 4: list<common.ID> listDetailIdsToRemove, 5: bool closeDelegateSession) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Полное удаление делегирования для юзера со всеми деталями */
  bool revokeClientDelegates(1: common.AuthTokenBase64 token, 2: common.ID clientDelegateId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Метод получения всех настроенных делегатов
   *  filter: clientFrom, clientFromId, clientTo, clientToId, withoutExpired
  **/
  list<ClientDelegateInfo> getAllClientDelegatesInfoList(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Метод получения всех деталей делегирования
   *  filter: id
  **/
  list<ClientDelegateDetails> getAllClientDelegatesDetails(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Метод получения деталей делегирования пользователю */
  list<ClientDelegateDetails> getClientDelegateDetails(1: common.AuthTokenBase64 token, 2: common.ID clientDelegateInfoId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Метод получения всех пользователей, от имени которых разрешен вход для конкретного пользователя */
  list<common.UserOrGroup> getAllClientsForDelegate(1: common.AuthTokenBase64 token, 2:common.ID userId, 3:bool reverse, 4:common.ID documentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /**Получить список уведомлений для делегата */
  map<string, i32> getAllNotificationsForDelegate(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** список всех аккаунтов доступных пользователю
  *  все кроме скрытых (fieldname: "NOT_SECURITY", fType: STRING)
  **/
  list<Kaz_types.Account> getAccounts(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение карты грифов безопасности по пользователю */
  map<string, RoleScHelper> getSecurityClassificationsByUser(1: common.AuthTokenBase64 token, 2: common.ID userId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** без описания */
  list<common.UserOrGroup> getUserChief(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: ChiefLevel level, 4: set<common.UserType> userTypes, 5: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Изменение профиля пользователя */
  common.UserOrGroup updateUserInfo(1: common.AuthTokenBase64 token, 2: common.UserOrGroup user) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** индивидуальные настройки пользователя */
  UserPreferences getUserPreferences(1: common.AuthTokenBase64 token, 2: common.ID userId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  bool updateUserPreferences(1: common.AuthTokenBase64 token, 2: UserPreferences preferences) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение списка избранных пользователей */
  bool createOrRemoveFavoriteUsers(1: common.AuthTokenBase64 token, 2: list<common.ID> userIdsToAdd, 3: list<common.ID> userIdsToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение рассширенной информации о пользователе */
  UserAdditionalInfo getUserAdditionalInfo(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: string userVersion) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение рассширенной информации о пользователе */
  UserAdditionalInfo saveUserAdditionalInfo(1: common.AuthTokenBase64 token, 2: UserAdditionalInfo userAdditionalInfo, 3: string login, 4: string password, 5: common.ID accountGroupId, 6: common.ID accountId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Восстановление сотрудника */
  bool restoreClient(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: string reasonForRestore) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Найти делегатов для пользователей или групп пользователей */
  list<UserDelegates> findDelegates(1: common.AuthTokenBase64 token, 2: list<common.UserOrGroup> users) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}