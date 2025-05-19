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
  .adm-form-item-child-inner{
    display: flex;
    align-items: center;
    .inputUrl{
      margin-right: 4px;
      padding: 4px;
    }
  }
`;

export {
  Wrapper
}