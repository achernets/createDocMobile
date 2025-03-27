import { includes, reduce, toLower, values } from "lodash";

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
  if(date?.toNumber){
    value = date?.toNumber(); 
  } 
  if(value === -1 || value === undefined) return null;
  return value;
};