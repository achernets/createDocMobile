import { JSX, useCallback, useMemo, useState } from "react";
import { Control, useController } from "react-hook-form";
import { ItemFullStyled, ListStyled, Wrapper } from "./styled";
import { ErrorBlock, FormItemProps, Input, List, Popup, SearchBar, SpinLoading } from "antd-mobile";
import { find, includes, join, map, reject, size } from "lodash";
import { CheckOutline } from "antd-mobile-icons";
import { useQuery } from "@tanstack/react-query";
import useAppStore from "../../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { SecurityClassificationServiceClient } from "../../../api";
import { KazFilter, SecurityClassification } from "../../../api/data";
import { searchFilter } from "../../../utils";

type ScGrifsProps = {
  label?: string,
  defaultValue?: [],
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean,
  notRemoveIds?: string[]
}

const ScGrifs = ({ label, name, control, defaultValue = null, formItemProps = {}, disabled = false, notRemoveIds = [] }: ScGrifsProps): JSX.Element => {
  const { field: { value, onChange } } = useController({
    name,
    control,
    defaultValue
  });
  const { token, clientInfo } = useAppStore(useShallow((state) => ({
    token: state.token,
    clientInfo: state.clientInfo
  })));
  const [visible, setVisible] = useState<boolean>(false);
  const [strSearch, setStrSearch] = useState<string>('');

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['getAllSecurityClassificationsByUserOrGroup', strSearch, clientInfo?.id],
    queryFn: async () => {
      try {
        const r = await SecurityClassificationServiceClient.getAllSecurityClassificationsByUserOrGroup(token,
          clientInfo.type,
          clientInfo.id,
          new KazFilter({
            position: 0,
            countFilter: 127,
            items: []
          })
        );
        return r;
      } catch (error) {
        console.log(error);
      }
    },
    staleTime: 60 * 10000, // 10 minute
    enabled: visible
  });

  const isSelectedItem = useCallback((item: any) => {
    return find(value, { id: item?.id });
  }, [value]);


  const filterData = useMemo(() => {
    return searchFilter(data, ['gname'], strSearch);
  }, [data, strSearch]);

  const propsItem = useMemo(() => {
    if (disabled) return {};
    return {
      trigger: 'onConfirm',
      onClick: () => setVisible(true)
    }
  }, [disabled]);

  return <>
    <Wrapper
      label={<>
        {label}
        {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
      </>}
      {...propsItem}
      {...formItemProps}
    >
      <Input
        readOnly
        placeholder={'Обрати'}
        value={join(map(value, itm => itm.gname), ', ')}
      />
    </Wrapper>
    <Popup
      visible={visible}
      onMaskClick={() => setVisible(false)}
      bodyStyle={{ height: '60vh' }}
      destroyOnClose
      afterClose={() => {
        setStrSearch('');
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
        {(isLoading || isFetching) && <ItemFullStyled>
          <SpinLoading color={'primary'} />
        </ItemFullStyled>}
        {map(filterData, (item: SecurityClassification) => <List.Item
          key={item?.id}
          onClick={() => {
            if (isSelectedItem(item)) {
              onChange(reject(value, { id: item?.id }));
            } else {
              onChange([
                ...value,
                item
              ]);
            }
          }}
          disabled={includes(notRemoveIds, item?.id)}
          description={item?.group}
          arrowIcon={isSelectedItem(item) ? <CheckOutline color={'#1890FF'} /> : false}
        >
          {item?.gname}
        </List.Item>)}
        {isLoading === false && isFetching === false && size(data) === 0 && <ItemFullStyled>
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

export default ScGrifs;
