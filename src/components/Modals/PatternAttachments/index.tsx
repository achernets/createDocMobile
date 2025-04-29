import { AutoCenter, Grid } from 'antd-mobile';
import { ModalInstance, useModalStore } from '../../../store/useModals';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ModalStyled } from '../styled';
import { KazFilter, PatternAttachmentTemplate } from '../../../api/data';
import { map } from 'lodash';
import { DocumentPatternServiceClient } from '../../../api';
import useAppStore from '../../../store/useAppStore';
import PatternAttachmentTemplateView from '../../AttachmentTemplateView';

const PatternAttachmentsModal = ({ id, params: { cb, patternId = null } }: Omit<ModalInstance, 'key'>) => {
  const token = useAppStore((state) => state.token);
  const closeModalById = useModalStore((state) => state.closeModalById);
  const [patternAttachments, setPatternAttachments] = useState<PatternAttachmentTemplate[]>([]);

  const defaultFiles = useMemo(() => {
    return [
      new PatternAttachmentTemplate({
        id: '$onlineDocId',
        oName: 'newWord',
        size: 9216,
      }),
      new PatternAttachmentTemplate({
        id: '$onlineXlsId',
        oName: 'newExcel',
        size: 6144
      }),
      new PatternAttachmentTemplate({
        id: '$onlinePptId',
        oName: 'newPP',
        size: 161792
      })
    ].map(itm => ({ ...itm, selected: false }));
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
    if (cb) cb();
    closeModalById(id);
  }, [id, cb]);

  console.log(patternAttachments)

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
            />
          </Grid.Item>)}
          <Grid.Item >
            <AutoCenter>{'З шаблону'}</AutoCenter>
          </Grid.Item>
          {map(patternAttachments, itm => <Grid.Item key={itm.id}>
            <PatternAttachmentTemplateView
              patternAttachment={itm}
            />
          </Grid.Item>)}
        </Grid>
      }
      actions={[
        { key: 'success', text: 'Готово', primary: true, },
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
