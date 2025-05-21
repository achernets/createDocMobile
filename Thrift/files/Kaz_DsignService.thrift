include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_UserManagementService.thrift"
include "Kaz_DocumentService.thrift"

namespace java core



/** Список подписей*/
struct DigitalSign {
  1: optional common.ID id;
  /** идентификатор документа */
  2: optional common.ID documentId;
  /** идентификатор вложения */
  3: optional common.ID attachmentId;
  /** название метода */
  4: optional string methodName;
  /** идентификатор этапа */
  5: optional common.ID stageId;
  /** итерация */
  6: i32 iteration;
  /** Детальная информация о подписях (пользователь, время, сертификат)*/
  7: optional list<DigitalSignDetails> signDetails;
  /** Провайдер цифровой подписи*/
  8: optional common.SignProviderType signProviderType;
}

/** Детальная информация о подписи*/
struct DigitalSignDetails {
   1: optional common.ID id;
  /** Пользователь */
   2: optional common.UserOrGroup user;
   /** Пользователь-делегат */
   3: optional common.UserOrGroup originalUser;
   /** информации о публичном сертификате пользователя */
   4: optional Kaz_types.CertificateInfo certificateInfo;
   /**в какой системе была инициирована подпись*/
   5: optional string signInSystem;
}

/** Информация по конкретной подписи*/
struct SignInfo {
  1: optional common.ID digitalSignId;
  /** Детальная информация о подписях (пользователь, время, сертификат)*/
  2: optional list<DigitalSignDetails> signDetails;
  /** идентификатор документа */
  3: optional common.ID documentId;
  /** название подписанного метода */
  4: optional string methodName;
  /** название подписанного вложения */
  5: optional string attachmentName;
  /** название подписанного вложения в pdf */
  6: optional string attachmentPdfName;
  /** размер подписанного вложения в pdf */
  7: optional i64 attachmentPdfFileSize;
  /** название подписанного вложения в p7b */
  8: optional string attachmentP7bName;
  /** ссылка на электронный документ в системе */
  9: optional string documentUrl;
  /** ссылка для скачивания оригинала файла */
  10: optional string originalAttachmentDownloadUrl;
  /** ссылка для скачивания PDF-файла */
  11: optional string pdfAttachmentDownloadUrl;
  /** ссылка для скачивания p7b-файла */
  12: optional string p7bAttachmentDownloadUrl;
}

/* Информация о приватном ключе */
struct PrivateKeyInfo {
    1: common.ID id;
    2: string name;
    3: optional Kaz_types.CertificateInfo publicKeyInfo;
}

/* Внешних сервис наложения ЕЦП */
struct ExtSignServer {
  /* Идентификатор */
  1: string serviceKey;
  /* Название */
  2: string serviceDescription;
  /* Ключ приложения(playMarket/appStore)*/
  3: string applicationKey;
  /* Описание */
  4: string applicationDescription;
  /* Максимальное количество подписей, которые можно сгенерировать за раз */
  5: i32 maxOnceSign;
  /* Список устройств/ключей на внешнем сервере */
  6: optional list<ExtSignServerDevice> devices;
}

/* Устройство/ключ на внешнем сервере */
struct ExtSignServerDevice {
  /* Идентификатор */
  1: string id;
  /* Название */
  2: string name;
  /* Описание */
  3: string description;
  /* Список дочерних устройство/ключ на внешнем сервере */
  4: list<ExtSignServerDevice> child;
}


/* Внешняя операция наложения ЕЦП */
struct ExtSignOperation {
  1: string operationId;
  2: optional string qrCode;
  3: optional ExtSignOperationStatus operationStatus;
  4: list<Kaz_types.SignData> dataToSignList;
  5: ExtSignServer extServerInfo;
}

/* Статус внешней операции наложения ЕЦП */
enum ExtSignOperationStatus {
  WAIT,
  DONE,
  CANCEL,
  FAIL
}

enum BulkStatus {
  /** Створено */
  CREATED,
  /** Подготовка к подписанию */
  PREPARE,
  /** В ожидании */
  WAIT,
  /** В процессе обработки шедулером */
  PROCESSING,
  /** Обработан */
  PROCESSED,
  /** Обработан с ошибкой */
  FAIL,
  /** Отменен */
  CANCEL
}

/** Вложение, для массового подписания */
struct BulkSignAttachment {
  1:common.ID id;
  2:common.ID attachmentId;
  3:string attachmentName;
  4:Kaz_types.AttachmentExtStatus attachmentExtStatus;
  5:common.UserOrGroup attachmentAuthor;
  6:BulkStatus bulkAttStatus;
  7:string bulkError;
}

/** Документ, для массового подписания */
struct BulkSignDocument {
  1:common.ID id;
  2:common.ID documentId;
  3:string documentSystemNumber;
  4:optional string documentNumber;
  5:optional Kaz_DocumentService.DocumentIconType documentIcon;
  6:string documentName;
  7:common.kazDate documentCreateDate;
  8:common.UserOrGroup documentAuthor;
  9:optional Kaz_DocumentService.DocumentPatternGroup documentGroup;
  10:list<BulkSignAttachment> docAttachmentList;
  11:BulkStatus bulkDocStatus;
  12:string bulkError;
}

/** Задача массового подписания */
struct BulkSignJob {
  1:common.ID id;
  2:i32 preparedDocs;
  3:i32 processedDocs;
  4:i32 failDocs;
  5:i32 totalDocs;
  6:optional list<BulkSignDocument> documentList;
  7:optional BulkStatus bulkJobStatus;
  8:optional list<ExtSignOperation> extSignOperationList;
}

/** Информация о массом подписании */
struct BulkSignInfo {
  /** Идентификатор */
  1:common.ID id;
  /** Количество вложений */
  2:i32 totalAtt;
  /** Количество документов */
  3:i32 totalDocs;
  /** Признак создания нового массового подписания */
  4:bool isNew;
}

/** Сервис ЭЦП  */
service DsignService {
  /** Метод получение времени подписания ЭЦП */
  string getTimeStampToken(1: common.AuthTokenBase64 token, 2: string data) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление подписей для вложения **/
  bool signAttachment(1: common.AuthTokenBase64 token, 2: common.ID attachmentId, 3: list<string> signatures) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Подпись вложения **/
  bool signAttachmentUsingServerKeyStorage(1: common.AuthTokenBase64 token, 2: common.ID attachmentId, 3: common.ID pKeyId, 4: string password) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Метод получения списка подписей
    * Есть возможность фильтровать по:
    *  - common.ID вложения (fieldname: "attachmentId", fType: STRING)
  */
  list<DigitalSign> getAllDigitalSigns(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** получение информации о сертификате */
  list<Kaz_types.CertificateInfo> getCertificateInfo(1: common.AuthTokenBase64 token, 2: common.ID digitalSignId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**
  * Получение информации о публичном сертификате пользователя
**/
  list<Kaz_UserManagementService.UserKeyData> getCertificateInfoListByUser(1: common.AuthTokenBase64 token, 2: common.ID userId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение информации о сертификате по публичному ключу, используется перед загрузкой сертификата пользователю */
  Kaz_types.CertificateInfo getSignInfoByCertificate(1: common.AuthTokenBase64 token, 2: string data) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение информации по цифровой подписи*/
  SignInfo getSignInfo(1: string digitalSignId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка приватных ключей
   * filter string keyState equals string 'LOADED' or 'CONFIRM'
   **/
  list<PrivateKeyInfo> getAllPrivateKeys(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Получение количества приватных ключей */
  i32 getCountPrivateKeys(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Добавить приватный ключ в защищенное хранилище */
  PrivateKeyInfo addKeyToSecureStorage(1: common.AuthTokenBase64 token, 2: binary key1, 3: string password, 4: string name, 5: string fileExt, 6: string privateKeyIndexInJKS) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Удалить приватный ключ из защищенного хранилища */
  bool removeKeyFromSecureStorage(1: common.AuthTokenBase64 token, 2: common.ID id) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Получить подпись по ид вложения */
   map<string,bool>  getDigitalSignByAttachmentId(1: common.AuthTokenBase64 token, 2: common.ID attachmentId);
  /* Добавление конвертов ЭЦП к вложению */
  bool addExternalSignToAttachment(1: common.AuthTokenBase64 token, 2: common.ID attachmentId, 3: list<binary> p7s) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Массового подписания в Almex */
  list<Kaz_types.SignData> singAnyData(1: common.AuthTokenBase64 token, 2: list<Kaz_types.SignKeyInfo> keyInfoList, 3:list<Kaz_types.SignData> dataToSignList) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Подписания во внешнем сервисе */
  ExtSignOperation signInExternalService(1: common.AuthTokenBase64 token, 2: string serviceKey, 3:list<Kaz_types.SignData> dataToSignList) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Проверка статуса подписи во внешнем сервисе */
  ExtSignOperation checkSignStatusInExternalService(1: common.AuthTokenBase64 token, 2: string serviceKey, 3: ExtSignOperation signOperation) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Извлечение публичной части из приватного ключа */
  Kaz_types.CertificateInfo extractPublicKeyInfo(1: common.AuthTokenBase64 token, 2: Kaz_types.SignKeyInfo keyInfo) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Список внешних зарегистрированных сервисов наложения ЕЦП */
  list<ExtSignServer> getAllExternalSignServiceInfos(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение общих сведений по текущей задаче массового подписания */
  BulkSignJob getCurrentBulkSignJob(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение подробных сведений по текущей задаче массового подписания */
  BulkSignJob getFullBulkSignJob(1: common.AuthTokenBase64 token, 2:common.ID bulkId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление из очереди в текущей задаче массового подписания */
  BulkSignInfo removeFromCurrentBulkSignJob(1: common.AuthTokenBase64 token, 2:common.ID bulkId, 3:common.ID signDocId, 4:common.ID signAttId, 5:common.ID attId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление из очереди в текущей задаче массового подписания */
  BulkSignInfo addToCurrentBulkSignJob(1: common.AuthTokenBase64 token, 2:common.ID bulkId, 3:Kaz_DocumentService.DocumentAccessPolicy accessPolicy, 4:common.ID attId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Выполнение массового подписание */
  BulkSignJob signBulkJob(1: common.AuthTokenBase64 token, 2: list<Kaz_types.SignKeyInfo> keyInfoList, 3:common.ID bulkId, 4:bool setAutoDecision) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Отмена задачи массового подписания */
  BulkSignJob cancelBulkJob(1: common.AuthTokenBase64 token, 2:common.ID bulkId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Закрытие задачи массового подписания */
  BulkSignJob closeBulkJob(1: common.AuthTokenBase64 token, 2:common.ID bulkId, 3:bool copyFailedDocs) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}