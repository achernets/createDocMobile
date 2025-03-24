include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"

namespace java core


/**Сервис для работы с группами аккаунтов */
service AccountGroupService {
    /** создание/изменение группы аккаунтов */
    Kaz_types.AccountGroup createOrUpdateAccountGroup(1: common.AuthTokenBase64 token, 2: Kaz_types.AccountGroup accountGroup) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
    /** получить группу аккаунта по common.ID */
    Kaz_types.AccountGroup getAccountGroup(1: common.AuthTokenBase64 token, 2: common.ID accountGroupId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
    /** получение списка групп аккаунтов */
    list<Kaz_types.AccountGroup> getAllAccountGroup(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}