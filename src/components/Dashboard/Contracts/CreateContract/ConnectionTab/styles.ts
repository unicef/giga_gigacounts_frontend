import styled from 'styled-components/macro'

export const ConnectionContainer = styled.div`
  display: flex;
  gap: 54px;
  width: 100%;
  height: 100%;
`

export const ISPContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  align-items: flex-start;
  align-content: flex-start;
  height: 100%;
  gap: 44px;
`

export const ISPHeader = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }

  span {
    margin-top: -8px;
    margin-left: -12px;
  }

  h5 {
    color: var(--color-dark-blue);
  }

  small {
    color: var(--color-darkest-grey);
  }
`

export const QualityContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  align-items: flex-start;
  align-content: flex-start;
  height: 100%;
  gap: 15px;
`

export const QualityHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`

export const QualityHeaderTitle = styled.h5`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150.5%;
  letter-spacing: 0.018em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
  padding-bottom: 16px;
`

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 35px;
`
