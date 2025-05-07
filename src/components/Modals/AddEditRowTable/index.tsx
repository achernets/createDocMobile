
import { ModalAddEditRowTable, useModalStore } from '../../../store/useModals';
import { Fragment, useCallback } from 'react';
import { ModalStyled } from '../styled';
import { useForm } from "react-hook-form";
import { Form } from 'antd-mobile';
import { map, reduce, values } from 'lodash';
import { ContentItem } from '../../../api/data';
import ContentItemTemplate from '../../Form/ContentItemTemplate';


const AddEditRowTableModal = ({ id, params: { cb, items = [] } }: Omit<ModalAddEditRowTable, 'key'>) => {

  const closeModalById = useModalStore((state) => state.closeModalById);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      contentItems: reduce(items, (hash, itm) => {
        hash[itm.key] = itm;
        return hash;
      }, {})
    },
    shouldUnregister: false
  });

  const onClose = useCallback(() => {
    closeModalById(id);
  }, [id]);

  const onSuccess = useCallback(async (data) => {
    try {
      onClose();
      if (cb) cb(values(data.contentItems));
    } catch (error) {
      console.log(error);
    }
  }, [cb, onClose]);

  return (
    <ModalStyled
      visible
      disableBodyScroll
      className='full_screen'
      header={<div style={{
        fontSize: 16,
        fontWeight: 600,
        lineHeight: '24px'
      }}>Додавання/редагування рядка</div>}
      content={
        <Form
          name="add_edit_row"
          style={{
            width: '100%'
          }}
        >
          <div style={{
            display: "flex",
            gap: "8px",
            padding: "8px",
            flexDirection: "column",
          }}>
            {map(items, (contentItem: ContentItem, index: number) => {
              return <Fragment key={contentItem.key}>
                <ContentItemTemplate
                  contentItem={contentItem}
                  control={control}
                  pathAllItems='contentItems'
                  pathLink={`contentItems.${index}`}
                  //@ts-ignore
                  addChanges={() => console.log('s1')}
                />
              </Fragment>
            })}
          </div>
        </Form>
      }
      actions={[
        { key: 'success', text: 'Готово', primary: true, onClick: handleSubmit(onSuccess) },
        { key: 'cancel', text: 'Відмінити', onClick: onClose }
      ]}
      showCloseButton={true}
      destroyOnClose={true}
      closeOnMaskClick={true}
      onClose={() => closeModalById(id)}
    />
  );
};

export default AddEditRowTableModal;
