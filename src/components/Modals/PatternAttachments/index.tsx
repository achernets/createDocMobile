import { AutoCenter, Grid } from 'antd-mobile';
import { ModalInstance, useModalStore } from '../../../store/useModals';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ModalStyled } from '../styled';
import { AttachmentEditMode, AttachmentProcessingType, AttCreateInfo, DocumentAccessPolicy, KazFilter, PatternAttachmentTemplate } from '../../../api/data';
import { includes, map } from 'lodash';
import { DocumentPatternServiceClient, DocumentServiceClient } from '../../../api';
import useAppStore from '../../../store/useAppStore';
import PatternAttachmentTemplateView from '../../AttachmentTemplateView';

const PatternAttachmentsModal = ({ id, params: { cb, patternId = null } }: Omit<ModalInstance, 'key'>) => {
  const token = useAppStore((state) => state.token);
  const closeModalById = useModalStore((state) => state.closeModalById);
  const [patternAttachments, setPatternAttachments] = useState<PatternAttachmentTemplate[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const defaultFiles = useMemo(() => {
    return [
      new PatternAttachmentTemplate({
        id: '$onlineDocId',
        oName: 'NewWord.docx',
        size: 9216,
      }),
      new PatternAttachmentTemplate({
        id: '$onlineXlsId',
        oName: 'NewExcel.xlsx',
        size: 6144
      }),
      new PatternAttachmentTemplate({
        id: '$onlinePptId',
        oName: 'NewPP.pptx',
        size: 161792
      })
    ];
  }, []);

  const getData = useCallback(async () => {
    try {
      const result = await DocumentPatternServiceClient.getAllPatternAttachmentTemplates(
        token, patternId, new KazFilter({
          countFilter: 999,
          position: 0
        })
      );
      setPatternAttachments(result);
    } catch (error) {
      console.log(error);
    }
  }, [token, patternId]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onClose = useCallback(() => {
    closeModalById(id);
  }, [id]);

  const onSuccess = useCallback(async() => {
    try {
      const result = await DocumentServiceClient.createAttachmentFrom(
        token,
        "",
        "",
        new DocumentAccessPolicy(),
        [...defaultFiles, ...patternAttachments].filter(itm=>includes(selected, itm.id)).map(itm=>new AttCreateInfo({
          attachmentTemplateId: itm.id,
          fileName: itm.oName,
          forDraft: true,
          editMode: AttachmentEditMode.MULTIPLE
        })),
        AttachmentProcessingType.PROCESS
      );
      onClose();
      if (cb) cb(result);
    } catch (error) {
      console.log(error);
    }
   
  }, [cb, onClose, token, selected, defaultFiles, patternAttachments]);

  const onSelectedHandler = useCallback((selected: boolean, id: string) => setSelected(prev => {
    if (selected) {
      return [...prev, id];
    } else {
      return prev.filter(itm => itm !== id);
    }
  }), []);

  return (
    <ModalStyled
      visible
      header={<div style={{
        fontSize: 16,
        fontWeight: 600,
        lineHeight: '24px'
      }}>{'Створити вкладення із шаблону'}</div>}
      content={
        <Grid columns={1} gap={8}>
          <Grid.Item >
            <AutoCenter>{'Новий документ'}</AutoCenter>
          </Grid.Item>
          {map(defaultFiles, (itm: PatternAttachmentTemplate) => <Grid.Item key={itm.id}>
            <PatternAttachmentTemplateView
              patternAttachment={itm}
              isSelected={includes(selected, itm.id)}
              onSelect={onSelectedHandler}
            />
          </Grid.Item>)}
          <Grid.Item >
            <AutoCenter>{'З шаблону'}</AutoCenter>
          </Grid.Item>
          {map(patternAttachments, itm => <Grid.Item key={itm.id}>
            <PatternAttachmentTemplateView
              patternAttachment={itm}
              isSelected={includes(selected, itm.id)}
              onSelect={onSelectedHandler}
            />
          </Grid.Item>)}
        </Grid>
      }
      actions={[
        { key: 'success', text: 'Готово', primary: true, onClick: onSuccess },
        { key: 'cancel', text: 'Відмінити', onClick: onClose }
      ]}
      showCloseButton={true}
      destroyOnClose={true}
      closeOnMaskClick={true}
      onClose={() => closeModalById(id)}
    />
  );
};

export default PatternAttachmentsModal;
