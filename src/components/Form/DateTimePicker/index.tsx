import { Button, Calendar, CalendarProps, CenterPopup, FormItemProps, Input, Picker } from "antd-mobile";
import { JSX, useMemo, useState } from "react";
import { CalendarOutlineStyled, ClockCircleOutlineStyled, InputWrapper, Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import Int64 from "node-int64";
import { parseDate } from "../../../utils";
import dayjs from "dayjs";

type DatePickerFProps = {
  label?: string,
  defaultValue?: number | Int64,
  name: string,
  control: Control<any>,
  time?: boolean,
  formItemProps?: FormItemProps,
  disabled?: boolean,
} & Omit<CalendarProps, 'defaultValue' | 'onChange' | 'selectionMode' | 'value'>

const hours = Array.from({ length: 24 }, (_, i) => ({
  label: i.toString().padStart(2, '0'),
  value: i.toString().padStart(2, '0'),
}));

const minutes = Array.from({ length: 60 }, (_, i) => ({
  label: i.toString().padStart(2, '0'),
  value: i.toString().padStart(2, '0'),
}));

const DatePicker = ({ label, name, control, defaultValue = -1, time = false, formItemProps = {}, ...props }: DatePickerFProps): JSX.Element => {
  const { field: { value, onChange, ...field } } = useController({
    name,
    control,
    defaultValue
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleTimePicker, setVisibleTimePicker] = useState<boolean>(false);

  const val = useMemo(() => {
    const v = parseDate(value);
    return v === null ? null : dayjs(parseDate(value)).toDate();
  }, [value]);

  const textInput = useMemo(() => {
    if (val === null) {
      return "";
    }
    return dayjs(val).format('DD.MM.YYYY');
  }, [val]);

  const timeValue = useMemo(() => {
    if (val === null) {
      return [];
    }
    return [dayjs(val).get('hours').toString().padStart(2, '0'), dayjs(val).get('minutes').toString().padStart(2, '0')];
  }, [val]);

  return <>
    <Wrapper
      label={<>
        {label}
        {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
      </>}
      {...formItemProps}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8
      }}>
        <InputWrapper
          onClick={() => setVisible(true)}
        >
          <Input
            readOnly
            placeholder={'Обрати дати'}
            value={textInput}
          />
          <Button fill={'none'}>
            <CalendarOutlineStyled />
          </Button>
        </InputWrapper>
        {time && <InputWrapper
          onClick={() => time && textInput !== undefined && setVisibleTimePicker(true)}
          style={{ maxWidth: 90 }}
        >
          <Input
            readOnly
            placeholder={'Обрати час'}
            value={timeValue.join(":")}
            disabled={textInput === undefined}
          />
          <Button fill={'none'} disabled={textInput === undefined}>
            <ClockCircleOutlineStyled />
          </Button>
        </InputWrapper>}
      </div>
    </Wrapper>
    <CenterPopup
      visible={visible}
      onClose={() => {
        setVisible(false)
      }}
      onMaskClick={() => {
        setVisible(false)
      }}
    >
      <Calendar
        {...field}
        selectionMode={'single'}
        onChange={(v) => {
          onChange(v === null ? null : dayjs(v).valueOf())
        }}
        value={val}
        weekStartsOn={'Monday'}
        {...props}
      />
    </CenterPopup>
    <Picker
      columns={[hours, minutes]}
      visible={visibleTimePicker}
      onClose={() => setVisibleTimePicker(false)}
      value={timeValue}
      onConfirm={(values) => {
        onChange(dayjs(val).set('hours', Number(values[0])).set('minutes', Number(values[1])).set('seconds', 0).valueOf())
      }}
      title="Оберіть час"
    />
  </>

};


export default DatePicker;