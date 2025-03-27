import { Ellipsis, Image, List } from "antd-mobile";
import { JSX, useMemo } from "react";
import { UserOrGroup } from "../../api/data/core";

type UserViewProps = {
  user: UserOrGroup
};

const UserView = ({ user }: UserViewProps): JSX.Element => {

  const fio = useMemo(() => {
    let str = '';
    if (user?.userLastName) {
      str = str + ' ' + user?.userLastName;
    }
    if (user?.userFirstName) {
      str = str + ' ' + user?.userFirstName;
    }
    if (user?.userMiddleName) {
      str = str + ' ' +  user?.userMiddleName;
    }
    return str;
  }, [user]);

  return <List.Item
    prefix={
      <Image
        src={'https://s3-alpha-sig.figma.com/img/e63d/5200/4fd7822168fa9d32a040fc0e4d653cd8?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JGHjvfMKUF41Bx2uYcjlbIs7l0ITf86gs0OfmcKbKjQSwZVEHDBk~UZ1ung-L826Wp7fN0zovQgvkiDGJUm6NbL9la0cxxfqJ6PDQJTCcqQ~WqA6ohzEvJWYI6ZnoLkFc-0kzND6heeuqvs~27DKq8LI3M-PDt5e16tYkUCl63-XypJ1FePO1Ox1eRxQ8VvsHHOsjzBsn-Y6ZuM4AnF3ck~zTULLY3wrGWon570ZCCWNuHLivZ7OzdN5gdDBgxhJ2t5emAlsOZbojoOaXF3PmbjHvGJg1fRGEz370BbY1sJ5gaN-3QAhChBcuTwTobaQXyvDuiaQHW1N6s~EQ9undA__'}
        style={{ borderRadius: 16 }}
        fit='cover'
        width={32}
        height={32}
      />
    }
    description={user?.position}
  >
    <Ellipsis content={fio}/>
  </List.Item>
};

export default UserView;
