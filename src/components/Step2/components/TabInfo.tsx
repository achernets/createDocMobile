import { JSX } from "react";
import Users from "../../Form/Users";
import TextArea from "../../Form/TextArea";
import Checkbox from "../../Form/Checkbox";
import DateTimePicker from "../../Form/DateTimePicker";
import { Control, useWatch } from "react-hook-form";
import { DocumentPattern } from "../../../api/data";

type TabInfoProps = {
  control: Control,
  pattern: DocumentPattern
};

const TabInfo = ({ control, pattern }: TabInfoProps): JSX.Element => {
  const controlForDocument = useWatch({
    control,
    name: 'document.controlForDocument',
  });

  return <>
    <Users
      name={"author"}
      control={control}
      multiple={false}
      label={"Автор"}
      disabled={true}
      changeProps={{
        patternId: null,
        documentId: null
      }}
    />
    <TextArea
      label={"Короткий зміст"}
      name={"document.nameDocument"}
      control={control}
      showCount
      maxLength={2000}
      placeholder="Ввести"
    />
    <Checkbox
      label={"Поставити на контроль"}
      name={"document.controlForDocument"}
      control={control}
    />
    {controlForDocument && (
      <>
        <Users
          name={"controlUsers"}
          control={control}
          multiple={false}
          label={"Контроль покласти на (за необхідності)"}
          changeProps={{
            useFavorite: true,
            documentId: null,
            patternId: pattern?.id || null,
            filters: [],
          }}
        />
        <DateTimePicker
          name={"document.documentDeadlineDate"}
          control={control}
          required={true}
          label={"Контрольний термін документу"}
          time={true}
        />
      </>
    )}

  </>;
};


export default TabInfo;