import { JSX, useEffect, useState, Fragment } from "react";
import { Button, Space, Tabs, Toast } from "antd-mobile";
import useAppStore from "../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { FormStyled, TabsStyled } from "./styled";
import { useForm } from "react-hook-form";
import { ADocument, AttachmentEditMode, AttachmentExtStatus, AttCreateInfo, ContentHolder, ContentHolderLink, ContentItem, ContentItemHBValue, ContentItemType, ContentItemValue, ContentTableDefinition, DocumentAccessPolicy, DocumentAccessPolicyType, FreezeDocumentPattern, PreconditionException, UserOrGroupType } from "../../api/data";
import UploadAttAndPatternTemplate from "../Form/UploadAttAndPatternTemplate";
import Holder from "../Form/Holder";
import TabInfo from "./components/TabInfo";
import Stages from "./components/Stages";
import { map, reduce, size, debounce, uniqBy, findIndex, filter, get, concat } from "lodash";
import { ContentItemExecScript } from "../../utils/document";
import { DocumentServiceClient, FilledDocumentPatternServiceClient } from "../../api";
import { sendMessageMobile } from "../../utils";

const Step2 = (): JSX.Element => {
  const { docInfo, token, clientInfo, account, groupPattern, pattern } = useAppStore(
    useShallow((state) => ({
      token: state.token,
      account: state.account,
      groupPattern: state.groupPattern,
      pattern: state.pattern,
      docInfo: state.docInfo,
      clientInfo: state.clientInfo
    })),
  );

  const { control, watch, setValue, getValues, handleSubmit } = useForm({
    defaultValues: docInfo,
    shouldUnregister: false
  });

  const [changes, setChanges] = useState([]);
  const [changesIsWork, setChangesIsWork] = useState(false);

  const execFunc = async (obj) => {
    const holder = getValues(obj.holderPath);
    const fn = new Function('Methods', `return (async () => {${obj.item.onChangeScript}})();`);
    console.log('start');
    const getContentItem = (key: string) => getValues(`contentItems.${key}`);
    const getPathLinkByKey = (key) => {
      return `${obj.holderPath}.contentHolderLink.${findIndex(holder.contentHolderLink, { contentItem: { key: key } })}`
    };
    await fn(ContentItemExecScript(setValue, getValues, getContentItem, getPathLinkByKey)).then(() => {
      console.log('end');
      setChanges(prev => prev.filter((_, i) => i !== 0));
      setChangesIsWork(false);
    }).catch((err) => {
      console.log(`Script error contentItemKey=${obj.item.contentItem.key}`, err);
      setChanges(prev => prev.filter((_, i) => i !== 0));
      setChangesIsWork(false);
    });
  };

  const debouncedExec = debounce((change) => {
    execFunc(change);
  }, 300);

  useEffect(() => {
    if (size(changes) === 0) return;
    if (changesIsWork === false) {
      setChangesIsWork(true);
      debouncedExec(changes[0]);
    }
  }, [debouncedExec, changes, changesIsWork]);

  useEffect(() => {
    const { unsubscribe } = watch((_, { name }) => {
      if (name?.startsWith('contentItems.')) {
        const paths = name.split('.');
        const holders = getValues('holders');
        const links = reduce(holders, (hash, holder, index) => {
          map(holder.contentHolderLink, (itm, idx) => {
            if (itm.contentItem.key === paths[1] && itm.onChangeScript !== undefined && itm.onChangeScript !== null && itm.onChangeScript !== '') {
              hash.push({
                holderPath: `holders.${index}`,
                pathItem: `holders.${index}.contentHolderLink.${idx}`,
                item: itm
              });
            }
          })
          return hash;
        }, []);
        setChanges(prev => {
          return uniqBy([
            ...prev,
            ...links
          ].reverse(), 'pathItem').reverse();
        });
      }
    });
    return () => unsubscribe();
  }, [watch, getValues]);

  const [holders] = watch(['holders']);

  const onSave = (data, event) => {
    return new Promise(async (resolve, reject) => {
      let toastHandler: ReturnType<typeof Toast.show> | null = null;
      try {
        const isDraft = event.target.dataset['action'] === "true";
        toastHandler?.close();
        toastHandler = Toast.show({
          icon: 'loading',
          content: `Створення ${isDraft ? 'чернетки' : 'документу'}`,
          duration: 0,
        });
        const freezePattern = await FilledDocumentPatternServiceClient.createAndCheckFilledDocumentPattern(
          token,
          new FreezeDocumentPattern({
            originalPatternId: pattern.id
          }),
          filter(data.stages, { changeOnDraft: true }),
          []
        );
        if (size(freezePattern?.exList) > 0 || freezePattern.fillPattern === null) {
          throw new PreconditionException(get(freezePattern, `exList.0`, {}));
        }
        const document = await DocumentServiceClient.createDocument(
          token,
          new ADocument({
            ...data.document,
            filledDocumentPattern: freezePattern.fillPattern,
          }),
          data.controlUsers,
          reduce(data.holders as ContentHolder[], (hash, item) => {
            return concat(hash, item.contentHolderLink?.map((itm: ContentHolderLink) => {
              const contentItem = get(data.contentItems, itm?.contentItem?.key, null);
              return new ContentHolderLink({
                ...itm,
                contentItem: contentItem !== null ? new ContentItem({
                  ...contentItem,
                  tableDefenition: contentItem.type === ContentItemType.TABLE ? new ContentTableDefinition({
                    ...contentItem?.tableDefenition,
                    columnDefenition: map(contentItem?.tableDefenition?.columnDefenition, itm => new ContentItem(itm))
                  }) : null,
                  childItems: map(contentItem?.childItems, itm => new ContentItem(itm)),
                  value: new ContentItemValue({
                    ...contentItem?.value,
                    strValue: contentItem?.value?.strValue && contentItem?.value?.strValue !== null ? String(contentItem?.value?.strValue) : null,
                    strValue2: contentItem?.value?.strValue2 && contentItem?.value?.strValue2 !== null ? String(contentItem?.value?.strValue2) : null,
                    hbValue: new ContentItemHBValue(contentItem?.value?.hbValue)
                  })
                }) : null
              });
            }));
          }, []),
          data.scGrifs?.reduce((prev, current) => {
            prev.add(current.id);
            return prev;
          }, new Set()),
          map(data.attachments, attachment => new AttCreateInfo({
            attachmentId: attachment.id,
            attachmentTemplateId: attachment.patternAttachmentTemplateId,
            fileName: attachment.fileName,
            forDraft: attachment.forDraft,
            editMode: AttachmentEditMode.MULTIPLE,
            attachmentExtStatus: attachment.attachmentExtStatus
          })),
          data.docRelations
        );
        if (!isDraft) {
          const permissions = await DocumentServiceClient.calculatePermissions(
            token,
            document.id,
            new DocumentAccessPolicy({
              type: DocumentAccessPolicyType.ACCESS
            })
          );
          const actions = filter(permissions.actions, action => {
            if (action?.canSetDecision === false || action?.additionConfirmation || action?.cancelDecision || action?.answerQuestion || action?.link?.allowRepeatDecision) return false;
            return action?.userOrGroupId === clientInfo?.id || action?.type === UserOrGroupType.GROUP;
          });
          if (actions?.length === 1) {
            await DocumentServiceClient.setDocumentDecision(
              token,
              document.id,
              actions[0].link.decision,
              '',
              true,
              '',
              actions[0].execId,
              [],
              [],
              new DocumentAccessPolicy({
                type: DocumentAccessPolicyType.ACCESS
              }),
              new Map()
            )
          }
          sendMessageMobile('createDocument', document?.id);
        } else {
          sendMessageMobile('createDraftDocument', document?.id);
        }
        resolve(document);
        toastHandler?.close();
      } catch (error) {
        toastHandler?.close();
        reject(error);
      }
    });
  };

  return (
    <>
      <FormStyled
        name="form"
        footer={
          <Space justify={"between"} block>
            <Button
              style={{ minWidth: 100 }}
              size="large"
              data-action={true}
              onClick={handleSubmit(onSave)}
            >
              У чeрнетку
            </Button>
            <Button
              style={{ minWidth: 100 }}
              type="submit"
              color="primary"
              size="large"
              data-action={false}
              onClick={handleSubmit(onSave)}
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
            padding: '0px 16px'
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
              watch={watch}
              formEdit={docInfo?.formEdit}
              setChanges={setChanges}
              notRemoveScIds={map(docInfo?.scGrifs, itm => itm.id)}
            />
          </Tabs.Tab>
          {map(holders, (holder: ContentHolder, index: number) => {
            return <Fragment key={holder.id}>
              {holder.showInInfo === false && <Tabs.Tab title={holder.oName} key={holder.id}>
                <Holder
                  holder={holder}
                  name={`holders.${index}`}
                  control={control}
                  setChanges={setChanges}
                  patternId={pattern.id}
                />
              </Tabs.Tab>}
            </Fragment>
          })}
          <Tabs.Tab title="Вкладення" key={"atts"}>
            <UploadAttAndPatternTemplate
              name={"attachments"}
              control={control}
              pattern={pattern}
              allowSubStatuses={[AttachmentExtStatus.PRIMARY, AttachmentExtStatus.SECONDARY]}
            />
          </Tabs.Tab>

          <Tabs.Tab title="Хід виконання" key={"stages"}>
            <Stages
              name={"stages"}
              control={control}
              pattern={pattern}
            />
          </Tabs.Tab>
        </TabsStyled>
      </FormStyled>
    </>
  );
};

export default Step2;
