import { FormItemProps, Input, Popup } from "antd-mobile";
import { JSX, useState } from "react";
import { Wrapper } from "./styled";
import { Control, useController, useWatch } from "react-hook-form";
import Switch from "../Switch";
import DatePicker from "../DateTimePicker";
import JiraTime from "../JiraTime";

type StageDeadlineFProps = {
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean
};

const StageDeadline = ({ name, control, defaultValue, formItemProps = {}, disabled = false }: StageDeadlineFProps): JSX.Element => {
  const { field: { value } } = useController({
    name: `${name}.deadLine`,
    control,
    defaultValue
  });
  const [visible, setVisible] = useState<boolean>(false);


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
      {runPerriodicall ? 'Період' : 'Термін виконання'}
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
        <Switch
          name={`${name}.runPerriodicall`}
          control={control}
          label={'Періодичне виконання'}
        />
        {runPerriodicall ? <>
          <DatePicker
            name={`${name}.startPeriod`}
            control={control}
            label={'Дата початку'}
            time={true}
            formItemProps={{
              required: true
            }}
          />
          <JiraTime
            name={`${name}.periodicJiraEndDate`}
            control={control}
            label={'periodicJiraEndDate'}
            formItemProps={{
              required: true
            }}
          />
          <DatePicker
            name={`${name}.periodicEndDate`}
            control={control}
            label={'Дата закінчення циклу'}
            time={true}
            formItemProps={{
              required: true
            }}
          />

          <JiraTime
            name={`${name}.nextStartPeriod`}
            control={control}
            label={'Період'}
            formItemProps={{
              required: true
            }}
          />
          <JiraTime
            name={`${name}.cardActivityPeriod`}
            control={control}
            label={'Час виконання'}
            formItemProps={{
              required: true
            }}
          />
        </> : <JiraTime
          name={`${name}.deadLine`}
          control={control}
          label={'Термін виконання'}
          formItemProps={{
            required: true
          }}
        />}
      </div>
    </Popup>
  </Wrapper>
};


export default StageDeadline;