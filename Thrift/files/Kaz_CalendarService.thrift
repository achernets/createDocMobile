include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_DocumentService.thrift"

namespace java core


/** Дедлайн */
struct Deadline {
  /** Идентификатор */
  1: optional common.ID id;
  /** Идентификатор документа */
  2: optional common.ID documentId;
  /** Номер документа */
  3: optional string numberDocument;
  /** Название документа */
  4: optional string documentName;
  /** Идентификатор шаблона документа */
  5: optional common.ID documentPatternId;
  /** Имя автора */
  6: optional string authorName;
  /** Тип действия */
  7: optional Kaz_DocumentService.DocPatternStageActionType actionType;
  /** Дата поручения карточки документа */
  8: optional common.kazDate assignedDate;
  /** Дата перепоручения карточки документа */
  9: optional common.kazDate reassignedDate;
  /** Срок действия карточки документа */
  10: common.kazDate deadlineDate;
  /** Флаг контроля */
  11: bool control;
  /** Уведомлен пользователь о дедлайне */
  12: bool informedAboutDeadline;
  /** Системный номер документа */
  13: optional string documentSystemNumber;
  /** Статус документа */
  14: optional Kaz_DocumentService.DocPatternStageStatus documentStatus;
  /** Иконка статуса документа */
  15: optional Kaz_DocumentService.DocumentIconType icon;
}

/** Справочник нерабочих дней */
struct WeekendDictionary {
  /** Идентификатор */
  1: common.ID id;
  /** Нерабочий день */
  2: common.kazDate weekendDate;
  /** Праздничный */
  3: bool holiday;
}

/** Сервис работы с календарем */
service CalendarService {
  /** Получение списка дедлайнов по документам с ... по */
  list<Deadline> getAllDeadlines(1: common.AuthTokenBase64 token, 2: common.kazDate beginDate, 3: common.kazDate endDate, 4: list<common.UserOrGroup> usersOrGroups, 5: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение количества дедлайнов за период */
   i32 getCountAllDeadlines(1: common.AuthTokenBase64 token, 2: common.kazDate beginDate, 3: common.kazDate endDate, 4: list<common.UserOrGroup> usersOrGroups, 5: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка группированных дедлайнов за время с... по */
  map<common.kazDate, common.count> getAllGroupedDeadlines(1: common.AuthTokenBase64 token, 2: common.kazDate beginDate, 3: common.kazDate endDate, 4: list<common.UserOrGroup> usersOrGroups, 5: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка автоматических переназначений (моих и на меня) */
  list<Kaz_DocumentService.DocumentReassign> getAllReassignments(1: common.AuthTokenBase64 token, 2: common.kazDate beginDate, 3: common.kazDate endDate, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка всех нерабочих дней
   * weekendDate - по дате
 **/
  list<WeekendDictionary> getAllWeekendDictionaries(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение записей в справочнике нерабочих дней */
  list<WeekendDictionary> changeWeekendDictionaries(1: common.AuthTokenBase64 token, 2: list<WeekendDictionary> toUpdate, 3: list<common.ID> toRemove, 4:filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Заполнение справочника нерабочих дней выходными датами за период */
  list<WeekendDictionary> populateWeekends(1: common.AuthTokenBase64 token, 2: common.kazDate dateFrom, 3:common.kazDate dateTo, 4:filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Конвертирование Jira времени в конкретную дату*/
  common.kazDate convertJiraTimeToDate(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: string jiraPeriod) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}