import { Input as AInput, FormItemProps, InputProps } from "antd-mobile";
import { JSX, useMemo } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

type InputFProps = {
  label?: string,
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
} & InputProps;

const Input = ({ label, name, control, defaultValue, formItemProps = {}, ...props }: InputFProps): JSX.Element => {
  const { field: { value, ...field }, fieldState: { error } } = useController({
    name,
    control,
    defaultValue
  });

  const { t } = useTranslation();

  const val = useMemo(() => {
    if (!value || value === null) return '';
    return value;
  }, [value]);

  return <Wrapper
    name={null}
    label={<>
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
    className={classNames({ 'error_item': formItemProps?.required && error })}
    {...formItemProps}
  >
    <AInput
      {...field}
      value={val}
      placeholder={t('MobileCreateDoc.enterText')}
      {...props}
    />
  </Wrapper>
};


export default Input;