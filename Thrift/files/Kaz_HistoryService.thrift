include "common.thrift"
include "ex.thrift"
include "filter.thrift"
include "Kaz_DocumentService.thrift"

namespace java core


/** Список возможных ключей*/
enum HistoryKey {
    COMMENT_ADDED, // комментарий добавлен (documentCommentId)
    COMMENT_UPDATED, // комментарий обновлен (documentCommentId)
    COMMENT_DELETED, // комментарий удален (documentCommentId)
    DOCUMENT_CREATED, // документ создан
    DOCUMENT_ASSIGNED, // документ назначен пользователю (clientIds)
    DOCUMENT_ASSIGNED_FOR_TECHNICAL_USER, // документ назначен техническому пользователю
    DOCUMENT_REASSIGNED, // по документу сделано перепоручение (whomReassignedIds)
    DOCUMENT_REASSIGNED_WITH_CONTROL, // по документу сделано перепоручение с контролем (whomReassignedIds)
    DOCUMENT_REASSIGNED_PERIODICAL, // по документу сделано переодическое перепоручение (whomReassignedIds)
    PERIODICAL_STAGE_NEXT_RUN_AT, // расчет следующего запуска периодического этапа
    PERIODICAL_STAGE_DISABLE_BY_END, // дата окончания переодического этапа уже наступила
    PERIODICAL_STAGE_DISABLE_NOT_ENOUGH_TIME, // расчитанная дата следующего запуска периодического периода больше даты окончания периода или рашьше текущего времени
    PERIODICAL_CARD_NEXT_RUN_AT, // следующее выполнение периодического этапа
    PERIODICAL_CARD_DISABLE_BY_END, // выполнение перидического этапа завершено
    DOCUMENT_MOVED_TO_NEXT_STAGE, // документ перешел на следующий этап(next Stage name)
    DOCUMENT_DECISION_APPROVED, // решение по документу утверждено(для решения с контролем, childExecutionId)
    DOCUMENT_ARCHIVED, // документ перешел в архив
    DOCUMENT_CLOSED, // документ закрыт
    DOCUMENT_NUMBER_GENERATED, // генерация номера для документа
    DOCUMENT_DELETED, // документ удален
    DOCUMENT_UPDATED, // документ обновлен
    DOCUMENT_REVOKE, // документ отозван
    DOCUMENT_REVOKE_FROM_GROUP, // документ отозван с группы
    DOCUMENT_NOT_FOUND, // документ не найден
    DOCUMENT_RELATIONS_CREATED, // связь между документами создана
    DOCUMENT_RELATIONS_REMOVED, // связь между документами удалена
    DOCUMENT_SUB_STATUS_CHANGED, // подстатус документа изменен
    DOCUMENT_SUB_STATUS_COMMENT_CHANGED, // текст комментария подстатуса документа изменен
    DOCUMENT_EXPORT, // документ экпортирован
    ADD_RESPONSIBLE_TO_DOCUMENT, // ответсвенный добавлен в документ
    REMOVE_RESPONSIBLE_FROM_DOCUMENT, // ответсвенный удален из документа
    ATTACHMENT_CREATED, // вложение создано(attachmentId)
    ATTACHMENT_CREATED_FROM_TEMPLATE, // вложение создано из шаблона вложений
    ATTACHMENT_CREATED_FROM_ATTACHMENT, // вложение создано на основе другого вложения
    ATTACHMENT_DRAFT_CREATED, // черновик вложения создан(attachmentId)
    ATTACHMENT_DRAFT_WAIT_PUBLISH, // черновик вложения ожидает публикации (attachmentId)
    ATTACHMENT_FINISH_DRAFT, // черновик вложения опубликован
    ATTACHMENT_REMOVED, // вложение удалено (attachmentId, attachment name)
    ATTACHMENT_CONVERT_ERROR, // ошибка конвертации вложения
    RESOLUTION_CHANGED, // резолюция по документу изменена
    DOCUMENT_RESOLUTION_CHANGED_BY_TECHNICAL_USER, // резолюция по документу изменена техническим пользователем
    EXTERNAL_MODULE_CHANGED, // внешний модуль изменен(external module id)
    EXTERNAL_MODULE_NOT_AVAILABLE, // внешний модуль недоступен (external module id)
    INVALID_DOCUMENT_PATTERN, // некорекктный шаблон документа (pattern id)
    NEXT_STAGE_NOT_FOUND, // следующий этап не найден (pattern id)
    ERROR_MOVING_DOCUMENT_TO_NEXT_STAGE, // ошибка перехода документа на следующий этап (error msg)
    ERROR_PERIODICAL_STAGE, // ошибка выполнения переодического этапа (error msg)
    ERROR_TO_ARCHIVE, // ошибка перевода документа в архив (error msg)
    ERROR_INTERNAL_STAGE, // ошибка выполнения внутренного этапа (error msg)
    SIGNATURE_ERROR, // ошибка валидации цифровой подписи (p12 signature error)
    DOCUMENT_MOVED_TO_ANY_STAGE, // документ переведен на другой этап (user id, next Stage name)
    REMOVED_ALL_OLD_VERSION_ATTACHMENTS, // удаление всех старых версий вложения (user name, attachment name)
    CHANGE_EDIT_MODE_FOR_ATTACHMENT, // изменение режима редактирования вложения
    DOCUMENT_DEADLINE_DATE_INCREASE, // изменение срока исполнения документа (user name, deadlineDate)
    EXECUTION_CARD_DEADLINE_DATE_INCREASE, // изменение срока исполнения этапа (user name, deadlineDate)
    EXECUTION_CARD_REVOKE_DECISION, // отзыв решения карточки исполнения
    EXECUTION_CARD_MARK_AS_REMOVED, // решение отмечено для удаления
    LOGIN_AS_OTHER_USER, // сессия под делегатом (toUserId)
    CREATE_CLIENT_DELEGATE, // создание делегирования (fromUserId, toUserId)
    MODIFY_CLIENT_DELEGATE, // изменение делегирования (fromUserId, toUserId)
    REMOVE_CLIENT_DELEGATE, // удаление делегирования
    MAIL_PATTERN_NOT_FOUND, // шаблон почты не найден
    MAIL_PATTERN_NOT_VALID, // шаблон почты не валиден
    MAIL_LIMIT_FILE_SIZE, // размер файла шаблона почты превышает разрешенный лимит
    MAIL_OTHER_ERROR,// ошибка обработки этапа отправки почты
    REQUEST_RESET_PASSWORD, // запрос на сброс пароля пользователя
    REMOVE_USER_PUBLIC_KEY, // удаление публичного ключа пользователя
    REMOVE_USER_PRIVATE_KEY, // удаление приватного ключа пользователя
    CREATE_OR_UPDATE_FILE_STORAGE, // создание или изменение файлового хранилища
    REMOVE_FILE_STORAGES, // удаление файловых хранилищ
    REGISTER_EXTERNAL_MODULE, // регистрация внешнего модуля
    REFRESH_EXTERNAL_MODULE, // обновление внешенго модуля
    REMOVE_EXTERNAL_MODULE, // удаление внешнего модуля
    CREATE_OR_UPDATE_SECURITY_CLASSIFICATION, // создание или изменение грифа секретности
    REMOVE_SECURITY_CLASSIFICATION, // удаление грифа секретности
    REMOVE_SECURITY_CLASSIFICATION_FROM_DOC, // удаление грифа секретности с документа
    REMOVE_SECURITY_CLASSIFICATIONS_FROM_USER, // удаление грифа секретности с пользователя
    REMOVE_SECURITY_CLASSIFICATIONS_FROM_GROUP, // удаление грифа секретности с группы
    ADD_SECURITY_CLASSIFICATIONS_TO_USER, // добавление грифа секретности пользователю
    ADD_SECURITY_CLASSIFICATIONS_TO_GROUP, // добавление грифа секретности группе
    ADD_SECURITY_CLASSIFICATIONS_TO_DOC, // добавление грифа секретности документу
    CREATE_OR_UPDATE_REPORT, // создание или обновление отчета
    REMOVE_REPORT_TEMPLATE, // удаление отчета
    ADD_REPORT_TO_PATTERN, // добавление отчета в шаблон
    REMOVE_REPORT_FROM_PATTERN, // удаление отчета из шаблона
    CREATE_OR_UPDATE_CUSTOM_FIELD, // создание или обновление пользовательских полей
    REMOVE_CUSTOM_FIELD, // удаление пользовательских полей
    CREATE_OR_UPDATE_CUSTOM_DOC_FILTER, // создание или обновление пользовательских фильтров
    REMOVE_CUSTOM_DOC_FILTER, // удаление пользовательских фильтров
    EXPORT_CUSTOM_DOC_FILTERS, // экспорт пользовательских фильтров
    IMPORT_CUSTOM_DOC_FILTERS_WITH_CLEANSING, // импорт пользовательских фильтров с полной перезаписью
    IMPORT_CUSTOM_DOC_FILTERS_WITHOUT_CLEANSING, // импорт пользовательских фильтров
    REMOVE_ENCRYPT_KEY, // удаление ключа шифрования
    USER_DECRYPT_DOCUMENT, // пользовательский запрос на расшифровку документа
    USER_REQUEST_ACCESS_DOCUMENT, // пользовательский запрос на предоставления доступа к документу
    CLOSE_SESSION, // завершение пользовательской сессии
    UPDATE_FILLED_DOCUMENT_PATTERN_STAGE, // изменение этапа документа
    UPDATE_FILLED_DOCUMENT_PATTERN_STAGE_LINK, // изменение связи этапа документа
    REVOKE_CHILD_CARDS, // отзыв дочерних карт документа(например при перепоручении)
    REMOVE_CHILD_CARDS, // удаление дочерних карт документа(например при перепоручении)
    CONFIRM_USER_PUBLIC_KEY, // потверждение публичного ключа пользователя
    REJECTED_USER_PUBLIC_KEY, // отклонение публичного ключа пользователя
    LOAD_USER_PUBLIC_KEY, // загрузка публичного ключа пользователя
    LOAD_USER_PRIVATE_KEY, // загрузка приватного ключа пользователя
    SET_USER_PUBLIC_KEY, // привязка публичного ключа к пользователю
    USER_LOGIN, // авторизация пользователя в системе
    USER_LOGOUT, // выход пользователя из системы
    HB_CREATE_OR_UPDATE, // создание или изменение справочника
    HB_DELETE, // удаление справочника
    HB_ROW_CREATE_OR_UPDATE, // создание или изменение строки справочника
    HB_ROW_DELETE, // удаление строки справочника
    HB_ADMIN_USERS, // добавление пользователей в внешний справочник
    HB_ADMIN_GROUPS, // добавление групп в внешний справочник
    CREATE_OR_UPDATE_PATTERN_ATTACHMENT, // создание или изменение шаблона вложений
    REMOVE_PATTERN_ATTACHMENT, // удаление шаблона вложений
    COPY_PERSONAL_ACCESS_REQUEST_FROM, // заявка на передачу дел от кого
    COPY_PERSONAL_ACCESS_REQUEST_TO, // заявка на передачу дел кому
    COPY_PERSONAL_ACCESS_REQUEST, // заявка на передачу дел
    COPY_PERSONAL_ACCESS_DONE, // свершившийся факт передачи дел (шедулером)
    COPY_PERSONAL_ACCESS_REQUEST_FROM_DONE, // свершившийся факт передачи дел от кого (шедулером)
    COPY_PERSONAL_ACCESS_REQUEST_TO_DONE, // свершившийся факт передачи дел кому(шедулером)
    STAGE_CHANGE_USER, // изменение участников этапа
    SKIP_DELETED_USER, // пропуск удаленного пользователя(участника этапа)
    SKIP_DELETED_GROUP, // пропуск удаленной группы(участника этапа)
    LINK_CHANGE_USER, // изменение пользователя на ссылке(стрелке, используется в job task)
    FILLED_CHANGE_USER, // измененение пользователя на этапе(используется в job task)
    PATTERN_USERGROUP_CHANGE_USER, // изменение пользователя в группе паттернов(используется в job task)
    CREATE_OR_UPDATE_DOCUMENT_PATTERN, // создание или изменение шаблона документа
    DELETE_DOCUMENT_PATTERN, // удаление шаблона документа
    CREATE_OR_UPDATE_STAGE_AND_LINKS, // создание или изменение этапов и связей между этапами в шаблоне документа
    CHANGE_PROCESS_ROLES, // изменение процессных ролей в шаблоне документа
    CHANGE_PATTERN_USER_GROUP, // изменение списка пользователей или групп, присоединенных к шаблону
    CHANGE_PROCESS_VARIABLES, // изменение процессных переменных шаблона документа
    CHANGE_CONTENT_ITEMS, // создание или изменение блоков контента шаблона документа
    ADD_EXECUTORS_TO_STAGE, // добавление исполнителей на этап шаблона документа
    REMOVE_USERS_EXECUTORS_FROM_STAGE, // удаление исполнителей(пользователей) с этапа шаблона документа
    REMOVE_GROUPS_EXECUTORS_FROM_STAGE, // удаление исполнителей(групп) с этапа шаблона документа
    DOCUMENT_SHARED_TO_USERS, // предоставление пользователям доступа к документу
    DOCUMENT_SHARED_TO_GROUPS, // предоставление группам доступа к документу
    DOCUMENT_ALREADY_SHARED_TO_USER, // доступ к документу уже был предоставлен (для пользователя)
    DOCUMENT_ALREADY_SHARED_TO_GROUP, // доступ к документу уже был предоставлен (для группы)
    REGISTRY_REMOVE, // удаление реестра документов
    REGISTRY_ACCOUNT_ADD, // добавление аккаунтов к реестру документов
    REGISTRY_ACCOUNT_REMOVE, // удаление аккаунтов у реестра документов
    REGISTRY_USERS_ADD, // предоставление доступа к реестру документов(для пользователя)
    REGISTRY_USERS_REMOVE, // снятие доступа к реестру документов(для пользователей)
    REGISTRY_GROUPS_ADD, // предоставление доступа к реестру документов(для группы)
    REGISTRY_GROUPS_REMOVE, // снятие доступа к реестру документов(для группы)
    REMOVE_USERS_FROM_GROUP, // удаление пользователя из группы
    ADD_USER_GROUP_TO_STAGE, // добавление группы пользователей на этап
    ADD_USERS_TO_GROUP, // добавление пользователя в группу
    DOCUMENT_REGISTRATION_INFO_CHANGE, // изменение рег. информации по документу
    SKIP_DOC_NUMBER, // пропуск номера документа(актуально при генерации номера документа)
    CONFIRM_MEETING, // потверждение встречи
    ADD_ADDITIONAL_CONFIRMER, // добавление доп. согласующего в документ
    REMOVE_ALL_NOTIFICATION_CONFIG, // удаление всех типов уведомлений из профиля пользователя
    CHANGE_NOTIFICATION_CONFIG, // изменение типов уведомлений в профиле пользователя
    ERROR_GET_EXTERNAL_HANDBOOK, // ошибка получения внешнего справочника
    USER_NOT_FOUND_IN_BPM, // пользователь не найден
    CHANGE_MOVE_LINK_SCRIPT, // стрелка, по которой пойдет документ и будет выполняться drool скрипты, если не найдена пойдет по дефолтной
    COUNT_SCRIPTS_RULES_DONE, // количество успешно выполненных drool скриптов
    CANT_CREATE_CHILD_DOC, // ошибка создания дочернего документа
    UPDATE_USER_INFO, // обновление профиля пользователя
    USER_DONT_EXIST_IN_PROLE, // у пользователя нет разрешение на действие с шаблоном документа, так не добавлен не в одну из колонок вкладки "Пользователи" при настройке BPM процесса
    GROUP_DONT_EXIST_IN_PROLE, // у группы пользователей нет разрешение на действие с шаблоном документа, так не добавлен не в одну из колонок вкладки "Пользователи" при настройке BPM процесса
    INCORRECT_SCRIPT, // некорекктный drool скрипт
    REMIND_EXECUTOR, // отправка напоминания участнику документа
    EXT_EXCLUDE_DOCUMENT_ERROR, // ошибка обработки документа внешним модулем
    CHANGE_DOCUMENT_TYPE, // изменение типа документа
    UPDATE_USER_ACCOUNT, // изменение аккаунтов пользователя
    UPDATE_USER_PREFERENCES, // изменение настроек пользователя
    UPDATE_USER_FAVORITES, // изменение списка избранных пользователей
    UPDATE_USER_ROLE, // изменение ролей пользователя
    UPDATE_USER_PASSWORD, // измненения пароля пользователя
    UPDATE_USER_GROUP, // измнение групп пользователя
    UPDATE_USER_DELEGATE, // изменение делегатов пользователя
    UPDATE_USER_SC, // изменение грифов секретности пользователя
    ERROR_GENERATING_DOCUMENT_NUMBER, // ошибка генерации номера документа
    CHANGE_CONTENT_HOLDERS, // изменение контента контейнеров
    DOCUMENT_NUMBER_REQUIRED, // номер документа является обязательным
    CREATE_OR_UPDATE_NOMENCLATURE_NUMBER, // создание или изменение номенклатурного номера документа
    DELETE_NOMENCLATURE_NUMBER, // удаление номенклатурного номера документа
    DOWNLOAD_ORIGINAL, // загрузка оригинального вложения
    DOWNLOAD_PDF, // загрузка pdf версии вложения
    DOWNLOAD_PDF_UNSECURED, // загрузка незащищенной pdf версии вложения
    DOWNLOAD_PNG, // загрузка png версии вложения
    OPEN_ORIGINAL, // открытие оригинального вложения
    OPEN_PDF, // открытие pdf версии вложения
    OPEN_PDF_UNSECURED, // открытие незащищенной pdf версии вложения
    OPEN_PNG, // открытие png версии вложения
    DELETE_NOMENCLATURE_GROUP, // удаление номеклатурной группы номеров документа
    CREATE_OR_UPDATE_NOMENCLATURE_GROUP, // создание или изменение номенклатурной группы документов
    FAIL_UPDATE_USER_INFO, // ошибка обновления версии пользователя
    ATTACHMENT_UPDATED, // обновление вложения
    DOCUMENT_ASSIGNED_TO_GROUP, // документ назначен группе пользователей
    FAKE_USER_RESET_PASSWORD, // продление пароля пользователя
    DOCUMENT_SHARED_FROM_LINK, // предоставлен общий доступ к документу (по стрелке)
    ERROR_RESET_NOMENCLATURE_NUMBER, // ошибка сброса номеклатурного номера документа
    CHILD_UPDATE_USER_INFO, // обновление информации пользователя под делегатом
    ERROR_GENERATING_SYSTEM_DOCUMENT_NUMBER, // ошибка при генерации системного номера документа
    ALLOWABLE_NUMBER_OF_STAGE_LEAPS_IS_REACHED, // превышение допустимого количество перехода документа на один и тот же этап
    KNOWLEDGE_BASE_REMOVE, // удаление базы знаний
    EXECUTION_GROUP_CARDS_CLOSED, // групповая карта исполнения закрыта
    REMOVE_USER, // удаление пользователя
    DOCUMENT_SUB_STATUS_REVERT, // откат нового подстатуса документа
    PUBLIC_KEY_FILE_NOT_FOUND_AND_SET_NO_FILE, // отсутствие файла публичного ключа пользователя
    FILE_STORAGE_NOT_AVAILABLE,//файловое хранилище не доступно
    DOCUMENT_CHANGE_NAME, // изменение краткого содержания документа
    DOCUMENT_CHANGE_EXTERNAL_REG_DATE, // изменение внешнего номера
    ATTACHMENT_DRAFT_FILE_REMOVED, // черновик вложения удален
    CHANGE_PATTERN_CONTENT_ITEM_USER, // изменение пользователя в поле "Выбор пользователя" (при передаче дел)
    CHANGE_PATTERN_CONTENT_ITEM_ALLOWED_USER, // изменение пользователя в поле "Разрешенные пользователи" (при передаче дел)
    CHANGE_USER_CONTENT_VALUES, // изменение доп. полей пользователя
    REPORT_GENERATE, // генерация отчета
    REPORT_DOWNLOAD, // загрузка отчета
    ATTACHMENT_SIGNED, // вложение подписано
    SIGN_IGNORED_WHEN_IT_ALREADY_IN_ATTACHMENT, // подпись проигнорирована, потому что она уже присутствует в документе.
    CLOSE_SESSION_WHEN_MODIFY_CLIENT_DELEGATE, // закрыты сессии под делегатом из-за изменений делегирования
    CLOSE_SESSION_WHEN_REMOVED_CLIENT_DELEGATE, // закрыты сессии под делегатом из-за удаления делегирования
    CMS_IN_CMS, //вложений конверт
    ADD_ANSWERERS, // добавление ответчика на вопрос в документ
    REMOVE_EXECUTOR_FROM_DOCUMENT_STAGE, // удалено исполнителя с етапа документа
    ADD_DOCUMENT_TO_KNOWLEDGE_BASE, // добавление документа в базу знаний
    REMOVE_DOCUMENT_FROM_KNOWLEDGE_BASE, // удаление документа с базы знаний
    ATTACHMENT_SIGNED_V2, // вложение подписано с новыми параметрами истории
    JOB_TASK_DELETED, // запланированная задача удалена
    RESTORE_USER, // восстановление пользователя
    ADD_ROLES_TO_GROUP, // добавлений ролей для группы
    REMOVE_ROLES_FROM_GROUP, // удаление ролей у группы
    CREATE_OR_UPDATE_USER_GROUP, // создание или удаление группы
    DELETE_USER_GROUP, // удаление группы
    CANCEL_AUTO_GENERATE_DOC_NAME, // отмена автогенерации краткого содержания документа
    USER_CHANGED_ATTACHMENT_VISIBILITY_TO_HIDE, // Пользователь скрыл вложение
    USER_CHANGED_ATTACHMENT_VISIBILITY_TO_SHOW, // Пользователь включил отображение вложения
    USER_LOGIN_WITHOUT_OTP_CONFIRMATION, // Авторизация пользователя в системе с игнорированием OTP подтверждения
    LOG_WORK_START, //начало работ
    LOG_WORK, //логирование работы
    LOG_WORK_END,//окончание работы
    OBSERVER_DOCUMENT_OPEN, //открытие документа в рамках мониторинга
    OBSERVER_DOCUMENT_NO_ACCESS, //отказано в доступе к документу в рамках мониторинга
    OBSERVER_DOCUMENT_NO_SECURITY_ACCESS, // отказано в доступе к секретному документу в рамках мониторинга
    OBSERVER_COMMENT_DELETED, //удаление коментария к карточке в рамках мониторинга
    OBSERVER_USER_ADD, //добавление пользователя для мониторинга
    OBSERVER_USER_REMOVE, //удаления пользователя из мониторинга
    OBSERVER_CARD_STATUS, //изменение статуса карточки в рамках мониторинга
    OBSERVER_CARD_STATUS_REVERSE, //возврат к предыдущему статусу в рамках мониторинга
    USER_CHANGED_ATTACHMENT_EXT_STATUS, //изменение типа вложения (основное, приложение..)
    CREATE_OR_UPDATE_NEWS, // Добавление / обновление новости
    ADD_OBSERVER_COMMENT, //добавлен коментарий наблюдателем
    DOCUMENT_SUB_STATUS_IGNORED, //саб статус проигнорирован
    DOCUMENT_SUB_STATUS_OVERRIDE //саб статус перезаписан
}

/** Объект, измененный пользователем */
enum ChangeLogObjectType {
  PATTERN,
  PATTERN_USER,
  STAGE,
  LINK,
  CONTENT,
  CONTENT_HOLDER,
  CONTENT_HOLDER_LINK,
  CONTENT_TAB,
  PROCESS_ROLE,
  PROCESS_VARIABLE,
  PATTERN_ATTACHMENT,
  PATTERN_REPORT,
  NOMENCLATURE_GROUP,
  NOMENCLATURE_NUMBER,

  CLIENT,
  CLIENT_CONTENT_VALUE,

  USER_GROUP
}

/** Действие, выполненное пользователем */
enum ChangeLogActionType {
  /** Добавили */
  ADD,
  /** Изменили */
  CHANGE,
  /** Удалили */
  REMOVE
}

/** Детали, измененные пользователем */
struct ChangeLogDetail {
  /** ключ трифта */
  1:string key;
  /** старое значение */
  2:string oldValue;
  /** новое значение */
  3:string newValue;
  /** выполненое действие */
  4:ChangeLogActionType actionType;
}

/** Залогированые изменения объекта */
struct ChangeLog {
  /** идентификатор */
  1: string identifier;
  /** имя */
  2: string logName;
  /** тип объекта */
  3:ChangeLogObjectType objType;
  /** выполненое действие */
  4:ChangeLogActionType actionType;
  /** список измеынных полей */
  5: list<ChangeLogDetail> logDetails;
}

/** Сервис для работы с логами */
service HistoryService {
  /** Returns all deadline histories for document or document execution
    фильтра по
    docId - идентификатор документа
    docExecutionId - идентификатор карточки
  **/
  list<Kaz_DocumentService.DeadlineHistory> getAllDeadlineHistories(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка истории по фильтрам
    *   id
    *   documentId - по идентификатору документа
    *   userId - по идентификатору пользователя
    *   patternId - по идентификатору габлона
    *   indexMonth - за определленный месяц
    *   indexDate - за определенные даты
    *   nbrOrsysNbr - по номеру или системному номеру
    *   parameters
    *   createDate
    *   level   - тип enumerated
    *   nomenclatureNumberId - по номенклатурному номеру
    *   key - ENUMERATED, NOT_IN, "HistoryKey.DOCUMENT_CREATED;HistoryKey.DOCUMENT_ASSIGNED"
    * Обязателен к использованию один из фильтров: indexMonth, indexDate, userId, documentId, patternId.
  **/
  Kaz_DocumentService.HistoryPage getHistoryPage(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter, 3: bool useAdmin) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка внесенных изменений */
  list<ChangeLog> getChangeLogByHistory(1: common.AuthTokenBase64 token, 2:common.ID historyId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка истории пользователя. В фильтре заполняется только  position и countFilter;*/
  Kaz_DocumentService.HistoryPage getUserHistoryPage(1: common.AuthTokenBase64 token, 2: common.ID userId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка истории группы. В фильтре заполняется только  position и countFilter;*/
    Kaz_DocumentService.HistoryPage getGroupHistoryPage(1: common.AuthTokenBase64 token, 2: common.ID groupId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}