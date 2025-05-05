import { Form } from "antd-mobile";
import styled from "styled-components";


const Wrapper = styled(Form.Item)`
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