import { create } from 'zustand';

export type ModalKey = 'PATTERN_ATTACHMENTS';

export type ModalInstance = {
  id: string;
  key: ModalKey;
  params: {
    [key: string]: any,
    cb?: (result?: any) => void
  }
};

type ModalStore = {
  modals: ModalInstance[];
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
