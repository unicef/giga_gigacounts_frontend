import styled from 'styled-components/macro'

export const ContractLoaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  background: linear-gradient(
    90deg,
    var(--color-lightest-blue),
    var(--color-lighter-blue),
    var(--color-lightest-blue),
    var(--color-lighter-blue),
    var(--color-lightest-blue)
  );
  background-size: 200%;

  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: Loader 1.5s ease-out infinite;

  @-webkit-keyframes Loader {
    0% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  @-moz-keyframes Loader {
    0% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  @keyframes Loader {
    0% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`

export const ContractLoaderItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 65px;
  grid-template-rows: 22px 18px;
  grid-template-areas:
    'header  icon'
    'description icon';
  gap: 0px;
  align-items: center;
  padding-left: 12px;

  p {
    grid-area: header;
  }

  small {
    grid-area: description;
  }

  div {
    grid-area: icon;
    margin: auto;
  }
`
