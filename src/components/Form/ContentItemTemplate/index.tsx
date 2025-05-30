import { useCallback } from "react";
import { ContentItem, ContentItemType, FilterCondition, FilterFieldType, FilterItem } from "../../../api/data";
import Input from "../Input";
import { Control, UseFormGetValues, useWatch } from "react-hook-form";
import TextArea from "../TextArea";
import Checkbox from "../Checkbox";
import Selector from "../Selector";
import { get, invert, map, size } from "lodash";
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
import JiraTime from "../JiraTime";
import { getContentItemOriginalKey } from "../../../utils";

type ContentItemTemplateProps = {
  pathAllItems: string,
  pathLink: string,
  control: Control<any>,
  contentItemKey: string,
  patternId?: string,
  addChanges: () => void,
  getValues: UseFormGetValues<any>
};

const ContentItemTemplate = ({ contentItemKey, pathAllItems = 'contentItems', control, pathLink, patternId, addChanges, getValues }: ContentItemTemplateProps) => {

  const [conItem, readOnlyItem, requiredItem] = useWatch({
    control: control,
    name: [`${pathAllItems}.${contentItemKey}`, `${pathLink}.readOnly`, `${pathLink}.requared`]
  });

  const getMoreFiltersByConentItem = useCallback(() => {
    if (size(conItem?.itemHBFilterList) > 0) {
      return map(conItem.itemHBFilterList, item => {
        const cItem = getValues(`${pathAllItems}.${item.contentFilterKey}`);
        const valueItem = get(cItem, 'value.hbValue.row.id', null);
        return new FilterItem({
          field: item.searchKey,
          fType: FilterFieldType.STRING,
          condition: item.condition,
          value: valueItem === null ? item.defValue : valueItem,
          additionValue: get(item, 'contentFilterColumn.id', null),
          additionValue1: get(item, 'reverseLeftColumn.id', null),
          additionValue2: get(item, 'reverseRightColumn.id', null)
        });
      });
    }
    return [];
  }, [conItem]);


  const renderItem = useCallback((item: ContentItem) => {
    switch (item.type) {
      case ContentItemType.TEXT_FIELD:
        return <Input
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.value.strValue`}
          control={control}
          readOnly={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.MULTILINE_TEXT_FIELD:
        return <TextArea
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.value.strValue`}
          control={control}
          showCount
          maxLength={2000}
          readOnly={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.CHECKBOX:
        return <Checkbox
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.value.strValue`}
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
          name={`${pathAllItems}.${contentItemKey}.value.strValue`}
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
          name={`${pathAllItems}.${contentItemKey}.value.strValue`}
          control={control}
          disabled={readOnlyItem}
          time={item.type === ContentItemType.DATE_TIME}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.USER_CHOICE:
        return <Users
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.users`}
          control={control}
          disabled={readOnlyItem}
          changeProps={{
            patternId: patternId,
            filters: [
              new FilterItem({
                field: 'allowedInContent',
                value: patternId,
                fType: FilterFieldType.STRING,
                condition: FilterCondition.EQUAL,
                additionValue: getContentItemOriginalKey(item),
                additionValue1: item.id
              })
            ],
            scGrifs: [],
            types: ['users', 'scs'],
            selected: item.users,
            maxSelected: item.maxUserCount
          }}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.SWITCH_ITEM:
        return <RadioGroup
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.value.strValue`}
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
          name={`${pathAllItems}.${contentItemKey}.value.strValue`}
          control={control}
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
          disabled={readOnlyItem}
        >
          {item.oName}
          <PlayOutline />
        </Button>;
      case ContentItemType.CALENDAR_RANGE:
        return <RangeDatePicker
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.value`}
          control={control}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.CURRENCY:
        return <Currency
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.value.strValue`}
          control={control}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.ATTACHMENT:
        return <AttachmentItem
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.attachment`}
          control={control}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.ORG_STRUCTURE:
        return <DepartmentItem
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.department`}
          control={control}
          disabled={readOnlyItem}
          itemKey={contentItemKey}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.HAND_BOOK:
        return <HandBookItem
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.value.hbValue`}
          control={control}
          disabled={readOnlyItem}
          handBook={item.handBook}
          itemKey={contentItemKey}
          formItemProps={{
            required: requiredItem
          }}
          getMoreFiltersByConentItem={getMoreFiltersByConentItem}
        />;
      case ContentItemType.TABLE:
        return <TableItem
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.childItems`}
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
          name={`${pathAllItems}.${contentItemKey}.childItems`}
          control={control}
          disabled={readOnlyItem}
          formItemProps={{
            required: requiredItem
          }}
        />;
      case ContentItemType.JIRA_TIME:
        return <JiraTime
          label={item.oName}
          name={`${pathAllItems}.${contentItemKey}.value.strValue`}
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

  return renderItem(conItem);
}

export default ContentItemTemplate;