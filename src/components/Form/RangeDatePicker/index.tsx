import { Button, Calendar, CalendarProps, CenterPopup, FormItemProps, Input } from "antd-mobile";
import { JSX, useMemo, useState } from "react";
import { CalendarOutlineStyled, InputWrapper, Wrapper } from "./styled";
import { Control, useController } from "react-hook-form";
import Int64 from "node-int64";
import { parseDate } from "../../../utils";
import dayjs from "dayjs";

type RangeDatePickerFProps = {
  label?: string,
  defaultValue?: number | Int64,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean,
} & Omit<CalendarProps, 'defaultValue' | 'onChange' | 'selectionMode' | 'value'>


const RangeDatePicker = ({ label, name, control, defaultValue = -1, formItemProps = {}, ...props }: RangeDatePickerFProps): JSX.Element => {
  const { field: { value, onChange, ...field } } = useController({
    name,
    control,
    defaultValue
  });
  const [visible, setVisible] = useState<boolean>(false);

  const val = useMemo(() => {
    const v = [parseDate(value.strValue), parseDate(value.strValue2)];

    return v[0] === null && v[1] === null ? [] : [dayjs(parseDate(v[0])).toDate(), dayjs(parseDate(v[1])).toDate()];
  }, [value]);

  const textInput = useMemo(() => {
    if (val[0] === null || val[0] === undefined) return '';
    return `${dayjs(val[0]).format('DD.MM.YYYY')} - ${dayjs(val[1]).format('DD.MM.YYYY')}`;
  }, [val]);

  return <>
    <Wrapper
      label={<>
        {label}
        {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
      </>}
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
            style={{
              width: '100%'
            }}
          />
          <Button fill={'none'}>
            <CalendarOutlineStyled />
          </Button>
        </InputWrapper>
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
        selectionMode={'range'}
        onChange={(v) => {
          if (v === null) {
            onChange({
              ...value,
              strValue: null,
              strValue2: null,
            });
          } else if (v[0] !== undefined) {
            onChange({
              ...value,
              strValue: dayjs(v[0]).startOf('day').valueOf(),
              strValue2: dayjs(v[1]).endOf('day').valueOf(),
            });
          } else {
            onChange({
              ...value,
              strValue2: dayjs(v[1]).endOf('day').valueOf()
            });
          }
        }}
        //@ts-ignore
        value={val}
        weekStartsOn={'Monday'}
        {...props}
      />
    </CenterPopup>
  </>

};


export default RangeDatePicker;