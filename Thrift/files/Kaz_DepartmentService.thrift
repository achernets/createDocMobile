include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"

namespace java core


/** Сервис организационных структур*/
service DepartmentService {
   /** Получение списка организационных структур */
   list<common.OrgStructure> getAllOrgStructure(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Изменение организационной структуры */
   common.OrgStructure createOrUpdateOrgStructure(1: common.AuthTokenBase64 token, 2: common.OrgStructure orgStructure) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Удаление организационной структуры */
   bool removeOrgStructure(1: common.AuthTokenBase64 token, 2: common.ID orgStructureId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Получение списка всех подразделений
   * список только нод с пользователями - onlyWithUsers
    * orgStructureId - по оргструктуре
    * accountGroupId - по группе аккаунтов
    * orgStructureCode - по коду
    * hasChild - если передать true вернется список нод только у которых есть дочерние ноды
    * searchByNameOrShortName - по полному названию подразделения + по краткому названию
    * **/
   list<common.Department> getAllDepartments(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Получение списка пользователей по организационной структуре */
   list<common.UserOrGroup> getUsersByDepartment(1: common.AuthTokenBase64 token, 2: common.ID departmentId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Получение списка пользователей по организационной структуре */
   common.count getCountUsersByDepartment(1: common.AuthTokenBase64 token, 2: common.ID departmentId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /**Обновление параметров департамента (аккаунт и организационной структуры код)*/
   common.Department createOrUpdateDepartment(1: common.AuthTokenBase64 token, 2:common.Department department) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Удаление организационной структуры */
   bool removeDepartment(1: common.AuthTokenBase64 token, 2: common.ID departmentId, 3:common.RemoveActionType removeType) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Получение списка организационных структур (своя + все родительские)
   * orgStructureId - по оргструктуре
   * **/
   list<common.Department> getAllDepartmentsForUser(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: bool withParent, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** Изменения списка департаментов, привязаных к пользователю */
   list<common.Department> changeUserDepartments(1: common.AuthTokenBase64 token, 2: common.ID userId, 3:list<common.Department>  toAdd, 4: list<common.ID> toRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** переместить департамент*/
   bool moveDepartment(1: common.AuthTokenBase64 token, 2: common.ID departmentId, 3: common.ID toDepartmentId, 4: bool withChilds) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}