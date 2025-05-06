import { Fragment, JSX } from "react";
import { Control, useWatch } from "react-hook-form";
import { ContentHolder, ContentHolderLink } from "../../../api/data";
import { Ellipsis } from "antd-mobile";
import { map, reduce } from "lodash";
import ContentItemTemplate from "../ContentItemTemplate";


type HolderProps = {
  holder: ContentHolder,
  name: string,
  control: Control<any>,
  withName?: boolean,
  setChanges: (newValue: []) => void
};

const Holder = ({ name, control, holder, withName = true, setChanges }: HolderProps): JSX.Element => {

  const visibles = useWatch({
    control: control,
    name: reduce(holder.contentHolderLink, (hash, _, idx) => {
      hash.push(`${name}.contentHolderLink.${idx}.visible`);
      return hash;
    }, [])
  });

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
          {visibles[index] && <ContentItemTemplate
            contentItem={contentHolderLink.contentItem}
            control={control}
            pathAllItems="contentItems"
            pathLink={`${name}.contentHolderLink.${index}`}
            //@ts-ignore
            addChanges={() => setChanges(prev=>[
              ...prev,
              {
                holderPath: name,
                pathItem: `${name}.contentHolderLink.${index}`,
                item: contentHolderLink
              }
            ])}
          />}
        </Fragment>
      })}
    </div>
  </div>
};


export default Holder;