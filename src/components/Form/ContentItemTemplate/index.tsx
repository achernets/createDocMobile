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
import RangeDatePicker from "../RangeDatePicker";
import Currency from "../Currency";
import RadioGroup from "../RadioGroup";
import AttachmentItem from "../AttachmentItem";
import DepartmentItem from "../DepartmentItem";
import { PlayOutline } from "antd-mobile-icons";
import HandBookItem from "../HandBookItem";
import TableItem from "../TableItem";
import ContainerItem from "../ContainerItem";

type ContentItemTemplateProps = {
  pathAllItems: string,
  pathLink: string,
  control: Control<any>,
  contentItem: ContentItem,
  patternId?: string,
  documentId?: string,
  addChanges: () => void
};

const ContentItemTemplate = ({ contentItem, pathAllItems = 'contentItems', control, pathLink, patternId, documentId, addChanges }: ContentItemTemplateProps) => {

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
        return <RadioGroup
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
        return <Ellipsis
          content={item.oName}
        />;
      case ContentItemType.BUTTON:
        return <Button
          color={'primary'}
          block
          onClick={addChanges}
        >
          {item.oName}
          <PlayOutline />
        </Button>;
      case ContentItemType.CALENDAR_RANGE:
        return <RangeDatePicker
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value`}
          control={control}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.CURRENCY:
        return <Currency
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value.strValue`}
          control={control}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.ATTACHMENT:
        return <AttachmentItem
          label={item.oName}
          name={`${pathAllItems}.${item.key}.attachment`}
          control={control}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.ORG_STRUCTURE:
        return <DepartmentItem
          label={item.oName}
          name={`${pathAllItems}.${item.key}.department`}
          control={control}
          disabled={readOnlyItem}
          itemKey={item.key}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.HAND_BOOK:
        console.log(item.handBook, item.key)
        return <HandBookItem
          label={item.oName}
          name={`${pathAllItems}.${item.key}.value.hbValue`}
          control={control}
          disabled={readOnlyItem}
          handBook={item.handBook}
          itemKey={item.key}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.TABLE:
        return <TableItem
          label={item.oName}
          name={`${pathAllItems}.${item.key}.childItems`}
          control={control}
          disabled={readOnlyItem}
          contentItem={item}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.CONTAINER:
        return <ContainerItem
          label={item.oName}
          name={`${pathAllItems}.${item.key}.childItems`}
          control={control}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      default:
        return <div>{invert(ContentItemType)[item.type]}</div>;
    }
  }, [readOnlyItem, requiredItem]);

  return renderItem(contentItem);
}

export default ContentItemTemplate;