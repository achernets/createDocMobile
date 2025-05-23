import { JSX, useCallback, useState } from "react";
import { Control, useController } from "react-hook-form";
import { ItemFullStyled, ListStyled, Wrapper } from "./styled";
import { ErrorBlock, FormItemProps, InfiniteScroll, Input, List, Popup, SearchBar, SpinLoading } from "antd-mobile";
import { useDebounce } from "../../../hooks";
import { compact, get, map, size } from "lodash";
import { CheckOutline } from "antd-mobile-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAppStore from "../../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { DepartmentServiceClient } from "../../../api";
import { Department, FilterCondition, FilterFieldType, FilterItem, KazFilter } from "../../../api/data";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

type DepartmentItemProps = {
  label?: string,
  defaultValue?: null,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean,
  itemKey: string
}

const DepartmentItem = ({ label, name, control, defaultValue = null, formItemProps = {}, disabled = false, itemKey }: DepartmentItemProps): JSX.Element => {
  const { field: { value, onChange }, fieldState: { error } } = useController({
    name,
    control,
    defaultValue
  });
  const token = useAppStore(useShallow((state) => state.token));
  const [visible, setVisible] = useState<boolean>(false);
  const [strSearch, setStrSearch] = useState<string>('');
  const debouncedSearch = useDebounce(strSearch, 500);

  const { t } = useTranslation();

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getAllOrgStructure', 'contentItem', debouncedSearch, token, itemKey],
    queryFn: async ({ pageParam }) => {
      try {
        const r = await DepartmentServiceClient.getAllDepartments(token, new KazFilter({
          position: (pageParam - 1) * 15,
          countFilter: 15,
          items: compact([
            debouncedSearch !== '' ? new FilterItem({
              field: 'name',
              value: debouncedSearch,
              condition: FilterCondition.CONTAIN,
              fType: FilterFieldType.STRING
            }) : null,
            new FilterItem({
              field: 'hasChild',
              value: 'true',
              condition: FilterCondition.EQUAL,
              fType: FilterFieldType.BOOLEAN
            }),
            new FilterItem({
              field: 'withPath',
              value: 'null',
              condition: FilterCondition.EQUAL,
              fType: FilterFieldType.STRING
            })
          ]),
          orders: []
        }));
        return r;
      } catch (error) {
        console.log(error);
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage && lastPage.length < 15) {
        return undefined
      }
      return lastPageParam + 1;
    },
    select: data => {
      return {
        ...data,
        flatData: compact(data.pages.flat())
      }
    },
    staleTime: 60 * 1000, // 1 minute
    enabled: visible
  });

  const isSelectedItem = useCallback((item: any) => {
    return item?.id === value?.id;
  }, [value?.id]);

  return <>
    <Wrapper
      label={<>
        {label}
        {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
      </>}
      trigger='onConfirm'
      onClick={() => disabled ? undefined : setVisible(true)}
      className={classNames({ 'error_item': formItemProps?.required && error })}
      {...formItemProps}
    >
      <Input
        readOnly
        placeholder={t('MobileCreateDoc.select')}
        value={get(value, 'name', '')}
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
            placeholder={t('MobileCreateDoc.find')}
            style={{ width: '100%' }}
            value={strSearch}
            onChange={(value) => setStrSearch(value)}
          />
        </>}
      >
        {(isLoading || isFetching) && <ItemFullStyled>
          <SpinLoading color={'primary'} />
        </ItemFullStyled>}
        {map(data?.flatData, (item: Department) => <List.Item
          key={item?.id}
          onClick={() => {
            if (isSelectedItem(item)) {
              onChange(null);
            } else {
              onChange(item);
            }
            setVisible(false);
          }}
          description={item?.path?.slice(3)}
          arrowIcon={isSelectedItem(item) ? <CheckOutline color={'#1890FF'} /> : false}
        >
          {item?.name}
        </List.Item>)}
        {isLoading === false && isFetching === false && size(data?.flatData) === 0 && <ItemFullStyled>
          <ErrorBlock
            status='empty'
            title={t('MobileCreateDoc.emptyData')}
            description={null}
          />
        </ItemFullStyled>}
        {size(data?.flatData) > 0 && hasNextPage && <InfiniteScroll hasMore={hasNextPage} loadMore={async () => {
          await fetchNextPage()
        }} />}
      </ListStyled>
    </Popup>
  </>
};

export default DepartmentItem;
