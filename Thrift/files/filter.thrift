namespace java core


/** Тип фильтруемого поля */
enum FilterFieldType {
  /** строка */
  STRING,
  /** число */
  NUMBER,
  /** дата */
  DATE,
  /** булевый */
  BOOLEAN,
  /** перечисление */
  ENUMERATED,
  /** число с плавающей точкой */
  DOUBLE,
  /** строка с автозаменой */
  STRING_FOR_REPLACE
}

/** Функция для фильтрации */
enum FilterCondition {
  /** равно */
  EQUAL,
  /** не равно*/
  NOT_EQUAL,
  /** содержит */
  CONTAIN,
  /** не содержит */
  NOT_CONTAIN,
  /** меньше */
  LESS,
  /** меньше или равно */
  LESS_OR_EQUAL,
  /** больше */
  MORE,
  /** больше или равно */
  MORE_OR_EQUAL,
  /** один из */
  IN,
  /** не один из */
  NOT_IN,
  /** null */
  NULL,
  /** не null */
  NOT_NULL,
  /** в отрезке */
  BETWEEN,
  /** Семантический поиск*/
  SEMANTIC_ANY
}

/** Общий фильтр */
struct FilterItem {
  /** поле по которому фильтровать */
  1: optional string field;
  /** тип поля */
  2: optional FilterFieldType fType;
  /** условие фильтрации */
  3: optional FilterCondition condition;
  /** значение*/
  4: optional string value;
  /** доп. значение */
  5: optional string additionValue;
  6: optional string additionValue1;
  7: optional string additionValue2;
  8: optional string language;
}

/** Фильтр, для улучшения пользовательского интерфейса при получении списков */
struct KazFilter {
  /** Начальная позиция */
  1: i32 position;
  /** Количество */
  2: i32 countFilter;
  /** Условия фильтрации */
  3: optional list<FilterItem> items;
  /** Поля для сортировки. Например: createDate desc */
  4: optional list<string> orders;
  /** Поддерживаемые языки */
  5: optional list<string> supportedLang;
}
