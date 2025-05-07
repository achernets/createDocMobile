import { Button, FormItemProps, Space } from "antd-mobile";
import { JSX, useCallback } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import { ArrowsAltOutline } from "antd-mobile-icons";
import useModalStore from "../../../store/useModals";
import { useShallow } from "zustand/shallow";
import { ContentItem } from "../../../api/data";

type TableItemFProps = {
  label?: string,
  defaultValue?: string,
  name: string,
  control: Control<any>,
  disabled?: boolean,
  formItemProps?: FormItemProps,
  contentItem: ContentItem
}

const TableItem = ({ label, name, control, defaultValue = '', disabled = false, formItemProps = {}, contentItem }: TableItemFProps): JSX.Element => {
  const { field: { value, ...field } } = useController({
    name,
    control,
    defaultValue
  });

  const removeItemsController = useController({
    name: name?.replace('childItems', 'tableChildContentsToRemove'),
    control,
    defaultValue
  });

  const openModal = useModalStore(useShallow((state) => state.openModal));

  const onOpen = useCallback(() => {
    openModal('TABLE_EDIT', {
      contentItem: contentItem,
      disabled: disabled,
      cb: (items, removeItems) => {
        field.onChange(items);
        removeItemsController.field.onChange(removeItems)
      }
    });
  }, [contentItem, disabled]);

  return <Wrapper
    label={<Space style={{ width: '100%' }} justify={'between'} align={'center'}>
      <div>
        {label}
        {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
      </div>
      <Button fill={'none'} color={'primary'} size={'small'}
        onClick={onOpen}
      >
        <ArrowsAltOutline />
      </Button>
    </Space>}
  >

  </Wrapper>
};


export default TableItem;