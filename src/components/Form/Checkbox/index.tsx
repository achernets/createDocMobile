import { Checkbox as ACheckbox, CheckboxProps, FormItemProps } from "antd-mobile";
import { JSX } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import classNames from "classnames";

type CheckboxFProps = {
  label?: string,
  defaultValue?: string,
  name: string,
  control: Control<any>,
  isString?: boolean,
  formItemProps?: FormItemProps,
  errorMessage?: string
} & CheckboxProps

const Checkbox = ({ label, name, control, defaultValue = '', isString = false, errorMessage, formItemProps = {}, ...props }: CheckboxFProps): JSX.Element => {
  const { field: { value, ...field }, fieldState: { error } } = useController({
    name,
    control,
    defaultValue
  });

  return <Wrapper
    className={classNames({ 'error_item': errorMessage || error })}
  >
    <ACheckbox
      checked={isString ? value === 'true' : value}
      {...field}
      onChange={(e) => isString ? field.onChange(String(e)) : field.onChange(e)}
      {...props}
    >
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </ACheckbox>
  </Wrapper>
};


export default Checkbox;