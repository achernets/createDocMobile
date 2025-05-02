import { Fragment, JSX, useCallback } from "react";
import { Control, useWatch } from "react-hook-form";
import { ContentHolder, ContentHolderLink, ContentItemType } from "../../../api/data";
import { Ellipsis } from "antd-mobile";
import { map, reduce } from "lodash";
import TextArea from "../TextArea";
import Checkbox from "../Checkbox";
import Input from "../Input";


type HolderProps = {
  holder: ContentHolder,
  name: string,
  control: Control<any>,
  withName?: boolean
};

const Holder = ({ name, control, holder, withName = true }: HolderProps): JSX.Element => {

  const requareds = useWatch({
    control: control,
    name: reduce(holder.contentHolderLink, (hash, _, idx) => {
      hash.push(`${name}.contentHolderLink.${idx}.requared`);
      return hash;
    }, [])
  });

  const visibles = useWatch({
    control: control,
    name: reduce(holder.contentHolderLink, (hash, _, idx) => {
      hash.push(`${name}.contentHolderLink.${idx}.visible`);
      return hash;
    }, [])
  });

  const readOnlys = useWatch({
    control: control,
    name: reduce(holder.contentHolderLink, (hash, _, idx) => {
      hash.push(`${name}.contentHolderLink.${idx}.readOnly`);
      return hash;
    }, [])
  });

  const renderItem = useCallback((item: ContentHolderLink, index: number) => {
    switch (item.contentItem.type) {
      case ContentItemType.TEXT_FIELD:
        return <Input
          label={item.contentItem.oName}
          name={`contentItems.${item.contentItem.key}.value.strValue`}
          control={control}
          placeholder="Ввести"
          readOnly={readOnlys[index]}
          formItemProps={{
            required: requareds[index]
          }}
        />;
      case ContentItemType.MULTILINE_TEXT_FIELD:
        return <TextArea
          label={item.contentItem.oName}
          name={`contentItems.${item.contentItem.key}.value.strValue`}
          control={control}
          showCount
          maxLength={2000}
          placeholder="Ввести"
          readOnly={readOnlys[index]}
          formItemProps={{
            required: requareds[index]
          }}
        />;
      case ContentItemType.CHECKBOX:
        return <Checkbox
          label={item.contentItem.oName}
          name={`contentItems.${item.contentItem.key}.value.strValue`}
          control={control}
          isString={true}
          disabled={readOnlys[index]}
          formItemProps={{
            required: requareds[index]
          }}
        />

      default:
        return <div>{item.contentItem.oName}</div>;
    }
  }, [name, readOnlys, requareds]);

  return <div style={{
    display: "flex",
    gap: "8px",
    padding: "8px",
    flexDirection: "column",
  }}>
    {withName && <Ellipsis content={holder.oName} />}
    <div style={{
      display: "flex",
      gap: "8px",
      padding: "8px",
      flexDirection: "column",
    }}>
      {map(holder.contentHolderLink, (contentHolderLink: ContentHolderLink, index: number) => {
        return <Fragment key={contentHolderLink.id}>
          {visibles[index] && <div>
            {renderItem(contentHolderLink, index)}
          </div>}
        </Fragment>
      })}
    </div>
  </div>
};


export default Holder;