include "common.thrift"
include "ex.thrift"
include "Kaz_types.thrift"

namespace java core



/** Тип устройства */
enum DeviceType {
   ANDROID,
   IOS,
   WEB,
   SERVICE
}

/** Тип канала отправки OTP кода */
enum OtpSendChannelType {
   EMAIL,
   PUSH,
   PUSH_TO_WEB,
   SMS
}

/** Мобильное устройство */
struct Device {
  /** Идентификатор firebase */
  1: optional common.ID firebaseId;
  /** Идентификатор клиента */
  2: optional common.ID clientId;
  /** Дата регистрации устройства */
  3: optional common.kazDate createDate;
  /** Последнее время работы */
  4: optional common.kazDate lastWorkDate;
  /** Тип устройства */
  5: optional DeviceType type;
  /** Идентификатор устройства*/
  6: optional common.ID deviceId;
}


/** Сессия для коммуникации с сервером */
struct AuthSession {
  /** Идентификатор */
  1: optional common.AuthTokenBase64 id;
  /** Дата окончания */
  2: optional common.kazDate expireDate;
  /** Дата создания */
  3: optional common.kazDate createDate;
  /** Дата последнего изменения */
  4: optional common.kazDate updateDate;
  /** IP определенный автоматически */
  5: optional string ip1;
  /** IP переданный клиентским приложением */
  6: optional string ip2;
  /** Основная информация о пользователе */
  7: optional common.UserOrGroup clientInfo;
  /** Список ролей */
  8: optional set<string> roles;
  /** Пользователь, который совершил вход*/
  9: optional common.UserOrGroup delegateClientInfo;
  /** Признак указывающий о смене пароля */
  10: bool needChangePassword;
  /** Идентификатор */
  11: optional common.AuthTokenBase64 token;
  /** Текущий язык */
  12: string langCode;
  /** Список ролей заблокированных лицензией */
  13: optional set<string> blockedRoles;
  /** Идентификатор устройства */
  14: optional string deviceId;
  /** Тип устройства */
  15: optional DeviceType deviceType;
  /** Идентификатор внешней системы */
  16: optional string externalSistem;
  /** Признак указывающий о необходимости ввода кода разового доступа */
  17: bool needConfirmOTP;
}

/** Параметры модуля ГРЯДА */
struct GryadaSettings {
    /** Серийный номер */
    1: optional string serialNr;
    /** Название */
    2: optional string name;
    /** IP-адрес */
    3: optional string address;
    /** Маска IP-адреса */
    4: optional string addressMask;
    /** Порядковый номер */
    5: optional i32 orderNumber;
}

/** Расширенная информация */
struct ExtInfo {
  /** Параметры модулей ГРЯДА */
  1: optional list<GryadaSettings> gryadaSettings;
}

enum AuthType {
  DB_LDAP;
  OAUTH
}

struct AuthMethod {
  1: AuthType type;
  2: string authServiceKey;
  3: string authServiceName;
  4: map<string, string> authServiceNameLoc;
  5: optional string url;
  6: optional string subUrl;
  7: optional map<string, string> bodyParams;
  8: bool useByDefault;
  9: bool usePasswordOperations;
  10: optional string logOutUrl;
}

struct ServerSettings {
  1:map<string, string> infoMap;
  2:map<string, string> languageMap;
  3:list<AuthMethod> authMethods;
  4:map<string, string> mobileMap;
}

struct AuthCreds {
  1: string serviceName;
  2: optional string externalToken;
  3: optional string login;
  4: optional string password;
}

/** Сервис аутентификации */
service AuthService {
  /** Авторизация в системе. В системе разработан механизм "безопасной передачи пароля" для передачи пароля в зашифрованном виде.
   * Чтобы воспользоваться безопасной передачей пароля, нужно вызвать метод getInfo(), в ответе взять ключ SERVER_PUBLIC_RSA_KEY,
   * который использовать для шифрования пароля пользователя.
 **/
  AuthSession authenticate(1: string login; 2: string password, 3: Device device, 4: string ip, 5: bool findOpened, 6: string langCode, 7: i32 cacheVersion) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Авторизация в системе */
  AuthSession authenticateGuest(1: common.ID guestId, 2: string password, 3: string ip, 4: string langCode) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Расширенная авторизация */
  AuthSession authenticateExtended(1:AuthCreds authCreds, 2: Device device, 3: string ip, 4: bool findOpened, 5: string langCode, 6: i32 cacheVersion) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Проверка одноразового пароля */
  AuthSession checkOTP(1: common.AuthTokenBase64 token, 2:string otp) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Повторная отправка одноразового пароля */
  AuthSession resendOTP(1: common.AuthTokenBase64 token, 2: OtpSendChannelType sendChannelType) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Обновление сессии */
  AuthSession refreshAuthSession(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Проверка истечения сессии */
  bool isAuthSessionExpired(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Смена пароля */
  bool changePassword(1: common.AuthTokenBase64 token, 2: string oldPassword, 3: string password, 4: string confirmation) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Запрос на сброс пароля */
  bool requestResetPassword(1: common.AuthTokenBase64 token, 2: string login) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Подтверждения сброса пароля, будет сгенерирован новый пароль */
  AuthSession finishResetPassword(1: string login, 2: string confirmationCode, 3: string password, 4: string confirmation, 5: string langCode) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Выход из системы */
  bool logout(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Авторизация под другим пользователем*/
  AuthSession authenticateAs(1: common.AuthTokenBase64 token, 2: string toUserId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /**
   @Deprecated
    Получение текущей версии приложения
        VERSION
        MAX_FILE_SIZE
        GIT_INFO
        COMMIT_ID
        COMMIT_DATE,
        MIN_PERIOD_DATE,
        USER_CHIEF_LEVEL (в файле конфигурации это параметр user.chief.level=DIRECT_CHIEF- используется в методе get_user_chief,
                          если выбран тип DIRECT_CHIEF то метод get_user_chief отдаст самого первого (непосредственного начальника),
                          если TOP_CHIEF - самого последнего),
        CHIEF_TYPES_FOR_SEARCH (в файле конфигурации это параметр chief.types.for.search:CHIEF,DEPUTY- используется в методе get_user_chief,
                                данный параметр отфильрует итоговую выборку на основании заданных типов пользователей),
        CHIEF_PRIORITY_TYPE_FOR_SEARCH (в файле конфигурации это параметр chief.priority.type.for.search:CHIEF - приоритет сортировки при поиске в методе get_user_chief),
        SERVER_PUBLIC_RSA_KEY публичный ключ RSA, для шифрования пароля

        http://dev.almexecm.com:8080/kaz-server-dev1/licenseServerKey
 **/
  map<string, string> getInfo();

  /** Получение настроек фронта */
  ServerSettings getSettings();

  /** Расширить сессию */
  bool extendSession(1: common.AuthTokenBase64 token, 2: string keyword) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  map<string, string> getAllLanguages() throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  common.AuthTokenBase64 generateNewTokenForLang (1: common.AuthTokenBase64 token, 2:string newLang) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение переводов, специфичных для сервера */
  map<string, string> getAllCustomTranslate(1: string langCode);
  /** Получение расширенной информации */
  ExtInfo getExtendedInfo(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Проверка регистрации модуля на сервере */
  string isModuleAllowed(1: string param);
 /** Получение кода для регистрации в WebSocket */
 string getOTPForSocketRegistration(1: string token);
 /** Получения списка возможных каналов отправки OTP кода */
 set<OtpSendChannelType> getOtpSendChannels(1: common.AuthTokenBase64 token);
}