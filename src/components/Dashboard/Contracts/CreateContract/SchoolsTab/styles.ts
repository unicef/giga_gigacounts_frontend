import styled from 'styled-components/macro'

export const SchoolsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 50px;
  overflow: hidden;
`

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  align-items: flex-start;
  align-content: flex-start;
  height: 100%;
  gap: 20px;
`

export const UploadHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`

export const UploadHeaderTitle = styled.h5`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150.5%;
  letter-spacing: 0.018em;
  text-transform: uppercase;
  color: var(--color-dark-blue);
`

export const UploadHeaderText = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 148%;
  letter-spacing: 0.018em;
  color: var(--color-darkest-grey);
`

export const UploadButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 10px;
`

export const UploadButton = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 16px;
  width: 132px;
  height: 32px;
  background: var(--color-blue);
  border-radius: 2px;
  span {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0.012em;
    text-transform: uppercase;
    color: var(--color-white);
  }
`

export const UploadCloseBtn = styled.img`
  align-self: flex-end;
  cursor: pointer;
`

export const UploadErrorTitle = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 156%;
  letter-spacing: 0.003em;
  color: var(--color-white);
`

export const SchoolSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  align-items: flex-start;
  align-content: flex-start;
  height: 100%;
  gap: 15px;
  padding: 0 6px;
`

export const SchoolSearchHeader = styled.div`
  display: inline-grid;
  width: 100%;
  grid-template-columns: 90% 10%;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
  place-items: center;
  background-color: var(--color-lightest-grey);
  border: 1px solid rgba(0, 0, 0, 0.1);
`

export const SchoolSearchInput = styled.input`
  border: none !important;
  border-color: transparent !important;
  width: 100%;
  height: 100%;
`

export const SearchButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 16px;
  width: 100%;
  height: 100%;
  background: var(--color-blue);
  border-radius: 2px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  letter-spacing: 0.012em;
  text-transform: uppercase;
  color: var(--color-white);

  &:disabled {
    cursor: hourglass;
    background-color: var(--color-light-grey);
  }
`

export const SchoolsTableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
`
export const UploadFormatError = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 78px;
  background: var(--color-red);
  border-radius: 2px;
  border-radius: 6px;
`
