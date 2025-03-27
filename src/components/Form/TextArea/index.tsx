import { TextArea as ATextArea, TextAreaProps } from "antd-mobile";
import { JSX } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";

type TextAreaFProps = {
  label?: string,
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
} & TextAreaProps

const TextArea = ({ label, name, control, defaultValue, ...props }: TextAreaFProps): JSX.Element => {
  const { field } = useController({
    name,
    control,
    defaultValue
  });

  return <Wrapper
    label={label}
  >
    <ATextArea
      {...field}
      {...props}
    />
  </Wrapper>
};


export default TextArea;