import { JSX } from 'react';
import { Button, Space } from 'antd-mobile'
import { DocumentPatternServiceClient, UserManagementServiceClient } from '../../api';
import useAppStore from '../../store/useAppStore';
import { useShallow } from 'zustand/shallow';
import { KazFilter } from '../../api/data/KazFilter';
import ActionSheetAsyncSelect from '../Form/ActionSheetAsyncSelect';
import { FilterCondition, FilterFieldType, FilterItem } from '../../api/data/';
import { compact } from 'lodash';
import { FormStyled } from './styled';


const Step1 = (): JSX.Element => {
  const { token, clientInfo, account, groupPattern, pattern } = useAppStore(useShallow((state) => ({
    account: state.account,
    groupPattern: state.groupPattern,
    pattern: state.pattern,
    token: state.token,
    clientInfo: state.clientInfo
  })));

  return (<>
    <FormStyled
      name='form'
      footer={<Space
        justify={'between'}
        block
      >
        <Button style={{ minWidth: 100 }} size='large'>
          Відмінити
        </Button>
        <Button style={{ minWidth: 100 }}
          color='primary'
          size='large'
          disabled={pattern === null}
          onClick={() => useAppStore.setState({
            step: 'CREATE_DOC'
          })}
        >
          Готово
        </Button>
      </Space>}
    >
      <ActionSheetAsyncSelect
        label={'Акаунт'}
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
        label={'Группа'}
        queryKey={['getAllDocumentPatternGroups', account?.id || '']}
        filter={new KazFilter({
          position: 0,
          countFilter: 25,
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
              value: clientInfo?.scMask,
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
        label={'Тип документа'}
        disabled={groupPattern === null}
        queryKey={['getAllDocumentPatterns', account?.id || '', groupPattern?.id || '']}
        filter={new KazFilter({
          position: 0,
          countFilter: 25,
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