import { Form } from "antd-mobile";
import styled from "styled-components";
import { CalendarOutline, ClockCircleOutline } from 'antd-mobile-icons'


const Wrapper = styled(Form.Item)`
  &.error_item{
    .adm-form-item-label{
      color: red;    
    }
  }
  .adm-list-item-content{
    border-bottom: var(--border-inner);
    .adm-list-item-content-arrow{
      align-self: flex-end;
      margin-bottom: 12px;    
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CalendarOutlineStyled = styled(CalendarOutline)`
    flex: none;
    cursor: pointer;
    svg {
      display: block;
      font-size: var(--adm-font-size-7);
    }
`;

const ClockCircleOutlineStyled = styled(ClockCircleOutline)`
  flex: none;
  cursor: pointer;
  svg {
    display: block;
    font-size: var(--adm-font-size-7);
  }
`;

export {
  Wrapper,
  InputWrapper,
  CalendarOutlineStyled,
  ClockCircleOutlineStyled
}