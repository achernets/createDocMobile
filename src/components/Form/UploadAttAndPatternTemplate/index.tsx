import { JSX, useCallback, useRef, useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Attachment, AttachmentExtStatus, AttachmentStatus, AttachmentType, DocumentPattern } from "../../../api/data";
import { ActionSheet, Button, Card, Dialog, Divider, Ellipsis, Image, List, Space, Toast } from "antd-mobile";
import { createAttachmetFromFile, getFileIcon } from "../../../utils";
import { AddOutline, RightOutline } from "antd-mobile-icons";
import useModalStore from "../../../store/useModals";
import { useShallow } from "zustand/shallow";
import { at, includes, invert } from "lodash";

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

  const { fields, append, update, remove } = useFieldArray({
    control,
    name,
    keyName: 'idx'
  });
  const inputRef = useRef(null);

  console.log(fields)

  const handleFileChange = useCallback(async (event) => {
    const files = event.target.files;
    let toastHandler: ReturnType<typeof Toast.show> | null = null;
    for (let i = 0; i < files.length; i++) {
      try {
        toastHandler?.close();
        toastHandler = Toast.show({
          icon: 'loading',
          content: `Завантаження: ${i + 1}/${files.length}`,
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
      content: 'Завершено!',
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
        ...allowSubStatuses.map(extStatus => ({
          key: extStatus,
          description: 'subStatus',
          disabled: extStatus === att.attachmentExtStatus,
          text: `${AttachmentExtStatus[extStatus]}`
        })),
        {
          key: 'delete',
          text: 'Видалити',
          danger: true
        }
      ],
      closeOnAction: true,
      onAction: (action) => {
        if (includes(allowSubStatuses, action.key)) {
          update(index, {
            ...att,
            attachmentExtStatus: action.key
          });
        } else {
          switch (action.key) {
            case 'delete':
              Dialog.confirm({
                title: `Видалити вкладення ${att.fileName}`,
                onConfirm: () => remove(index)
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
        icon={<Space
          align={'center'}
          justify={'center'}
        >
          <Image
            src={getFileIcon(itm.fileName)}
            width={28}
            height={28}
          />
          <Space direction={'vertical'}
            style={{
              '--gap': '4px'
            }}
          >
            <Ellipsis content={itm.fileName} />
            <Ellipsis
              content={`AttachmentExtStatus.${invert(AttachmentExtStatus)[itm.attachmentExtStatus]}`}
              style={{
                color: '#1890FF',
                fontSize: 14
              }}
            />
          </Space>
        </Space>
        }
        extra={<RightOutline />}
      >
        {`AttachmentExtStatus.${invert(AttachmentExtStatus)[itm.attachmentExtStatus]}`}
        <Divider />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <Button color={'primary'}>Видалити</Button>
        </div>
      </Card>
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
      <AddOutline /> Дадати файл
    </Button>
    <Button
      block={true}
      onClick={handlerPatternChange}
    >
      <AddOutline /> Додати вкладення з шаблону
    </Button>
  </div>
};


export default UploadAttAndPatternTemplate;