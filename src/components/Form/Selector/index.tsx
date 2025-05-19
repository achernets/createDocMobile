import { ErrorBlock, FormItemProps, Input, List, Popup } from "antd-mobile";
import { JSX, useCallback, useEffect, useMemo, useState } from "react";
import { ItemFullStyled, ListStyled, Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import { find, map, size } from "lodash";
import { CheckOutline } from "antd-mobile-icons";
import classNames from "classnames";

type SelectorFProps = {
  label?: string,
  defaultValue?: string,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean,
  options: {
    label: string,
    value: string | null
  }[]
}

const Selector = ({ label, name, control, defaultValue = null, formItemProps = {}, disabled = false, options = [] }: SelectorFProps): JSX.Element => {
  const { field: { value, ...field }, fieldState: { error } } = useController({
    name,
    control,
    defaultValue
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<any>(value);

  const textInput = useMemo(() => {
    return find(options, { value: value })?.label || '';
  }, [value]);

  const isSelectedItem = useCallback((item: any) => {
    return localValue === item.value;
  }, [localValue]);

  useEffect(() => {
    if (visible === false) {
      setLocalValue(value);
    };
  }, [visible, value]);

  return <>
    <Wrapper
      label={<>
        {label}
        {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
      </>}
      trigger='onConfirm'
      onClick={() => disabled ? undefined : setVisible(true)}
      className={classNames({ 'error_item': formItemProps?.required && error })}
      {...formItemProps}
    >
      <Input
        readOnly
        placeholder={'Обрати'}
        value={textInput}
      />
    </Wrapper>
    <Popup
      visible={visible}
      onMaskClick={() => {
        field.onChange(localValue);
        setVisible(false);
      }}
      bodyStyle={{ maxHeight: '60vh' }}
      destroyOnClose
      afterClose={() => {
        if (value !== localValue) { field.onChange(localValue); }
      }}
    >
      <ListStyled>
        {map(options, (item: any) => <List.Item
          key={item.value}
          onClick={() => {
            if (isSelectedItem(item)) {
              setLocalValue(null);
            } else {
              setLocalValue(options.find((itm: any) => itm.value === item.value)?.value);
            }
          }}
          arrowIcon={isSelectedItem(item) ? <CheckOutline color={'#1890FF'} /> : false}
        >
          {item.label || ''}
        </List.Item>)}
        {size(options) === 0 && <ItemFullStyled>
          <ErrorBlock
            status='empty'
            title={'Нічого не знайдено'}
            description={null}
          />
        </ItemFullStyled>}
      </ListStyled>
    </Popup>
  </>
};


export default Selector;