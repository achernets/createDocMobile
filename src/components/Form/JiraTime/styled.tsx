import { Form } from "antd-mobile";
import styled from "styled-components";


const Wrapper = styled(Form.Item)`
  &.error_item{
    .adm-form-item-label{
      color: red;    
    }
  }
  .adm-list-item-content{
    border-bottom: var(--border-inner);
  }
`;

export {
  Wrapper
}