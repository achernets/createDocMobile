import { Switch as ASwitch, SwitchProps, FormItemProps } from "antd-mobile";
import { JSX } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import { omit } from "lodash";

type SwitchFProps = {
  label?: string,
  defaultValue?: string,
  name: string,
  control: Control<any>,
  isString?: boolean,
  formItemProps?: FormItemProps,
} & SwitchProps;

const Switch = ({ label, name, control, defaultValue = '', isString = false, formItemProps = {}, ...props }: SwitchFProps): JSX.Element => {
  const { field: { value, ...field } } = useController({
    name,
    control,
    defaultValue
  });

  return <Wrapper
    label={<>
    {label}
    {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
  >
    <ASwitch
      checked={isString ? value === 'true' : value}
      {...omit(field, 'ref') }
      onChange={(e) => isString ? field.onChange(String(e)) : field.onChange(e)}
      {...props}
    />
  </Wrapper>
};


export default Switch;