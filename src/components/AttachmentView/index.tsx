import { JSX } from "react";
import { Attachment, AttachmentExtStatus } from "../../api/data";
import { Button, Ellipsis, Image, Space } from "antd-mobile";
import { getFileIcon } from "../../utils";
import { invert } from "lodash";
import { DeleteOutline } from "antd-mobile-icons";


type AttachmentViewProps = {
  attachment: Attachment,
  extStatusShow?: boolean,
  remove?: () => void
}

const AttachmentView = ({ attachment, remove, extStatusShow = false }: AttachmentViewProps): JSX.Element => {

  return <div style={{ position: 'relative' }}>
    <Space
      align={'center'}
      justify={'center'}
    >
      <Image
        src={getFileIcon(attachment.fileName)}
        width={28}
        height={28}
      />
      <Space direction={'vertical'}
        style={{
          '--gap': '4px'
        }}
      >
        <Ellipsis content={attachment.fileName} />
        {extStatusShow && <Ellipsis
          content={`AttachmentExtStatus.${invert(AttachmentExtStatus)[attachment.attachmentExtStatus]}`}
          style={{
            color: '#1890FF',
            fontSize: 14
          }}
        />}
      </Space>
    </Space>
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
        transform: 'translate(100%, -50%)'
      }}
    >
      <DeleteOutline />
    </Button>}
  </div>
};

export default AttachmentView;