include "common.thrift"
include "ex.thrift"
include "HB.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_AccountGroupService.thrift"
include "Kaz_AccountService.thrift"
include "Kaz_AdminService.thrift"
include "Kaz_AggregationDataService.thrift"
include "Kaz_AuthService.thrift"
include "Kaz_CalendarService.thrift"
include "Kaz_DepartmentService.thrift"
include "Kaz_DevicesService.thrift"
include "Kaz_DocumentPatternService.thrift"
include "Kaz_DocumentService.thrift"
include "Kaz_DsignService.thrift"
include "Kaz_FilledDocumentPatternService.thrift"
include "Kaz_FilterService.thrift"
include "Kaz_HandBookService.thrift"
include "Kaz_HistoryService.thrift"
include "Kaz_NotificationService.thrift"
include "Kaz_ReportService.thrift"
include "Kaz_ScriptDictionaryService.thrift"
include "Kaz_SecurityClassificationService.thrift"
include "Kaz_UserManagementService.thrift"
include "Kaz_KnowledgeService.thrift"
include "Kaz_VoteService.thrift"
include "Kaz_ExportImportService.thrift"
include "Kaz_ExecutionMonitoringService.thrift"
include "Kaz_AnalyticsService.thrift"

/** Открытое api системы AlmexECM version 3.0.175 */
namespace java core


/** Версия продукта AlmexECM */
const string CURRENT_VERSION     = '3.0.175';

/*
путь к сервисам по протоколу json
//https://host:port/server-name/thrift/{{service.url}}
*/
const string AUTH_SERVICE_PATH_JSON = "auth-json";
const string USER_SERVICE_PATH_JSON = "user-management-json";
const string DOCUMENT_SERVICE_PATH_JSON = "document-management-json";
const string DOCUMENT_PATTERN_SERVICE_PATH_JSON = "document-pattern-management-json";
const string FILLED_DOCUMENT_PATTERN_SERVICE_PATH_JSON = "filled-document-pattern-management-json";
const string NOTIFICATION_SERVICE_PATH_JSON = "notification-json";
const string CALENDAR_SERVICE_PATH_JSON = "calendar-json";
const string DEVICES_SERVICE_PATH_JSON = "devices-json";
const string ADMIN_SERVICE_PATH_JSON = "admin-json";
const string REPORT_SERVICE_PATH_JSON = "report-json";
const string HANDBOOK_SERVICE_PATH_JSON = "handbook-json";
const string DEPARTMENT_SERVICE_PATH_JSON = "department-json";
const string DSIGN_SERVICE_PATH_JSON = "dsign-json";
const string SECURITY_CLASSIFICATION_SERVICE_PATH_JSON = "securityClassification-json";
const string FILTER_SERVICE_PATH_JSON = "filter-json";
const string HISTORY_SERVICE_PATH_JSON = "history-json";
const string AGGREGATION_DATA_SERVICE_PATH_JSON = "aggregationData-json";
const string ACCOUNT_SERVICE_PATH_JSON = "account-json";
const string ACCOUNT_GROUP_SERVICE_PATH_JSON = "accountGroup-json";
const string SCRIPT_DICTIONARY_SERVICE_PATH_JSON = "scriptDictionary-json";
const string KNOWLEDGE_SERVICE_PATH_JSON = "knowledge-json";
const string VOTE_SERVICE_PATH_JSON = "vote-json";
const string EXPORT_IMPORT_SERVICE_PATH_JSON = "exportImport-json";
const string EXECUTION_MONITORING_PATH_JSON = "executionMonitoring-json";
const string ANALITICS_PATH_JSON = "analitics-json";

/*
путь к сервисам по протоколу bin
//https://host:port/server-name/thrift/{{service.url}}
*/
const string AUTH_SERVICE_PATH_BIN = "auth-bin";
const string USER_SERVICE_PATH_BIN = "user-management-bin";
const string DOCUMENT_SERVICE_PATH_BIN = "document-management-bin";
const string DOCUMENT_PATTERN_SERVICE_PATH_BIN = "document-pattern-management-bin";
const string FILLED_DOCUMENT_PATTERN_SERVICE_PATH_BIN = "filled-document-pattern-management-bin";
const string NOTIFICATION_SERVICE_PATH_BIN = "notification-bin";
const string CALENDAR_SERVICE_PATH_BIN = "calendar-bin";
const string DEVICES_SERVICE_PATH_BIN = "devices-bin";
const string ADMIN_SERVICE_PATH_BIN = "admin-bin";
const string REPORT_SERVICE_PATH_BIN = "report-bin";
const string HANDBOOK_SERVICE_PATH_BIN = "handbook-bin";
const string DEPARTMENT_SERVICE_PATH_BIN = "department-bin";
const string DSIGN_SERVICE_PATH_BIN = "dsign-bin";
const string SECURITY_CLASSIFICATION_SERVICE_PATH_BIN = "securityClassification-bin";
const string FILTER_SERVICE_PATH_BIN = "filter-bin";
const string HISTORY_SERVICE_PATH_BIN = "history-bin";
const string AGGREGATION_DATA_SERVICE_PATH_BIN = "aggregationData-bin";
const string ACCOUNT_SERVICE_PATH_BIN = "account-bin";
const string ACCOUNT_GROUP_SERVICE_PATH_BIN = "accountGroup-bin";
const string SCRIPT_DICTIONARY_SERVICE_PATH_BIN = "scriptDictionary-bin";
const string KNOWLEDGE_SERVICE_PATH_BIN = "knowledge-bin";
const string EXPORT_IMPORT_SERVICE_PATH_BIN = "exportImport-bin";
const string EXECUTION_MONITORING_PATH_BIN = "executionMonitoring-bin";
const string ANALITICS_PATH_BIN = "analitics-bin";

/*
путь к сервисам по протоколу pure-json
//https://host:port/server-name/thrift/{{service.url}}
*/
const string AUTH_SERVICE_PATH_PURE_JSON = "auth-pure-json";
const string USER_SERVICE_PATH_PURE_JSON = "user-management-pure-json";
const string DOCUMENT_SERVICE_PATH_PURE_JSON = "document-management-pure-json";
const string DOCUMENT_PATTERN_SERVICE_PATH_PURE_JSON = "document-pattern-management-pure-json";
const string FILLED_DOCUMENT_PATTERN_SERVICE_PATH_PURE_JSON = "filled-document-pattern-management-pure-json";
const string NOTIFICATION_SERVICE_PATH_PURE_JSON = "notification-pure-json";
const string CALENDAR_SERVICE_PATH_PURE_JSON = "calendar-pure-json";
const string DEVICES_SERVICE_PATH_PURE_JSON = "devices-pure-json";
const string ADMIN_SERVICE_PATH_PURE_JSON = "admin-pure-json";
const string REPORT_SERVICE_PATH_PURE_JSON = "report-pure-json";
const string HANDBOOK_SERVICE_PATH_PURE_JSON = "handbook-pure-json";
const string DEPARTMENT_SERVICE_PATH_PURE_JSON = "department-pure-json";
const string DSIGN_SERVICE_PATH_PURE_JSON = "dsign-pure-json";
const string SECURITY_CLASSIFICATION_SERVICE_PATH_PURE_JSON = "securityClassification-pure-json";
const string FILTER_SERVICE_PATH_PURE_JSON = "filter-pure-json";
const string HISTORY_SERVICE_PATH_PURE_JSON = "history-pure-json";
const string AGGREGATION_DATA_SERVICE_PATH_PURE_JSON = "aggregationData-pure-json";
const string ACCOUNT_SERVICE_PATH_PURE_JSON = "account-pure-json";
const string ACCOUNT_GROUP_SERVICE_PATH_PURE_JSON = "accountGroup-pure-json";
const string SCRIPT_DICTIONARY_SERVICE_PATH_PURE_JSON = "scriptDictionary-pure-json";
const string KNOWLEDGE_SERVICE_PATH_PURE_JSON = "knowledge-pure-json";
const string EXPORT_IMPORT_SERVICE_PATH_PURE_JSON = "exportImport-pure-json";
const string EXECUTION_MONITORING_PATH_PURE_JSON = "executionMonitoring-pure-json";
const string ANALITICS_PATH_PURE_JSON = "analitics-pure-json";