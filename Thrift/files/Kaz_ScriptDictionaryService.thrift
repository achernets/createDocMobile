include "common.thrift"
include "ex.thrift"
include "filter.thrift"

namespace java core


enum ScriptDictionaryType {
  DRL
}

struct ScriptDictionary {
  1: common.CompositeId id;
  2: optional string oName;
  3: optional string oDescription;
  4: string script;
  5: bool valid;
  6: ScriptDictionaryType type;
}

/** Сервис работы со справочником скриптов */
service ScriptDictionaryService {
  /** Получение списка справочника всех скриптов */
  list<ScriptDictionary> getAllScriptDictionaries(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение скрипта по его составному common.ID */
  ScriptDictionary getScriptDictionaryById(1: common.AuthTokenBase64 token, 2: common.CompositeId id, 3: bool withContext) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание/редактирование справочника скрипта */
  ScriptDictionary createOrUpdateScriptDictionary(1: common.AuthTokenBase64 token, 2: ScriptDictionary scriptDictionary) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Валидация скрипта */
  list<string> validation(1: common.AuthTokenBase64 token, 2: ScriptDictionary scriptDictionary) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление скрипта */
  bool removeScriptDictionary(1: common.AuthTokenBase64 token, 2: common.CompositeId id) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}