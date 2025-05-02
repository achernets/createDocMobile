import { ContentItemType } from "../api/data";



export const ContentItemExecScript = async (setValue, getValues) => {

  return {
    getContentItemValue: (key) => {
      const item = getValues(`contentItems.${key}`);
      const v = getValues(`contentItems.${key}.value.strValue`);
      switch (item.type) {
        case ContentItemType.CHECKBOX:
          return getValues(`contentItems.${key}.value.strValue`) === 'true';
        default:
          return v;
      }
    },
    setContentItemValue: (key, value) => {
      setValue(`contentItems.${key}.value.strValue`, value);
    }
  };
};
