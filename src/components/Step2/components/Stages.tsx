

import { JSX } from "react";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { DocumentPattern, DocumentPatternStage } from "../../../api/data";
import { map } from "lodash";
import { Collapse } from "antd-mobile";
import Stage from "./Stage";

type StagesProps = {
  name: string,
  control: Control<any>,
  pattern: DocumentPattern
};

const Stages = ({ name, control, pattern }: StagesProps): JSX.Element => {
  const [scGrifs] = useWatch({
    control,
    name: ['scGrifs'],
  });

  const { fields } = useFieldArray({
    control,
    name: name,
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
        scGrifs={scGrifs}
      />
    </Collapse.Panel>)}
  </Collapse>;
};


export default Stages;