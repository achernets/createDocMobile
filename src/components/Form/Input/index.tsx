import { Input as AInput, FormItemProps, InputProps } from "antd-mobile";
import { JSX } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";

type InputFProps = {
  label?: string,
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
} & InputProps

const Input = ({ label, name, control, defaultValue, formItemProps = {}, ...props }: InputFProps): JSX.Element => {
  const { field } = useController({
    name,
    control,
    defaultValue
  });

  return <Wrapper
    label={<>
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
    {...formItemProps}
  >
    <AInput
      {...field}
      {...props}
    />
  </Wrapper>
};


export default Input;