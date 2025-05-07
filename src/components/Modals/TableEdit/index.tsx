import { Button, Grid } from 'antd-mobile';
import { ModalTableEdit, useModalStore } from '../../../store/useModals';
import { useCallback, useMemo, useState } from 'react';
import { ModalStyled } from '../styled';;
import { cloneDeep, compact, filter, findIndex, get, groupBy, map, maxBy, orderBy, reject, values } from 'lodash';
import { getHBValue, parseNumber } from '../../../utils';
import { AddCircleOutline, DeleteOutline, EditSOutline } from 'antd-mobile-icons';
import { ContentItem, ContentTableDefinition } from '../../../api/data';
import { useShallow } from 'zustand/shallow';

const cellStyle: React.CSSProperties = {
  minWidth: 50,
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: '8px',
  border: '1px solid #e0e0e0',
  textAlign: 'center',
  boxSizing: 'border-box',
}

const TableEditModal = ({ id, params: { cb, contentItem = new ContentItem({
  tableDefenition: new ContentTableDefinition({
    columnDefenition: []
  })
}), disabled = false } }: Omit<ModalTableEdit, 'key'>) => {

  const { closeModalById, openModal } = useModalStore(useShallow((state) => ({
    closeModalById: state.closeModalById,
    openModal: state.openModal
  })));

  const [items, setItems] = useState<ContentItem[]>(contentItem.childItems || []);
  const [removeItems, setRemoveItems] = useState<string[]>(contentItem.tableChildContentsToRemove || []);

  const onClose = useCallback(() => {
    closeModalById(id);
  }, [id]);

  const onSuccess = useCallback(() => {
    onClose();
    if (cb) cb(items, removeItems);
  }, [cb, onClose, items, removeItems]);

  const onAddRow = useCallback(() => {
    const rowNumber = parseNumber(get(maxBy(items, 'rowNumber'), 'rowNumber', -1)) + 1;
    openModal('ADD_EDIT_ROW_TABLE', {
      items: map(contentItem?.tableDefenition?.columnDefenition, item => new ContentItem(cloneDeep({
        ...item,
        originalKey: item.key,
        id: null,
        rowNumber: rowNumber
      }))),
      cb: (itms) => setItems(prev => [...prev, ...itms])
    })
  }, [contentItem, items, openModal]);

  const onEditRow = useCallback((record: ContentItem) => {
    openModal('ADD_EDIT_ROW_TABLE', {
      items: map(filter(items, { rowNumber: record?.rowNumber }), item => new ContentItem(cloneDeep(item))),
      cb: (itms) => {
        const s = [...items];
        s.splice(findIndex(items, ['rowNumber', record?.rowNumber]), itms?.length, ...itms);
        setItems(s);
      }
    })
  }, [contentItem, items, openModal]);

  const onRemove = useCallback((record: ContentItem) => {
    const ids = compact(filter(items, { rowNumber: record?.rowNumber }).map(itm => itm.id));
    setItems(prev => reject(prev, { rowNumber: record?.rowNumber }));
    setRemoveItems(prev => [...prev, ...ids]);
  }, [items]);

  const columns = useMemo(() => {
    const { tableDefenition: { columnDefenition = [] }, } = contentItem;
    return compact([
      '№',
      ...orderBy(columnDefenition, [item => parseNumber(item.order), 'oName']).map(item => item.oName),
      !disabled ? <Button fill={'none'} onClick={onAddRow}>
        <AddCircleOutline />
      </Button> : null
    ])
  }, [contentItem, onAddRow, disabled]);

  const data = useMemo(() => {
    return values(groupBy(items, 'rowNumber'));
  }, [contentItem, items]);

  const columnCount = columns.length;

  return (
    <ModalStyled
      visible
      disableBodyScroll
      className='full_screen'
      header={<div style={{
        fontSize: 16,
        fontWeight: 600,
        lineHeight: '24px'
      }}>{contentItem?.oName}</div>}
      content={
        <div
          style={{
            paddingTop: 16,
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            overflowY: 'hidden',
            flex: 1
          }}
        >
          <div
            style={{
              minWidth: columnCount * 100,
              display: 'flex',
              maxHeight: '100%',
              flexDirection: 'column'
            }}
          >
            <Grid columns={columnCount} gap={0}>
              {columns.map((title, index) => (
                <div
                  key={index}
                  style={{
                    ...cellStyle,
                    fontWeight: 'bold',
                    background: '#f5f5f5',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1
                  }}
                >
                  {title}
                </div>
              ))}
            </Grid>
            <div style={{ maxHeight: 'calc(100% - 39px)', overflowY: 'auto' }}>
              {data.map((row: ContentItem[], rowIndex: number) => (
                <Grid columns={columnCount} gap={0} key={rowIndex}>
                  <div key={`#${rowIndex}`} style={cellStyle} title={String(rowIndex + 1)}>
                    {rowIndex + 1}
                  </div>
                  {row.map((cell: ContentItem, cellIndex: number) => (
                    <div key={cellIndex} style={cellStyle} title={cell.key}>
                      {cell?.value?.strValue}
                      {getHBValue(cell?.value?.hbValue?.row?.values?.get(cell?.value?.hbValue?.column?.id), true)}
                    </div>
                  ))}
                  {!disabled && <div key={`a${rowIndex}`} style={cellStyle} title={String(rowIndex + 1)}>
                    <Button fill={'none'} size={'small'} onClick={() => onEditRow(row[0])}>
                      <EditSOutline />
                    </Button>
                    <Button fill={'none'} size={'small'} onClick={() => onRemove(row[0])}>
                      <DeleteOutline />
                    </Button>
                  </div>}
                </Grid>
              ))}
            </div>
          </div>
        </div>
      }
      actions={[
        { key: 'success', text: 'Готово', primary: true, onClick: onSuccess },
        { key: 'cancel', text: 'Відмінити', onClick: onClose }
      ]}
      showCloseButton={true}
      destroyOnClose={true}
      closeOnMaskClick={true}
      onClose={() => closeModalById(id)}
    />
  );
};

export default TableEditModal;
