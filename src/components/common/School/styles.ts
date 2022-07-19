import styled from 'styled-components/macro'

export const SchoolContainer = styled.div`
    width: 100%;
    height: 38px;
    display: flex;
    align-items: center;
    padding: 9px 14px;
    gap: 0 16px;
    white-space: nowrap;
    background-color: var(--color-white);
  }
  .school-name {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-darkest-grey);
  }
  .school-id {
    text-align: right;
    color: var(--color-darker-grey)
  }
  .school-region {
    width: 210px;
    color: var(--color-darker-grey)
  }

`