import { JSX } from "react";
import { Button, Ellipsis, Popup, Tabs } from "antd-mobile";
import { CloseOutline, LeftOutline } from "antd-mobile-icons";
import { TabsStyled } from "./styled";

type ChangeUsersProps = {
  visible: boolean,
  onHide: (visible: boolean) => void
}

const ChangeUsers = ({ visible, onHide }: ChangeUsersProps): JSX.Element => {


  return <Popup
    position='right'
    visible={visible}
    onClose={() => {
      onHide(false)
    }}
    bodyStyle={{
      width: '100%',
      height: '100%'
    }}
  >
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto'
    }}>

      <Button
        style={{
          gridColumn: 1,
          alignSelf: 'start'
        }}
        onClick={() => onHide(false)}
        fill={'none'}
        shape={'rounded'}>
        <LeftOutline />
      </Button>
      <Ellipsis style={{
        gridColumn: 2,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: '24px',
        fontWeight: 600
      }}
        content="Редагувати користувачів/групи"
      />
      <Button style={{
        gridColumn: 3,
        alignSelf: 'end'
      }}
        onClick={() => onHide(false)}
        fill={'none'}
        shape={'rounded'}
      >
        <CloseOutline />
      </Button>
    </div>
    <TabsStyled>
      <Tabs.Tab
        title='Додати'
        key={'info'}
      >
        123
      </Tabs.Tab>
      <Tabs.Tab
        title='Видалити'
        key={'info1'}
      >
        123
      </Tabs.Tab>
    </TabsStyled>
  </Popup>
};

export default ChangeUsers;
