import { Form, List } from "antd-mobile";
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

const ListStyled = styled(List)`
  height: 100%;
  display: flex;
  flex-direction: column;
  .adm-list-body{
    overflow: auto;
  }
  .adm-list-body, .adm-list-body-inner{
    height: 100%;
  }
`;

const ItemFullStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export {
  Wrapper,
  ListStyled,
  ItemFullStyled
}