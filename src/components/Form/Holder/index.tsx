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
  setChanges: (newValue: []) => void,
  patternId: string
};

const Holder = ({ name, control, holder, withName = true, setChanges, patternId }: HolderProps): JSX.Element => {

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
    padding: "8px 0px",
    flexDirection: "column",
  }}>
    {withName && <Ellipsis style={{
      fontWeight: 500
    }} content={holder.oName} />}
    <div style={{
      display: "flex",
      gap: "8px",
      flexDirection: "column",
    }}>
      {map(holder.contentHolderLink, (contentHolderLink: ContentHolderLink, index: number) => {
        return <Fragment key={contentHolderLink.id}>
          {visibles[index] && <ContentItemTemplate
            contentItemKey={contentHolderLink.contentItem?.key}
            control={control}
            pathAllItems="contentItems"
            pathLink={`${name}.contentHolderLink.${index}`}
            //@ts-ignore
            addChanges={() => setChanges(prev => [
              ...prev,
              {
                holderPath: name,
                pathItem: `${name}.contentHolderLink.${index}`,
                item: contentHolderLink
              }
            ])}
            patternId={patternId}
          />}
        </Fragment>
      })}
    </div>
  </div>
};


export default Holder;