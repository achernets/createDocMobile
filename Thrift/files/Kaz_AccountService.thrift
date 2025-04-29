include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_UserManagementService.thrift"

namespace java core


/** Сервис для работы с аккаунтами */
service AccountService {
    /** Создать/изменить аккаунт */
    Kaz_types.Account createOrUpdateAccount(1: common.AuthTokenBase64 token, 2: Kaz_types.Account account, 3: string securityKey) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
    /** Получить аккаунт по идентификатору */
    Kaz_types.Account getAccount(1: common.AuthTokenBase64 token, 2: common.ID accountId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
    /** Получить список аккаунтов
     * Есть возможность фильтровать по:
     * - аккаунты, которых  нет у пользователя(fieldname: "userDoNotHasAccounts", fType: STTRING, fieldCondition: EQUAL, userId )
    **/
    list<Kaz_types.Account> getAllAccounts(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
    /** Получить количество аккаунтов **/
    i32 getCountAllAccounts(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
    /** Создать/изменить аккаунт */
    Kaz_types.Account createOrUpdateAccountExtended(1: common.AuthTokenBase64 token, 2: Kaz_types.Account account, 3: string securityKey,4: list<common.UserOrGroup> usersToAdd, 5: Kaz_UserManagementService.AccountUserDelegates delegates) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

}