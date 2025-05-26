import { JSX, useCallback, useEffect, useMemo, useState } from "react";
import { Button, InfiniteScroll, Ellipsis, Form, Input, List, Popup, Tabs, Space, Toast } from "antd-mobile";
import { useInfiniteQuery } from '@tanstack/react-query';
import { AddOutline, CloseOutline, LeftOutline, MinusOutline } from "antd-mobile-icons";
import { TabsStyled } from "./styled";
import ActionSheetSelect from "../Form/ActionSheetSelect";
import useAppStore from "../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { Account, FilterCondition, FilterFieldType, FilterItem, KazFilter, SecurityClassification, UserOrGroup, UserOrGroupType } from "../../api/data/";
import { compact, filter, find, includes, size } from "lodash";
import { useDebounce } from "../../hooks";
import { DocumentPatternServiceClient, UserManagementServiceClient } from "../../api";
import UserView from "../UserView";
import { useTranslation } from "react-i18next";

const TYPES_FILTERS = ['users', 'groups', 'scs', 'roles'] as const;

export type ChangeUsersProperties = {
  filters: FilterItem[],
  useFavorite?: boolean,
  patternId: string | null,
  scGrifs: SecurityClassification[],
  selected: UserOrGroup[],
  types: typeof TYPES_FILTERS[number][],
  maxSelected?: number
}

type ChangeUsersProps = {
  visible: boolean,
  onSave: (users: UserOrGroup[]) => void,
  onHide: (visible: boolean) => void,
  changeProps: ChangeUsersProperties
}

const ChangeUsers = ({ visible, onHide, onSave, changeProps, }: ChangeUsersProps): JSX.Element => {
  const { token, accounts } = useAppStore(useShallow((state) => ({
    token: state.token,
    accounts: state.accounts,
    //defAccount: state.account,
  })));


  const { useFavorite = false, patternId = null, selected = [], scGrifs = [], filters = [], types = ['users'], maxSelected = -1 } = changeProps;

  const [filterType, setFilterType] = useState<'users' | 'groups' | 'scs' | 'roles'>(types[0]);
  const [account, setAccount] = useState<Account | null>(null);
  const [strSearch, setStrSearch] = useState<string>('');

  const [visibleLocal, setVisible] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<UserOrGroup[]>(selected);

  const debouncedSearch = useDebounce(strSearch, 500);

  const { t } = useTranslation();

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(true);
      }, 100);
    }
  }, [visible]);

  const onHideHandler = useCallback(() => {
    setVisible(false);
    setTimeout(() => onHide(false), 300);
  }, [onHide]);

  const onSubmitHandler = useCallback(() => {
    setVisible(false);
    setTimeout(() => onSave(selectedUsers), 300);
  }, [selectedUsers, onSave]);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [filterType, account?.id || null, scGrifs.map(itm => itm.id), filters, debouncedSearch],
    queryFn: async ({ pageParam }) => {
      try {
        const kazFilter = new KazFilter({
          position: (pageParam - 1) * 15,
          countFilter: 15,
          orders: useFavorite ? ['fav_first', 'alphabetical'] : ['alphabetical'],
          items: compact([
            debouncedSearch !== '' && new FilterItem({
              field: filterType === 'groups' || filterType === 'roles' ? 'name' : 'FIO',
              value: debouncedSearch,
              fType: FilterFieldType.STRING,
              condition: FilterCondition.CONTAIN
            }),
            size(scGrifs) > 0 ? new FilterItem({
              field: 'securityClassificationIds',
              value: scGrifs.map(itm => itm.id).join(';'),
              fType: FilterFieldType.STRING,
              condition: FilterCondition.IN
            }) : null,
            account?.id && account?.id !== null ? new FilterItem({
              field: 'accountId',
              value: account?.id,
              fType: FilterFieldType.STRING,
              condition: FilterCondition.EQUAL
            }) : null,
            ...filters
          ])
        });
        let result: any = [];
        switch (filterType) {
          case 'users':
          case 'scs':
            result = await UserManagementServiceClient.getAllUsers(token, kazFilter);
            break;
          case 'groups':
            result = await UserManagementServiceClient.getAllGroups(token, '', kazFilter);
            break;
          case 'roles':
            if (patternId !== null) {
              const roles = await DocumentPatternServiceClient.getPatternProcessRoles(token, patternId, new KazFilter({
                ...kazFilter,
                items: filter(kazFilter.items, { field: 'name' })
              }));
              result = roles.map(itm => new UserOrGroup({
                id: itm.key,
                userOrGroupId: itm.key,
                userFirstName: itm.oName,
                type: UserOrGroupType.USER
              }));
            }
            break;
          default:
            break;
        }
        return result;
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
        flatData: data.pages.flat()
      }
    },
    staleTime: 0,
    //staleTime: 60 * 1000, // 1 minute
    enabled: visible
  });

  const typesMenu = useMemo(() => {
    return compact([
      includes(types, 'users') ? {
        label: t('MobileCreateDoc.findByUsers'),
        value: 'users'
      } : null,
      includes(types, 'groups') ? {
        label: t('MobileCreateDoc.findByGroups'),
        value: 'groups'
      } : null,
      includes(types, 'roles') ? {
        label: t('MobileCreateDoc.findByProcessRoles'),
        value: 'roles'
      } : null
      // {
      //   label: 'За грифами',
      //   value: 'scs'
      // }
    ])
  }, [types]);

  return <Popup
    position='right'
    visible={visibleLocal}
    onClose={onHideHandler}
    bodyStyle={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto'
    }}>

      <Button
        style={{
          gridColumn: 1,
          alignSelf: 'start'
        }}
        onClick={onHideHandler}
        fill={'none'}
        shape={'rounded'}>
        <LeftOutline />
      </Button>
      <Ellipsis style={{
        gridColumn: 2,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: '24px',
        fontWeight: 600
      }}
        content={t('MobileCreateDoc.selectUserOtGroup')}
      />
      <Button style={{
        gridColumn: 3,
        alignSelf: 'end'
      }}
        onClick={onHideHandler}
        fill={'none'}
        shape={'rounded'}
      >
        <CloseOutline />
      </Button>
    </div>
    <TabsStyled>
      <Tabs.Tab
        title={t('MobileCreateDoc.add')}
        key={'info'}
        destroyOnClose={true}
      >
        <div style={{
          padding: '0px 16px'
        }}>
          {size(typesMenu) > 1 && <ActionSheetSelect
            label={t('MobileCreateDoc.filter')}
            value={filterType}
            options={typesMenu}
            onChange={(val) => setFilterType(val)}
          />}
          {size(accounts) > 1 && <ActionSheetSelect
            label={t('MobileCreateDoc.account')}
            value={account?.id || null}
            options={accounts.map(item => ({
              label: item.accountName,
              value: item.id
            }))}
            onChange={(val) => setAccount(find(accounts, { id: val }) || null)}
          />}
          <Form.Item
            label={t('MobileCreateDoc.name')}
          >
            <Input
              placeholder={t('MobileCreateDoc.enterName')}
              value={strSearch}
              onChange={(val) => setStrSearch(val)}
            />
          </Form.Item>
        </div>
        <List>
          {data?.flatData?.map(item => {
            const isSelected = includes(selectedUsers?.map(itm => itm?.id), item?.id);
            return <UserView
              key={item?.id}
              user={item}
              arrowIcon={isSelected ? <MinusOutline /> : <AddOutline />}
              onClick={() => {
                if (!isSelected && selectedUsers.length + 1 > maxSelected && maxSelected > 0) {
                  Toast.show({
                    icon: 'fail',
                    content: t('MobileCreateDoc.errorMaxSelectedUsers', { count: maxSelected })
                  });
                } else {
                  setSelectedUsers(prev => isSelected ? prev.filter(itm => itm?.id !== item?.id) : [...prev, item])
                }
              }}
            />;
          })}
          {hasNextPage && <InfiniteScroll hasMore={hasNextPage} loadMore={async () => {
            await fetchNextPage()
          }} />}
        </List>
      </Tabs.Tab>
      <Tabs.Tab
        title={t('MobileCreateDoc.remove')}
        key={'remove'}
        destroyOnClose={true}
      >
        <List>
          {selectedUsers.map(item =>
            <UserView
              key={item?.id}
              user={item}
              arrowIcon={<MinusOutline />}
              onClick={() => {
                setSelectedUsers(prev => prev.filter(itm => itm?.id !== item?.id))
              }}
            />
          )}
        </List>
      </Tabs.Tab>
    </TabsStyled>
    <Space
      justify={'between'}
      style={{
        padding: 16
      }}
      block
    >
      <Button
        style={{ minWidth: 100 }}
        size='large'
        onClick={onHideHandler}
      >
        {t('MobileCreateDoc.cancel')}
      </Button>
      <Button style={{ minWidth: 100 }}
        color='primary'
        size='large'
        onClick={onSubmitHandler}
      >
        {t('MobileCreateDoc.ready')}
      </Button>
    </Space>
  </Popup>
};

export default ChangeUsers;
