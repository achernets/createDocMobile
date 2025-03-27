import { JSX, useEffect, useState } from "react";
import { Button, Ellipsis, Form, Input, List, Popup, Tabs } from "antd-mobile";
import { useInfiniteQuery } from '@tanstack/react-query';
import { CloseOutline, LeftOutline } from "antd-mobile-icons";
import { TabsStyled } from "./styled";
import ActionSheetSelect from "../Form/ActionSheetSelect";
import useAppStore from "../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { Account, FilterItem, KazFilter, UserOrGroup, UserOrGroupType } from "../../api/data/core";
import { find } from "lodash";
import { useDebounce } from "../../hooks";
import { DocumentPatternServiceClient, UserManagementServiceClient } from "../../api";
import UserView from "../UserView";

export type ChangeUsersProperties = {
  filters?: FilterItem[],
  useFavorite?: boolean,
  patternId: string | null,
  documentId: string | null
}

type ChangeUsersProps = {
  visible: boolean,
  onHide: (visible: boolean) => void,
  changeProps: ChangeUsersProperties
}

const ChangeUsers = ({ visible, onHide, changeProps }: ChangeUsersProps): JSX.Element => {
  const { token, accounts, defAccount } = useAppStore(useShallow((state) => ({
    token: state.token,
    accounts: state.accounts,
    defAccount: state.account,
  })));
  const [filterType, setFilterType] = useState<'users' | 'scs' | 'roles'>('users');
  const [account, setAccount] = useState<Account | null>(defAccount);
  const [strSearch, setStrSearch] = useState<string>('');

  const [visibleLocal, setVisible] = useState<boolean>(false);

  const { filters = [], useFavorite = false, patternId = null, documentId = null } = changeProps;

  const debouncedSearch = useDebounce(strSearch, 500);

  useEffect(() => {
    if(visible){
      setTimeout(() => {
        setVisible(true);
      }, 100);
    }
  }, []);

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [filterType, account?.id || null, debouncedSearch],
    queryFn: async ({ pageParam }) => {
      try {
        let filter = new KazFilter({
          position: (pageParam - 1) * 15,
          countFilter: 15,
          orders: useFavorite ? ['fav_first', 'alphabetical'] : ['alphabetical'],
          items: []
        });
        let result: any = [];
        switch (filterType) {
          case 'users':
          case 'scs':
            result = await UserManagementServiceClient.getAllUsers(token, filter);
            break;
          case 'roles':
            if (patternId !== null) {
              let roles = await DocumentPatternServiceClient.getPatternProcessRoles(token, patternId, filter);
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
    staleTime: 60 * 1000, // 1 minute
    enabled: visible
  });

  console.log(data, patternId)

  return <Popup
    position='right'
    visible={visibleLocal}
    onClose={() => {
      setVisible(false);
      onHide(false);
    }}
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
        onClick={() =>{
          setVisible(false);
          onHide(false);
        }}
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
        content="Редагувати користувачів/групи"
      />
      <Button style={{
        gridColumn: 3,
        alignSelf: 'end'
      }}
        onClick={() => {
          setVisible(false);
          onHide(false)
        }}
        fill={'none'}
        shape={'rounded'}
      >
        <CloseOutline />
      </Button>
    </div>
    <TabsStyled>
      <Tabs.Tab
        title='Додати'
        key={'info'}
      >
        <ActionSheetSelect
          label={'Фільтр'}
          value={filterType}
          options={[
            {
              label: 'По користувачам',
              value: 'users'
            },
            {
              label: 'По процесним ролям',
              value: 'roles'
            },
            {
              label: 'За грифами',
              value: 'scs'
            }
          ]}
          onChange={(val) => setFilterType(val)}
        />
        <ActionSheetSelect
          label={'Аккаунт'}
          value={account?.id || null}
          //@ts-ignore
          options={accounts.map(item => ({
            label: item.accountName,
            value: item.id
          }))}
          onChange={(val) => setAccount(find(accounts, { id: val }) || null)}
        />
        <Form.Item
          label={'Назва'}
        >
          <Input
            placeholder={'Введіть назву'}
            value={strSearch}
            onChange={(val) => setStrSearch(val)}
          />
        </Form.Item>
        <List>
          {data?.flatData?.map(item=>
            <UserView key={item?.id} user={item} />
            
          )}
            
        </List>
      </Tabs.Tab>
      <Tabs.Tab
        title='Видалити'
        key={'info1'}
      >
        123
      </Tabs.Tab>
    </TabsStyled>
  </Popup>
};

export default ChangeUsers;
