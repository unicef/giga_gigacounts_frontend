import styled from 'styled-components';

export const ContractGuideContainer = styled.div`
  h5 {
    color: var(--color-light-blue);
  }

  display: grid;
  gap: 24px 54px;
  background: var(--color-white);
  margin: auto;
  height: 100%;
  width: 30%;
`;

export const ContractGuideItem = styled.div`
  span {
    grid-area: icon;
    margin: 0 auto;
  }
  .completed {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border: 3.2px solid var(--color-black-10);
    border-radius: 42px;
  }
  p > b {
    grid-area: title;
    color: var(--color-darker-grey);
  }
  div {
    grid-area: description;
    color: var(--color-mid-grey);
  }

  button {
    margin-top: 12px;
    grid-area: button;
    width: fit-content;
  }

  display: grid;
  gap: 3px 16px;
  grid-template-columns: 42px auto;
  grid-template-areas:
    'icon title'
    'icon description'
    'icon button';
`;