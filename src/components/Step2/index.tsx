// @ts-nocheck
import { JSX, useCallback, useEffect, useState, Fragment } from "react";
import { Button, Modal, Space, Tabs } from "antd-mobile";
import { DocumentPatternServiceClient, DocumentServiceClient } from "../../api";
import { AttachmentExtStatus } from "../../api/data";
import useAppStore from "../../store/useAppStore";
import useModalStore from "../../store/useModals";
import { useShallow } from "zustand/shallow";
import { FormStyled, TabsStyled } from "./styled";
import { useForm } from "react-hook-form";
import { Document, DocumentAccessPolicy, DocPatternStageStatus, DocumentAccessPolicyType, ContentHolder, ContentItemType } from "../../api/data";
import UploadAttAndPatternTemplate from "../Form/UploadAttAndPatternTemplate";
import Holder from "../Form/Holder";
import TabInfo from "./components/TabInfo";
import Stages from "./components/Stages";
import { get, pick, sortBy, orderBy, map, reverse, reduce, filter, size, debounce, uniqBy, findIndex } from "lodash";
import { GetFilledDocumentPatternStagesExecutorsArgs } from "../../api/data/FilledDocumentPatternService";

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

  const { control, reset, watch, setValue, getValues } = useForm({
    defaultValues: {
      author: [clientInfo],
      controlUsers: [clientInfo],
      document: new Document({
        nameDocument: "",
        controlForDocument: false,
        documentDeadlineDate: -1,
      }),
      attachments: [],
      holders: [],
      stages: [],
      scGrifs: []
    },
    shouldUnregister: false
  });

  const [changes, setChanges] = useState([]);
  const [changesIsWork, setChangesIsWork] = useState(false);

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
          controlForDocument: false,
          documentDeadlineDate: -1,
        }),
        attachments: [],
        holders: orderBy(result.holders, ['order', 'oName']).map(holder => new ContentHolder({
          ...holder,
          contentHolderLink: orderBy(holder.contentHolderLink, ['order', 'oName'])
        })),
        contentItems: reduce(result.holders, (hash, holder) => {
          map(holder.contentHolderLink, itm => {
            hash[itm.contentItem.key] = itm.contentItem;
          })
          return hash;
        }, {}),
        stages: sortBy(reverse(filter(result.stages, { status: DocPatternStageStatus.IN_PROGRESS, hide: false })), ['orderNum']),
        ...pick(result, ['scGrifs'])
      });
    } catch (error) {
      console.log(error);
    }
  }, [token, pattern, clientInfo, reset]);

  useEffect(() => {
    getInfoDoc();
  }, [getInfoDoc]);

  const execFunc = (obj) => {
    const holder = getValues(obj.holderPath);
    const fn = new Function('Methods', `return (async () => {${obj.item.onChangeScript}})();`);
    console.log('start');
    const getPathLinkByKey = (key) => {
      return `${obj.holderPath}.contentHolderLink.${findIndex(holder.contentHolderLink, { contentItem: { key: key } })}`
    };
    const getContentItem = (key) => getValues(`contentItems.${key}`)
    fn({
      getContentItemValue: (key) => {
        const item = getValues(`contentItems.${key}`);
        switch (item.type) {
          case ContentItemType.CHECKBOX:
            return get(item, `value.strValue`) === 'true';
          default:
            return get(item, `value.strValue`);
        }
      },
      setContentItemValue: (key, value) => {
        if (getValues(`contentItems.${key}.value.strValue`) !== value) {
          setValue(`contentItems.${key}.value.strValue`, value);
        }
      },
      setRequiredLink: (key, value) => {
        const addressPath = getPathLinkByKey(key);
        setValue(`${addressPath}.requared`, value);
      }
    }).then(() => {
      console.log('end');
      setChanges(prev => prev.filter((itm, i) => i !== 0));
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
    const { unsubscribe } = watch((value, { name, type }) => {
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
              watch={watch}
              setChanges={setChanges}
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
