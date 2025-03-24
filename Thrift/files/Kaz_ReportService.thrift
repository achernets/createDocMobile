include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_DocumentService.thrift"

namespace java core


/** Связь отчета и паттерна */
struct ReportTemplateLink {
  /** идентификатор */
  1: optional common.ID id;
  /** идентификатор отчета */
  2: optional common.ID reportId;
  /** идентификатор шаблона */
  3: optional common.ID patternId;
  /** Пользователь, которому дано право генерировать отчет */
  4: optional common.UserOrGroup userOrGroup;
}

/** Параметр отчета */
struct ReportFilledParam {
  /** идентификатор */
  1: optional string id,
  /** тип */
  2: optional filter.FilterFieldType paramType,
  /** значение */
  3: optional string value,
  /** ключ */
  4: optional string key
}

/** Сервис отчетов */
service ReportService {
  /** Получить список доступных групп отчетов, разрешены фильтры по getAllReportTemplates */
  list<string> getAllReportGroups(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Список шаблонов отчетов
  * Есть возможность фильтровать по:
  *  - пользователям  (fieldname: "clientIds", fType: STRING, fieldCondition: IN)
  *  - common.ID клиентов (fieldname: "userGroupId", fType: STRING, fieldCondition: EQUAL)
  *  - common.ID документа (fieldname: "docId", fType: STRING, fieldCondition: EQUAL)
  *  - common.ID идентификатору
  *  - group группе
  *  - reportType типу
  *  - fastPrint признаку быстрой печати
  **/
  list<Kaz_types.ReportTemplate> getAllReportTemplates(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Количество шаблонов отчетов */
  i32 getCountAllReportTemplates(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка связей
    *
    * reportId
    * patternId
    *
    * **/
  list<ReportTemplateLink> getAllReportTemplateLinks(1: common.AuthTokenBase64 token, 2:filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создать/изменить шаблон отчета */
  Kaz_types.ReportTemplate createOrUpdateReport(1: common.AuthTokenBase64 token, 2: Kaz_types.ReportTemplate reportTemplate, 3: binary xmlFile) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Скачать шаблон отчета */
  binary downloadReportTemplate(1: common.AuthTokenBase64 token, 2: common.ID templateId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление шаблона отчета */
  bool removeReportTemplate(1: common.AuthTokenBase64 token, 2: common.ID templateId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Управление шаблоном отчета у паттерна документа / пользователей или групп */
  bool configReportUsages(1: common.AuthTokenBase64 token, 2: list<common.ID> templateIds, 3: list<common.ID> toAddDocPatternIds, 4: list<common.ID> toRemoveDocPatternIds, 5:list<common.UserOrGroup> toAddUserGroups, 6:list<common.UserOrGroup> toRemoveUserGroups) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Сгенерировать электронный документ */
  binary generateDigitalDocument(1: common.AuthTokenBase64 token, 2: Kaz_types.ReportType reportType, 3: common.ID digitalViewId, 4: common.ID docId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Сгенерировать отчет  */
  binary generateReport(1: common.AuthTokenBase64 token, 2: Kaz_types.ReportType reportType, 3: common.ID templateId, 4: list<ReportFilledParam> adParams, 5: common.ID docId, 6: Kaz_DocumentService.DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Сгенерировать отчет по фильтру */
  binary generateReportByFilter(1: common.AuthTokenBase64 token, 2: Kaz_types.ReportType reportType, 3: common.ID templateId, 4: filter.KazFilter filter, 5: bool forAllUsers) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Сгенерировать отчет и прикрепить к документу, возвращает common.ID вложения  */
  common.ID attachReportToDoc(1: common.AuthTokenBase64 token, 2: Kaz_types.ReportType reportType, 3: common.ID templateId, 4: list<ReportFilledParam> adParams, 5: common.ID docId, 6: Kaz_DocumentService.DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Сгенерировать URL отчетa  */
  string generateReportURL(1: common.AuthTokenBase64 token, 2: Kaz_types.ReportType reportType, 3: common.ID templateId, 4: list<ReportFilledParam> adParams, 5: common.ID docId, 6: Kaz_DocumentService.DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Экспортировать документы в XLSX*/
  binary exportDocumentsToXlsx(1: common.AuthTokenBase64 token, 2: Kaz_DocumentService.DocumentAccessPolicy accessPolicy, 3: filter.KazFilter filter, 4: common.ID leftFilterId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение отчета по идентификатору с заполнеными параметрами */
  Kaz_types.ReportTemplate getReportTemplate(1: common.AuthTokenBase64 token, 2: common.ID templateId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Экспортировать данные тэки БЗ в XLSX */
  binary exportKnowledgeDocsToXlsx(1: common.AuthTokenBase64 token, 2:common.ID nodeTreeId, 3:filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Экспортировать список пользователей в XLSX*/
  binary exportUsersToXlsx(1: common.AuthTokenBase64 token, 2: common.ID groupId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка зарегистрированых PDF обработчиков */
  Kaz_types.PDFPostDecoratorPage getPDFPostDecoratorPage(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Обновление параметров обработчика */
  Kaz_types.PDFPostDecorator changePDFPostDecorator(1: common.AuthTokenBase64 token, 2: Kaz_types.PDFPostDecorator pdfPostDecorator) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}
