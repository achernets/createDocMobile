include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_types.thrift"

namespace java core


enum VoteAnswerType {
  POSITIVE,
  NEGATIVE,
  ABSTAINED
}

struct VoteAnswerParams {
  1: common.ID id;
  2: string answerName;
  3: VoteAnswerType answerType;
  4: bool legitimacy;
  5: common.DocPatternStageRequirement commentRequirement;
}

enum VoteVisibleType {
  OPEN,
  HIDDEN,
  SECRET
}

enum VoteParticipantType {
  VOTER,
  SECRETARY,
  CHAIRMAN
}

struct VoteParticipant {
  1: optional common.ID id;
  2: common.ID voteId;
  3: VoteParticipantType participantType;
  4: common.UserOrGroup user;
}

struct VoteUserAnswer {
  1: optional common.ID id;
  2: optional common.ID parentId;
  3: common.kazDate createDate;
  4: i32 iteration;
  5: optional string userComment;
  6: optional common.UserOrGroup user;
  7: optional common.UserOrGroup originalUser;
  8: optional common.UserOrGroup secretary;
  9: bool lastVersion;
  10: optional common.ID answerParamId
}

struct VoteSettings {
  1: common.ID voteId;
  2: list<VoteAnswerParams> answerParam;
  3: i32 quorum;
  4: i32 legitimacy;
  6: bool changeVoteEnable;
  7: VoteVisibleType visibleType;
  8: optional string processRoleVoters;
  9: optional string processRoleSecretary;
}

enum VoteType {
  VOTE,
  REPORT
}

enum VoteStatus {
  //ожидает
  HOLD,
  //голосувание началось
  STARTED,//VoteType.VOTE
  //секретарь может менять голоса, при включенной настройке
  FINISHED,//VoteType.VOTE
  //доповідь заслухано
  REPORTED,//VoteType.REPORT
  //доповідь не заслухано
  NOT_REPORTED//VoteType.REPORT
}

enum VoteResultType {
  SUCCESSFUL,
  NO_QUORUM,
  NO_LEGITIMACY,
  CANCELED
}

struct VoteResult {
  1: optional VoteResultType resultType;
  2: optional VoteAnswerParams voteAnswer;
  //проголосувало человек за решение
  3: i32 voted;
  //всего голосов
  4: i32 totalVoted;
}

struct VotePermissions {
  1: bool canVote;//VoteType.VOTE
  2: bool canChangeOwnDecision;//VoteType.VOTE
  3: bool canChangeAnyDecision;//VoteType.VOTE
  4: bool canVoteAny;//VoteType.VOTE
  5: bool canMarkReported;//VoteType.REPORT
  6: bool canMarkNotReported;//VoteType.REPORT
}

struct Vote {
  1: common.ID id;
  2: i32 iteration;
  3: VoteStatus voteStatus;
  4: list<VoteParticipant> participantList;
  5: optional VoteResult voteResult;
  6: optional VotePermissions votePermissions;
  7: optional list<VoteUserAnswer> voteUserAnswerList;
  8: optional VoteSettings voteSettings;
  9: optional VoteType voteType;
  10: bool completed;
}


/**Сервис для работы с группами аккаунтов */
service VoteService {
  VoteSettings getVoteSettings(1: common.AuthTokenBase64 token, 2: common.ID voteId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  VoteSettings updateVoteSettings(1: common.AuthTokenBase64 token, 2: VoteSettings voteSettings) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  Vote changeVoteStatus(1: common.AuthTokenBase64 token, 2: common.ID voteId, 3: VoteStatus voteStatus) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  Vote getFullVoteInfo(1: common.AuthTokenBase64 token, 2: common.ID voteId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  VoteUserAnswer writeVoteUserResponse(1: common.AuthTokenBase64 token, 2: common.ID voteId, 3: VoteUserAnswer voteAnswer) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<VoteUserAnswer> writeVoteUserResponsesBySecretary(1: common.AuthTokenBase64 token, 2: common.ID voteId, 3: list<VoteUserAnswer> voteAnswers) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  bool prepareVoteForTest(1: common.AuthTokenBase64 token, 2: common.ID voteId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  Vote restartVote(1: common.AuthTokenBase64 token, 2: common.ID voteId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<VoteUserAnswer> getVoteHistory(1: common.AuthTokenBase64 token, 2: common.ID voteId, 3: common.ID userId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}