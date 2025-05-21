include "common.thrift"
include "ex.thrift"
include "HB.thrift"
include "filter.thrift"

namespace java core



/** Сервис справочников */
service HandBookService {
   /** id, name - по названию справочника
    * withUsers - с заполненной информацией о пользователях, которым разрешено редактирование контента
    * withAccounts - с заполненной информацией об аккаунтах
    * superAdmin - по всем аккаунтам
    * contentUpdate - для которых разрешено редактирование
    * columnId - по id колонки
 **/
   list<HB.HandBook> getAllHandBooks(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** количество справочников */
   i32 getCountAllHandBooks(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /**Для расчета флага редактирование*/
   HB.HandBook getHandBookById(1: common.AuthTokenBase64 token, 2: common.ID id, 3: bool withDeletedColumns) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** создать/изменить справочник */
   HB.HandBook createOrUpdateHandBook(1: common.AuthTokenBase64 token, 2: HB.HandBook handBook) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** обновление структуры справочника, ответ:
   notModified - колонки без изменений
**/
   map<string, list<HB.HBColumn>> refreshHandBookStructure(1: common.AuthTokenBase64 token, 2: common.ID id) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** создание/изменение строки в справочнике */
   void createOrUpdateHBRows(1: common.AuthTokenBase64 token, 2: common.ID hbId, 3: list<HB.HBRow> rows) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   /** Returns HB rows by filter
    *  Item fields:
    *  common.ID - row id
    *  order - order by, can be acs and desc, in addition value NEED specify columnId
    *  directValueOrId - find by value or id
    *  directDepRowId - find by depRowId
    *  directUserId - find by userId
    *  directValue - find by value
    *  directUserFullName - find by user FIO
    *  directUserAccountId - find by user accountId
    *  reverseId - find by many to many relationship to other HB. search by rowId in other HB
    *  reverseValue - find by many to many relationship to other HB. search by value in other HB
    *  reverseUserId - find by many to many relationship to other HB. search by userId in other HB
    **/
   list<HB.HBRow> getAllHandBookRows(1: common.AuthTokenBase64 token, 2: common.ID hbId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** получить количество строк в справочники */
   common.count getAllHandBookRowsCount(1: common.AuthTokenBase64 token, 2: common.ID hbId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   /**
    * Returns all HB values with different languages
    *
    * Item fields:
    * 1) hbColumnId - column id
    * 2) hbRowId - row id
    * 3) value
    * 4) language
    *
    * Filter by hbId is required. If the request will contain an empty filter then exception will occur
    **/
   list<HB.HBValue> getHandBookValues(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** удалить справочник */
   bool removeHandBook(1: common.AuthTokenBase64 token, 2: common.ID hbId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** удалить строку из справочника */
   bool removeHandBookRow(1: common.AuthTokenBase64 token, 2: common.ID hbId, 3: common.ID rowId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}