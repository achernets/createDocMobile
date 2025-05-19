import { Form } from "antd-mobile";
import styled from "styled-components";


const Wrapper = styled(Form.Item)`
  &.error_item{
    .adm-checkbox-content{
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