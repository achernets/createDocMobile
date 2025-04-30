import React, { Suspense } from 'react';
import { useModalStore } from '../../store/useModals';
import { SpinLoading } from 'antd-mobile';
const PatternAttachmentsModal = React.lazy(() => import('../Modals/PatternAttachments'));

const ModalManager = () => {
  const modals = useModalStore((s) => s.modals);
  
  return (
    <>
      {modals.map((modal) => {
        let ModalComponent: React.ReactNode = null;
        switch (modal.key) {
          case 'PATTERN_ATTACHMENTS':
            ModalComponent = <PatternAttachmentsModal
              key={modal.id}
              id={modal.id}
              params={modal.params}
            />;
            break;

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
