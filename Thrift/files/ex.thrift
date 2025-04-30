namespace java core


/** Непредвиденная ошибка сервера */
exception ServerException {
  /** Текст */
  1: string serverExceptionKey
}

/** Ошибки, возникшие при проверке данных */
exception PreconditionException {
  /** i18n code */
  1: string preconditionExceptionKey;
  /** Параметры сообщения */
  2: list<string> params;
  3: optional string message;
  /** Используется при валидации, указывает на предупреждение */
  4: optional bool verWarnining;
}
