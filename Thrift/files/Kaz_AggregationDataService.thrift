include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_DocumentService.thrift"
include "Kaz_FilterService.thrift"

namespace java core



/** Структура для отображения отправителей/получателей/подтверждающих */
struct MatchingUserGroup {
  /** Название этапа */
  1: string stageName;
  /** Список пользователей */
  2: list<common.UserOrGroup> users;
  /** Итерация*/
  3: i32 iteration;
}

struct DocSubStatus {
  1: Kaz_DocumentService.DocPatternStageSubStatus status;
  2: optional list<common.ID> commentIds;
}

/** Детальная информация о документе */
struct AggregationDocumentData {
  /** Документ */
  1: optional Kaz_DocumentService.ADocument document;
  /**Комментарии */
  4: optional list<Kaz_DocumentService.DocumentComment> comments;
  /** Связи */
  5: optional list<Kaz_DocumentService.DocumentRelation> relations;
  /** Прикрепленные грифы */
  7: optional list<Kaz_types.SecurityClassification> securityClassifications;
  /** История изменений сроков по документу */
  8: optional list<Kaz_DocumentService.DeadlineHistory> deadlineHistories;
  /** Вложения */
  9: optional list<Kaz_DocumentService.Attachment> attachments;
  /** Список доступных отчетов */
  10: optional list<Kaz_types.ReportTemplate> reportTemplates;
  /** Права пользователя по отношению к текущему документу */
  11: optional Kaz_DocumentService.DocPermissions permissions;
  /** Deprecated(3.0.102) Список ошибок при получении данных */
  12: optional map<string, string> errors;
  /** отправители/получатели/подтверждающие */
  13: optional list<MatchingUserGroup> matchingUserGroup;
  /** Контент контейнеры для текущего этапа */
  14: optional list<Kaz_DocumentService.ContentHolderShowPlace> contentHolders;
  /** Доступ к документу */
  15: optional Kaz_DocumentService.DocumentAccessPolicy policy;
  /** Список ошибок при получении данных */
  16: optional map<Kaz_DocumentService.AggregationRequiredType, ex.PreconditionException> exceptionMap;
  /** Подстатусы документа с их коментариями */
  17: optional list<DocSubStatus> docSubStasuses;
}

/** Реестр документов */
struct Registry {
/** идентификатор */
  1: common.ID id;
  /** название */
  2: string regName;
  /** описание */
  3: string regDescription;
  /** название представление в базе */
  4: optional string viewRule;
  /** список людей которым доступно */
  5: optional list<common.UserOrGroup> userOrGrList;
  /** аккаунты в которых доступно */
  6: optional list<Kaz_types.Account> accountList;
  /** Загружать автоматически */
  7: optional bool autoDownload;
  /* Позиция */
  8: i32 position;
  /** название */
  9: map<string,string> regNameLoc;
  /** описание */
  10: map<string,string> regDescriptionLoc;
  /** использовать колонки по умелчанию */
  11: bool showDefaultColumns;
  /** колонки прикрепленные к реестру */
  12: list<Kaz_types.DocColumn> columns;
  /** сохраненная сортировка по полю */
  13: optional string defaultSortColumn
}

/** Сервис дополнительных возможностей */
service AggregationDataService {
   /** Получение всей информации о документе */
   AggregationDocumentData getDocumentData(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: set<Kaz_DocumentService.AggregationRequiredType> requiredData, 4: Kaz_DocumentService.DocumentAccessPolicy policy, 5: bool decrypt, 6: i32 executorsPortion) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Список реестров с базовыми полями(id, название)
    *  Разрешена сортировка по следующим полям:
    *  - position - позиции реестра
    *  - regName - по названию реестра
   **/
   list<Registry> getAllRegistries(1: common.AuthTokenBase64 token, 2:filter.KazFilter filter, 3: bool forAdmin) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Количество реестров */
   i32 getCountAllRegistries(1: common.AuthTokenBase64 token, 2:filter.KazFilter filter, 3: bool forAdmin) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Получение необходимой информации о реестре */
   Registry getRegistryById(1: common.AuthTokenBase64 token, 2:common.ID id, 3: set<Kaz_DocumentService.AggregationRequiredType> requiredData) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Удаление реестра */
   bool removeRegistry(1: common.AuthTokenBase64 token, 2: common.ID registryId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Создание/изменение реестра */
   Registry createOrUpdateRegistry(1: common.AuthTokenBase64 token, 2: Registry registry, 3:list<common.UserOrGroup> userOrGroupList, 4:list<Kaz_types.Account> accountList) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Сравнение двух jira периодов */
   i32 compareJiraTime(1: string jiraTime1, 2: string jiraTime2) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Создание правила сортировки по умолчанию в реестре для пользователя */
   string createOrUpdateRegistrySortRule(1: common.AuthTokenBase64 token, 2: common.ID registryId, 3:  string defaultSortColumn) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}