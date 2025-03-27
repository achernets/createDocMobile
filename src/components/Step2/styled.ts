import { Form, Tabs } from "antd-mobile";
import styled from "styled-components";



const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  .adm-list{
    flex: 1;
  }
  .adm-list-body-inner{
    padding: 16px;
  }
`;

const TabsStyled = styled(Tabs)`
  .adm-tabs-content{
    padding: 0px;
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