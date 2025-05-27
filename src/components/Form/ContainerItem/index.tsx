import { Fragment, JSX, useEffect, useState } from "react";
import { Control, useController, useForm } from "react-hook-form";
import { FormItemProps } from "antd-mobile";
import { Wrapper } from "./styled";
import { debounce, map, reduce, size, uniqBy } from "lodash";
import { ContentItem } from "../../../api/data";
import ContentItemTemplate from "../ContentItemTemplate";
import { ContentItemExecScript } from "../../../utils/document";


type ContainerItemFProps = {
  label?: string,
  defaultValue?: boolean,
  name: string,
  control: Control<any>,
  disabled?: boolean,
  formItemProps?: FormItemProps,
}

const ContainerItem = ({ label, name, control, defaultValue, formItemProps = {} }: ContainerItemFProps): JSX.Element => {
  const { field: { value, onChange } } = useController({
    name,
    control,
    defaultValue
  });

  const subForm = useForm({
    defaultValues: {
      contentItems: reduce(value, (hash, itm) => {
        hash[itm.key] = itm;
        return hash;
      }, {})
    },
    shouldUnregister: false
  });

  const { getValues, setValue, watch } = subForm


  const [changes, setChanges] = useState([]);
  const [changesIsWork, setChangesIsWork] = useState(false);

  const execFunc = async (obj) => {
    const fn = new Function('Methods', `return (async () => {${obj.item.onChangeScript}})();`);
    console.log('start');
    //@ts-ignore
    const getContentItem = (key: string) => getValues(`contentItems.${key}`);
    const getPathLinkByKey = () => {
      return null;
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
        //@ts-ignore
        const itm = getValues(`contentItems.${paths[1]}`);
        //@ts-ignore
        if (itm && itm?.onChangeScript && itm?.onChangeScript !== null && itm?.onChangeScript !== '') {
          setChanges(prev => {
            return uniqBy([
              ...prev,
              {
                holderPath: null,
                item: itm,
                pathItem: name
              }
            ].reverse(), 'pathItem').reverse();
          });
        }
      }
    });
    return () => unsubscribe();
  }, [watch, getValues]);

  useEffect(() => {
    const { unsubscribe } = subForm.watch((valueNew, { name }) => {
      if (name?.startsWith('contentItems.')) {
        const paths = name.split('.');
        onChange(map(value, itm => {
          if (itm?.key === paths[1]) {
            return valueNew.contentItems[paths[1]];
          }
          return itm
        }))
      }
    });
    return () => unsubscribe();
  }, [subForm.watch, value, onChange]);

  return <Wrapper
    label={<>
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
    {...formItemProps}
  >
    {map(value, (contentItem: ContentItem) => {
      return <Fragment key={contentItem.key}>
        <ContentItemTemplate
          contentItemKey={contentItem.key}
          control={subForm.control}
          pathAllItems='contentItems'
          pathLink={`contentItems.${contentItem.key}`}
          //@ts-ignore
          addChanges={() => setChanges(prev => [
            ...prev,
            {
              holderPath: null,
              pathItem: `contentItems.${contentItem.key}`,
              item: contentItem
            }
          ])}
          getValues={getValues}
        />
      </Fragment>
    })}
  </Wrapper>
};


export default ContainerItem;