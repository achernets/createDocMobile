

import { Fragment, JSX } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { DocumentPattern, DocumentPatternStage } from "../../../api/data";
import { map } from "lodash";
import { Collapse } from "antd-mobile";
import Users from "../../Form/Users";
import Stage from "./Stage";

type StagesProps = {
  control: Control,
  pattern: DocumentPattern
};

const Stages = ({ control, pattern }: StagesProps): JSX.Element => {


  const { fields } = useFieldArray({
    control,
    name: 'stages',
    keyName: 'idx'
  });

  return <Collapse>
    {map(fields, (stage: DocumentPatternStage & { idx: string }, index: number) => <Collapse.Panel
      key={stage.idx}
      title={stage?.nameDocPatStage}
    >
      <Stage
        control={control}
        name={`stages.${index}`}
        pattern={pattern}
      />
    </Collapse.Panel>)}
  </Collapse>;
};


export default Stages;