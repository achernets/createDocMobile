import { Form, Tabs } from "antd-mobile";
import styled from "styled-components";



const Wrapper = styled(Form.Item)`
  .adm-list-item{
    padding-left: 0px;
  }
`;

const TabsStyled = styled(Tabs)`
  .adm-tabs-content{
    padding: 0px 16px;
  }
`;

export {
  Wrapper,
  TabsStyled
}