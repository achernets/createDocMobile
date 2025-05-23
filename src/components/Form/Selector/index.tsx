import { ErrorBlock, FormItemProps, Input, List, Popup } from "antd-mobile";
import { JSX, useCallback, useEffect, useMemo, useState } from "react";
import { ItemFullStyled, ListStyled, Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import { find, map, size } from "lodash";
import { CheckOutline } from "antd-mobile-icons";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  const textInput = useMemo(() => {
    return find(options, { value: value })?.label || '';
  }, [value]);

  const isSelectedItem = useCallback((item: any) => {
    return value === item.value;
  }, [value]);

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
        placeholder={t('MobileCreateDoc.select')}
        value={textInput}
      />
    </Wrapper>
    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false);
      }}
      bodyStyle={{ maxHeight: '60vh' }}
      destroyOnClose
      afterClose={() => {
        field.onChange(value);
      }}
    >
      <ListStyled>
        {map(options, (item: any) => <List.Item
          key={item.value}
          onClick={() => {
            if (isSelectedItem(item)) {
              field.onChange(null);
            } else {
              field.onChange(options.find((itm: any) => itm.value === item.value)?.value);
            }
            setVisible(false);
          }}
          arrowIcon={isSelectedItem(item) ? <CheckOutline color={'#1890FF'} /> : false}
        >
          {item.label || ''}
        </List.Item>)}
        {size(options) === 0 && <ItemFullStyled>
          <ErrorBlock
            status='empty'
            title={t('MobileCreateDoc.emptyData')}
            description={null}
          />
        </ItemFullStyled>}
      </ListStyled>
    </Popup>
  </>
};


export default Selector;