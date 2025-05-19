import { Form, Tabs } from "antd-mobile";
import styled from "styled-components";



const Wrapper = styled(Form.Item)`
  &.error_item{
    .adm-form-item-label{
      color: red;    
    }
  }
  .adm-list-item{
    padding-left: 0px;
  }
`;

const TabsStyled = styled(Tabs)`
  .adm-tabs-content{
    padding: 0px;
  }
`;

export {
  Wrapper,
  TabsStyled
}