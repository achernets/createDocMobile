// @ts-nocheck
import { JSX, useCallback, useEffect } from "react";
import { Button, Modal, Space, Tabs } from "antd-mobile";
import { DocumentPatternServiceClient } from "../../api";
import useAppStore from "../../store/useAppStore";
import useModalStore from "../../store/useModals";
import { useShallow } from "zustand/shallow";
import { FormStyled, TabsStyled } from "./styled";
import { useForm } from "react-hook-form";
import {
  Document,
  DocumentAccessPolicy,
  DocumentAccessPolicyType
} from "../../api/data";
import Users from "../Form/Users";
import TextArea from "../Form/TextArea";
import Checkbox from "../Form/Checkbox";
import { get } from "lodash";
import DateTimePicker from "../Form/DateTimePicker";
import { AddOutline } from "antd-mobile-icons";

const Step2 = (): JSX.Element => {
  const { token, clientInfo, account, groupPattern, pattern } = useAppStore(
    useShallow((state) => ({
      account: state.account,
      groupPattern: state.groupPattern,
      pattern: state.pattern,
      token: state.token,
      clientInfo: state.clientInfo,
    })),
  );

  const { openModal } = useModalStore(useShallow((state) => ({
    openModal: state.openModal
  })));

  const { control, reset, watch } = useForm({
    defaultValues: {
      author: [clientInfo],
      controlUsers: [clientInfo],
      document: new Document({
        nameDocument: "",
        controlForDocument: true,
        documentDeadlineDate: -1,
      }),
    },
  });

  const getInfoDoc = useCallback(async () => {
    try {
      if (pattern?.id === undefined) return;
      const result = await DocumentPatternServiceClient.getInfoForCreateDoc(
        token,
        pattern?.id,
        "",
        new DocumentAccessPolicy({
          type: DocumentAccessPolicyType.ACCESS,
        }),
      ) as unknown;
      reset({
        author: [clientInfo],
        controlUsers: [clientInfo],
        document: new Document({
          nameDocument: "",
          controlForDocument: true,
          documentDeadlineDate: -1,
        }),
      });
      console.log(result);
    } catch (error) {

      console.log(error);
    }
  }, [token, pattern, clientInfo, reset]);

  useEffect(() => {
    getInfoDoc();
  }, [getInfoDoc]);

  const [controlForDocument] = watch(["document.controlForDocument"]);

  useEffect(() => {
    const { unsubscribe } = watch((value, { name }) => {
      console.log(`${name}=`, get(value, name));
    });
    return () => unsubscribe();
  }, [watch]);

  return (
    <>
      <FormStyled
        name="form"
        footer={
          <Space justify={"between"} block>
            <Button style={{ minWidth: 100 }} size="large">
              У чeрнетку
            </Button>
            <Button
              style={{ minWidth: 100 }}
              type="submit"
              color="primary"
              size="large"
            >
              Створити
            </Button>
          </Space>
        }
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 400,
            lineHeight: "20px",
            color: "rgba(0, 0, 0, 0.45)",
          }}
        >
          {account?.accountName} / {groupPattern?.nameDocPatGroup} /{" "}
          <span style={{ color: "#000000" }}>{pattern?.nameDocPattern}</span>
        </div>
        <TabsStyled defaultActiveKey={"info"}>
          <Tabs.Tab title="Відомості" key={"info"}>
            <Users
              name={"author"}
              control={control}
              multiple={false}
              label={"Автор"}
              disabled={true}
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
          </Tabs.Tab>

          <Tabs.Tab title="Вкладення" key={"atts"}>
            <div style={{
              display: "flex",
              gap: "8px",
              padding: "8px",
              flexDirection: "column",
            }}>
              <Button
                type="primary"
                block={true}
              >
                <AddOutline /> Дадати файл
              </Button>
              <Button
                type="primary"
                block={true}
                onClick={() => {
                  openModal('PATTERN_ATTACHMENTS', {
                    patternId: pattern.id,
                    cb: result =>console.log(result)
                  })
                }}
              >
                <AddOutline /> Додати вкладення з шаблону
              </Button>
            </div>
          </Tabs.Tab>

          <Tabs.Tab title="Хід виконання" key={"stages"}></Tabs.Tab>
        </TabsStyled>
      </FormStyled>
    </>
  );
};

export default Step2;
