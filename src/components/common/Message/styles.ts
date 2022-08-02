import styled from 'styled-components/macro'
import { MessageType } from './Message'

export const MessageContainer = styled.div<{ color: string }>`
  width: 100%;
  display: flex;
  gap: 2px;
  flex-direction: column;
  color: var(--color-white);
  background-color: ${(props) => props.color};
  padding: 8px 6px 12px 12px;
  border-radius: 2px;
  animation: roll 0.3s ease-out;
  ${(props) =>
    props.color === MessageType.NOTICE
      ? 'var(--color-light-blue)'
      : props.color === MessageType.WARNING
      ? 'var(--color-orange)'
      : 'var(--color-red)'}

  & div {
    display: flex;
    gap: 4px;

    p {
      margin-top: 1px;
    }
  }

  & p,
  small {
    width: 100%;
  }
`
