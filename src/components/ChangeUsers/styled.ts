import { Form, Tabs } from "antd-mobile";
import styled from "styled-components";



const Wrapper = styled(Form.Item)`
  .adm-list-item{
    padding-left: 0px;
  }
`;

const TabsStyled = styled(Tabs)`
    //height: calc(100% - 38px);
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .adm-tabs-content{ 
      overflow: hidden;
      display: flex !important;
      flex-direction: column;
      padding: 0px;
      .adm-list{
        flex: 1;
        overflow: hidden;
        .adm-list-body{
          overflow: hidden;
          height: 100%;
          .adm-list-body-inner{
            overflow: auto;
            height: 100%;
          }
        }
      }
    }
`;

export {
  Wrapper,
  TabsStyled
}