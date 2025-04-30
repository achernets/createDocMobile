import { includes, reduce, toLower, values } from "lodash";
import { DocumentServiceClient } from "../api";
import useAppStore from "../store/useAppStore";
import { AttachmentEditMode, AttachmentExtStatus, DocumentAccessPolicy } from "../api/data";
import Int64 from "node-int64";

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
  let value = date
  if (date?.toNumber) {
    value = date?.toNumber();
  }
  if (value === -1 || value === undefined) return null;
  return value;
};

export const parseNumber = (number: any) => {
  let value = number;
  if (number === null || number === undefined) return null;
  return Number(value);
};

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