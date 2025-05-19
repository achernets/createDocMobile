import { JSX, useCallback, useMemo, useState } from "react";
import { Control, useController } from "react-hook-form";
import { ItemFullStyled, ListStyled, Wrapper } from "./styled";
import { ErrorBlock, FormItemProps, InfiniteScroll, Input, List, Popup, SearchBar, SpinLoading } from "antd-mobile";
import { useDebounce } from "../../../hooks";
import { compact, find, map, size } from "lodash";
import { CheckOutline } from "antd-mobile-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAppStore from "../../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { HandBookServiceClient } from "../../../api";
import { FilterCondition, FilterFieldType, FilterItem, HandBook, HBColumnType, HBRow, KazFilter } from "../../../api/data";
import { getFilterHBValueSearchWord, getHBValue } from "../../../utils";
import classNames from "classnames";

type HandBookItemProps = {
  label?: string,
  defaultValue?: null,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean,
  handBook: HandBook,
  itemKey: string
}

const HandBookItem = ({ label, name, control, defaultValue = null, formItemProps = {}, disabled = false, handBook, itemKey }: HandBookItemProps): JSX.Element => {
  const { field: { value, onChange }, fieldState: { error } } = useController({
    name,
    control,
    defaultValue
  });
  const token = useAppStore(useShallow((state) => state.token));
  const [visible, setVisible] = useState<boolean>(false);
  const [strSearch, setStrSearch] = useState<string>('');
  const debouncedSearch = useDebounce(strSearch, 500);
  const [dateSearch] = useState<string>('');
  const debouncedDateSearch = useDebounce(dateSearch, 500);

  const columnId = useMemo(() => {
    return value?.column?.id;
  }, [value?.column]);

  const findColumn = useMemo(() => {
    let fColumn = find(handBook?.columns, { id: columnId });
    if (fColumn?.columnType === HBColumnType.HAND_BOOK) {
      fColumn = find(fColumn?.depHandBook?.columns, { id: fColumn?.depColumnId });
    };
    return fColumn;
  }, [handBook, columnId]);


  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getAllHandBookRows', 'contentItem', itemKey, columnId, debouncedSearch, debouncedDateSearch, token],
    queryFn: async ({ pageParam }) => {
      try {
        const r = await HandBookServiceClient.getAllHandBookRows(token, handBook.id, new KazFilter({
          position: (pageParam - 1) * 15,
          countFilter: 15,
          items: compact([
            debouncedSearch !== '' ? new FilterItem({
              field: getFilterHBValueSearchWord(findColumn),
              value: debouncedSearch,
              condition: FilterCondition.CONTAIN,
              fType: FilterFieldType.STRING,
              additionValue: columnId
            }) : null,
            // debouncedDateSearch !== null ? new FilterItem({
            //   field: getFilterHBValueSearchWord(findColumn),
            //   value: `${debouncedDateSearch[0].startOf('day').valueOf()};${debouncedDateSearch[1].endOf('day').valueOf()}`,
            //   condition: FilterCondition.BETWEEN,
            //   fType: FilterFieldType.DATE,
            //   additionValue: columnId
            // }) : null,
            new FilterItem({
              field: 'cOrder',
              value: null,
              condition: FilterCondition.NULL,
              fType: FilterFieldType.STRING,
              additionValue: columnId
            }),
            new FilterItem({
              field: getFilterHBValueSearchWord(findColumn),
              value: null,
              condition: FilterCondition.NOT_NULL,
              fType: findColumn?.columnType === HBColumnType.DATE ? FilterFieldType.DATE : FilterFieldType.STRING,
              additionValue: columnId
            }),
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
    return item?.id === value?.row?.id;
  }, [value?.row?.id]);

  const textInput = useMemo(() => {
    const v = getHBValue(value?.row?.values?.get(columnId), true);
    return v === null ? '' : v;
  }, [value, columnId]);

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
        placeholder={'Обрати'}
        value={textInput}
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
        {map(data?.flatData, (item: HBRow) => <List.Item
          key={item?.id}
          onClick={() => {
            if (isSelectedItem(item)) {
              onChange({
                ...value,
                row: null
              });
            } else {
              onChange({
                ...value,
                row: item
              });
            }
          }}
          arrowIcon={isSelectedItem(item) ? <CheckOutline color={'#1890FF'} /> : false}
        >
          {getHBValue(item?.values?.get(columnId))}
        </List.Item>)}
        {isLoading === false && isFetching === false && size(data?.flatData) === 0 && <ItemFullStyled>
          <ErrorBlock
            status='empty'
            title={'Нічого не знайдено'}
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

export default HandBookItem;
