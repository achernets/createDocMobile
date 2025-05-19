import { JSX, useState } from "react";
import { UserOrGroup } from "../../../api/data/";
import { map } from "lodash";
import UserView from "../../UserView";
import { Control, useController } from "react-hook-form";
import { Wrapper } from "./styled";
import { Button, FormItemProps } from "antd-mobile";
import ChangeUsers, { ChangeUsersProperties } from "../../ChangeUsers";
import classNames from "classnames";

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
  const { field: { value, onChange }, fieldState: { error } } = useController({
    name,
    control,
    defaultValue
  });

  console.log(error, 'Users')
  const [visible, setVisible] = useState(false);

  return <Wrapper
    label={<>
      {label}
      {formItemProps?.required && <span className="adm-form-item-required-asterisk">*</span>}
    </>}
    className={classNames({ 'error_item': formItemProps?.required && error })}
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
