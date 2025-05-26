import { Ellipsis, Image, List, ListItemProps, Space } from "antd-mobile";
import { JSX, useMemo } from "react";
import { GroupSelector, UserOrGroup, UserOrGroupType } from "../../api/data/";
import useAppStore from "../../store/useAppStore";
import { useShallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import Selector from "../Selector";

type UserViewProps = {
  user: UserOrGroup,
  enableGroupSettings?: boolean,
  onUpdateElement?: (userOrGroup: UserOrGroup) => void,
} & ListItemProps

const UserView = ({ user, enableGroupSettings = false, onUpdateElement, ...props }: UserViewProps): JSX.Element => {

  const avatarUrl = useAppStore(useShallow((state) => state.avatarUrl));

  const { t } = useTranslation();

  const { title, subTitle } = useMemo(() => {
    let title = '';
    let subTitle = '';
    switch (user.type) {
      case UserOrGroupType.GROUP:
        title = user?.nameGroup;
        subTitle = user?.descriptionGroup;
        break;

      default:
        if (user?.userLastName) {
          title = title + ' ' + user?.userLastName;
        }
        if (user?.userFirstName) {
          title = title + ' ' + user?.userFirstName;
        }
        if (user?.userMiddleName) {
          title = title + ' ' + user?.userMiddleName;
        }
        subTitle = user?.position;
        break;
    };
    return {
      title,
      subTitle
    };
  }, [user]);

  return <List.Item
    prefix={
      <Image
        src={`${avatarUrl}/avatar?id=${user?.avatarUrl}&size=180`}
        style={{ borderRadius: 16 }}
        fit='cover'
        width={32}
        height={32}
      />
    }
    description={<Space direction={'vertical'}>
      {subTitle === '' ? <span>&nbsp;</span> : subTitle}
      {user?.type === UserOrGroupType.GROUP && enableGroupSettings ? <Selector
        value={user.groupSelector}
        options={['ALL', 'MAX_FREE', 'LAST_EXEC', 'ANY'].map(item => ({
          label: t(`GroupSelector.${item}`),
          value: GroupSelector[item]
        }))}
        //@ts-ignore
        onChange={(value) => onUpdateElement && onUpdateElement({
          ...user,
          groupSelector: value
        })}
      >
        <Ellipsis style={{ color: 'blue' }} content={t(`GroupSelector.${GroupSelector[user.groupSelector]}`)} />
      </Selector> : ''}
    </Space>}
    {...props}
  >
    <Ellipsis content={title} />
  </List.Item>
};

export default UserView;
