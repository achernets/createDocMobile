import { JSX, useCallback, useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { ItemFullStyled, ListStyled, Wrapper } from "./styled";
import { ActionSheet, Button, Card, Dialog, ErrorBlock, FormItemProps, InfiniteScroll, Input, List, Popup, SearchBar, SpinLoading } from "antd-mobile";
import { compact, find, findIndex, includes, map, size } from "lodash";
import { CheckOutline, RightOutline } from "antd-mobile-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAppStore from "../../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { DocumentServiceClient } from "../../../api";
import { ADocument, DocRelationType, DocumentRelation, FilterCondition, FilterFieldType, FilterItem, KazFilter } from "../../../api/data";
import { useDebounce } from "../../../hooks";
import DocRelationView from "../../DocRelationView";
import { useTranslation } from "react-i18next";

type DocRelationsProps = {
  label?: string,
  defaultValue?: [],
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean,
  notRemoveIds?: string[],
  documentId: string | null
}

const DocRelations = ({ label, name, control, formItemProps = {}, disabled = false, notRemoveIds = [], documentId = null }: DocRelationsProps): JSX.Element => {

  const { fields, append, update, remove } = useFieldArray({
    control,
    name,
    keyName: 'idx'
  });

  const { token } = useAppStore(useShallow((state) => ({
    token: state.token
  })));
  const [visible, setVisible] = useState<boolean>(false);
  const [strSearch, setStrSearch] = useState<string>('');
  const debouncedSearch = useDebounce(strSearch, 500);

  const { t } = useTranslation();

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getTinyDocsByFilterNoPermission', debouncedSearch],
    queryFn: async ({ pageParam }) => {
      try {
        const r = await DocumentServiceClient.getTinyDocsByFilterNoPermission(
          token,
          new KazFilter({
            position: (pageParam - 1) * 15,
            countFilter: 15,
            items: [
              new FilterItem({
                field: 'nbrOrsysNbr',
                value: debouncedSearch,
                fType: FilterFieldType.STRING,
                condition: FilterCondition.CONTAIN
              })
            ]
          })
        );
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
    enabled: visible && strSearch !== ''
  });

  const isSelectedItem = useCallback((item: any) => {
    return find(fields, { docId2: item?.id }) !== undefined;
  }, [fields]);

  const actions = useCallback((doc: DocumentRelation, index: number) => {

    ActionSheet.show({
      actions: [
        ...['PARENT', 'CHILD', 'OTHER'].map((type: string) => ({
          key: type,
          text: t(`DocRelationType.${type}`),
          disabled: doc.relationType === DocRelationType[type]
        })),
        {
          key: 'editComment',
          text: t('MobileCreateDoc.comment')
        },
        {
          key: 'delete',
          text: t('MobileCreateDoc.remove'),
          danger: true
        }
      ],
      closeOnAction: true,
      onAction: (action) => {
        if (includes(['PARENT', 'CHILD', 'OTHER'], action.key)) {
          update(index, new DocumentRelation({
            ...doc,
            relationType: DocRelationType[action.key]
          }));
        } else {
          switch (action.key) {
            case 'editComment':
              let comment = '';
              Dialog.confirm({
                title: t('MobileCreateDoc.dialogComentToDoc', { doc: doc.doc2SystemNumber }),
                content: <Input
                  defaultValue={doc.resolution || ''}
                  placeholder={t('MobileCreateDoc.enterComment')}
                  onChange={e => {
                    comment = e;
                  }}
                />,
                onConfirm: () => {
                  update(index, new DocumentRelation({
                    ...doc,
                    resolution: comment,
                  }));
                },
                onCancel: () => {
                  comment = '';
                },
                confirmText: t('MobileCreateDoc.save'),
                cancelText: t('MobileCreateDoc.cancel')
              });
              break;
            case 'delete':
              Dialog.confirm({
                title: t('MobileCreateDoc.dialogRemoveDoc', { doc: doc.doc2SystemNumber }),
                onConfirm: () => remove(index),
                confirmText: t('MobileCreateDoc.remove'),
                cancelText: t('MobileCreateDoc.cancel')
              });
              break;
            default:
              break;
          }
        }
      }
    });
  }, [remove]);

  return <>
    <Wrapper
      label={<>
        {label}
        {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
      </>}
      {...formItemProps}
    >
      <div style={{
        display: "flex",
        gap: "8px",
        padding: "8px",
        flexDirection: "column",
      }}>
        {map(fields, (itm: { idx: string } & DocumentRelation, index: number) => {
          return <Card
            key={itm.docId2}
            style={{
              boxShadow: '0 0 0 1px rgba(5, 32, 101, 0.05)'
            }}
            onHeaderClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              actions(itm, index);
            }}
            icon={<DocRelationView
              docRelation={itm}
            />}
            extra={<RightOutline />}
          />
        })}
        {!disabled && <Button block
          disabled={disabled}
          onClick={() => setVisible(true)}
        >{t('MobileCreateDoc.addDoc')}</Button>}
      </div>
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
        {map(data?.flatData, (item: ADocument) => <List.Item
          key={item?.id}
          onClick={() => {
            if (isSelectedItem(item)) {
              //@ts-ignore
              const index = findIndex(fields, { docId2: item?.id });
              remove(index);
            } else {
              append(new DocumentRelation({
                docId1: documentId,
                docId2: item?.id,
                doc2Number: item?.numberDocument,
                doc2SystemNumber: item?.systemNumber,
                doc2Icon: item?.icon,
                doc2Name: item?.nameDocument,
                doc2RegDate: item?.registrationDate,
                createDoc2Date: item?.createDate,
                relationType: DocRelationType.CHILD,
              }));
            }
            setVisible(false);
          }}
          disabled={includes(notRemoveIds, item?.id)}
          description={item?.nameDocument}
          arrowIcon={isSelectedItem(item) ? <CheckOutline color={'#1890FF'} /> : false}
        >
          {item?.systemNumber} {item?.numberDocument}
        </List.Item>)}
        {strSearch === '' && <ItemFullStyled>
          <ErrorBlock
            status='default'
            title={t('MobileCreateDoc.enterNumberDoc')}
            description={null}
          />
        </ItemFullStyled>}
        {isLoading === false && isFetching === false && size(data) === 0 && <ItemFullStyled>
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

export default DocRelations;
