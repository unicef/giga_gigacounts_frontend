import styled from 'styled-components/macro'

export const ConnectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  flex-direction: row;
  width: 70%;
  gap: 16px;
`

export const ISPHeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 8px;
`

export const ISPHeaderTitle = styled.h5`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150.5%;
  letter-spacing: 0.018em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
`

export const ISPHeaderText = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 148%;
  letter-spacing: 0.018em;
  color: var(--color-darkest-grey);
`

export const ISPIcon = styled.div`
  width: 60px;
  height: 66px;
`

export const ISPDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: flex-start;
`

export const ISPDropdown = styled.div`
  width: 100%;
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
