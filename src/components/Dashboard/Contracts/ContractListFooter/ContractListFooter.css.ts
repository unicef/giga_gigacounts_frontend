import styled from 'styled-components';
import { Button } from '../../../common/Button/Button';
import icons from '../../../../style/icons';

export const ContractListFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 16px 16px;
  gap: 10px;
  position: absolute;
  height: 58px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(229, 239, 255, 0.6);
  backdrop-filter: blur(25px);
  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`;

export const ContractListButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 16px 16px;
  gap: 10px;
  position: absolute;
  height: 58px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(229, 239, 255, 0.6);
  backdrop-filter: blur(25px);
  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`;

export const ContractButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  gap: 4px;
  width: 288px;
  height: 32px;
  border-radius: 2px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  background: none;

  &:hover {
    background-color: var(--color-white);
  }

  span {
    height: 14px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.012em;
    text-transform: uppercase;
    color: var(--color-dark-blue);
    flex: none;
    order: 1;
    flex-grow: 0;
  }
`;

export const StyledIcon = styled.img`
  mask: url(${icons.plus}) no-repeat center;
  width: 13.5px;
  height: 13.5px;
  left: 5px;
  top: 5px;
  background: var(--color-dark-blue);
`;
