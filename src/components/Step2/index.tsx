import { JSX, useEffect, useState, Fragment } from "react";
import { Button, Space, Tabs } from "antd-mobile";
import useAppStore from "../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { FormStyled, TabsStyled } from "./styled";
import { useForm } from "react-hook-form";
import { AttachmentExtStatus, ContentHolder, ContentItemType } from "../../api/data";
import UploadAttAndPatternTemplate from "../Form/UploadAttAndPatternTemplate";
import Holder from "../Form/Holder";
import TabInfo from "./components/TabInfo";
import Stages from "./components/Stages";
import { get, map, reduce, size, debounce, uniqBy, findIndex } from "lodash";

const Step2 = (): JSX.Element => {
  const { docInfo, account, groupPattern, pattern } = useAppStore(
    useShallow((state) => ({
      account: state.account,
      groupPattern: state.groupPattern,
      pattern: state.pattern,
      docInfo: state.docInfo
    })),
  );

  const { control, watch, setValue, getValues } = useForm({
    defaultValues: docInfo,
    shouldUnregister: false
  });

  const [changes, setChanges] = useState([]);
  const [changesIsWork, setChangesIsWork] = useState(false);

  const execFunc = (obj) => {
    const holder = getValues(obj.holderPath);
    const fn = new Function('Methods', `return (async () => {${obj.item.onChangeScript}})();`);
    console.log('start');
    const getPathLinkByKey = (key) => {
      return `${obj.holderPath}.contentHolderLink.${findIndex(holder.contentHolderLink, { contentItem: { key: key } })}`
    };
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
              notRemoveScIds={map(docInfo?.scGrifs, itm => itm.id) }
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
