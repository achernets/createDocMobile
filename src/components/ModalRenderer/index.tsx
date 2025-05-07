import React, { Suspense } from 'react';
import { ModalKey, useModalStore } from '../../store/useModals';
import { SpinLoading } from 'antd-mobile';
import AddEditRowTableModal from '../Modals/AddEditRowTable';
const PatternAttachmentsModal = React.lazy(() => import('../Modals/PatternAttachments'));
const TableEditModal = React.lazy(() => import('../Modals/TableEdit'));

const ModalManager = () => {
  const modals = useModalStore((s) => s.modals);

  return (
    <>
      {modals.map((modal) => {
        let ModalComponent: React.ReactNode = null;
        switch (modal.key as ModalKey) {
          case 'PATTERN_ATTACHMENTS':
            ModalComponent = <PatternAttachmentsModal
              key={modal.id}
              id={modal.id}
              params={modal.params}
            />;
            break;
          case 'TABLE_EDIT':
            ModalComponent = <TableEditModal
              key={modal.id}
              id={modal.id}
              params={modal.params}
            />;
            break;
          case 'ADD_EDIT_ROW_TABLE':
            ModalComponent = <AddEditRowTableModal
              key={modal.id}
              id={modal.id}
              params={modal.params}
            />;
            break
          default:
            break;
        }
        return (
          <Suspense fallback={<div><SpinLoading color={'primary'} /></div>} key={modal.id}>
            {ModalComponent}
          </Suspense>
        );
      })}
    </>
  );
};

export default ModalManager;
