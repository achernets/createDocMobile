import { filter, find, get, groupBy, join, map, reduce, set, size, sortBy, values } from "lodash";
import { Attachment, ContentItem, ContentItemHBValue, ContentItemType, ContentItemValue, Department, FilterCondition, FilterFieldType, FilterItem, HBColumnType, HBRow, KazFilter, UserOrGroup } from "../api/data";
import { getCurrentLocale, getFilterHBValueSearchWord, getFio, getHBValue, parseNumber } from ".";
import dayjs from "dayjs";
import { CalendarServiceClient, DepartmentServiceClient, HandBookServiceClient, UserManagementServiceClient } from "../api";
import useAppStore from "../store/useAppStore";
import { Space, Toast } from "antd-mobile";
import numberToString from "./numberToString";

export const getItemValue = (item: ContentItem, language = getCurrentLocale(), string = false) => {
  switch (item.type) {
    case ContentItemType.USER_CHOICE:
      return string ? join(map(item.users, itm => getFio(itm)), ', ') : item.users;
    case ContentItemType.CHECKBOX:
      return get(item, `value.strValue`) === 'true';
    case ContentItemType.HAND_BOOK:
      const hbValue = item?.value?.hbValue?.row?.values?.get(item?.value?.hbValue?.column?.id);
      const value = getHBValue(hbValue, string, language);
      return value === '' ? null : (string ? value : get(item, 'value.hbValue.row', null));
    case ContentItemType.ORG_STRUCTURE:
      return get(item, string ? 'department.name' : 'department', null);
    case ContentItemType.ATTACHMENT:
      return get(item, string ? 'attachment.fileName' : 'attachment', null);
    case ContentItemType.CALENDAR_RANGE:
      const dateStart = get(item, 'value.strValue', null);
      const dateEnd = get(item, 'value.strValue2', null);
      return {
        dateStart: dateStart,
        dateEnd: dateEnd
      };
    case ContentItemType.TABLE:
      const tColumns = sortBy(get(item, 'tableDefenition.columnDefenition', []), ['order', 'oName']);
      const items = sortBy(get(item, 'childItems', []), ['rowNumber', 'order']);
      return reduce(tColumns, (hash, itm) => {
        hash[itm.key] = filter(items, { originalKey: itm.key }).map(item => getItemValue(item, language, string));
        return hash;
      }, {});
    default:
      return get(item, `value.strValue`, null);
  }
};

export const ContentItemExecScript = (setValue, getValues, getContentItem, getPathLinkByKey) => {

  const getUserAdditionalInfo = async (id) => {
    let obj = {
      value: {},
      strValue: {}
    };
    return await new Promise(async (resolve) => {
      try {
        const result = await UserManagementServiceClient.getUserAdditionalInfo(
          useAppStore.getState().token,
          id,
          ''
        );
        //@ts-ignore
        obj = reduce(result?.holdersList, (hash, holder) => {
          map(holder?.contentHolderLink, item => {
            set(hash, `value.${item?.contentItem?.key}`, getItemValue(item?.contentItem, getCurrentLocale(), false));
            set(hash, `strValue.${item?.contentItem?.key}`, getItemValue(item?.contentItem, getCurrentLocale(), true));
          });
          return hash;
        }, {});
        resolve(obj);
      } catch (error) {
        console.log(error)
        resolve(obj);
      }
    });
  };

  return {
    getContentItem: (key: string) => getContentItem(key),
    getContentItemValue: (key: string, lang, string) => { //треба працювати
      const item = getContentItem(key);
      if (string === undefined) {
        switch (item?.type) {
          case ContentItemType.HAND_BOOK:
            return getItemValue(item, lang, true);
          default:
            return getItemValue(item, lang, false);
        }
      } else {
        return getItemValue(item, lang, string);
      }
    },
    getColumnTable: (key: string, columnKey: string) => {
      const contentItem = getContentItem(key);
      const values = filter(contentItem.childItems, item => item.originalKey === columnKey)
        .map(item => getItemValue(item));
      return values;
    },
    getRowTable: (key: string, rowIndex = 1) => {
      const contentItem = getContentItem(key);
      const items = sortBy(get(contentItem, 'childItems', []), ['rowNumber', 'order']);
      const tValues = values(groupBy(items, itm => itm.rowNumber))[rowIndex - 1] || [];
      return tValues.map(item => getItemValue(item));
    },
    getRowCountTable: (key: string) => {
      const contentItem = getContentItem(key);
      const items = sortBy(get(contentItem, 'childItems', []), ['rowNumber', 'order']);
      const rows = items.reduce((hash, itm) => {
        if (!hash.includes(itm.rowNumber)) hash.push(itm.rowNumber);
        return hash;
      }, []);
      return rows.length;
    },
    getAllRowsTable: (key: string) => {
      const contentItem = getContentItem(key);
      const items = sortBy(get(contentItem, 'childItems', []), ['rowNumber', 'order']);
      const rows = items.reduce((hash, itm) => {
        if (!hash.includes(itm.rowNumber)) hash.push(itm.rowNumber);
        return hash;
      }, []);
      const values = rows.reduce((hash, itm) => {
        hash.push(filter(items, { rowNumber: itm }).map(itm => getItemValue(itm)));
        return hash;
      }, []);
      return values;
    },
    updateHandBookValueFromHandBookValue: (from: string, to: string) => {
      const hbValue = getValues(`contentItems.${to}.value.hbValue`);
      const row = getValues(`contentItems.${from}.value.hbValue.row`);
      setValue(`contentItems.${to}.value.hbValue`, new ContentItemHBValue({
        ...hbValue,
        row: row && row !== null ? new HBRow(getValues(`contentItems.${from}.value.hbValue.row`)) : null
      }));
    },
    setContentItem: (key: string, contentItem: ContentItem) => {
      setValue(`contentItems.${key}`, contentItem);
    },
    setContentItemValue: (key: string, value: string | null) => { //доробити
      if (getValues(`contentItems.${key}.value.strValue`) !== value) {
        setValue(`contentItems.${key}.value.strValue`, value !== null ? String(value) : null);
      }
    },
    setContentItemValuePeriod: (key: string, value: string | null, value2: string | null) => {
      const values = getValues(`contentItems.${key}.value`);
      setValue(`contentItems.${key}.value`, new ContentItemValue({
        ...values,
        strValue: value !== null && value !== undefined ? String(value) : null,
        strValue2: value2 !== null && value2 !== undefined ? String(value2) : null
      }));
    },
    setContentItemValueDepartment: (key: string, value: Department | null) => {
      setValue(`contentItems.${key}.department`, value);
    },
    setContentItemValueAttachment: (key: string, value: Attachment | null) => {
      setValue(`contentItems.${key}.attachment`, value);
    },
    setContentItemValueUsers: (key: string, value: UserOrGroup[] | null) => {
      setValue(`contentItems.${key}.users`, value);
    },
    setContentItemValueHandBook: (key: string, value: HBRow | null) => {
      setValue(`contentItems${key}.value.hbValue.row`, value);
    },
    getDiffInDays: (start: number | string, end: number | string) => {
      let count = 0;
      const sDate = dayjs(parseNumber(start)).startOf('day').valueOf();
      const eDate = dayjs(parseNumber(end)).endOf('day').valueOf();
      if (eDate > 0 && sDate > 0 && eDate >= sDate) {
        count = dayjs(eDate).diff(dayjs(sDate), 'days') + 1;
      }
      if (eDate > 0 && sDate > 0 && eDate < sDate) {
        count = dayjs(eDate).diff(dayjs(sDate), 'days') - 1;
      }
      return count;
    },
    findHbValueAndSetContentItemKey: (searchValue: string, keyItem: string) => {
      const contentItem = getContentItem(keyItem);
      const column = get(contentItem, `value.hbValue.column`, null);
      let fColumn = find(contentItem?.handBook?.columns, { id: column.id });
      if (fColumn?.columnType === HBColumnType.HAND_BOOK) {
        fColumn = find(fColumn?.depHandBook?.columns, { id: fColumn?.depColumnId });
      };
      let filter = new KazFilter({
        position: 0,
        countFilter: 1,
        orders: [],
        items: [
          new FilterItem({
            field: 'cOrder',
            fType: FilterFieldType.STRING,
            condition: FilterCondition.NULL,
            value: null,
            additionValue: column.id
          }),
          new FilterItem({
            field: getFilterHBValueSearchWord(column),
            value: null,
            condition: FilterCondition.NOT_NULL,
            fType: FilterFieldType.STRING,
            additionValue: column.id
          }),
          searchValue !== '' ? new FilterItem({
            field: getFilterHBValueSearchWord(column),
            value: searchValue,
            condition: FilterCondition.EQUAL,
            fType: FilterFieldType.STRING,
            additionValue: column.id
          }) : null,
        ]
      });
      return HandBookServiceClient.getAllHandBookRows(useAppStore.getState().token, contentItem.handBookId, filter).then(function (result) {
        const hbValue = getValues(`contentItems.${keyItem}.value.hbValue`);
        setValue(`contentItems.${keyItem}.value.hbValue`, new ContentItemHBValue({
          ...hbValue,
          row: result.length > 0 ? result[0] : null
        }));
        return result;
      });
    },
    getHbValuesFromContentItem: (contentItem: ContentItem, countValues) => {
      let filter = new KazFilter({
        position: 0,
        countFilter: countValues || 25,
        orders: [],
        items: [
          new FilterItem({
            field: 'cOrder',
            fType: FilterFieldType.STRING,
            condition: FilterCondition.NULL,
            value: null,
            additionValue: get(contentItem, 'value.hbValue.column.id')
          }),
          ...map(contentItem.itemHBFilterList, function (item) {
            const cItem = getContentItem(item.contentFilterKey);
            const valueItm = get(cItem, 'value.hbValue.row.id', null);
            return new FilterItem({
              field: item.searchKey,
              fType: FilterFieldType.STRING,
              condition: item.condition,
              value: valueItm === null ? item.defValue : valueItm,
              additionValue: get(item, 'contentFilterColumn.id', null),
              additionValue1: get(item, 'reverseLeftColumn.id', null),
              additionValue2: get(item, 'reverseRightColumn.id', null)
            });
          })
        ]
      });
      return HandBookServiceClient.getAllHandBookRows(useAppStore.getState().token, contentItem.handBookId, filter);
    },
    getDiffInDaysWithWeekend: (start: number | string, end: number | string) => {
      if (parseNumber(end) > 0 && parseNumber(start) > 0) {
        const filter = new KazFilter({
          position: 0,
          countFilter: 999,
          orders: [],
          items: [new FilterItem({
            field: 'weekendDate',
            value: dayjs(parseNumber(start)).startOf('day').valueOf() + ';' + dayjs(parseNumber(end)).endOf('day').valueOf(),
            fType: FilterFieldType.DATE,
            condition: FilterCondition.BETWEEN
          })]
        });
        return CalendarServiceClient.getAllWeekendDictionaries(useAppStore.getState().token, filter);
      } else {
        return new Promise((resolve) => { resolve([]); });
      }
    },
    getAllDepartmentsForUser: userId => {
      return DepartmentServiceClient.getAllDepartmentsForUser(useAppStore.getState().token, userId, false, new KazFilter({
        position: 0,
        countFilter: 999
      }));
    },
    showLoader: (timeout: number) => {
      Toast.clear();
      Toast.show({
        icon: 'loading',
        duration: 0
      });
      if (timeout) {
        setTimeout(() => {
          Toast.clear();
        }, timeout);
      }
    },
    hideLoader: () => {
      Toast.clear();
    },
    showNotification: (type, title, message, delay) => {
      let icon = null;
      switch (type) {
        case 'success':
          icon = 'success'
          break;
        case 'error':
          icon = 'fail'
          break;
        default:
          icon = null;
          break;
      }
      Toast.clear();
      Toast.show({
        icon: icon,
        content: <Space direction={'vertical'} align={'center'} justify={'center'}>
          {title}
          {message}
        </Space>,
        duration: delay || 5000
      })
    },
    getDataFromApi: (url, type = 'GET', params = {}, useLoader = false) => {
      try {
        if (useLoader) {
          Toast.clear();
          Toast.show({
            icon: 'loading',
            duration: 0
          });
        };
        return fetch(url, {
          method: type,
          //@ts-ignore
          body: type === 'GET' ? undefined : params,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          dataType: 'json'
        }).then(response => {
          return response.json();
        }).finally(() => {
          if (useLoader) Toast.clear();
        });
      } catch (error) {
        if (useLoader) Toast.clear();
      }
    },
    getMe: () => useAppStore.getState().clientInfo,
    getMeAdditionalInfo: () => getUserAdditionalInfo(useAppStore.getState().clientInfo.id),
    getUserAdditionalInfo: (id) => getUserAdditionalInfo(id),
    getUserIdsByGroupId: (groupId = null) => {
      return new Promise(async (resolve) => {
        try {
          let userIds = [];
          const getUsersIds = async (position = 0) => {
            const result = await UserManagementServiceClient.getAllUsersByGroup(
              useAppStore.getState().token,
              groupId,
              new KazFilter({
                position: position,
                countFilter: 999
              })
            );
            userIds = [...userIds, ...map(result, itm => itm.id)];
            if (size(result) === 999) {
              await getUsersIds(size(userIds));
            }
          };
          await getUsersIds(0);
          resolve(userIds);
        } catch (error) {
          resolve([]);
        }
      });
    },
    setRequiredLink: (key, requared: boolean) => {
      const addressPath = getPathLinkByKey(key);
      setValue(`${addressPath}.requared`, requared);
    },
    setVisibleLink: (key, visible: boolean) => {
      const addressPath = getPathLinkByKey(key);
      setValue(`${addressPath}.visible`, visible);
    },
    setReadOnlyLink: (key, readOnly: boolean) => {
      const addressPath = getPathLinkByKey(key);
      setValue(`${addressPath}.readOnly`, readOnly);
    },
    currencyToWord: (value, params) => {
      return numberToString(value, {
        language: getCurrentLocale(),
        ...params
      });
    }
  };
};
