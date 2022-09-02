import styled from 'styled-components/macro'

export const TabContainer = styled.div<{ selected: boolean }>`
  button {
    height: 68px;
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
      color: 'var(--color-dark-blue)',
    }};
`
export const WidgetInfo = styled.div`
  grid-area: info;
  display: flex;
  align-items: center;
  gap: 12px;
`
export const WidgetMetric = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  color: var(--color-darker-grey);
  ${({ selected }) =>
    selected && {
      color: 'var(--color-darkest-blue)',
    }};
`
export const WidgetChart = styled.div`
  grid-area: chart;
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & > small {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: auto;
    color: var(--color-blue);

    b {
      position: relative;
      top: 12px;
    }
  }
`
