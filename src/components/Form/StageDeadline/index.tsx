import { FormItemProps, Input, Popup } from "antd-mobile";
import { JSX, useState } from "react";
import { Wrapper } from "./styled";
import { Control, useController, useWatch } from "react-hook-form";
import Switch from "../Switch";
import DatePicker from "../DateTimePicker";
import JiraTime from "../JiraTime";
import useAppStore from "../../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

type StageDeadlineFProps = {
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean
};

const StageDeadline = ({ name, control, defaultValue, formItemProps = {}, disabled = false }: StageDeadlineFProps): JSX.Element => {
    const { STAGE_PERIOD_OF_EXECUTION } = useAppStore(useShallow((state) => ({
    STAGE_PERIOD_OF_EXECUTION: get(state, 'SETTINGS.STAGE_PERIOD_OF_EXECUTION', true)
  })));
  const { field: { value } } = useController({
    name: `${name}.deadLine`,
    control,
    defaultValue
  });
  const [visible, setVisible] = useState<boolean>(false);

  const { t } = useTranslation();

  const runPerriodicall = useWatch({
    control,
    name: `${name}.runPerriodicall`
  });

  const cardActivityPeriod = useWatch({
    control,
    name: `${name}.cardActivityPeriod`
  });

  return <Wrapper
    label={<>
      {runPerriodicall ?  t('MobileCreateDoc.period') : t('MobileCreateDoc.deadLine')}
    </>}
    trigger='onConfirm'
    onClick={() => disabled ? undefined : setVisible(true)}
    {...formItemProps}
  >
    <Input
      value={runPerriodicall ? cardActivityPeriod : value}
      readOnly={true}
    />
    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false);
      }}
      bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}
      destroyOnClose
    >
      <div style={{
        padding: 16,
        paddingTop: 8
      }}>
        {STAGE_PERIOD_OF_EXECUTION && <Switch
          name={`${name}.runPerriodicall`}
          control={control}
          label={t('MobileCreateDoc.runPerriodicall')}
          disabled={disabled}
        />}
        {runPerriodicall ? <>
          <DatePicker
            name={`${name}.startPeriod`}
            control={control}
            label={t('MobileCreateDoc.startPeriod')}
            time={true}
            formItemProps={{
              required: true
            }}
            disabled={disabled}
          />
          <JiraTime
            name={`${name}.periodicJiraEndDate`}
            control={control}
            label={t('MobileCreateDoc.periodicJiraEndDate')}
            formItemProps={{
              required: true
            }}
            disabled={disabled}
          />
          <DatePicker
            name={`${name}.periodicEndDate`}
            control={control}
            label={t('MobileCreateDoc.periodicEndDate')}
            time={true}
            formItemProps={{
              required: true
            }}
            disabled={disabled}
          />

          <JiraTime
            name={`${name}.nextStartPeriod`}
            control={control}
            label={t('MobileCreateDoc.nextStartPeriod')}
            formItemProps={{
              required: true
            }}
            disabled={disabled}
          />
          <JiraTime
            name={`${name}.cardActivityPeriod`}
            control={control}
            label={t('MobileCreateDoc.cardActivityPeriod')}
            formItemProps={{
              required: true
            }}
            disabled={disabled}
          />
        </> : <JiraTime
          name={`${name}.deadLine`}
          control={control}
          label={t('MobileCreateDoc.deadLine')}
          formItemProps={{
            required: true
          }}
          disabled={disabled}
        />}
      </div>
    </Popup>
  </Wrapper>
};


export default StageDeadline;