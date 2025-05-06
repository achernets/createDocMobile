import { JSX } from "react";
import { PatternAttachmentTemplate } from "../../api/data";
import { Checkbox, Ellipsis, Image, Space } from "antd-mobile";
import { getFileIcon } from "../../utils";


type PatternAttachmentTemplateProps = {
  patternAttachment: PatternAttachmentTemplate,
  onSelect?: (select: boolean, id: string) => void,
  isSelected?: boolean
};

const PatternAttachmentTemplateView = ({ patternAttachment, onSelect, isSelected }: PatternAttachmentTemplateProps): JSX.Element => {

  return <Space align={'center'} block onClick={() => onSelect(!isSelected, patternAttachment.id)}>
    {onSelect && <Checkbox checked={isSelected} />}
    <Image
      src={getFileIcon(patternAttachment.oName)}
      width={28}
      height={28}
    />
    <Ellipsis content={patternAttachment.oName} />
  </Space>
};

export default PatternAttachmentTemplateView;