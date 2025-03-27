import { Checkbox as ACheckbox, CheckboxProps } from "antd-mobile";
import { JSX } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";

type CheckboxFProps = {
  label?: string,
  defaultValue?: string,
  name: string,
  control: Control<any>,
} & CheckboxProps

const Checkbox = ({ label, name, control, defaultValue = '', ...props }: CheckboxFProps): JSX.Element => {
  const { field: { value, ...field } } = useController({
    name,
    control,
    defaultValue
  });

  return <Wrapper>
    <ACheckbox
      checked={value}
      {...field}
      {...props}
    >
      {label}
    </ACheckbox>
  </Wrapper>
};


export default Checkbox;