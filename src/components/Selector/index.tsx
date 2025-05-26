import { ErrorBlock,  List, Popup } from "antd-mobile";
import { JSX, PropsWithChildren, useCallback, useState } from "react";
import { ItemFullStyled, ListStyled, Wrapper } from "./styled";
import { map, size } from "lodash";
import { CheckOutline } from "antd-mobile-icons";
import { useTranslation } from "react-i18next";

type SelectorFProps = {
  disabled?: boolean,
  value: any
  options: {
    label: string,
    value: string | null
  }[],
  onChange: (value: any) => void
} & PropsWithChildren

const Selector = ({ value,  disabled = false, options = [], children, onChange }: SelectorFProps): JSX.Element => {

  const [visible, setVisible] = useState<boolean>(false);

  const { t } = useTranslation();

  const isSelectedItem = useCallback((item: any) => {
    return value === item.value;
  }, [value]);

  return <>
    <Wrapper
      onClick={(e) => {
        if(disabled) return undefined;
        e.stopPropagation();
        e.preventDefault();
        setVisible(true)
      }}
    >
      {children}
    </Wrapper>
    <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false);
      }}
      bodyStyle={{ maxHeight: '60vh' }}
      destroyOnClose
    >
      <ListStyled>
        {map(options, (item: any) => <List.Item
          key={item.value}
          onClick={() => {
            if (isSelectedItem(item)) {
              onChange(null);
            } else {
              onChange(options.find((itm: any) => itm.value === item.value)?.value);
            }
            setVisible(false);
          }}
          arrowIcon={isSelectedItem(item) ? <CheckOutline color={'#1890FF'} /> : false}
        >
          {item.label || ''}
        </List.Item>)}
        {size(options) === 0 && <ItemFullStyled>
          <ErrorBlock
            status='empty'
            title={t('MobileCreateDoc.emptyData')}
            description={null}
          />
        </ItemFullStyled>}
      </ListStyled>
    </Popup>
  </>
};


export default Selector;