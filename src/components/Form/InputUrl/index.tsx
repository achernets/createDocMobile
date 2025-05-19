import { Input, FormItemProps, InputProps } from "antd-mobile";
import { JSX } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import { LinkOutline } from "antd-mobile-icons";
import classNames from "classnames";

type InputUrlFProps = {
  label?: string,
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
} & InputProps

const InputUrl = ({ label, name, control, defaultValue, formItemProps = {}, ...props }: InputUrlFProps): JSX.Element => {
  const { field, fieldState: { error } } = useController({
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
    <div className={'inputUrl'}>
      <LinkOutline />
    </div>
    <Input
      {...field}
      {...props}
    />
  </Wrapper>
};


export default InputUrl;