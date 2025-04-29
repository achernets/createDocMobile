import { JSX, useState } from "react";
import { UserOrGroup } from "../../../api/data/";
import { map } from "lodash";
import UserView from "../../UserView";
import { Control, useController } from "react-hook-form";
import { Wrapper } from "./styled";
import { Button } from "antd-mobile";
import ChangeUsers, { ChangeUsersProperties } from "../../ChangeUsers";

type UsersProps = {
  label?: string,
  defaultValue?: UserOrGroup[],
  name: string,
  control: Control<any>,
  multiple?: boolean,
  disabled?: boolean,
  changeProps: ChangeUsersProperties
}

const Users = ({ label, name, control, defaultValue = [], disabled = false, multiple = false, changeProps }: UsersProps): JSX.Element => {
  const { field: { value } } = useController({
    name,
    control,
    defaultValue
  });

  const [visible, setVisible] = useState(false);

  return <Wrapper
    label={label}
  >
    {map(value, (user) => <UserView user={user} key={user?.id} />)}
    {!disabled && <Button block onClick={() => setVisible(true)}>Додати користувача</Button>}
    {visible && <ChangeUsers
      visible={visible}
      onHide={setVisible}
      //@ts-ignore
      changeProps={changeProps ? changeProps : {}}
    />}

  </Wrapper>
};

export default Users;
