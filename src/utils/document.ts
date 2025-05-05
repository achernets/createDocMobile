import { get } from "lodash";
import { ContentItemType } from "../api/data";



export const ContentItemExecScript = async (setValue, getValues) => {

  return {
    getContentItemValue: (key) => {
      const item = getValues(`contentItems.${key}`);
      switch (item.type) {
        case ContentItemType.CHECKBOX:
          return get(item, 'value.strValue', false) === 'true';
        default:
          return get(item, 'value.strValue', null);
      }
    },
    setContentItemValue: (key, value) => {
      setValue(`contentItems.${key}.value.strValue`, value);
    }
  };
};
