import { useCallback } from "react";
import { ContentItem, ContentItemType } from "../../../api/data";
import Input from "../Input";
import { Control, useWatch } from "react-hook-form";
import TextArea from "../TextArea";
import Checkbox from "../Checkbox";
import Selector from "../Selector";
import { invert, map } from "lodash";
import DatePicker from "../DateTimePicker";
import Users from "../Users";
import InputUrl from "../InputUrl";
import { Button, Divider, Ellipsis } from "antd-mobile";
import RandeDatePicker from "../RandeDatePicker";

type ContentItemTemplateProps = {
  pathAllItems: string,
  pathLink: string,
  control: Control,
  contentItem: ContentItem,
  patternId?: string,
  documentId?: string
};

const ContentItemTemplate = ({ contentItem, pathAllItems = 'contentItems', control, pathLink, patternId, documentId }: ContentItemTemplateProps) => {

  const readOnlyItem = useWatch({
    control: control,
    name: `${pathLink}.readOnly`
  });

  const requiredItem = useWatch({
    control: control,
    name: `${pathLink}.requared`
  });

  const renderItem = useCallback((item: ContentItem) => {
    switch (contentItem.type) {
      case ContentItemType.TEXT_FIELD:
        return <Input
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value.strValue`}
          control={control}
          placeholder="Ввести"
          readOnly={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.MULTILINE_TEXT_FIELD:
        return <TextArea
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value.strValue`}
          control={control}
          showCount
          maxLength={2000}
          placeholder="Ввести"
          readOnly={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.CHECKBOX:
        return <Checkbox
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value.strValue`}
          control={control}
          isString={true}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.COMBO_BOX:
        return <Selector
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value.strValue`}
          control={control}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
          options={map(item.fields, itm => ({
            label: itm,
            value: itm
          }))}
        />;
      case ContentItemType.CALENDAR:
      case ContentItemType.DATE_TIME:
        return <DatePicker
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value.strValue`}
          control={control}
          disabled={readOnlyItem}
          time={item.type === ContentItemType.DATE_TIME}
        />;
      case ContentItemType.USER_CHOICE:
        return <Users
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value.strValue`}
          control={control}
          disabled={readOnlyItem}
          changeProps={{
            patternId: patternId,
            documentId: documentId
          }}
        />;
      case ContentItemType.SWITCH_ITEM:
        return <Selector
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value.strValue`}
          control={control}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
          // @ts-check
          options={map(item.fields, itm => ({
            label: itm,
            value: itm
          }))}
        />;
      case ContentItemType.HTTP_LINK:
        return <InputUrl
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value.strValue`}
          control={control}
          placeholder="Ввести"
          readOnly={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.SEPARATOR:
        return <Divider />;
      case ContentItemType.MARK:
        return <Ellipsis content={item.oName} />;
      case ContentItemType.BUTTON:
        return <Button color={'primary'}>{item.oName}</Button>;
      case ContentItemType.CALENDAR_RANGE:
        return <RandeDatePicker
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value`}
          control={control}
          disabled={readOnlyItem}
        />;
      default:
        return <div>{invert(ContentItemType)[item.type]}</div>;
    }
  }, [readOnlyItem, requiredItem]);

  return <div>
    {renderItem(contentItem)}
  </div>
}

export default ContentItemTemplate;