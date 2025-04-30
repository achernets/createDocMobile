include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_DocumentService.thrift"
include "Kaz_FilterService.thrift"

namespace java core


/** Роли, определяющие права при работе с шаблоном */
enum PatternRoles {
  /** Получение */
  VIEW,
  /** Создание */
  CREATE,
  /** Получение */
  INBOX,
  /** Отправка */
  OUTBOX,
  /** Администрирование */
  ADMIN
}

struct PatternData {
  1: list<Kaz_DocumentService.DocumentPatternStage> stages;
  2: list<Kaz_DocumentService.DocumentPatternStagesLink> links;
}

/** Условие включения правила */
enum RuleSelector {
  /* активно при редактировании */
  EDIT,
  /** активно при вынесении решения */
  DECISION,
  /** активно при создании */
  DOC_RULE
}

/** Исполнитель этапа шаблона документа */
struct DocumentPatternStagesExecutor {
  /** Идентификатор */
  1: optional common.ID id;
  /** Идентификатор этапа шаблона документа */
  2: optional common.ID docStageId;
  /** Пользователь или группа */
  3: optional common.UserOrGroup userOrGroup;
}

/*! Печатная форма документа */
struct DigitalView {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания документа */
  2: optional common.kazDate createDate;
  /** Идентификатор создателя */
  3: optional common.ID creatorId;
  /** Идентификатор типа документа */
  4: optional common.ID documentPattern;
  /** Название */
  5: optional string oName;
  /** Электронный документ */
  6: optional string context;
}

/** Варианты форм объекта */
enum AvailablePatternStageForm {
  /** круг -> start,end*/
  CIRCLE,
  /** прямокутник -> in_work*/
  RECTANGLE,
  /** ромб -> compare*/
  RHOMBUS,
  /** шестикутник -> external*/
  HEXAGON,
  /** -> mux*/
  ROUNDEDRECTANGLE,
  /** конверт -> email*/
  ENVELOPE,
  /** -> report*/
  PARALLELOGRAM
}

/** Тип проверки на редактирование/удаление документа */
enum ModifyEnable {
  /** Разрешено */
  ENABLED,
  /** Разрешено добавление */
  PARTIAL,
  /** Запрещено */
  DISABLED
}

/** Тип шаблона этапа */
enum AvailablePatternStageType {
    /** Внутренний */
    INTERNAL,
    /** Внутренний автоматический */
    AUTO,
    /** Внешний */
    EXTERNAL,
    /** Внутренний подпроцесс */
    SUB_PATTERN,
    /** Этап генерации отчета */
    REPORT,
    /** Скрытый этап */
    HIDDEN,
    /** Этап, на котором система может создавать дочерние документы, а также ожидать завершение дочерних документов */
    WAIT_CHILD_DOCS,
    /** Этап, на котором система будет создавать дочерние документы по Процессорной роли */
    CREATE_CHILD_BY_ROLE,
    /** Этап отправки уведомлений */
    EMAIL,
    /** Этап отправки СМС */
    SMS,
   /** Автоматический этап для совещаний */
    DISCUSSION_AUTO
}

struct AvailablePatternStage {
  /** Идентификатор */
  1: optional common.ID id;
  /** Форма объекта */
  2: optional AvailablePatternStageForm formAvail;
  /** Название */
  4: optional string nameAvail;
  /** Описание */
  5: optional string descriptionAvail;
  /** Статус этапа */
  6: optional Kaz_DocumentService.DocPatternStageStatus status;
  /** Входящие параметры */
  7: optional list<Kaz_DocumentService.StageParam> adParams;
  /** Возможные ответы */
  8: optional set<string> availableAnswers;
  /** Разрешены ли динамические переходы */
  9: optional ModifyEnable fixedDecisions;
  /** Масштаб объекта */
  12: i32 scale;
  /** Порядковый номер */
  13: i32 orderNum;
  /** Тип паттерна для групировки */
  14: optional Kaz_DocumentService.PatternType patternType;
  /** Доступная группа */
  15: optional string availableGroup;
  16: optional string stageType;
  /** Уникальный uuid */
  17: optional string uuid;
  /** заместо AvailablePatternStageType, тип этапа */
  18: string objectClass;
  /**Цвет границ */
  19: optional string colorShape;
  /**Цвет заливки */
  20: optional string colorBackground;
  /**Цвет текста */
  21: optional string colorFont;
  /** URL иконки */
  22: optional string iconUrl;
}

/** Способ автодобавления вложения */
enum PatternAttachmentTemplateAddType {
  BEFORE_DRAFT,
  AFTER_DRAFT
}

/** Шаблон вложения паттерна */
struct PatternAttachmentTemplate {
  /** Идентификатор */
  1: optional common.ID id;
  /** Идентификатор автора */
  2: optional common.ID creatorId
  /** Дата создания */
  3: optional common.kazDate createDate;
  /** Идентификатор паттерна */
  4: optional common.ID patternId;
  /** Имя */
  5: optional string oName;
  /** Размер вложения паттерна */
  6: i64 size;
  /** уникальный ID для работы с onlyOffice */
  7: common.ID externalId;
  /** Признак автодобавления */
  8: bool autoAdd;
  /** Запрет редактирования автоматического вложения при создании документа */
  9: bool disableEditAutoAttachmentOnCreate;
  /** Запрет удаления автоматического вложения при создании документа */
  10: bool disableDeleteAutoAttachmentOnCreate;
  /** Способ автодобавления вложения */
  11: PatternAttachmentTemplateAddType templateAddType;
  /** Идентификатор pre скрипта*/
  12: optional common.CompositeId addFunctionId;
}

/** Привязка пользователей к шаблонам */
struct PatternUserGroup {
/** Пользователь или группа */
  1: optional common.UserOrGroup userOrGroup;
  /** Роли */
  2: optional set<string> roles;
}

/** Основные данные связанного паттерна */
struct PatternRelationInfo {
  /** Идентификатор */
    1: optional common.ID id;
    /** Название шаблона документа */
    2: optional string name;
    /** Описание шаблона документа */
    3: optional string descript;
    /** Валидный/невалидный DocumentPattern */
    4: bool isValidState;
    /** Document pattern group */
    5: optional Kaz_DocumentService.DocumentPatternGroup documentPatternGroup;
    /** Pattern account */
    6: optional Kaz_types.Account account;
    /** тип паттерна*/
    7: optional Kaz_DocumentService.PatternType patternType;
}

/** Связи паттерна */
struct PatternRelationLink {
  /** Идентификатор паттерна от которого построена связь */
  1: common.ID parentId;
  /** Идентификатор паттерна к которому построена связь */
  2: common.ID childId;
  /** Тип связующего этапа (SUB_PATTERN, MUX) */
  3: AvailablePatternStageType stageType;
  /** Наименование связующего этапа */
  4: string stageName;
}

/** Структура зависимостей паттерна */
struct PatternRelationModel {
  /** Идентификатор паттерна, относительно которого построено дерево */
  1: common.ID patternId;
  /** Базовая информация о связанных паттернах */
  2: list<PatternRelationInfo> relationInfoList;
  /** Зависимости */
  3: list<PatternRelationLink> relationLinkList;
}

struct InfoForCreateDoc{
    1: list<Kaz_DocumentService.DocumentPatternStage> stages; //getAllDocumentPatternStagesForCreate
    2: list<Kaz_types.SecurityClassification> scGrifs; //getAllSecurityClassificationByPatternId
    3: list<PatternAttachmentTemplate> templates; //getAllPatternAttachmentTemplates
    4: list<Kaz_DocumentService.ContentHolder> holders; //getPatternContentHoldersCreateDoc
    5: Kaz_DocumentService.DocPermissions permissions;
}

/** Сервис управления шаблонами документов */
service DocumentPatternService {
  /** Cписок всех шаблонов документов
   по common.ID группы - documentPatternGroupId
   по названию - nameDocPattern
   по статусу (проверен или нет) isValidState, boolean, true
 * CREATE - с учетом списка людей, которым дано право создавать
 * VIEW -
 * INBOX -
 * OUTBOX -
 **/
  list<Kaz_DocumentService.DocumentPattern> getAllDocumentPatterns(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter, 3: bool withCurrentDocNumber) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Cписок всех шаблонов документов сгрупированных по имени */
  list<Kaz_DocumentService.SimpleDocumentPatternOrGroup> getAllDocumentPatternsGroupByName(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение шаблона документа по common.ID */
  Kaz_DocumentService.DocumentPattern getDocumentPattern(1: common.AuthTokenBase64 token, 2: common.ID docPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление шаблона документа */
  bool deleteDocumentPattern(1: common.AuthTokenBase64 token, 2: common.ID docPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** DEPRECARED Добавление/изменение шаблона документа  */
  Kaz_DocumentService.DocumentPattern createOrUpdateDocumentPattern(1: common.AuthTokenBase64 token, 2: Kaz_DocumentService.DocumentPattern documentPattern, 3: common.ID accountId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление шаблона документа  */
  Kaz_DocumentService.DocumentPattern createDocumentPattern(1: common.AuthTokenBase64 token, 2: Kaz_DocumentService.DocumentPattern documentPattern, 3: common.ID accountId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение шаблона документа  */
  Kaz_DocumentService.DocumentPattern updateDocumentPattern(1: common.AuthTokenBase64 token, 2: Kaz_DocumentService.DocumentPattern documentPattern, 3: common.ID accountId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Экспорт документа в виде xml черновика документа*/
  binary exportPatternAsDocumentDraftXML(1:common.AuthTokenBase64 token, 2:common.ID docPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение этапов шаблона */
  list<Kaz_DocumentService.DocumentPatternStage> getAllDocumentPatternStages(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: filter.KazFilter filter, 4: RuleSelector selector) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение этапа шаблона документа по common.ID */
  Kaz_DocumentService.DocumentPatternStage getDocumentPatternStage(1: common.AuthTokenBase64 token, 2: common.ID docPatternStageId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление этапа шаблона документа по ID с переводом документов на новый шаблон */
  bool deleteDocumentPatternStageAndMoveDocuments(1: common.AuthTokenBase64 token, 2: common.ID docPatternStageId, 3: common.ID newDocPatternStageId, 4: common.ID fillDocPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  PatternData createOrUpdateStagesAndLinks(1: common.AuthTokenBase64 token, 2: common.ID patternId, 3: list<Kaz_DocumentService.DocumentPatternStage> stages, 4: list<Kaz_DocumentService.DocumentPatternStagesLink> links) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка связей этапов шаблонов документов
  * Есть возможность фильтровать по:
    *  - родительскому этапу (fieldname: "parentStageId", fType: STRING)
    *  - дочернему этапу (fieldname: "childStageId", fType: STRING)
    *  - статусу дочернего этапа (fieldname: "childStageStatus", fieldvalue: "DocPatternStageStatus.<CHOOSE_STATUS>", fType: ENUMERATED)
    *  */
  list<Kaz_DocumentService.DocumentPatternStagesLink> getAllDocumentPatternStagesLinks(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: common.ID docPatternStageId, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение связи этапа шаблонов документа */
  Kaz_DocumentService.DocumentPatternStagesLink getDocumentPatternStageLink(1: common.AuthTokenBase64 token, 2: common.ID docPatternStageLinkId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление/изменение связи этапа шаблонов документа  */
  Kaz_DocumentService.DocumentPatternStagesLink createOrUpdateDocumentPatternStagesLink(1: common.AuthTokenBase64 token, 2: Kaz_DocumentService.DocumentPatternStagesLink documentPatternStagesLink) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление связи этапа шаблона документа по common.ID */
  bool deleteDocumentPatternStageLink(1: common.AuthTokenBase64 token, 2: common.ID docPatternStageLinkId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка исполнителей этапа */
  list<DocumentPatternStagesExecutor> getAllDocumentPatternStageExecutors(1: common.AuthTokenBase64 token, 2: common.ID docPatternStageId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление исполнителей к этапу */
  bool addExecutorsToDocumentPatternStage(1: common.AuthTokenBase64 token, 2: common.ID docPatternStageId, 3: list<common.UserOrGroup> userOrGroups) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление исполнителей из этапа */
  bool deleteExecutorsFromDocumentPatternStage(1: common.AuthTokenBase64 token, 2: common.ID docPatternStageId, 3: list<common.UserOrGroup> userOrGroups) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Проверка шаблона на правильность заполнения этапов и связей между этапами */
  list<ex.PreconditionException> checkDocumentPattern(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Cоздание/изменение блоков контента шаблона документа */
  list<Kaz_DocumentService.ContentItem> createOrUpdatePatternContentItems(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: list<Kaz_DocumentService.ContentItem> contentItems) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение группы шаблонов документов
  *  name - по названию
   * CREATE - с учетом списка людей, которым дано право создавать
   * VIEW -
   * INBOX -
   * OUTBOX -
 **/
  list<Kaz_DocumentService.DocumentPatternGroup> getAllDocumentPatternGroups(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение группы шаблонов документов сгрупированных по имени */
  list<Kaz_DocumentService.SimpleDocumentPatternOrGroup> getAllDocumentPatternGroupsGroupByName(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление/изменение группы шаблонов документов */
  Kaz_DocumentService.DocumentPatternGroup createOrUpdateDocumentPatternGroup(1: common.AuthTokenBase64 token, 2: Kaz_DocumentService.DocumentPatternGroup documentPatternGroup, 3: common.ID accountId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление группы шаблонов документов */
  bool deleteDocumentPatternGroup(1: common.AuthTokenBase64 token, 2: common.ID documentPatternGroupId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка доступных этапов (кроме удаленных)
   * accountId - поиск по идентификатору аккаунта
 **/
  list<AvailablePatternStage> getAllAvailableStages(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter, 3: Kaz_DocumentService.PatternType patternType) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение вариантов решений для этапа "внутреннего под шаблона"*/
  set<string> getAvailableLinkAnswersByPattern(1: common.AuthTokenBase64 token, 2: common.ID patternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление доступного этапа */
  bool removeAvailableStage(1: common.AuthTokenBase64 token, 2: common.ID availStageId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка цифровых шаблонов документа */
  list<DigitalView> getAllDigitalViews(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание/изменение цифрового шаблона документа */
  DigitalView createOrUpdateDigitalView(1: common.AuthTokenBase64 token, 2: DigitalView digitalView) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление цифрового шаблона документа */
  bool deleteDigitalView(1: common.AuthTokenBase64 token, 2: common.ID digitalViewId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Выгрузка шаблона документа в файл */
  binary exportDocumentPattern(1: common.AuthTokenBase64 token, 2: common.ID docPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Импорт шаблона документа, a так же stages, stageLinks */
  Kaz_DocumentService.DocumentPattern importDocumentPattern(1: common.AuthTokenBase64 token, 2: binary json, 3: map<string, string> docPatternNameLoc, 4: map<string, string> pDescriptionLoc, 5: string docPatternGroupId, 6: string accountId, 7:bool ignoreError) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** получение списка пользователей или групп, присоединенных к шаблону */
  list<PatternUserGroup> getPatternUserGroup(1: common.AuthTokenBase64 token, 2: common.ID docPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** изменение списка пользователей или групп, присоединенных к шаблону */
  bool createOrUpdatePatternUserGroup(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: list<PatternUserGroup> userOrGroups) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка ролей исполнителей
   *  доступные фильтры:
   *  name
   *  key
 **/
  list<Kaz_DocumentService.PatternProcessRole> getPatternProcessRoles(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение списка ролей исполнителей по паттерну */
  list<Kaz_DocumentService.PatternProcessRole> changePatternProcessRoles(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: list<Kaz_DocumentService.PatternProcessRole> userOrGroupsToAdd, 4: set<string> keyIdToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка переменных проекта */
  list<Kaz_DocumentService.PatternVariable> getPatternVariables(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение списка проектных переменных */
  list<Kaz_DocumentService.PatternVariable> changePatternVariables(1: common.AuthTokenBase64 token, 2: common.ID docPatternId, 3: list<Kaz_DocumentService.PatternVariable> patternVariablesToAdd, 4: set<string> keyIdToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление к доступным этапам список аккаунтов */
  bool addAvailablePatternStageToAccounts(1: common.AuthTokenBase64 token, 2: common.ID availablePatternStageId, 3: list<common.ID> accountIds) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка шаблонов вложений паттерна */
  list<PatternAttachmentTemplate> getAllPatternAttachmentTemplates(1: common.AuthTokenBase64 token, 2: common.ID patternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение шаблонона вложения паттерна */
  PatternAttachmentTemplate getPatternAttachmentTemplateById(1: common.AuthTokenBase64 token, 2: common.ID patternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создать/изменить шаблон вложения паттерна  */
  PatternAttachmentTemplate createOrUpdatePatternAttachmentTemplate(1: common.AuthTokenBase64 token, 2: PatternAttachmentTemplate patternAttachmentTemplate, 3: binary xmlFile) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Загрузить шаблон вложения паттерна */
  binary downloadPatternAttachmentTemplate(1: common.AuthTokenBase64 token, 2: common.ID patternAttachmentTemplateId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удалить шаблон вложения паттерна */
  bool removePatternAttachmentTemplate(1: common.AuthTokenBase64 token, 2: common.ID patternAttachmentTemplateId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Задать значение последовтельности (начальный номер документа) */
  bool changeStartDocNumberSequence(1: common.AuthTokenBase64 token, 2: common.ID patternId, 3: i64 value) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение всех контент контейнеров */
  list<Kaz_DocumentService.ContentHolder> getAllContentHolders(1: common.AuthTokenBase64 token, 2: common.ID patternId, 3: bool withContent, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение контент контейнеров */
  list<Kaz_DocumentService.ContentHolder> changeContentHolders(1: common.AuthTokenBase64 token, 2: list<Kaz_DocumentService.ContentHolder> toUpdate, 3: list<common.ID> toRemoveIds) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Получить структуру зависимостей паттерна */
  PatternRelationModel getPatternRelationModel(1: common.AuthTokenBase64 token, 2: string patternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получить номенклатурный номер по ID*/
  Kaz_DocumentService.NomenclatureNumber getNomenclatureNumber(1: common.AuthTokenBase64 token, 2:common.ID nomenclatureNumberId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить все номенклатурные номера доступные пользователю (accountId == null).
      Либо получить все номенклатурные номера доступные для назначению шаблону (accountId = docPattern.getAccountId) */
  list<Kaz_DocumentService.NomenclatureNumber> getAllNomenclatureNumber (1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить количество номеров доступных пользователю */
  common.count getCountAllNomenclatureNumber (1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание/обновление номенклатурного номера */
  Kaz_DocumentService.NomenclatureNumber createOrUpdateNomenclatureNumber(1: common.AuthTokenBase64 token, 2: Kaz_DocumentService.NomenclatureNumber nomenclatureNumber) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление номенклатурного номера */
  bool removeNomenclatureNumber(1: common.AuthTokenBase64 token, 2:common.ID nomenclatureNumberId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получить номенклатурную группу по ID */
  Kaz_DocumentService.NomenclatureGroup getNomenclatureGroup(1: common.AuthTokenBase64 token, 2:common.ID nomenclatureGroupId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить все номенклатурные группы */
  list<Kaz_DocumentService.NomenclatureGroup> getAllNomenclatureGroup (1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить количество номенклатурных групп */
  common.count getCountAllNomenclatureGroup (1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание/обновление номенклатурной группы */
  Kaz_DocumentService.NomenclatureGroup createOrUpdateNomenclatureGroup(1: common.AuthTokenBase64 token, 2: Kaz_DocumentService.NomenclatureGroup nomenclatureGroup) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление номенклатурной группы */
  bool removeNomenclatureGroup(1: common.AuthTokenBase64 token, 2:common.ID nomenclatureGrouprId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить структуры необходимые для создания документа */
  InfoForCreateDoc getInfoForCreateDoc(1: common.AuthTokenBase64 token, 2: common.ID patternId, 3: common.ID parentDocId, 4:Kaz_DocumentService.DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить все ContentItem для паттерна */
  list<Kaz_DocumentService.ContentItem>  getPatternContentItems(1: common.AuthTokenBase64 token, 2: common.ID patternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  PatternData createOrUpdateStagesAndLinksEx(1: common.AuthTokenBase64 token, 2: common.ID patternId, 3: list<Kaz_DocumentService.DocumentPatternStage> stages, 4: list<Kaz_DocumentService.DocumentPatternStagesLink> links, 5: list<common.ID> stageToRemove, 6: list<common.ID> linkToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка доступных динамический действий */
  list<Kaz_DocumentService.AvailableAction> getAvailableActionList(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавить в очередь ночных задач задачу на перерасчет доп. полей документа (С1-С20) */
  bool addPatternNightlyDocFieldsTask(1: common.AuthTokenBase64 token, 2: common.ID patternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** получение списка колонок привязанных к шаблону */
  list<Kaz_types.DocColumn>getAllColumnsForPattern(1: common.AuthTokenBase64 token, 2:common.ID patternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** изменение колонок привязанных к шаблону */
  bool changePatternColumns(1: common.AuthTokenBase64 token, 2:common.ID patternId, 3:bool useDefaultColumns, 4: list<Kaz_types.DocColumn> toSave) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** получение списка колонок привязанных к шаблону */
  list<Kaz_types.PDFPostDecorator>getAllPDFPostDecoratorForPattern(1: common.AuthTokenBase64 token, 2:common.ID patternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** изменение колонок привязанных к шаблону */
  bool changePatternPDFPostDecorator(1: common.AuthTokenBase64 token, 2:common.ID patternId, 3:bool useDefaultPDFPostDecorators, 4: list<Kaz_types.PDFPostDecorator> toSave) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить список разрешенных  */
  list<Kaz_DocumentService.ContentItemType> getAllowedContentItemType(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Сменить KSP номер */
  bool changeKSPNumber(1: common.AuthTokenBase64 token, 2:common.ID patternId, 3:common.ID departmentId, 4:i32 kspNumber) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<Kaz_DocumentService.AvailableSubStatus> getSubStatusesConfig(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}