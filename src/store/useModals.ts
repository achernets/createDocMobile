import { create } from 'zustand';
import { ContentItem } from '../api/data';

export type ModalKey = 'PATTERN_ATTACHMENTS' | 'TABLE_EDIT' | 'ADD_EDIT_ROW_TABLE';


export type ModalInstance = {
  id: string;
  key: ModalKey;
};

export type ModalPatternAttachments = ModalInstance & {
  key: 'PATTERN_ATTACHMENTS',
  params: {
    patternId: string,
    cb: (result?: any) => void
  }
};


export type ModalTableEdit = ModalInstance & {
  key: 'TABLE_EDIT',
  params: {
    contentItem: ContentItem, 
    disabled: boolean,
    cb: (items: ContentItem[], removeIds: string[]) => void
  }
};

export type ModalAddEditRowTable = ModalInstance & {
  key: 'ADD_EDIT_ROW_TABLE',
  params: {
    items: ContentItem[], 
    cb: (items: ContentItem[]) => void
  }
};

type ModalStore = {
  modals: any[];
  openModal: (key: ModalKey, params?: any) => string;
  closeModalByKey: (key: ModalKey) => void;
  closeModalById: (id: string) => void;
};

const generateId = () => Math.random().toString(36).slice(2, 10);

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  openModal: (key, params) => {
    const id = generateId();
    set((state) => ({
      modals: [...state.modals, { id, key, params }],
    }));
    return id;
  },
  closeModalByKey: (key) =>
    set((state) => ({
      modals: state.modals.filter((m) => m.key !== key),
    })),
  closeModalById: (id) =>
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id),
    })),
}));

export default useModalStore;
