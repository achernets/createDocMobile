import { Divider, FormItemProps, Selector, Stepper } from "antd-mobile";
import { JSX, useMemo } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import { declension, getLetterJiraTime, getNumberJiraTime, JIRA_TIME } from "../../../utils";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import useAppStore from "../../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { get } from "lodash";

type JiraTimeFProps = {
  label?: string,
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean
};

const JiraTime = ({ label, name, control, defaultValue, formItemProps = {}, disabled = false }: JiraTimeFProps): JSX.Element => {
  const { field: { value, onChange }, fieldState: { error } } = useController({
    name,
    control,
    defaultValue
  });

  const { MIN_PERIOD_DATE } = useAppStore(useShallow((state)=>({
    MIN_PERIOD_DATE: get(state, 'SETTINGS.MIN_PERIOD_DATE', '1d')
  })));

  const { t } = useTranslation();

  const parseValue = useMemo(() => {
    return {
      count: getNumberJiraTime(value) || 0,
      type: getLetterJiraTime(value) || getLetterJiraTime(MIN_PERIOD_DATE)
    }
  }, [value, MIN_PERIOD_DATE]);

  const optionsType = useMemo(() => JIRA_TIME.slice(JIRA_TIME.indexOf(getLetterJiraTime(getLetterJiraTime(MIN_PERIOD_DATE)))).map(itm => ({
    label: declension(1, t(`JIRA_TIME_DOC.${itm}_1`, { number: '' }), t(`JIRA_TIME_DOC.${itm}_2`, { number: '' }), t(`JIRA_TIME_DOC.${itm}_3`, { number: '' })),
    value: itm
  })), [t, MIN_PERIOD_DATE, JIRA_TIME]);

  return <Wrapper
    label={<>
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
    className={classNames({ 'error_item': formItemProps?.required && error })}
    {...formItemProps}
  >
    <Stepper
      value={parseValue.count}
      onChange={val => onChange(`${val}${parseValue.type}`)}
      step={1}
      disabled={disabled}
    />
    <Divider />
    <Selector
      multiple={false}
      options={optionsType}
      //@ts-ignore
      value={parseValue.type}
      onChange={(arr) => onChange(`${parseValue.count}${arr[0]}`)}
      disabled={disabled}
    />
  </Wrapper>
};


export default JiraTime;