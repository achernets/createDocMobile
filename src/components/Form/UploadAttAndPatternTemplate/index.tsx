import { JSX, useCallback, useRef } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Attachment, AttachmentExtStatus, DocumentPattern } from "../../../api/data";
import { ActionSheet, Button, Card, Dialog, Toast } from "antd-mobile";
import { createAttachmetFromFile } from "../../../utils";
import { AddOutline, RightOutline } from "antd-mobile-icons";
import useModalStore from "../../../store/useModals";
import { useShallow } from "zustand/shallow";
import { includes } from "lodash";
import AttachmentView from "../../AttachmentView";
import { useTranslation } from "react-i18next";

type UploadAttAndPatternTemplateProps = {
  label?: string,
  defaultValue?: Attachment[],
  name: string,
  control: Control<any>,
  pattern: DocumentPattern,
  allowSubStatuses: AttachmentExtStatus[]
};

const UploadAttAndPatternTemplate = ({ name, control, pattern, allowSubStatuses = [] }: UploadAttAndPatternTemplateProps): JSX.Element => {

  const { openModal } = useModalStore(useShallow((state) => ({
    openModal: state.openModal
  })));

  const { t } = useTranslation();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name,
    keyName: 'idx'
  });
  const inputRef = useRef(null);

  const handleFileChange = useCallback(async (event) => {
    const files = event.target.files;
    let toastHandler: ReturnType<typeof Toast.show> | null = null;
    for (let i = 0; i < files.length; i++) {
      try {
        toastHandler?.close();
        toastHandler = Toast.show({
          icon: 'loading',
          content: t('MobileCreateDoc.loadingAttachment', { current: i + 1, all: files.length }),
          duration: 0,
        });
        const att = await createAttachmetFromFile(files[i], allowSubStatuses[0]);
        append(att);
      } catch (error) {
        toastHandler?.close();
      }
    }
    toastHandler?.close();
    Toast.show({
      icon: 'success',
      content: t('MobileCreateDoc.completed'),
      duration: 2000
    });
  }, [append]);

  const handlerPatternChange = useCallback(() => {
    openModal('PATTERN_ATTACHMENTS', {
      patternId: pattern.id,
      cb: result => {
        for (let i = 0; i < result.length; i++) {
          append(result[i]);
        }
      }
    })
  }, [pattern, append]);

  const actionsAttchments = useCallback((att: Attachment, index: number) => {
    ActionSheet.show({
      actions: [
        ...allowSubStatuses.filter(itm => itm !== att.attachmentExtStatus).map(extStatus => ({
          key: extStatus,
          description: t('MobileCreateDoc.typeAttachments'),
          text: t(`AttachmentExtStatus.${AttachmentExtStatus[extStatus]}`)
        })),
        {
          key: 'delete',
          text: t('MobileCreateDoc.remove'),
          danger: true
        }
      ],
      closeOnAction: true,
      onAction: (action) => {
        if (includes(allowSubStatuses, action.key)) {
          update(index, new Attachment({
            ...att,
            attachmentExtStatus: action.key as number
          }));
        } else {
          switch (action.key) {
            case 'delete':
              Dialog.confirm({
                title: t('MobileCreateDoc.remove', { fileName: att.fileName }),
                onConfirm: () => remove(index),
                confirmText: t('MobileCreateDoc.remove'),
                cancelText: t('MobileCreateDoc.cancel')
              });
              break;
            default:
              console.log(action);
              break;
          }
        }
      }
    });
  }, [allowSubStatuses, update, remove]);

  return <div style={{
    display: "flex",
    gap: "8px",
    padding: "8px",
    flexDirection: "column",
  }}>

    {fields.map((itm: { idx: string } & Attachment, index: number) => {
      return <Card
        key={itm.idx}
        style={{
          boxShadow: '0 0 0 1px rgba(5, 32, 101, 0.05)'
        }}
        onHeaderClick={() => actionsAttchments(itm, index)}
        icon={<AttachmentView
          attachment={itm}
          extStatusShow={true}
        />}
        extra={<RightOutline />}
      />
    })}
    <input
      type="file"
      ref={inputRef}
      style={{ display: 'none' }}
      onChange={handleFileChange}
      multiple
    />
    <Button
      block={true}
      onClick={() => inputRef.current.click()}
    >
      <AddOutline /> {t('MobileCreateDoc.addFile')}
    </Button>
    <Button
      block={true}
      onClick={handlerPatternChange}
    >
      <AddOutline />{t('MobileCreateDoc.addAttachmentFromPattern')}
    </Button>
  </div>
};


export default UploadAttAndPatternTemplate;