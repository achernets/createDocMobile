include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"
include "Kaz_DocumentService.thrift"

namespace java core

struct UserObserver {
   1: common.ID id;
   2: common.UserOrGroup observer;
   3: common.UserOrGroup observedUser;
}

enum ObserverDocStatus {
   CLOSED,
   COMPLETED,
   INCOMPLETE,
   DEADLINE_EXPIRE,
   DEADLINE_ONCOMING,
   NEW,
   NO_REASSIGN
}

struct ObserverDocument {
   1: common.ID id;
   2: ObserverDocStatus docStatus;
   3: optional string regNumber;
   4: optional common.kazDate regDate;
   5: string docType;
   6: string docName;
   7: string executors;
   8: i32 missionCount;
   9: string systemNumber;
   10: common.kazDate createDate;
   11: optional list<ObserverCard> cards;
}

enum ObserverCardStatus {
    /** новая карта виконання, робіт по карте ще не було */
    NEW,
    /** s_in_work або was_in_work = true, Якщо в налаштуваннях системи взяття в роботу PROHIBITED, то всі картки NEW також повинні мати статус IN_WORK */
    IN_WORK,
    /** по карті продовжено термін виконання */
    DEADLINE_EXTENDED,
    /** карта була вручную переведена в цей статус в модулі моніторинга */
    CLOSED,
    /** карта була вручную переведена в цей статус в модулі моніторинга */
    STOP_CONTROL_COMPLETED,
    /** карта була вручную переведена в цей статус в модулі моніторинга */
    STOP_CONTROL_INCOMPLETED,
    /** карта відкликана, або закрита автоматично системою */
    CLOSED_AUTOMATICALLY
}

enum DeadlineStatus {
    DEADLINE_FAR,
    DEADLINE_ONCOMMING,
    DEADLINE_EXPIRED,
    CLOSED
}

struct ObserverCardComment {
   1: common.ID id;
   2: common.ID parentId;
   3: common.ID cardId;
   4: common.kazDate createDate;
   5: optional ObserverDocument relatedDocument;
   6: common.UserOrGroup author;
   7: string cardComment;
}

enum CardsByStatus {
    IN_WORK,
    IN_WORK_EXPIRE,
    IN_WORK_EXPIRE_SOON,
    COMPLETED,
    OUT_CONTROL
}

struct DeadLineExtention {
   1: common.ID id;
   2: common.kazDate createDate;
   3: common.kazDate oldDate;
   4: common.kazDate newDate;
   5: optional common.UserOrGroup user;
   6: optional common.UserOrGroup originalUser;
   7: bool lastChange;
}

struct ObserverCard {
   1: common.ID id;
   2: Kaz_DocumentService.DocumentExecutionOwnerType cardType;
   3: Kaz_DocumentService.ExecutionReassignType cardReassignType;
   4: optional string cardTaskComment;
   5: common.UserOrGroup cardUser;
   6: common.kazDate deadLineDate;
   7: ObserverCardStatus cardStatus;
   8: optional list<ObserverCardComment> cardComments;
   9: ObserverDocument document;
  10: ObserverCardStatus originalCardStatus;
  11: optional list<DeadLineExtention> deadLines;
  12: CardsByStatus dashboardStatus;
  13: DeadlineStatus deadlineStatus;
}

struct MailingPeriods {
   1: bool onOneDay,
   2: bool weekly,
   3: bool monthly
}

struct MailingUser {
    1: common.ID id;
    2: common.UserOrGroup user;
    3: optional list<common.UserOrGroup> controllers;
    4: bool mailing;
}

struct MailDocPatGroup {
    /* account id */
    1: common.ID id;
    2: optional common.ID groupId;
    3: optional common.ID patternId;
    4: string accountName;
    5: optional string groupName;
    6: optional string patternName;
}

struct MailSettings {
    /* user_id */
    1: common.ID id;
    2: bool forMe;
    3: bool forDelegate;
    4: bool forOtherUser;
    5: optional list<common.UserOrGroup> otherUsers;
}

service ExecutionMonitoringService {
   /** фильтра observerId, userId, documentPatternGroupId, docPatId, nbrOrsysNbr, doc_id */
   bool updateObservedUsers(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: list<common.UserOrGroup> toAdd, 4: list<common.UserOrGroup> toRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   list<common.UserOrGroup> getAllObservedUsers(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   i32 getCountObservedUsers(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /**
      * indexMonth - по месяцу
      * accountId - по аккаунту
      * documentPatternGroupId - по группе паттерна
      * docPatId - по паттерну
      * withoutReassigns - булевый признак отдавать все документы пользователя или только с перепоручением(если не заполнить, то по умолчанию true, что означает отдавать все документы)
    **/
   list<ObserverDocument> getAllObservedDocuments(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   i32 getCountObservedDocuments(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   list<ObserverCard> getAllObservedCards(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   i32 getCountObservedCards(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   Kaz_DocumentService.DocumentAccessPolicy getObservedDocumentAccessPolicy(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: common.ID documentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   bool changeObservedCardStatus(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: common.ID cardId, 4: ObserverCardStatus status) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   bool reverseObservedCardStatus(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: common.ID cardId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   ObserverCardComment createOrUpdateObserverComment(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: ObserverCardComment comment) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   bool deleteObserverComment(1: common.AuthTokenBase64 token, 2: common.ID commentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   binary exportDocumentsListToExcel(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   binary exportCardsListToExcel(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   bool extendCardDeadline(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: common.ID cardId, 4: common.kazDate newDeadlineDate) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   list<MailingUser> getMailingUsers(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   list<MailingUser> changeMailingUser(1: common.AuthTokenBase64 token, 2: list<MailingUser> toAdd, 3: list<common.ID> toRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   list<MailDocPatGroup> getMailDocGroups(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   list<MailDocPatGroup> changeMailDocGroup(1: common.AuthTokenBase64 token, 2: list<MailDocPatGroup> docPatGroups, 3: list<MailDocPatGroup> toRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   MailingPeriods getMailingPeriod(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   bool setMailingPeriod(1: common.AuthTokenBase64 token, 2: MailingPeriods mailingPeriods) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   MailSettings getMailSettings(1: common.AuthTokenBase64 token, 2: common.ID userId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   bool setMailSettings(1: common.AuthTokenBase64 token, 2: MailSettings mailSettings) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}