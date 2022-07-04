import styled from 'styled-components/macro'

export const SchoolsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 50px;
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

export const SampleTable = styled.img`
  // width: 90%;
  // height: 50%;
`

export const UploadButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
`

export const UploadButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 16px;
  width: 122px;
  height: 32px;
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
`

export const SchoolSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  align-items: flex-start;
  align-content: flex-start;
  height: 100%;
  gap: 15px;
`

export const SchoolSearchHeader = styled.div`
  display: inline-grid;
  width: 100%;
  grid-template-columns: 5% 85% 10%;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
  place-items: center;
  background-color: var(--color-lightest-grey);
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 5%;
`

export const SchoolSearchInput = styled.input`
  border: none !important;
  border-color: transparent !important;
  width: 100%;
  height: 100%;
`

export const SearchIcon = styled.img`
  background-image: url(./search.svg);
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  filter: invert(11%) sepia(11%) saturate(0%) hue-rotate(199deg) brightness(95%) contrast(93%);
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
`

export const SchoolsTableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  height: 95%;
  width: 100%;
`

export const SchoolsTableHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`

export const NameHeaderLabel = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 156%;
  letter-spacing: 0.003em;
  align-self: flex-start;
  color: var(--color-dark-grey);
`

export const IdHeaderLabel = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 156%;
  letter-spacing: 0.003em;
  align-self: flex-end;
  color: var(--color-dark-grey);
`
