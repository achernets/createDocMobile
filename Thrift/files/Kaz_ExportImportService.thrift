include "common.thrift"
include "ex.thrift"
include "Kaz_DocumentService.thrift"
include "Kaz_DocumentPatternService.thrift"
include "filter.thrift"
include "HB.thrift"

namespace java core


enum ImportAction {
  ACCEPT,
  CHANGE,
  REMOVE,
  NONE
}

struct ImportData {
  1: common.ID id;
  2: string name;
  3: optional list<Kaz_DocumentService.DocumentPatternStage> stageList;
  4: optional list<Kaz_DocumentService.DocumentPatternStagesLink> linkList;
  5: map<DiffType, i32> diffCounts;
}

enum DiffType {
  IMPORT_AVAILABLE_STAGE,
  IMPORT_NOMENCLATURE_NUMBER,
  IMPORT_USER,
  IMPORT_GROUP,
  IMPORT_HB,
  IMPORT_CONTENT
}

struct HBSettings {
  1: optional HB.HandBook handBook;
  2: optional Kaz_DocumentService.ContentItemHBValue hbValue;
}

struct DiffState {
  1: optional common.UserOrGroup user;
  2: optional common.UserOrGroup group;
  3: optional Kaz_DocumentPatternService.AvailablePatternStage availableStage;
  4: optional Kaz_DocumentService.ContentItem contentItem;
  5: optional Kaz_DocumentService.NomenclatureNumber nomenclatureNumber;
  6: optional HBSettings hbSettings;
}

struct Diff {
  1: DiffType type;
  2: DiffState imported;
  3: optional DiffState proposed;
  4: optional DiffState selected;
  5: ImportAction action;
}

service ExportImportService {

  binary exportPattern(1: common.AuthTokenBase64 token, 2: common.ID docPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<ImportData> getAllImportData(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  common.count getCountImportData(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  ImportData importPattern(1: common.AuthTokenBase64 token, 2: binary xmlFile, 3: common.ID accountId, 4:common.ID importedPatternId, 5:bool bpmRequired) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<Diff> getChanges(1: common.AuthTokenBase64 token, 2:common.ID importedPatternId, 3:DiffType diffType) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<Diff> applyChanges(1: common.AuthTokenBase64 token, 2:common.ID importedPatternId, 3: list<Diff> data) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  i32 finishImportPattern(1: common.AuthTokenBase64 token, 2:common.ID importedPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  bool removeImportData(1: common.AuthTokenBase64 token, 2: common.ID importedPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}