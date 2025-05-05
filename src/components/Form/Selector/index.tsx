import { Selector as ASelector, SelectorProps, FormItemProps } from "antd-mobile";
import { JSX } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import { omit } from "lodash";

type SelectorFProps = {
  label?: string,
  defaultValue?: any[],
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
} & SelectorProps<any>

const Selector = ({ label, name, control, defaultValue = [], formItemProps = {}, ...props }: SelectorFProps): JSX.Element => {
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
    {...formItemProps}
  >
    <ASelector
      value={value}
      {...omit(field, 'ref')}
      {...props}
    />
  </Wrapper>
};


export default Selector;