include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_DocumentService.thrift"

namespace java core


/** Сервис грифов секретности  */
service SecurityClassificationService {
  /** Получить грифы
  * Есть возможность фильтровать по:
  *  - названию (fieldname: "name", fType: STRING)
   * - группе (fieldname: "group", fType: STRING)
   * - названию или группе (fieldname: "nameOrGroup", fType: STRING)
 **/
  list<Kaz_types.SecurityClassification> getAllSecurityClassification(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить количество грифов
    * Есть возможность фильтровать по:
    *  - названию (fieldname: "name", fType: STRING)
    * - группе (fieldname: "group", fType: STRING)
    * - названию или группе (fieldname: "nameOrGroup", fType: STRING)
  **/
  i32 getCountAllSecurityClassification(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создать/изменить гриф секретности */
  Kaz_types.SecurityClassification createOrUpdateSecurityClassification(1: common.AuthTokenBase64 token, 2: Kaz_types.SecurityClassification securityClassification) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление грифа секретности **/
  bool removeSecurityClassification(1: common.AuthTokenBase64 token, 2: common.ID securityClassificationId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление списка грифов секретности к группам или пользователям. */
  bool addSecurityClassificationsToUserGroups(1: common.AuthTokenBase64 token, 2: list<common.ID> securityClassificationIds, 3: list<common.UserOrGroup> userOrGroups) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление списка грифов секретности у групп или пользователей. */
  bool removeSecurityClassificationsFromUserGroups(1: common.AuthTokenBase64 token, 2: list<common.ID> securityClassificationIds, 3: list<common.UserOrGroup> userOrGroups) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить список грифов секретности для группы пользователей*/
  list<Kaz_types.SecurityClassification> getAllSecurityClassificationsByUserOrGroup(1: common.AuthTokenBase64 token, 2: common.UserOrGroupType type, 3: common.ID userOrGroupId, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить грифы по паттерн common.ID */
  list<Kaz_types.SecurityClassification> getAllSecurityClassificationByPatternId(1: common.AuthTokenBase64 token, 2: common.ID patternId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить грифы по документ common.ID */
  list<Kaz_types.SecurityClassification> getAllSecurityClassificationByDocumentId(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление списка грифов к шаблону документа */
  bool addSecurityClassificationsToDocPattern(1: common.AuthTokenBase64 token, 2: list<common.ID> securityClassificationsId, 3: common.ID docPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление списка грифов у шаблона документа */
  bool removeSecurityClassificationsFromDocPattern(1: common.AuthTokenBase64 token, 2: list<common.ID> securityClassificationsId, 3: common.ID docPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление списка грифов секретности к документу */
  bool addSecurityClassificationsToDocument(1: common.AuthTokenBase64 token, 2: list<common.ID> securityClassificationsId, 3: common.ID documentId, 4: Kaz_DocumentService.DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение списка грифов секретности к документу */
  bool changeSecurityClassificationsForDocument(1: common.AuthTokenBase64 token, 2: list<common.ID> addedSecurityClassificationsId, 3: list<common.ID> removedSecurityClassificationsId, 4: common.ID documentId, 5: Kaz_DocumentService.DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление списка грифов секретности у документу */
  bool removeSecurityClassificationsFromDocument(1: common.AuthTokenBase64 token, 2: list<common.ID> securityClassificationsId, 3: common.ID documentId, 4: Kaz_DocumentService.DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка зависящих грифов секретности */
  list<Kaz_types.SecurityClassification> getAllSecurityClassificationDependencies(1: common.AuthTokenBase64 token, 2: common.ID securityClassificationId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление зависящих грифов к грифу безопасности */
  bool addSecurityClassificationDependencies(1: common.AuthTokenBase64 token, 2: common.ID securityClassificationId, 3: list<common.ID> securityClassificationsId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление зависящих грифов с грифа безопасности */
  bool removeSecurityClassificationDependencies(1: common.AuthTokenBase64 token, 2: common.ID securityClassificationId, 3: list<common.ID> securityClassificationsId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}