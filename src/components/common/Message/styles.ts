import styled from 'styled-components/macro'
import { MessageType } from './Message'

export const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2px;
  flex-direction: column;
  color: var(--color-white);
  padding: 8px 6px 12px 12px;
  border-radius: 2px;
  animation: roll 0.3s ease-out;

  ${({ color }) => {
    switch (color) {
      case MessageType.NOTICE:
        return 'background-color: var(--color-light-blue); '
      case MessageType.WARNING:
        return 'background-color: var(--color-orange)'
      case MessageType.ERROR:
        return 'background-color: var(--color-red)'
      default:
        return 'background-color: var(--color-white)'
    }
  }};

  & div {
    display: flex;
    gap: 4px;

    p {
      margin-top: 1px;
    }

    .icon {
      cursor: pointer;
    }
  }

  & p,
  small {
    width: 100%;
  }
`
