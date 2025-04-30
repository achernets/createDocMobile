namespace java core
include "common.thrift"
include "ex.thrift"
include "filter.thrift"

const string ANALITICS_KEY10 = "ALMEX_NEWS"
const string ANALITICS_KEY11 = "ALMEX_URL"
const string ANALITICS_KEY20 = "ALMEX_PROGRES"
const string ANALITICS_KEY30 = "ALMEX_EFECTIVE"
const string ANALITICS_KEY40 = "ALMEX_CALENDAR"
const string ANALITICS_KEY50 = "ALMEX_BOARD_ACTION_REQ"
const string ANALITICS_KEY60 = "ALMEX_CHIEF1"
const string ANALITICS_KEY70 = "ALMEX_OBSERVER1"
const string ANALITICS_KEY80 = "ALMEX_DOC"

enum AnaliticsAvailableTileParamType {
  STRING,
  FILTER,
  NUMBER,
  DATE,
  URL,
  BOOLEAN
}

struct AnaliticsAvailableTileParam {
  1: AnaliticsAvailableTileParamType type;
  2: string key;
  3: string name;
  4: string value;
  5: list<filter.FilterItem> items;
}

struct AnaliticsAvailableTileViewConfig {
  1: bool noResize;
  2: i32 w;
  3: i32 minW;
  4: i32 maxW;
  5: i32 h;
  6: i32 minH;
  7: i32 maxH;
}

struct AnaliticsAvailableTile {
  1: common.ID id;
  2: string key;
  3: string iconUrl;
  4: list<AnaliticsAvailableTileParam> params;
  5: AnaliticsAvailableTileViewConfig viewConfig;
  6: string name;
  7: map<string, string> nameLoc;
}

struct AnaliticsDashboardTile {
  1: AnaliticsAvailableTile preparedAvailableTile;
  2: i32 x;
  3: i32 y;
  4: i32 w;
  5: i32 h;
}

struct AnaliticsPreparedAvailableTilePage {
  1: list<AnaliticsAvailableTile> availableAnaliticsTileList;
  2: common.count count;
}

struct AnaliticsDashboard {
  1: common.ID id;
  2: bool useByDefault;
  3: i32 orderNum;
  4: optional list<AnaliticsDashboardTile> analiticsDashboardTileList;
  5: optional list<common.UserOrGroup> allowList;
  6: optional list<common.UserOrGroup> denyList;
  7: string name;
  8: map<string, string> nameLoc;
  9: optional set<string> allowRoleList;
}

struct AnaliticsDashboardPage {
  1: list<AnaliticsDashboard> analiticsDashboardList;
  2: common.count count;
}

/** Сервис аналитики */
service AnaliticsService {
  list<AnaliticsAvailableTile> getAnaliticsAvailableTileList(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  AnaliticsPreparedAvailableTilePage getAnaliticsPreparedAvailableTilePage(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  AnaliticsAvailableTile changeAnaliticsPreparedAvailableTile(1: common.AuthTokenBase64 token, 2: AnaliticsAvailableTile analiticsAvailableTile, 3: common.ID toDelete) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** для редактирования */
  AnaliticsDashboardPage getAnaliticsDashboardPage(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  AnaliticsDashboard changeAnaliticsDashboard(1: common.AuthTokenBase64 token, 2: AnaliticsDashboard analiticsDashboard, 3: common.ID toDelete) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** для пользователя */
  list<AnaliticsDashboard> getUserAnaliticsDashboardList(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}
