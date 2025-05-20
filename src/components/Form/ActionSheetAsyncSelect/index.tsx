import { useInfiniteQuery } from '@tanstack/react-query';
import { ErrorBlock, Form, InfiniteScroll, Input, List, Popup, SearchBar, SpinLoading } from 'antd-mobile';
import { JSX, useCallback, useMemo, useState } from 'react';
import { compact, map, size, uniqBy } from 'lodash';
import { ListStyled, ItemFullStyled } from './styled';
import { CheckOutline } from 'antd-mobile-icons';
import { searchFilter } from '../../../utils';
import { FilterCondition, FilterFieldType, FilterItem, KazFilter } from '../../../api/data/';
import { useDebounce } from '../../../hooks';
import { useTranslation } from 'react-i18next';

type ActionSheetAsyncSelectProps = {
  label?: string,
  optionLabel?: string,
  optionValue?: string,
  value: any,
  onChange: (val: any) => void,
  disabled?: boolean,
  queryKey: string[],
  queryFn: (filter: KazFilter) => any,
  fieldSearch?: string,
  filter: KazFilter
};

const ActionSheetAsyncSelect = ({ label, optionLabel = 'id', disabled = false,
  optionValue = 'id', value = null, onChange, queryKey, filter, queryFn, fieldSearch }: ActionSheetAsyncSelectProps): JSX.Element => {

  const [visible, setVisible] = useState<boolean>(false);
  const [strSearch, setStrSearch] = useState<string>('');
  const [localValue, setLocalValue] = useState<any>(value);
  const debouncedSearch = useDebounce(strSearch, 500);

  const { t } = useTranslation();

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: fieldSearch ? [...queryKey, debouncedSearch] : queryKey,
    queryFn: async ({ pageParam }) => {
      try {
        const r = await queryFn(new KazFilter({
          ...filter,
          position: (pageParam - 1) * filter?.countFilter,
          items: compact([
            ...map(filter?.items),
            fieldSearch && debouncedSearch !== '' ? new FilterItem({
              value: debouncedSearch,
              field: fieldSearch,
              condition: FilterCondition.CONTAIN,
              fType: FilterFieldType.STRING
            }) : null
          ])
        }));
        return r;
      } catch (error) {
        console.log(error);
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage && lastPage.length < filter?.countFilter) {
        return undefined
      }
      return lastPageParam + 1;
    },
    select: data => {
      return {
        ...data,
        flatData: data.pages.flat()
      }
    },
    staleTime: 60 * 1000, // 1 minute
    enabled: visible
  });

  const textInput = useMemo(() => {
    if (Array.isArray(value) && value.length !== 0) {
      return value.map((itm: any) => itm[optionLabel]).join(',');
    } else if (typeof value === "object" && value !== null) {
      return value[optionLabel];
    }
    return '';
  }, [value]);

  const isSelectedItem = useCallback((item: any) => {
    if (Array.isArray(localValue) && localValue.length !== 0) {
      return localValue.find((itm: any) => item[optionValue] === itm[optionValue]) !== undefined;
    } else if (typeof localValue === "object" && localValue !== null) {
      return localValue[optionValue] === item[optionValue];
    }
    return false;
  }, [localValue]);

  const filterdData = useMemo(() => {
    if (fieldSearch !== undefined) return uniqBy(data?.flatData, 'id') || [];
    return searchFilter(uniqBy(data?.flatData, 'id'), [optionLabel], strSearch);
  }, [fieldSearch, data?.flatData, strSearch]);

  return <>
    <Form.Item
      label={label}
      trigger='onConfirm'
      onClick={() => disabled ? undefined : setVisible(true)}
    >
      <Input
        readOnly
        placeholder={t('MobileCreateDoc.select')}
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
        {map(filterdData, (item: any) => <List.Item
          key={item[optionValue]}
          onClick={() => {
            if (isSelectedItem(item)) {
              setLocalValue(null);
            } else {
              setLocalValue(data?.flatData.find((itm: any) => itm[optionValue] === item[optionValue]));
            }
          }}
          arrowIcon={isSelectedItem(item) ? <CheckOutline color={'#1890FF'} /> : false}
        >
          {item[optionLabel] || ''}
        </List.Item>)}
        {isLoading === false && isFetching === false && size(filterdData) === 0 && <ItemFullStyled>
          <ErrorBlock
            status='empty'
            title={t('MobileCreateDoc.emptyData')}
            description={null}
          />
        </ItemFullStyled>}
        {hasNextPage && <InfiniteScroll hasMore={hasNextPage} loadMore={async () => {
          await fetchNextPage()
        }} />}
      </ListStyled>
    </Popup>
  </>
};

export default ActionSheetAsyncSelect;