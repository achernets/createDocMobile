import { JSX } from "react";
import { PatternAttachmentTemplate } from "../../api/data";


type  PatternAttachmentTemplateProps = {

  patternAttachment: PatternAttachmentTemplate
}

const PatternAttachmentTemplateView = ({ patternAttachment }: PatternAttachmentTemplateProps): JSX.Element => {

  console.log(patternAttachment);

  return <div>
    123
  </div>
};

export default PatternAttachmentTemplateView;