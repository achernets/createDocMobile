import { TextArea as ATextArea, FormItemProps, TextAreaProps } from "antd-mobile";
import { JSX } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

type TextAreaFProps = {
  label?: string,
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps
} & TextAreaProps

const TextArea = ({ label, name, control, defaultValue, formItemProps = {}, ...props }: TextAreaFProps): JSX.Element => {
  const { field, fieldState: { error } } = useController({
    name,
    control,
    defaultValue
  });

  const { t } = useTranslation();

  return <Wrapper
    label={<>
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
    className={classNames({ 'error_item': formItemProps?.required && error })}
    {...formItemProps}
  >
    <ATextArea
      {...field}
      placeholder={t('MobileCreateDoc.enterText')}
      {...props}
    />
  </Wrapper>
};


export default TextArea;