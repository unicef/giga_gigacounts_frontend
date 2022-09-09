import styled from 'styled-components/macro'

export const CopyButtonWrapper = styled.div`
  display: inline-block;
  white-space: nowrap;
  flex: 0 0 auto;
  position: relative;

  & > .tooltiptext {
    max-width: 150px;

    padding: 2px 8px 3px;
    border-radius: 4px;

    font-weight: 400;
    font-size: 12px;
    line-height: 148%;
    letter-spacing: 0.03em;

    background-color: var(--color-dark-blue);
    color: var(--color-white);

    box-shadow: -4px 6px 20px rgba(23, 78, 145, 0.2);

    position: absolute;
    z-index: 1;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
  }
`

export const StyledButton = styled.button`
  background-color: transparent;
  color: var(--color-dark-grey);
  text-transform: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  font-family: 'Open Sans';
`
