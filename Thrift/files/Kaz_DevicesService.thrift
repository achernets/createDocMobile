include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_AuthService.thrift"

namespace java core


/** Сервис работы с мобильными устройствами */
service DevicesService {
  /** Получение списка устройств пользователя */
  list<Kaz_AuthService.Device> getAllMobileDevices(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Подтвердить устройство */
  Kaz_AuthService.Device responseMobileRegistration(1: common.AuthTokenBase64 token, 2: Kaz_AuthService.Device device, 3: string code) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Забыть мобильное устройство */
  bool forgotMobileRegistration(1: common.AuthTokenBase64 token, 2: common.ID udid, 3: common.ID newUdid) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}