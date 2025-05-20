
import { ModalAddEditRowTable, useModalStore } from '../../../store/useModals';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { ModalStyled } from '../styled';
import { useForm } from "react-hook-form";
import { Form } from 'antd-mobile';
import { debounce, map, reduce, size, uniqBy, values } from 'lodash';
import { ContentItem } from '../../../api/data';
import ContentItemTemplate from '../../Form/ContentItemTemplate';
import { ContentItemExecScript } from '../../../utils/document';
import { useTranslation } from 'react-i18next';


const AddEditRowTableModal = ({ id, params: { cb, items = [] } }: Omit<ModalAddEditRowTable, 'key'>) => {

  const closeModalById = useModalStore((state) => state.closeModalById);

  const { control, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: {
      contentItems: reduce(items, (hash, itm) => {
        hash[itm.key] = itm;
        return hash;
      }, {})
    },
    shouldUnregister: false
  });

  const { t } = useTranslation();

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

  const [changes, setChanges] = useState([]);
  const [changesIsWork, setChangesIsWork] = useState(false);

  const execFunc = async (obj) => {
    const fn = new Function('Methods', `return (async () => {${obj.item.onChangeScript}})();`);
    console.log('start');
    //@ts-ignore
    const getContentItem = (key: string) => getValues(`contentItems.${key}`);
    const getPathLinkByKey = () => {
      return null;
    };
    await fn(ContentItemExecScript(setValue, getValues, getContentItem, getPathLinkByKey)).then(() => {
      console.log('end');
      setChanges(prev => prev.filter((_, i) => i !== 0));
      setChangesIsWork(false);
    }).catch((err) => {
      console.log(`Script error contentItemKey=${obj.item.contentItem.key}`, err);
      setChanges(prev => prev.filter((_, i) => i !== 0));
      setChangesIsWork(false);
    });
  };

  const debouncedExec = debounce((change) => {
    execFunc(change);
  }, 300);

  useEffect(() => {
    if (size(changes) === 0) return;
    if (changesIsWork === false) {
      setChangesIsWork(true);
      debouncedExec(changes[0]);
    }
  }, [debouncedExec, changes, changesIsWork]);

  useEffect(() => {
    const { unsubscribe } = watch((_, { name }) => {
      if (name?.startsWith('contentItems.')) {
        const paths = name.split('.');
        //@ts-ignore
        const itm = getValues(`contentItems.${paths[1]}`);
        //@ts-ignore
        if (itm && itm?.onChangeScript && itm?.onChangeScript !== null && itm?.onChangeScript !== '') {
          setChanges(prev => {
            return uniqBy([
              ...prev,
              {
                holderPath: null,
                item: itm,
                pathItem: name
              }
            ].reverse(), 'pathItem').reverse();
          });
        }
      }
    });
    return () => unsubscribe();
  }, [watch, getValues]);


  return (
    <ModalStyled
      visible
      disableBodyScroll
      className='full_screen'
      header={<div style={{
        fontSize: 16,
        fontWeight: 600,
        lineHeight: '24px'
      }}>{t('MobileCreateDoc.addEditRow')}</div>}
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
            {map(items, (contentItem: ContentItem) => {
              return <Fragment key={contentItem.key}>
                <ContentItemTemplate
                  contentItemKey={contentItem.key}
                  control={control}
                  pathAllItems='contentItems'
                  pathLink={`contentItems.${contentItem.key}`}
                  //@ts-ignore
                  addChanges={() => console.log('s1')}
                />
              </Fragment>
            })}
          </div>
        </Form>
      }
      actions={[
        { key: 'success', text: t('MobileCreateDoc.ready'), primary: true, onClick: handleSubmit(onSuccess) },
        { key: 'cancel', text: t('MobileCreateDoc.cancel'), onClick: onClose }
      ]}
      showCloseButton={true}
      destroyOnClose={true}
      closeOnMaskClick={true}
      onClose={() => closeModalById(id)}
    />
  );
};

export default AddEditRowTableModal;
