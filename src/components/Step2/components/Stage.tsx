
import { JSX } from "react";
import { DocumentPattern } from "../../../api/data";
import { Control } from "react-hook-form";
import Users from "../../Form/Users";
import StageDeadline from "../../Form/StageDeadline";

type StageProps = {
  name: string,
  control: Control<any>,
  pattern: DocumentPattern
};

const Stage = ({ name, pattern, control, }: StageProps): JSX.Element => {


  return <>
    <Users
      control={control}
      name={`${name}.userOrGroups`}
      label={'Учасники'}
      changeProps={{
        patternId: pattern?.id || null,
        documentId: null,
        filters: [],
      }}
    />
    <StageDeadline
      name={`${name}`}
      control={control}
    />
  </>;
};

export default Stage;