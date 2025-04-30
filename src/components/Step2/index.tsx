// @ts-nocheck
import { JSX, useCallback, useEffect } from "react";
import { Button, Modal, Space, Tabs } from "antd-mobile";
import { DocumentPatternServiceClient, DocumentServiceClient } from "../../api";
import { AttachmentExtStatus } from "../../api/data";
import useAppStore from "../../store/useAppStore";
import useModalStore from "../../store/useModals";
import { useShallow } from "zustand/shallow";
import { FormStyled, TabsStyled } from "./styled";
import { useForm } from "react-hook-form";
import { Document, DocumentAccessPolicy, DocumentAccessPolicyType } from "../../api/data";
import UploadAttAndPatternTemplate from "../Form/UploadAttAndPatternTemplate";
import TabInfo from "./components/TabInfo";
import { get } from "lodash";

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

  const { control, reset, watch, setValue } = useForm({
    defaultValues: {
      author: [clientInfo],
      controlUsers: [clientInfo],
      document: new Document({
        nameDocument: "",
        controlForDocument: true,
        documentDeadlineDate: -1,
      }),
      attachments: []
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
      );
      reset({
        author: [clientInfo],
        controlUsers: [clientInfo],
        document: new Document({
          nameDocument: "",
          controlForDocument: true,
          documentDeadlineDate: -1,
        }),
        attachments: []
      });
    } catch (error) {
      console.log(error);
    }
  }, [token, pattern, clientInfo, reset]);

  useEffect(() => {
    getInfoDoc();
  }, [getInfoDoc]);

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
            <TabInfo
              control={control}
              pattern={pattern}
            />
          </Tabs.Tab>

          <Tabs.Tab title="Вкладення" key={"atts"}>
            <UploadAttAndPatternTemplate
              name={"attachments"}
              control={control}
              pattern={pattern}
              allowSubStatuses={[AttachmentExtStatus.PRIMARY, AttachmentExtStatus.SECONDARY]}
            />
          </Tabs.Tab>

          <Tabs.Tab title="Хід виконання" key={"stages"}></Tabs.Tab>
        </TabsStyled>
      </FormStyled>
    </>
  );
};

export default Step2;
