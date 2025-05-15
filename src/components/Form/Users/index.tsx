import { JSX, useState } from "react";
import { UserOrGroup } from "../../../api/data/";
import { map } from "lodash";
import UserView from "../../UserView";
import { Control, useController } from "react-hook-form";
import { Wrapper } from "./styled";
import { Button, FormItemProps } from "antd-mobile";
import ChangeUsers, { ChangeUsersProperties } from "../../ChangeUsers";

type UsersProps = {
  label?: string,
  defaultValue?: UserOrGroup[],
  name: string,
  control: Control<any>,
  multiple?: boolean,
  formItemProps?: FormItemProps,
  disabled?: boolean,
  changeProps: ChangeUsersProperties
}

const Users = ({ label, name, control, defaultValue = [], disabled = false, formItemProps = {}, changeProps }: UsersProps): JSX.Element => {
  const { field: { value, onChange } } = useController({
    name,
    control,
    defaultValue
  });

  const [visible, setVisible] = useState(false);

  return <Wrapper
    label={<>
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
  >
    {map(value, (user) => <UserView user={user} key={user?.id} />)}
    {!disabled && <Button block onClick={() => setVisible(true)}>Додати користувача</Button>}
    {visible && <ChangeUsers
      visible={visible}
      onHide={setVisible}
      onSave={(users: UserOrGroup[]) => {
        setVisible(false);
        onChange(users);
      }}
      //@ts-ignore
      changeProps={changeProps ? {
        ...changeProps,
        selected: value,
      } : {}}
    />}

  </Wrapper>
};

export default Users;
