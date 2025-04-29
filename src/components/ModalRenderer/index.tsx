import React, { Suspense } from 'react';
import { useModalStore } from '../../store/useModals';
const PatternAttachmentsModal = React.lazy(() => import('../Modals/PatternAttachments'));
// Динамічний імпорт модальних вікон
// const ConfirmDeleteModal = React.lazy(() => import('./modals/ConfirmDeleteModal'));
// const UserProfileModal = React.lazy(() => import('./modals/UserProfileModal'));

const ModalManager = () => {
  const modals = useModalStore((s) => s.modals);
  console.log(modals)
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
          <Suspense fallback={<div>Loading...</div>} key={modal.id}>
            {ModalComponent}
          </Suspense>
        );
      })}
    </>
  );
};

export default ModalManager;
