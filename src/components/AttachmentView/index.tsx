import { JSX } from "react";
import { Attachment } from "../../api/data";


type AttachmentViewProps = {

  attachment: Attachment
}

const AttachmentView = ({ attachment }: AttachmentViewProps): JSX.Element => {

  console.log(attachment);

  return <div>
    123
  </div>
};

export default AttachmentView;