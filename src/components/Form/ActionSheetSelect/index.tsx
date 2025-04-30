import { ErrorBlock, Form,  Input, List, Popup, SearchBar } from 'antd-mobile';
import { JSX, useCallback, useMemo, useState } from 'react';
import { find, map, size } from 'lodash';
import { ListStyled, ItemFullStyled } from './styled';
import { CheckOutline } from 'antd-mobile-icons';
import { searchFilter } from '../../../utils';

type ActionSheetAsyncSelectProps = {
  label?: string,
  value: string | null | undefined,
  onChange: (val: any) => void,
  disabled?: boolean,
  options: {
    label: string,
    value: string | null
  }[]
};

const ActionSheetAsyncSelect = ({ label, value, disabled = false,
  options = [], onChange }: ActionSheetAsyncSelectProps): JSX.Element => {

  const [visible, setVisible] = useState<boolean>(false);
  const [strSearch, setStrSearch] = useState<string>('');
  const [localValue, setLocalValue] = useState<any>(value);

  const textInput = useMemo(() => {
    return find(options, { value: value })?.label || '';
  }, [value]);

  const isSelectedItem = useCallback((item: any) => {
    return localValue === item.value;
  }, [localValue]);

  const filterdData = useMemo(() => {
    return searchFilter(options, ['label'], strSearch);
  }, [options, strSearch]);

  return <>
    <Form.Item
      label={label}
      trigger='onConfirm'
      onClick={() => disabled ? undefined : setVisible(true)}
    >
      <Input
        readOnly
        placeholder={'Обрати'}
        value={textInput}
      />
    </Form.Item>
    <Popup
      visible={visible}
      onMaskClick={() => setVisible(false)}
      bodyStyle={{ height: '60vh' }}
      destroyOnClose
      afterClose={() => {
        setStrSearch('');
        onChange(localValue);
      }}
    >
      <ListStyled
        header={<>
          <SearchBar
            placeholder='Пошук' style={{ width: '100%' }}
            value={strSearch}
            onChange={(value) => setStrSearch(value)}
          />
        </>}
      >
        {map(filterdData, (item: any) => <List.Item
          key={item.value}
          onClick={() => {
            if (isSelectedItem(item)) {
              setLocalValue(null);
            } else {
              setLocalValue(options.find((itm: any) => itm.value === item.value)?.value);
            }
          }}
          arrowIcon={isSelectedItem(item) ? <CheckOutline color={'#1890FF'} /> : false}
        >
          {item.label || ''}
        </List.Item>)}
        {size(filterdData) === 0 && <ItemFullStyled>
          <ErrorBlock
            status='empty'
            title={'Нічого не знайдено'}
            description={null}
          />
        </ItemFullStyled>}
      </ListStyled>
    </Popup>
  </>
};

export default ActionSheetAsyncSelect;