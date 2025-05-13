import { Fragment, JSX, useEffect } from "react";
import { Control, useController, useForm } from "react-hook-form";
import { FormItemProps } from "antd-mobile";
import { Wrapper } from "./styled";
import { map, reduce } from "lodash";
import { ContentItem } from "../../../api/data";
import ContentItemTemplate from "../ContentItemTemplate";


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
          contentItem={contentItem}
          control={subForm.control}
          pathAllItems='contentItems'
          pathLink={`contentItems.${contentItem.key}`}
          //@ts-ignore
          addChanges={() => console.log('s1')}
        />
      </Fragment>
    })}
  </Wrapper>
};


export default ContainerItem;