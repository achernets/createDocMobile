import { create } from 'zustand';
import { AuthServiceClient, initClient, UserManagementServiceClient } from '../api';
import { Account, UserOrGroup, DocumentPattern, DocumentPatternGroup, KazFilter, FilterItem, FilterFieldType, FilterCondition } from '../api/data';
import { find } from 'lodash';

interface AppStore {
  accounts: Account[],
  account: Account | null,
  groupPattern: DocumentPatternGroup | null,
  pattern: DocumentPattern | null,
  loadingApp: boolean,
  avatarUrl: string,
  token: string,
  clientInfo: UserOrGroup,
  step: 'SELECT_PATTERN' | 'CREATE_DOC',
  getInitialApp: () => void,
  setAccount: (account: Account | null) => void,
  setGroupPattern: (groupPattern: DocumentPatternGroup | null) => void,
  setPattern: (pattern: DocumentPattern | null) => void
};

const useAppStore = create<AppStore>((set) => ({
  accounts: [],
  loadingApp: true,
  avatarUrl: '',
  token: '',
  clientInfo: new UserOrGroup(),
  account: null,
  groupPattern: null,
  pattern: null,
  setAccount: (account: Account | null) => set({ account, groupPattern: null, pattern: null }),
  setGroupPattern: (groupPattern: DocumentPatternGroup | null) => set({ groupPattern, pattern: null }),
  setPattern: (pattern: DocumentPattern | null) => set({ pattern }),
  getInitialApp: async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const result = await fetch('/web-config.json');
      const settings = await result.json();
      initClient('total.almexecm.com', 10443, true, 'kaz-server-dev1');
      const user = token === null ? null : await AuthServiceClient.refreshAuthSession(
        token
      );
      const accounts = token === null ? [] : await UserManagementServiceClient.getAccounts(token, new KazFilter({
        position: 0,
        countFilter: 999,
        items: [
          new FilterItem({
            field: 'main',
            value: 'true',
            fType: FilterFieldType.BOOLEAN,
            condition: FilterCondition.EQUAL
          })
        ]
      }));
      set({
        loadingApp: false,
        avatarUrl: `${settings.THRIFT.URL}/${settings.THRIFT.AVATAR}`,
        token: token !== null ? token : '',
        clientInfo: user?.clientInfo,
        account: find(accounts, { main: true }) || null,
        accounts: accounts
      });
    } catch (error) {
      console.log(error);
    }
  },
  step: "SELECT_PATTERN",
}));

export default useAppStore;
