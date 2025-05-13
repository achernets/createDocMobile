import { get, includes, isEmpty, reduce, replace, toLower, trim, values } from "lodash";
import { DocumentServiceClient } from "../api";
import useAppStore from "../store/useAppStore";
import { AttachmentEditMode, AttachmentExtStatus, DocumentAccessPolicy, DocumentAccessPolicyType, HBColumnType, HBColumnValue, UserOrGroup, UserOrGroupType } from "../api/data";
import Int64 from "node-int64";
import dayjs from "dayjs";


export const JIRA_TIME = ['m', 'h', 'd', 'w', 'M', 'q', 'y'];

export const PUBLIC_URL = import.meta.env.BASE_URL;

export const searchFilter = (items: any, fields: string[], string: string) => {
  if (!string || string === null || string === '') return items;
  const searchStr = toLower(string);
  return values(reduce(items, (hash: any, item, index) => {
    for (const itm of fields) {
      if (includes(toLower(item[itm]), searchStr)) hash[index] = item;
    }
    return hash;
  }, {}));
};

export const parseDate = (date: any) => {
  let value = date;
  if(date?.toNumber){
    value = date?.toNumber();
  }
  if (value === -1 || value === undefined) return null;
  return Number(value);
};

export const parseNumber = parseDate;

export const getFileExt = (name: string) => {
  return toLower(name.substr(name.lastIndexOf('.') + 1, name.length));
};

export const getFileIcon = (name: string) => {
  const type = getFileExt(name);
  switch (type) {
    case 'doc':
    case 'docx':
      return `${PUBLIC_URL}assets/img/attachments/doc.svg`;
    case 'xls':
    case 'xlsx':
      return `${PUBLIC_URL}assets/img/attachments/xls.svg`;
    case 'ppt':
    case 'pptx':
      return `${PUBLIC_URL}assets/img/attachments/ppt.svg`;
    case 'pdf':
      return `${PUBLIC_URL}assets/img/attachments/pdf.svg`;
    case 'png':
      return `${PUBLIC_URL}assets/img/attachments/png.svg`;
    case 'jpg':
    case 'jpeg':
    case 'tif':
    case 'tiff':
    case 'bmp':
    case 'wbmp':
    case 'gif':
      return `${PUBLIC_URL}assets/img/attachments/jpg.svg`;
    default:
      return `${PUBLIC_URL}assets/img/attachments/undefined.svg`;
  }
};

export const getDocIcon = (icon: string | number) => {
  return `${PUBLIC_URL}assets/img/document-icons/${icon}.svg`;
};

export const readFileBinaryString = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (e.target.readyState !== FileReader.DONE) return;
      //@ts-expect-error 
      const binaryString = arrayBufferToBinaryString(e.target.result);
      resolve(binaryString);
    };
    reader.onerror = (e) => {
      console.error('Помилка зчитування:', e);
      reject();
    };
    reader.readAsArrayBuffer(file);
  });
};

export const arrayBufferToBinaryString = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return binary;
};

export const createAttachmetFromFile = async (file: File, extStatus = AttachmentExtStatus.PRIMARY) => {
  try {
    const data = await readFileBinaryString(file) as string;
    const portions = getPortions(file.size, data);
    const attachmentId = await DocumentServiceClient.createLoadableAttachment(
      useAppStore.getState().token,
      "",
      file.name,
      new Int64(file.size),
      portions.count,
      "",
      "",
      true,
      new DocumentAccessPolicy(),
      AttachmentEditMode.MULTIPLE,
      extStatus
    );
    let att = null;
    for (let index = 0; index < portions.count; index++) {
      //@ts-ignore
      att = await DocumentServiceClient.uploadDocumentAttachmentPortions(useAppStore.getState().token, attachmentId, index + 1, data.substr(index * portions.portions, portions.portions));
    }
    return att;
  } catch (error) {
    throw error;
  }
};

export const getPortions = (size = 0, string = '') => {
  if (size > 1000000) {
    if (size > 1000000000) {
      return {
        count: Math.ceil(string.length / 1000000000),
        portions: 1000000000
      };
    } else {
      return {
        count: Math.ceil(string.length / 1000000),
        portions: 1000000
      };
    }
  }
  return {
    count: 1,
    portions: string.length
  };
};

const getFio = (user: UserOrGroup) => {
  if (user === null || user === undefined) return '';
  const { type = 0, nameGroup = '', userLastName = '', userFirstName = '', userMiddleName = '' } = user;
  if (type === UserOrGroupType.GROUP) {
    return trim(nameGroup);
  }
  let fio = '';
  if (!isEmpty(trim(userLastName))) {
    fio = trim(userLastName);
  }
  if (!isEmpty(trim(userFirstName))) {
    fio = `${fio} ${trim(userFirstName).substr(0, 1)}.`;
  }
  if (!isEmpty(trim(userMiddleName))) {
    fio = `${fio}${trim(userMiddleName).substr(0, 1)}.`;
  }
  return fio;
};

export const getHBValue = (hbValue : HBColumnValue, string = true, lang = getCurrentLocale()) => {
  const language = lang;
  if (hbValue === null) return null;
  const value = hbValue?.depColumnId === null || hbValue?.depColumnId === undefined ? hbValue?.value : hbValue?.depValue;
  switch (get(value, 'type', null)) {
    case HBColumnType.TEXT:
      return value?.value?.get(language) || null;
    case HBColumnType.NUMBER:
    case HBColumnType.GLOBAL_TEXT:
      return value?.value?.get('any') || null;
    case HBColumnType.USER_CHOICE:
      const user = get(value, 'user', null);
      return string ? getFio(user) : user;
    case HBColumnType.DATE:
      const date = get(value, 'valueDate', null);
      return parseDate(date) !== null ? (string ? dayjs(parseDate(date)).format('DD.MM.YYYY') : date) : null;
    default:
      return null;
  }
};

export const getFilterHBValueSearchWord = (column) => {
  switch (column?.columnType) {
    case HBColumnType.DATE:
      return 'directDate';
    case HBColumnType.HAND_BOOK:
      return 'directDepRowId';
    case HBColumnType.USER_CHOICE:
      return 'directUserFullName';
    default:
      return 'directValue';
  };
};

export const getCurrentLocale = () => 'en';

export const getNumberJiraTime = input => Number(trim(replace(input, /\D/g, '')));

export const getLetterJiraTime = input => trim(replace(input, /[0-9]/g, ''));

export const hasRole = (role: string) => {
  const roles = useAppStore.getState().roles;
  return roles.has(role);
};

export const accessWithPolicy = (policy, userRole, adminRole) => {
  if (hasRole(adminRole)) return true;
  return (get(policy, 'type', DocumentAccessPolicyType.ACCESS) === DocumentAccessPolicyType.ACCESS && hasRole(userRole));
};