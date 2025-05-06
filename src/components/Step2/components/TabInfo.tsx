import { Fragment, JSX } from "react";
import Users from "../../Form/Users";
import TextArea from "../../Form/TextArea";
import Checkbox from "../../Form/Checkbox";
import DateTimePicker from "../../Form/DateTimePicker";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { ContentHolder, DocumentPattern } from "../../../api/data";
import { map } from "lodash";
import Holder from "../../Form/Holder";

type TabInfoProps = {
  control: Control,
  pattern: DocumentPattern,
  watch: any,
  setChanges: (newValue: []) => void
};

const TabInfo = ({ control, pattern, setChanges }: TabInfoProps): JSX.Element => {
  const controlForDocument = useWatch({
    control,
    name: 'document.controlForDocument',
  });

  const holdersField = useFieldArray({
    control,
    name: 'holders',
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
          label={"Контрольний термін документу"}
          time={true}
          formItemProps={{
            required: true
          }}
        />
      </>
    )}
    {map(holdersField.fields, (holder: ContentHolder, index: number) => {
      return <Fragment key={holder.id}>
        {holder.showInInfo && <Holder
          holder={holder}
          name={`holders.${index}`}
          control={control}
          setChanges={setChanges}
        />}
      </Fragment>
    })}
  </>;
};


export default TabInfo;