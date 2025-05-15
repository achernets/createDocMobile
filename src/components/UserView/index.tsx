import { Ellipsis, Image, List, ListItemProps } from "antd-mobile";
import { JSX, useMemo } from "react";
import { UserOrGroup, UserOrGroupType } from "../../api/data/";
import useAppStore from "../../store/useAppStore";
import { useShallow } from "zustand/shallow";

type UserViewProps = {
  user: UserOrGroup
} & ListItemProps

const UserView = ({ user, ...props }: UserViewProps): JSX.Element => {

  const avatarUrl = useAppStore(useShallow((state) => state.avatarUrl));

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
    description={subTitle === '' ? <span>&nbsp;</span> : subTitle}
    {...props}
  >
    <Ellipsis content={title} />
  </List.Item>
};

export default UserView;
