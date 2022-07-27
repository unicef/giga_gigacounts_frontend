import styled from 'styled-components/macro'

export const MessageContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 2px;
    flex-direction: column;
    color: var(--color-white);
    background-color: ${props => props.color};
    padding: 8px 6px 12px 12px;
    border-radius: 2px;
    animation: roll .3s ease-out;

    & div {
      display: flex;
      gap: 4px;

      p {
        margin-top: 1px;
      }
    }

    & p, small {
      width: 100%;
    }
  }
`