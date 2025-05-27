import { JSX } from "react";
import { Attachment, AttachmentExtStatus } from "../../api/data";
import { Button, Ellipsis, Image } from "antd-mobile";
import { getFileIcon } from "../../utils";
import { invert } from "lodash";
import { DeleteOutline } from "antd-mobile-icons";
import { useTranslation } from "react-i18next";


type AttachmentViewProps = {
  attachment: Attachment,
  extStatusShow?: boolean,
  remove?: () => void
}

const AttachmentView = ({ attachment, remove, extStatusShow = false }: AttachmentViewProps): JSX.Element => {

  const { t } = useTranslation();

  return <div style={{ position: 'relative', display: 'flex', gap: 4, alignItems: 'center' }}>
      <Image
        src={getFileIcon(attachment.fileName)}
        width={28}
        height={28}
      />
      <div  style={{ position: 'relative', display: 'flex', gap: 4, flexDirection: 'column' }}>
        <Ellipsis content={attachment.fileName} />
        {extStatusShow && <Ellipsis
          content={t(`AttachmentExtStatus.${invert(AttachmentExtStatus)[attachment.attachmentExtStatus]}`)}
          style={{
            color: '#1890FF',
            fontSize: 14
          }}
        />}
      </div>
    {remove && <Button
      fill={'none'}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        remove();
      }}
      style={{
        position: 'absolute',
        top: '0%',
        right: 0,
        transform: 'translate(50%, -50%)'
      }}
    >
      <DeleteOutline />
    </Button>}
  </div>
};

export default AttachmentView;