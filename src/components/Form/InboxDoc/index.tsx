import { JSX, useCallback, useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";
import Input from "../Input";
import DatePicker from "../DateTimePicker";
import useAppStore from "../../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { DocumentServiceClient } from "../../../api";
import { ADocument, FilterCondition, FilterFieldType, FilterItem, KazFilter } from "../../../api/data";
import { compact, size } from "lodash";
import dayjs from "dayjs";
import { parseDate } from "../../../utils";
import { Button, Toast } from "antd-mobile";
import { CheckCircleFill, CloseCircleFill, InformationCircleOutline } from "antd-mobile-icons";

type InboxDocFProps = {
  name: string,
  control: Control<any>,
  documentId: string | null,
  required?: boolean
};

const InboxDoc = ({ name, control, documentId = null, required = false }: InboxDocFProps): JSX.Element => {
  const token = useAppStore(useShallow((state => state.token)));
  const [findDocs, setFindDocs] = useState<ADocument[]>([]);
  const [isFind, setIsFind] = useState<boolean>(false);
  const [externalNumber, externalRegDate] = useWatch({
    control: control,
    name: [`${name}.externalNumber`, `${name}.externalRegDate`]
  });

  useEffect(() => {
    setFindDocs([]);
    setIsFind(false)
  }, [externalNumber, externalRegDate]);

  const onFindDocs = useCallback(async () => {
    try {
      const result = await DocumentServiceClient.getTinyDocsByFilterNoPermission(
        token,
        new KazFilter({
          countFilter: 999,
          position: 0,
          orders: [],
          items: compact([
            documentId !== null ? new FilterItem({
              field: 'id',
              value: documentId,
              fType: FilterFieldType.STRING,
              condition: FilterCondition.NOT_IN
            }) : null,
            size(externalNumber) > 0 ? new FilterItem({
              field: 'externalNumber',
              value: externalNumber,
              fType: FilterFieldType.STRING,
              condition: FilterCondition.EQUAL
            }) : null,
            parseDate(externalRegDate) !== null ? new FilterItem({
              field: 'externalRegDate',
              value: `${dayjs(parseDate(externalRegDate)).startOf('day').valueOf()};${dayjs(parseDate(externalRegDate)).endOf('day').valueOf()}`,
              fType: FilterFieldType.DATE,
              condition: FilterCondition.BETWEEN
            }) : null
          ])
        })
      );
      Toast.show({
        icon: <InformationCircleOutline />,
        content: `Знайдено ${size(result)} документ(ів)`,
        //duration: 0
      });
      setFindDocs(result);
      setIsFind(true);
    } catch (error) {
      console.log(error);
    }
  }, [token, externalNumber, externalRegDate]);

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>
    <Input
      name={`${name}.externalNumber`}
      control={control}
      label={'Вихідний номер'}
      formItemProps={{
        required: required,
        help: isFind && size(externalNumber) > 0 ? `За таким номером і датою знайдено ${size(findDocs)} документів` : undefined,
        helpIcon: isFind && size(findDocs) === 0 ? <CheckCircleFill style={{ color: 'green' }} /> : <CloseCircleFill style={{ color: 'red' }} />
      }}

    />
    <DatePicker
      name={`${name}.externalRegDate`}
      control={control}
      label={'Вихідна реєстраційна дата'}
      formItemProps={{
        required: required,
        help: isFind &&  parseDate(externalRegDate) !== null ? `За таким номером і датою знайдено ${size(findDocs)} документів` : undefined,
        helpIcon: isFind && size(findDocs) === 0 ? <CheckCircleFill style={{ color: 'green' }} /> : <CloseCircleFill style={{ color: 'red' }} />
      }}
    />
    <Button
      onClick={onFindDocs}
      type={'button'}
      block
    >
      Знайти документ
    </Button>
  </div>
};


export default InboxDoc;