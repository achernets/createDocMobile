import { create } from 'zustand';
import { AuthServiceClient, initClient } from '../api';
import { Account, UserOrGroup, DocumentPattern, DocumentPatternGroup } from '../api/data/core';

interface AppStore {
  account: Account | null,
  groupPattern: DocumentPatternGroup | null,
  pattern: DocumentPattern | null,
  loadingApp: boolean,
  avatarUrl: string,
  token: string,
  clientInfo: UserOrGroup | null,
  step: 'SELECT_PATTERN' | 'CREATE_DOC',
  getInitialApp: () => void,
  setAccount: (account: Account | null) => void,
  setGroupPattern: (groupPattern: DocumentPatternGroup | null) => void,
  setPattern: (pattern: DocumentPattern | null) => void
};

const useAppStore = create<AppStore>((set) => ({
  loadingApp: true,
  avatarUrl: '',
  token: '',
  clientInfo: null,
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
      set({
        loadingApp: false,
        avatarUrl: `${settings.THRIFT.URL}/${settings.THRIFT.AVATAR}`,
        token: token !== null ? token : '',
        clientInfo: user?.clientInfo || null
      });
    } catch (error) {
      console.log(error);
    }
  },
  step: "SELECT_PATTERN"
}));

export default useAppStore;
