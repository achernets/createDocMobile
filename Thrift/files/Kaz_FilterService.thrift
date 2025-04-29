include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"

namespace java core




/** Пользовательский фильтр */
struct CustomFilterItem {
  /** идентификатор */
  1: optional common.ID id;
  /** поле */
  2: optional string field;
  /** тип */
  3: optional filter.FilterFieldType fType;
  /** условие */
  4: optional filter.FilterCondition condition;
  /** значение */
  5: optional string value;
  /** признак использование сложного фильтра */
  6: bool useObject;
}

/** Группирующий фильтр по документу */
struct DocFilter{
  /** идентификатор */
  1: optional common.ID id;
  /** название */
  2: optional string oName;
  /** значение */
  3: optional string value;
  /** ключ */
  4: optional string key;
  /** набор фильтров */
  5: optional list<CustomFilterItem> filters;
  /** поля Deprecated*/
  6: optional string fieldsDeprecated;
  /* позиция */
  7: i32 positionMobile;
  /** используется в мобильных приложениях */
  8: bool forMobile;
  /* позиция */
  9: i32 positionRegistry;
  /** используется в реестрах */
  10: bool forRegistry;
  /* позиция */
  11: i32 positionDocument;
  /** используется в документах */
  12: bool forDocument;
  /** признак неизменяемого фильтра (Все документы) */
  13: bool fixed;
  /** видимость фильтра */
  14: optional bool visible;
  /** поле для сортировки документов по-умолчанию в реестрах (пользовательская настройка) */
  15: optional string sortingFieldInRegistry
  /** направление сортировки*/
  16: optional string sortingDirection
  /* описание*/
  17: optional string fDescription;
  /* Идентификатор реестра */
  18: optional string regId;
    /** название */
  19: optional map<string,string> oNameLoc;
}

/** Группирующий фильтры по документу с полем для сортировки по умолчанию */
struct DocFiltersWithSortColumn {
  /** Список фильтров */
  1: list<Kaz_types.DocColumn> docFilters;
  /** Поле для сортировки по умолчанию*/
  2: optional string defaultSortingField;
}

/** Сервис пользовательских фильтров*/
service FilterService {
/**
  forMobile - фильтр по флагу
  forRegistry - фильтр по флагу
**/
  list<DocFilter> getAllCustomDocFilters(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter, 3: bool personal) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание/изменение фильтра по документу */
  DocFilter createOrUpdateCustomDocFilter(1: common.AuthTokenBase64 token, 2: DocFilter filter, 3:list<common.ID> customFilterItems) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление фильтра по документу */
  bool removeCustomDocFilter(1: common.AuthTokenBase64 token, 2: common.ID docFilterId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  CustomFilterItem createOrUpdateCustomFilterItem(1: common.AuthTokenBase64 token, 2: CustomFilterItem filterItem) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  bool removeCustomFilterItem(1: common.AuthTokenBase64 token, 2: common.ID filterItemId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление списка кастомных фильтров к группам или пользователям. */
  bool addDocFiltersToUserGroups(1: common.AuthTokenBase64 token, 2: list<common.ID> docFilterIds, 3: list<common.UserOrGroup> userOrGroups) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление списка кастомных фильтров у групп или пользователей. */
  bool removeDocFiltersFromUserGroups(1: common.AuthTokenBase64 token, 2: list<common.ID> docFilterIds, 3: list<common.UserOrGroup> userOrGroups) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить список пользовательских фильтров для группы пользователей*/
  list<DocFilter> getAllDocFiltersByUserOrGroup(1: common.AuthTokenBase64 token, 2: common.UserOrGroupType type, 3: common.ID userOrGroupId, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить список всех пользователей, которым доступен кастомный фильтр*/
  list<common.UserOrGroup> getAllUserOrGroupsByDocFilterId(1: common.AuthTokenBase64 token, 2: common.ID docFilterId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Выгрузка фильтров в файл */
  binary exportDocFilters(1: common.AuthTokenBase64 token, 2: list<common.ID> docFilterIds) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Загрузка фильтров из файла. Возвращает error_map<filterName, error>  */
  map<string, string> importDocFilters(1: common.AuthTokenBase64 token, 2: binary json, 3: bool clearExistFilters) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<DocFilter> getDocFilterUserDefineList(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  bool changeDocFilterUserDefine(1: common.AuthTokenBase64 token, 2:list<DocFilter> toUpdate, 3:list<string> toRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Проверка пользовательского фильтра*/
  list<string> checkCustomDocFilters(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);



  /** получение количества объявленных колонок */
  common.count getCountAllDeclaredColumn(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** получение списока объявленных колонок */
  list<Kaz_types.DocColumn> getAllDeclaredColumn(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** изменение объвленных колонок */
  bool changeDeclaredColumns(1: common.AuthTokenBase64 token, 2: list<Kaz_types.DocColumn> toUpdate, 3: list<common.ID> toRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Сохранение пользовательских настроек колонок */
  list<Kaz_types.DocColumn> changeUserPreferencesColumn(1: common.AuthTokenBase64 token, 2: list<Kaz_types.DocColumn> toUpdate, 3: list<common.ID> toRemove, 4: bool forRegistry) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение пользовательских настроек колонок */
  list<Kaz_types.DocColumn> getAllUserPreferencesColumn(1: common.AuthTokenBase64 token, 2: common.ID registryId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение доступных колонок согласно шаблона, параметр forDocuments указывает на получение колонок для реестров или для документов */
  list<Kaz_types.DocColumn> getAllAggregateColumnsForDocuments(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter, 3: common.ID registryId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** получение списка колонок привязанных к представлению */
  list<Kaz_types.DocColumn> getAllColumnsForCustomDocFilter(1: common.AuthTokenBase64 token, 2:common.ID customDocFilterId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** изменение колонок привязанных к представлению */
  bool changeCustomDocFilterColumns(1: common.AuthTokenBase64 token, 2:common.ID customDocFilterId, 3:bool useDefaultColumns, 4: list<Kaz_types.DocColumn> toSave) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** получение списка колонок привязанных к представлению с полем сортировки по умолчанию */
  DocFiltersWithSortColumn getAllColumnsForCustomDocFilterWithSortingField(1: common.AuthTokenBase64 token, 2:common.ID customDocFilterId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** изменение колонок привязанных к представлению и поля сортировки по умолчанию*/
  bool changeCustomDocFilterColumnsAndDefaultSortingField(1: common.AuthTokenBase64 token, 2:common.ID customDocFilterId, 3:bool useDefaultColumns, 4: DocFiltersWithSortColumn toSave) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

}