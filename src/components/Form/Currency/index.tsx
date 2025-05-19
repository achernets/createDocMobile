import { FormItemProps } from "antd-mobile";
import React, { JSX } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import { NumericFormat } from 'react-number-format';
import classNames from "classnames";

type CurrencyProps = {
  label?: string,
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
  disabled?: boolean,
  formItemProps?: FormItemProps,
};

const CustomStyledInput = React.forwardRef((props, ref) => {
  return <div className="adm-input">
    {//@ts-ignore}
    }<input ref={ref} {...props} className="adm-input-element" />
  </div>;
});

const Currency = ({ label, name, control, defaultValue, formItemProps = {}, disabled = false, ...props }: CurrencyProps): JSX.Element => {
  const { field: { ref, onChange, ...field }, fieldState: { error } } = useController({
    name,
    control,
    defaultValue
  });

  return <Wrapper
    label={<>
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
    className={classNames({ 'error_item': formItemProps?.required && error })}
    {...formItemProps}
  >
    <NumericFormat
      {...field}
      getInputRef={ref}
      valueIsNumericString={true}
      customInput={CustomStyledInput}
      thousandSeparator=' '
      decimalSeparator='.'
      decimalScale={2}
      fixedDecimalScale={true}
      onChange={() => { }}
      onValueChange={(value) => {
        onChange(value.value);
      }}
      disabled={disabled}
      {...props}
    />
  </Wrapper>
};


export default Currency;