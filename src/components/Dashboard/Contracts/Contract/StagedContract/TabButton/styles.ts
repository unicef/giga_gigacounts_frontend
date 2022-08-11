import styled from 'styled-components/macro'

export const TabContainer = styled.div<{ selected: boolean }>`
  button {
    height: auto;
    display: grid;
    grid-template-columns: auto min-content;
    grid-template-rows: auto;
    grid-template-areas:
      'title chart'
      'info chart';
    gap: 4px 16px;
    padding: 8px 16px;
    border: 2px solid var(--color-black-10);
    border-radius: 2px;
    background-color: var(--color-white);
    cursor: pointer;

    ${({ selected }) =>
      selected && {
        border: '2px solid var(--color-light-blue)',
      }};
  }
`

export const WidgetTitle = styled.div<{ selected: boolean }>`
  grid-area: title;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-mid-grey);
  ${({ selected }) =>
    selected && {
      color: 'var(--color-light-blue)',
    }};
`
export const WidgetInfo = styled.div`
  grid-area: info;
  display: flex;
  align-items: center;
  gap: 12px;
`
export const WidgetMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-darker-grey);
`
export const WidgetChart = styled.div`
  grid-area: chart;
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > small {
    width: 100%;
    height: 100%;
    margin: auto;
    color: var(--color-blue);
  }
`
export const Dates = styled.div`
  display: grid;
  grid-template-columns: min-content 72px auto;
  gap: 6px;
  padding-left: 8px;

  & > p {
    color: var(--color-darkest-grey);
  }

  & > p > b {
    color: var(--color-blue);
  }
`
