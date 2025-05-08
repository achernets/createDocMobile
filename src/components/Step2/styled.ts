import { Form, Tabs } from "antd-mobile";
import styled from "styled-components";



const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  overflow: hidden;
  .adm-list{
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .adm-list-body{
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .adm-list-body-inner{
    //padding: 16px;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
`;

const TabsStyled = styled(Tabs)`
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  display: flex;
  .adm-tabs-header{
    padding: 0px 16px;
  }
  .adm-tabs-content{
    padding: 0px 16px 16px 16px;
    overflow: auto;
    .adm-form-item{
      padding-left: 0px;
      .adm-list-item-content{
        border-top: 0px;
        .adm-list-item-content-main{
          //border-bottom: var(--border-inner);
        }
      }
    }
  }
`;

export {
  FormStyled,
  TabsStyled
}