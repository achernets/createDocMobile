import { Radio, FormItemProps, RadioGroupProps, Space } from "antd-mobile";
import { JSX } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import { map, omit } from "lodash";

type RadioGroupFProps = {
  label?: string,
  defaultValue?: any[],
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean,
  options: {
    label: string,
    value: string | null
  }[]
} & RadioGroupProps

const RadioGroup = ({ label, name, control, defaultValue, formItemProps = {}, options = [], ...props }: RadioGroupFProps): JSX.Element => {
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
    <Radio.Group
      {...omit(field, 'ref')}
      {...props}
    >
      <Space direction='vertical'>
        {map(options, (option, index) => <Radio
          key={`${option.value}_${index}`}
          value={option.value}
        >
          {option.label}
        </Radio>)}
      </Space>
    </Radio.Group>
  </Wrapper>
};


export default RadioGroup;