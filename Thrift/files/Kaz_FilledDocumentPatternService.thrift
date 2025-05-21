include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_DocumentService.thrift"
include "Kaz_DocumentPatternService.thrift"

namespace java core


struct FreezePatternValidation {
  1: Kaz_DocumentService.FreezeDocumentPattern fillPattern;
  2: list<ex.PreconditionException> exList;
}

/** Сервис управления слепками существующих шаблонов документов */
service FilledDocumentPatternService {
  /** Получение слепка существующего шаблона документа по common.ID */
  Kaz_DocumentService.FreezeDocumentPattern getFilledDocumentPattern(1: common.AuthTokenBase64 token, 2: common.ID filledDocumentPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Cоздание маршрута документа new */
  FreezePatternValidation createAndCheckFilledDocumentPattern(1: common.AuthTokenBase64 token, 2: Kaz_DocumentService.FreezeDocumentPattern freezeDocumentPattern, 3: list<Kaz_DocumentService.DocumentPatternStage> stages, 4:list<Kaz_DocumentService.PatternProcessRole> toUpdate) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Удаление маршрута документа */
  bool deleteFilledDocumentPattern(1: common.AuthTokenBase64 token, 2: common.ID filledDocumentPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка этапов слепка */
  list<Kaz_DocumentService.DocumentPatternStage> getAllFilledDocumentPatternStages(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: filter.KazFilter filter, 4: Kaz_DocumentPatternService.RuleSelector selector) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение этапа шаблона документа по common.ID */
  Kaz_DocumentService.DocumentPatternStage getFilledDocumentPatternStage(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3:common.ID stageId, 4: Kaz_DocumentPatternService.RuleSelector selector,5: Kaz_DocumentService.DocumentAccessPolicy policy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение информации, для вынесения решения */
  Kaz_DocumentService.DesicionInfo getSetDecisionInfo(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3:common.ID freezeLinkId, 4: Kaz_DocumentPatternService.RuleSelector selector, 5: Kaz_DocumentService.DocumentAccessPolicy policy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка дочерних этапов к заданному этапу */
  list<Kaz_DocumentService.DocumentPatternStage> getAllChildFilledDocumentPatternStages(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: common.ID stageId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение списка этапов слепка */
  list<Kaz_DocumentService.DocumentPatternStage> updateFilledDocumentPatternStageList(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: list<Kaz_DocumentService.DocumentPatternStage> documentPatternStage, 4: bool enEditCurrent) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Изменение связи в пределах заполненного шаблона */
  list<Kaz_DocumentService.DocumentPatternStagesLink> updateFilledDocumentPatternStagesLink(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: list<Kaz_DocumentService.DocumentPatternStagesLink> links) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение связей в контексте заполненного шаблона */
  list<Kaz_DocumentService.DocumentPatternStagesLink> getAllFilledDocumentPatternStagesLink(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка исполнителей этапа слепка */
  list<Kaz_DocumentPatternService.DocumentPatternStagesExecutor> getAllFilledDocumentPatternStageExecutors(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: common.ID stageId, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка исполнителей этапов слепка */
  map<common.ID, list<Kaz_DocumentPatternService.DocumentPatternStagesExecutor>> getFilledDocumentPatternStagesExecutors(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: list<common.ID> stageIds, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Изменение исполнителей из этапа слепка */
  bool changeFilledDocumentPatternStages(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: list<Kaz_DocumentService.DocumentPatternStage> stages) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение срока исполнения этапа документа и контрольной даты */
//  bool changeNextFilledDocumentPatternStage(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: list<ExecutorsData> executorsData) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** DEPRICATED Проверка слепка существующего шаблона документа на правильность заполнения этапов и связей между этапами */
  list<ex.PreconditionException> checkFilledDocumentPattern(1: common.AuthTokenBase64 token, 2: common.ID fillDocPatternId, 3: filter.KazFilter filter)  throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка процессных ролей
  * Есть возможность фильтровать по:
  *  name
  *  key
  *  fieldname: "IS_SINGLE_NOT_NULL", fType: STRING)  **/

  list<Kaz_DocumentService.PatternProcessRole> getFreezeProcessRoles(1: common.AuthTokenBase64 token, 2: common.ID docId, 3: Kaz_DocumentService.DocumentAccessPolicy policy 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение списка процессных ролей */
  list<Kaz_DocumentService.PatternProcessRole> changeFreezeProcessRoles(1: common.AuthTokenBase64 token, 2: common.ID docId, 3: Kaz_DocumentService.DocumentAccessPolicy policy 4: list<Kaz_DocumentService.PatternProcessRole> patternRolesToAdd, 5: set<string> keyIdToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка процессных переменных */
  list<Kaz_DocumentService.PatternVariable> getFreezeProcessVariables(1: common.AuthTokenBase64 token, 2: common.ID docId, 3: Kaz_DocumentService.DocumentAccessPolicy policy 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение списка процессных переменных */
  list<Kaz_DocumentService.PatternVariable> changeFreezePatternVariables(1: common.AuthTokenBase64 token, 2: common.ID docId, 3: Kaz_DocumentService.DocumentAccessPolicy policy, 4: list<Kaz_DocumentService.PatternVariable> patternVariablesToAdd, 5: set<string> keyIdToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}