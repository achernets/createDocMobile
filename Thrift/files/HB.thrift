include "common.thrift"

namespace java core


/** тип данных */
enum HBColumnType {
    /** текстовое поле с поддержкой мулитиязычности */
    TEXT,
    /** числовое поле */
    NUMBER,
    /** выбор пользователя */
    USER_CHOICE,
    /** текстовое поле с одним значением для всех языков */
    GLOBAL_TEXT,
    /** Справочник */
    HAND_BOOK,
    /** Дата */
    DATE
}

 /** Значение справочника */
struct HBValue {
 /** идентификатор */
  1: optional string id;
  /**  значение (язык, значение)  если тип USER map = null */
  2: optional map<string, string> value;
 /** Пользователь */
  3: optional common.UserOrGroup user;
  /** Тип */
  4: HBColumnType type;
  /* еcли columnType.HAND_BOOK */
  5: optional string depRowId;
  /* еcли columnType.DATE */
  6: optional common.kazDate valueDate;
}

/* Значение конки */
struct HBColumnValue {
  /** значение */
  1: HBValue value;
  /** идентификатор ссылочной колонки из другого справочника */
  2: optional string depColumnId;
  /** значение ссылочной колонки из другого справочника */
  3: optional HBValue depValue;
}

/** строка справочника */
struct HBRow {
  /** идентификатор */
  1: optional string id;
  /** полядковый номер */
  2: i64 order;
  /** ключем выступает id колонки */
  3: optional map<string, HBColumnValue> values;
  /** список колонок по которым нужно удалить значения*/
  4: optional set<common.ID> columnIdsForDeleteValues;
  /** Уникальный uuid */
  5: optional string uuid;
}

enum HBColumnOrderType {
  CREATE_DATE,
  ALPHABETICAL,
  NUMERIC
}

/** Колонка справочника */
struct HBColumn {
  /* Идентификатор */
  1: optional string id;
  /** Column name */
  2: optional string oName;
  /** Determining the possibility to add null value to the column */
  3: bool requiredColumn;
  /** порядковый номер */
  4: i32 seqNum;
  /** доступность справочника для поиска. */
  5: bool searchable;
  /** тип колонки */
  6: optional HBColumnType columnType;
  /** Идентификатор во внешней системе */
  7: optional string extId;
  /** Дата удаления */
  8: optional common.kazDate deleteDate;
  /** Проверка уникальности(актуально для типа NUMBER и GLOBAL_TEXT) */
  9: bool uniqVal;
  /** ключ колонки */
  10: optional string columnKey;
  /** id справочника, еcли columnType.HAND_BOOK */
  11: optional HandBook depHandBook;
  /** id колонки справочника, еcли columnType.HAND_BOOK  */
  12: optional string depColumnId;
  /** Настройка сортировки */
  13: optional HBColumnOrderType orderRule;
  /** Название, переводы на зарегистрированные языки*/
  14: optional map<string,string> oNameLoc;
  /** Уникальный uuid */
  15: optional string uuid;
}

/** Тип справочника */
enum HandBookType {
  EXTERNAL,
  INTERNAL,
  INTERNAL_NOT_EDITABLE
}

/** Справочник */
struct HandBook {
  /** Идентификатор */
  1: optional common.ID id;
  /** название */
  2: optional string hBookName;
  /** Уникальный ключ */
  3: i64 guiId;
  /** аккаунты за которыми закреплен */
  5: optional set<common.ID> accountIds;
  /** список колонок */
  6: optional list<HBColumn> columns;
  /** список людей, которым разрешено изменять контент */
  7: optional list<common.UserOrGroup> hbContentAdmins;
  /** рассчитываемое поле - разрешение на редактирование */
  8: bool allowEdit;
  /** thrift url справочника */
  9: optional string thriftURL;
  /** Копировать значение в content item */
  10: bool copyValue;
  /** Тип транспорта передачи данных */
  11: optional common.ThriftTransportType transportType;
  /** Тип протокола передачи данных */
  12: optional common.ThriftProtocolType protocolType;
  /** Название, переводы на зарегистрированные языки*/
  13: optional map<string,string> hBookNameLoc;
  /** Тип справочника */
  14: optional HandBookType handBookType;
  /** Разрешено ли редактировать uuid */
  15: bool canEditUuid;
  /** Уникальный uuid */
  16: optional string uuid;
}
