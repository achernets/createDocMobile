import { JSX, useCallback, useRef } from "react";
import { Control, useController } from "react-hook-form";
import { Wrapper } from "./styled";
import { Button, FormItemProps, Toast } from "antd-mobile";
import AttachmentView from "../../AttachmentView";
import { createAttachmetFromFile } from "../../../utils";
import { AttachmentExtStatus } from "../../../api/data";

type AttachmentItemProps = {
  label?: string,
  defaultValue?: null,
  name: string,
  control: Control<any>,
  formItemProps?: FormItemProps,
  disabled?: boolean
}

const AttachmentItem = ({ label, name, control, defaultValue = null, formItemProps = {}, disabled = false }: AttachmentItemProps): JSX.Element => {
  const { field: { value, onChange, ...field } } = useController({
    name,
    control,
    defaultValue
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
          content: `Завантаження: ${i + 1}/${files.length}`,
          duration: 0,
        });
        const att = await createAttachmetFromFile(files[i], AttachmentExtStatus.CONTENT);
        onChange(att);
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
  }, [onChange]);

  return <Wrapper
    label={<>
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
  >
    {value !== null && value !== undefined && <AttachmentView
      attachment={value}
      remove={disabled ? undefined : () => onChange(null)}
    />}
    {!disabled && (value === null || value === undefined) && <>
      <Button block
        onClick={() => inputRef.current.click()}
      >
        Додати вкладення
      </Button>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple={false}
      />
    </>}

  </Wrapper>
};

export default AttachmentItem;
