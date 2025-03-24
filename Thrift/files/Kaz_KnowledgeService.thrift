include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_DocumentService.thrift"

namespace java core


/** База знаний */
struct KnowledgeBase {
  /** Идентификатор */
  1: common.ID id;
  /** Аккаунт */
  2: Kaz_types.Account account;
  /** Название */
  6: string kName;
  /** Название на разных языках */
  7: map<string, string> kNameLoc;
}

/** Страница базы знаний */
struct KnowledgeTree {
  /** Идентификатор */
  1: common.ID id;
  /** Идентифакатор радительской страницы */
  2: common.ID parentId;
  /** Идентификатор Базы знаний */
  3: common.ID knowledgeBaseId;
  /** Название */
  4: string kName;
  /** Название на разных языках */
  5: map<string, string> kNameLoc;
  /** Признак наличия дочерних страниц */
  6: bool hasChilds;
  /** Порядковый номер */
  7: i32 tOrder;
  /** Признак отслеживания изменений страницы */
  8: bool listenChanges;
  /** "хлебные крошки" - перечень идентификаторов от родилельского */
  9: string pathIds;
}

/** Страница базы знаний, со списком разрешенных пользователей/групп на доступ */
struct KnowledgeTreeNode {
  /** Страница базы знаний */
  1: KnowledgeTree knowledgeTree;
  /** Список разрешенных пользователей/групп */
  2: list<common.UserOrGroup> restrictionList;
}

/** Статус документа базы знаний */
enum KnowledgeDocumentStatus {
  /** Активный */
  ACTIVE,
  /** Отменет */
  CANCELED,
  /** Внесены изменения */
  EDITED
}

/** Документ базы знаний */
struct KnowledgeDocument {
  /** Идентификатор */
  1: optional common.ID id;
  /** Идентификатор страницы */
  2: optional common.ID nodeTreeId;
  /** Идентификатор документа */
  3: common.ID documentId;
  /** Название */
  4: string kName;
  /** Теги */
  5: string tagList;
  /** Количество вложений */
  6: i32 attachmentCount;
  /** Название на разных языках */
  7: optional map<string, string> dNameLoc;
  /** Вложения */
  8: optional list<Kaz_DocumentService.Attachment> attachments;
  /** Контент контейнеры для текущего этапа */
  9: optional list<Kaz_DocumentService.ContentHolder> contentHolders;
  /** Доступ к документу */
  10: optional Kaz_DocumentService.DocumentAccessPolicy policy;
  /** Статус документа базы знаний */
  11: KnowledgeDocumentStatus status;
  /** Дата создания (записи в БЗ) */
  12: common.kazDate createDate;
  /** Дата регистрации (Документа) */
  13: optional common.kazDate regDate;
  /** Рег. номер (Документа) */
  14: optional string regNumber;
  /** Системный номер (Документа) */
  15: string sysNumber;
  /** Автор документа */
  16: common.UserOrGroup docAuthor;
  /** Автор (Записи в БЗ) */
  17: common.UserOrGroup creator;
  /** Права доступа к текущему вложению */
  18: optional KnowledgeDocumentPermission knowledgeDocumentPermission;
  /** Связи документа */
  19: optional list<KnowledgeDocumentRelation> relations;
  /** Комментарий */
  20: optional string statusComment;
  /** Департамент автора документа */
  21: optional string docAuthorDepartment;
}

/** Список возможных ключей */
enum KnowledgeHistoryKey {
  KNOWLEDGE_TREE_NODE_REMOVE, // удаление дерева базы знаний
  KNOWLEDGE_TREE_NODE_UPDATE, // измение дерева базы знаний
  KNOWLEDGE_TREE_DOCUMENT_ADD, // добавление документа в базу знаний
  KNOWLEDGE_TREE_DOCUMENT_REMOVE, // удаление документа из базы знаний
  KNOWLEDGE_TREE_DOCUMENT_OPEN, // открытие документа из базы знаний
  KNOWLEDGE_TREE_DOCUMENT_EDIT // редактирование документа из базы знаний
}

/** Тип параметра истории базы знаний */
enum KnowledgeHistoryParamType {
  KNOWLEDGE_TREE_NODE,
  KNOWLEDGE_TREE_DOCUMENT,
  KNOWLEDGE_USER,
  KNOWLEDGE_GROUP
}

/** Параметр истории базы знаний  */
struct KnowledgeHistoryParam {
  1: KnowledgeHistoryParamType type,
  2: optional string value,
  3: optional common.ID id,
  4: bool isRemoved;
  5: list<KnowledgeHistoryParam> childParams;
}

/** История базы знаний */
struct KnowledgeHistory {
  1: common.ID id;
  2: common.kazDate createDate;
  3: optional common.UserOrGroup authorOriginal;
  4: common.UserOrGroup author;
  5: string historyKey;//KnowledgeHistoryKey.toString
  6: list<KnowledgeHistoryParam> historyParamList;
}

/** Страница истории базы знаний*/
struct KnowledgeHistoryPage {
  1: list<KnowledgeHistory> historyList;
  /** Количество */
  2: common.count totalCount;
}

struct KnowledgeColumnPage {
  1: common.count count;
  2: list<KnowledgeColumn> columnList;
}

struct KnowledgeColumn {
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
}

struct KnowledgeElementPage {
  1: i32 count;
  2: list<KnowledgeElement> elementList;
}

struct KnowledgeElement {
  1: optional KnowledgeTree knlgTree;
  2: optional KnowledgeDocument knlgDocument;
}

/** Список разрешения для документа базы знаний */
struct KnowledgeDocumentPermission {
  /** редактирование документа */
  1: bool canEdit;
  /** редактирование названия документа */
  2: bool canEditStatic;
  /** удаление документа */
  3: bool canDelete;
}
/** Тип связи */
enum KnowledgeDocRelationType {
  /** Главный */
  PARENT,
  /** Дочерний */
  CHILD,
  /** Другой тип */
  OTHER
}

/** Связь между документами */
struct KnowledgeDocumentRelation {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания связи */
  2: optional common.kazDate createDate;
  /** Идентификатор 1-го документа */
  3: optional common.ID knlgDocId1;
  /** Идентификатор 2-го документа */
  4: optional common.ID knlgDocId2;
  /** Имя 2-ого документа **/
  5: optional string doc2Name;
  /** Путь 2-ого документа */
  6: optional string doc2Path;
  /** Статус документа базы знаний */
  7: KnowledgeDocumentStatus doc2Status;
  /** Коментарий */
  8: optional string comment;
  /** Тип связи между документами */
  9: optional KnowledgeDocRelationType relationType;
  /** Идентификатор дерева 2-го документа */
  10: optional string knlgDocNodeTreeId2;
}

/** Связи документов */
struct KnowledgeDocumentRelationLink {
  /** Идентификатор документа от которого построена связь */
  1: common.ID fromId,
  /** Идентификатор документа к которому построена связь */
  2: common.ID toId,
  /** Тип связи */
  3: KnowledgeDocRelationType linkType;
}

/** Основные данные связанного документа */
struct KnowledgeDocumentRelationInfo {
  /** Идентификатор */
  1: common.ID id;
  /** Название документа **/
  2: optional string name;
  /** Статус документа базы знаний */
  3: KnowledgeDocumentStatus status;
}

/** Структура зависимостей документа */
struct KnowledgeDocumentRelationModel {
  /** Идентификатор документа, относительно которого построено дерево */
  1: common.ID knlgDocId;
  /** Базовая информация о документе */
  2: list<KnowledgeDocumentRelationInfo> knlgDocRelInfoList;
  /** Зависимости */
  3: list<KnowledgeDocumentRelationLink> knlgDocRelLinkList;
}

/** Сервис "Базы знаний" */
service KnowledgeService {
  /* Получение списка баз знаний */
  list<KnowledgeBase> getAllKnowledgeBase(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Изменение базы знаний */
  KnowledgeBase changeKnowledgeBase(1: common.AuthTokenBase64 token, 2: KnowledgeBase knowledgeBaseToUpdate, 3:common.ID idToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /* Получение ноды пользователем
  *  сортировка: kName - по имени
  */
  list<KnowledgeTree> getKnowledgeTree(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Подписаться/отписаться на получение уведомлений при добалении документа в ноду */
  bool changeListenPreference(1: common.AuthTokenBase64 token, 2:common.ID treeId, 3:bool listenChanges) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Получение ноды знаний администратором */
  list<KnowledgeTreeNode> getKnowledgeTreeNode(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Создание/изменение ноды знаний*/
  KnowledgeTreeNode createOrUpdateKnowledgeTreeNode(1: common.AuthTokenBase64 token, 2: KnowledgeTreeNode treeNode) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление ноды знаний */
  bool removeKnowledgeTreeNode(1: common.AuthTokenBase64 token, 2: common.ID nodeTreeId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка документов раздела базы знаний */
  list<KnowledgeDocument> getAllKnowledgeDocuments(1: common.AuthTokenBase64 token, 2:common.ID nodeTreeId, 3:filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение количества документов раздела базы знаний */
  i32 getCountAllKnowledgeDocuments(1: common.AuthTokenBase64 token, 2:common.ID nodeTreeId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение деталей документа раздела базы знаний, при этом accessPolicy - доступ к разделу документу знаний */
  KnowledgeDocument getKnowledgeDocument(1: common.AuthTokenBase64 token, 2:common.ID knowledgeDocumentId, 3:Kaz_DocumentService.DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Для добавления документа в базу знаний в структуре KnowledgeDocument нужно заполнить детали  */
  set<common.ID> bindDocumentToKnowledge(1: common.AuthTokenBase64 token, 2:set<common.ID> knowledgeIdsToBind, 3:KnowledgeDocument knowledgeDocument, 4:Kaz_DocumentService.DocumentAccessPolicy policyToDocument) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление документа из базы знаний */
  set<common.ID> unbindDocumentFromKnowledge(1: common.AuthTokenBase64 token, 2:set<common.ID> knowledgeIdsToUnbind, 3:common.ID documentId, 4:Kaz_DocumentService.DocumentAccessPolicy policyToDocument) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Редактирование деталей документа раздела базы знаний, при этом accessPolicy - доступ к разделу документу знаний */
  KnowledgeDocument editKnowledgeDocument(1: common.AuthTokenBase64 token, 2:common.ID knowledgeDocumentId, 3: map<string, string> dNameLoc, 4:set<common.ID> contentHoldersToAdd, 5:set<common.ID> contentHoldersToRemove, 6:set<common.ID> attachmentsToAdd, 7:set<common.ID> attachmentsToRemove, 8:common.ID treeId, 9:Kaz_DocumentService.DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение страницы истории базы знаний
  * Доступна фильтрация по
     key - ключ
     knlgTreeId - иденификатор папки
     knlgDocumentId - идентификатор документы
     authorId - автор документа в базе знаний
  **/
  KnowledgeHistoryPage getKnowledgeHistoryPage(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение колонок базы знаний */
  KnowledgeColumnPage getKnowledgeColumns(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  bool changeKnowledgeColumns(1: common.AuthTokenBase64 token, 2: list<KnowledgeColumn> toUpdate) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**
  *  - по названию (fieldname: "kName", fType: STRING, fieldCondition: EQUAL)
  *  - по папке (fieldname: "parentId", fType: STRING, fieldCondition: EQUAL,NULL)
  *  - по статусу (status, fType: ENUMERATED, fieldCondition: KnowledgeDocumentStatus)
  *  - Системный,рег номер (Документа) (nbrOrsysNbr, fType: String, fieldCondition: CONTAIN)
  *  - Автор документа (userId, fType: String, fieldCondition: EQUAL)
  *  - Автор (Записи в БЗ) (creatorId, fType: String, fieldCondition: EQUAL)
  *  - Дата создания (записи в БЗ) (createDate, fType: DATE, fieldCondition: BETWEEN)
  *  - Дата регистрации (Документа) (regDate, fType: DATE, fieldCondition: BETWEEN)
  *    Сортировка доступна по полям:   createDate, regDate, regNumber, sysNumber, docAuthor, creatorId, kName
  **/
  KnowledgeElementPage getKnowledgeElementPage(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Создание связей между документами */
  list<KnowledgeDocumentRelation> changeKnlgDocRelations(1: common.AuthTokenBase64 token, 2:list<KnowledgeDocumentRelation> toCreate, 3:list<common.ID> toRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить структуру зависимостей документа */
  KnowledgeDocumentRelationModel getKnlgDocumentRelationModel(1: common.AuthTokenBase64 token, 2: common.ID knowledgeDocumentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Метод на поиск документов базы знаний, вне зависимости от доступа (в ответ только id и название)
  *   - по имени,номеру документа (nameOrNumber, fType: String, fieldCondition: CONTAIN)
  *   - по имени документа в базе знаний (knlgDocName, fType: String, fieldCondition: CONTAIN)
  */
  list<KnowledgeDocument> getTinyKnlgDocsByFilterNoPermission(1:common.AuthTokenBase64 token, 2:filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

}
