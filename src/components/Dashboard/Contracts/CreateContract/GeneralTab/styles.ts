import styled from 'styled-components/macro'

export const GeneralContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`
export const FormContainer = styled.div`
  flex-basis: 50%;
  flex-shrink: 0;
  padding-right: 54px;

  & form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  & .dropdown.currency {
    width: 100px;
  }

  & .dropdown.currency select {
    padding: 0 30px 0 12px;
  }
`

export const Country = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const DateStart = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  & input[type='date'] {
    width: 40%;
    max-width: 200px;
    min-width: 130px;
  }
`

export const DateEnd = styled(DateStart)``

export const AttachmentContainer = styled.div`
  flex-basis: 50%;
  flex-shrink: 0;
  flex-grow: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 32px;
`
export const Attachments = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & h5 {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150.5%;
    letter-spacing: 0.018em;
    text-transform: uppercase;
    color: var(--color-dark-blue);
  }

  & p {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 148%;
    letter-spacing: 0.018em;
    color: var(--color-darkest-grey);
  }
`

export const UploadFiles = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  input[type='file'] {
    display: none;
  }
`

export const CurrencySelector = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`

export const CurrencyType = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 16px;
  gap: 4px;
  background: #6fa6fe;
`
