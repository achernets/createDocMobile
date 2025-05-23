import { JSX, useCallback } from 'react';
import { Button, Space, Toast } from 'antd-mobile'
import { DocumentPatternServiceClient, DocumentServiceClient, UserManagementServiceClient } from '../../api';
import useAppStore from '../../store/useAppStore';
import { useShallow } from 'zustand/shallow';
import { KazFilter } from '../../api/data/KazFilter';
import ActionSheetAsyncSelect from '../Form/ActionSheetAsyncSelect';
import { ADocument, AttachmentEditMode, AttachmentProcessingType, AttCreateInfo, ContentHolder, ContentItem, ContentItemType, ContentTableDefinition, DocPatternStageStatus, DocumentAccessPolicy, DocumentAccessPolicyType, FilterCondition, FilterFieldType, FilterItem } from '../../api/data/';
import { compact, filter, find, get, map, orderBy, pick, reduce, reverse, size, sortBy } from 'lodash';
import { FormStyled } from './styled';
import { useTranslation } from 'react-i18next';
import { sendMessageMobile } from '../../utils';

const Step1 = (): JSX.Element => {
  const { token, clientInfo, account, groupPattern, pattern } = useAppStore(useShallow((state) => ({
    account: state.account,
    groupPattern: state.groupPattern,
    pattern: state.pattern,
    token: state.token,
    clientInfo: state.clientInfo
  })));

  const { t } = useTranslation();

  const getData = useCallback(async () => {
    const toast = Toast.show({
      icon: 'loading',
      content: t('MobileCreateDoc.prepareDoc'),
      duration: 0
    });
    try {
      const result = await DocumentPatternServiceClient.getInfoForCreateDoc(
        token,
        pattern?.id,
        "",
        new DocumentAccessPolicy({
          type: DocumentAccessPolicyType.ACCESS,
        }),
      );

      const attachments = size(result.templates) > 0 ? await (DocumentServiceClient.createAttachmentFrom(token, '', '', new DocumentAccessPolicy({
        type: DocumentAccessPolicyType.ACCESS
      }), result.templates.map(template => new AttCreateInfo({
        attachmentTemplateId: template.id,
        fileName: template.oName,
        forDraft: true,
        editMode: AttachmentEditMode.MULTIPLE,
      })), AttachmentProcessingType.PROCESS)) : [];
      useAppStore.setState({
        docInfo: {
          author: [clientInfo],
          controlUsers: [],
          document: new ADocument({
            nameDocument: "",
            controlForDocument: false,
            documentDeadlineDate: -1,
          }),
          attachments: attachments,
          holders: orderBy(result.holders, ['order', 'oName']).map(holder => new ContentHolder({
            ...holder,
            contentHolderLink: orderBy(holder.contentHolderLink, ['order', 'oName'])
          })),
          contentItems: reduce(result.holders, (hash, holder) => {
            map(holder.contentHolderLink, itm => {
              hash[itm.contentItem.key] = new ContentItem({
                ...itm.contentItem,
                id: null,
                requared: hash[itm.contentItem.key]?.requared ? hash[itm.contentItem.key]?.requared : itm.contentItem.requared,
                tableDefenition: itm.contentItem.type === ContentItemType.TABLE ? new ContentTableDefinition({
                  ...itm.contentItem?.tableDefenition,
                  columnDefenition: orderBy(itm.contentItem?.tableDefenition?.columnDefenition, ['order', 'oName']).map(it => new ContentItem(it))
                }) : null,
                childItems: map(orderBy(itm.contentItem?.childItems, itm.contentItem.type === ContentItemType.TABLE ? ['rowNumber', 'order'] : ['order', 'oName']), ch => new ContentItem({ ...ch, id: null }))
              });
            })
            return hash;
          }, {}),
          stages: sortBy(reverse(filter(result.stages, { status: DocPatternStageStatus.IN_PROGRESS, hide: false })), ['orderNum']),
          formEdit: get(find(result.stages, { status: DocPatternStageStatus.CREATED }), 'fmEditKey', null),
          docRelations: [],
          ...pick(result, ['permissions', 'templates', 'scGrifs'])
        },
        step: 'CREATE_DOC'
      });
      toast.close();
    } catch (error) {
      console.log(error)
      toast.close();
      Toast.show({
        icon: 'fail',
        content: t('MobileCreateDoc.errorPrepareDoc'),
      })
    }
  }, [token, clientInfo, pattern]);

  return (<>
    <FormStyled
      name='form'
      footer={<Space
        justify={'between'}
        block
      >
        <Button style={{ minWidth: 100 }} size='large'
          onClick={() => sendMessageMobile('close', null)}
        >
          {t('MobileCreateDoc.cancel')}
        </Button>
        <Button style={{ minWidth: 100 }}
          color='primary'
          size='large'
          disabled={pattern === null}
          onClick={getData}
        >
          {t('MobileCreateDoc.ready')}
        </Button>
      </Space>}
    >
      <ActionSheetAsyncSelect
        label={t('MobileCreateDoc.account')}
        queryKey={['getAccounts']}
        filter={new KazFilter({
          position: 0,
          countFilter: 999
        })}
        queryFn={(filter) => UserManagementServiceClient.getAccounts(token, filter)}
        optionLabel='accountName'
        value={account}
        onChange={(val) => useAppStore.getState().setAccount(val)}
      />
      <ActionSheetAsyncSelect
        label={t('MobileCreateDoc.groupPattern')}
        queryKey={['getAllDocumentPatternGroups', account?.id || '']}
        filter={new KazFilter({
          position: 0,
          countFilter: 100,
          orders: ['order'],
          items: compact([
            new FilterItem({
              field: 'CREATE',
              value: clientInfo?.id,
              fType: FilterFieldType.STRING,
              condition: FilterCondition.EQUAL
            }),
            new FilterItem({
              field: 'checkScMaskAndValidState',
              value: null,
              fType: FilterFieldType.STRING,
              condition: FilterCondition.NULL
            }),
            account?.id ? new FilterItem({
              value: account?.id,
              field: 'accountId',
              fType: FilterFieldType.STRING,
              condition: FilterCondition.EQUAL
            }) : null
          ])
        })}
        queryFn={(filter: KazFilter) => DocumentPatternServiceClient.getAllDocumentPatternGroups(token, filter)}
        fieldSearch={'name'}
        optionLabel='nameDocPatGroup'
        value={groupPattern}
        onChange={(val) => {
          useAppStore.getState().setGroupPattern(val)
        }}
      />
      <ActionSheetAsyncSelect
        label={t('MobileCreateDoc.pattern')}
        disabled={groupPattern === null}
        queryKey={['getAllDocumentPatterns', account?.id || '', groupPattern?.id || '']}
        filter={new KazFilter({
          position: 0,
          countFilter: 100,
          orders: ['order'],
          items: compact([
            new FilterItem({
              field: 'CREATE',
              value: clientInfo?.id,
              fType: FilterFieldType.STRING,
              condition: FilterCondition.EQUAL
            }),
            new FilterItem({
              field: 'isValidState',
              value: 'true',
              fType: FilterFieldType.BOOLEAN,
              condition: FilterCondition.EQUAL
            }),
            new FilterItem({
              field: 'checkSC',
              value: clientInfo.scMask,
              fType: FilterFieldType.STRING,
              condition: FilterCondition.NULL
            }),
            account?.id ? new FilterItem({
              value: account?.id,
              field: 'accountId',
              fType: FilterFieldType.STRING,
              condition: FilterCondition.EQUAL
            }) : null,
            groupPattern?.id ? new FilterItem({
              value: groupPattern?.id,
              field: 'documentPatternGroupId',
              fType: FilterFieldType.STRING,
              condition: FilterCondition.EQUAL
            }) : null
          ])
        })}
        queryFn={(filter: KazFilter) => DocumentPatternServiceClient.getAllDocumentPatterns(token, filter, false)}
        fieldSearch={'nameDocPattern'}
        optionLabel='nameDocPattern'
        value={pattern}
        onChange={(val) => useAppStore.getState().setPattern(val)}
      />
    </FormStyled>
  </>);
};

export default Step1;