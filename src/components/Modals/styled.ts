import { Modal } from "antd-mobile";
import styled, { css } from "styled-components";



const ModalStyled = styled(Modal)`
  --adm-modal-max-width: 98vw;
  .adm-center-popup-wrap{
    width: 100%;
  }
  .adm-modal-content{
    ${({ disableBodyScroll }) => disableBodyScroll && css`
      overflow-y: hidden;
      display: flex;
    `}
  }
  &.full_screen{
    --max-width: 99vw;
    .adm-modal-body{
      max-height: 99vh;
      height: 90vh;
    }
  }
`;

export {
  ModalStyled
};