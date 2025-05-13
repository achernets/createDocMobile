import { Divider, FormItemProps, Selector, Stepper } from "antd-mobile";
import { JSX, useMemo } from "react";
import { Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import { getLetterJiraTime, getNumberJiraTime, JIRA_TIME } from "../../../utils";

type JiraTimeFProps = {
  label?: string,
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean
};

const JiraTime = ({ label, name, control, defaultValue, formItemProps = {}, disabled = false }: JiraTimeFProps): JSX.Element => {
  const { field: { value, onChange } } = useController({
    name,
    control,
    defaultValue
  });

  const MIN_JIRA_TIME = 'd';

  const parseValue = useMemo(() => {
    return {
      count: getNumberJiraTime(value) || 0,
      type: getLetterJiraTime(value)
    }
  }, [value]);

  const optionsType = useMemo(() => JIRA_TIME.slice(JIRA_TIME.indexOf(getLetterJiraTime(MIN_JIRA_TIME))).map(itm => ({
    label: itm,
    value: itm
  })), [MIN_JIRA_TIME, JIRA_TIME]);

  return <Wrapper
    label={<>
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
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