import { JSX, useMemo } from "react";
import { DocumentRelation } from "../../api/data";
import { Button, Ellipsis, Image, Space } from "antd-mobile";
import { getDocIcon, parseDate } from "../../utils";
import { DeleteOutline } from "antd-mobile-icons";
import dayjs from "dayjs";


type DocRelationViewProps = {
  docRelation: DocumentRelation,
  remove?: () => void
}

const DocRelationView = ({ docRelation, remove }: DocRelationViewProps): JSX.Element => {

  const title = useMemo(() => {
    if (docRelation?.doc2Number && docRelation?.doc2Number !== null) {
      return `${docRelation?.doc2Number}${parseDate(docRelation?.doc2RegDate) ? dayjs(parseDate(docRelation?.doc2RegDate)).format(' від DD.MM.YYYY') : ''}`;
    }
    return `${docRelation?.doc2SystemNumber}${parseDate(docRelation?.createDoc2Date) ? dayjs(parseDate(docRelation?.createDoc2Date)).format(' від DD.MM.YYYY') : ''}`
  }, [docRelation]);

  return <div style={{ position: 'relative' }}>
    <Space
      align={'center'}
      justify={'center'}
    >
      <Image
        src={getDocIcon(docRelation.doc2Icon)}
        width={28}
        height={28}
      />
      <Space direction={'vertical'}
        style={{
          '--gap': '4px'
        }}
      >
        <Ellipsis content={title} />
        <Ellipsis
          content={docRelation.doc2Name}
          style={{
            fontSize: 14
          }}
        />
      </Space>
    </Space>
    {remove && <Button
      fill={'none'}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        remove();
      }}
      style={{
        position: 'absolute',
        top: '0%',
        right: 0,
        transform: 'translate(100%, -50%)'
      }}
    >
      <DeleteOutline />
    </Button>}
  </div>
};

export default DocRelationView;