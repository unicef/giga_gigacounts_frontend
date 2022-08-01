import styled from 'styled-components/macro'

export const SchoolTabContainer = styled.div`
  display: flex;
  flex-direction: row;

  & > div:first-child {
    width: 100%;
  }
`

export const SchoolsTabRow = styled.div<{ active: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  background-color: ${(props) => (props.active ? 'var(--color-lightest-blue)' : 'var(--color-white)')};

  :nth-child(even) {
    background-color: ${(props) => (props.active ? 'var(--color-lightest-blue)' : 'var(--color-lightest-grey)')};
  }

  .school {
    width: 100%;
    display: grid;
    grid-template-columns: min-content auto 70px 140px 70px min-content;
    align-items: center;
    padding: 9px 14px;
    gap: 0 6px;
  }
`
