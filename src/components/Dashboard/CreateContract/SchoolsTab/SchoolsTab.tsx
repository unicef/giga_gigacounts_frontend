import { Dispatch } from 'react'
import { Action, State } from '../store/redux'
import {
  SchoolsContainer,
  UploadContainer,
  UploadHeader,
  UploadHeaderTitle,
  UploadHeaderText,
  SampleTable,
  UploadButtonContainer,
  UploadButton,
  SchoolSearchContainer,
  SchoolSearchHeader,
  SchoolSearchInput,
  SearchIcon,
  SearchButton,
} from './styles'

interface ISchoolsProps {
  state: State
  dispatch: Dispatch<Action>
}

const SchoolsTab: React.FC<ISchoolsProps> = ({ state, dispatch }): JSX.Element => {
  return (
    <SchoolsContainer>
      <UploadContainer>
        <UploadHeader>
          <UploadHeaderTitle>Upload Reference File</UploadHeaderTitle>
          <UploadHeaderText>
            To link schools to the contract faster, you may upload a list of school id's through a file with the
            following format:
          </UploadHeaderText>
        </UploadHeader>
        <SampleTable src="img/sample-table.svg" alt="sample-table" />
        <UploadButtonContainer>
          <UploadButton onClick={() => console.log('here')}>Upload file</UploadButton>
        </UploadButtonContainer>
      </UploadContainer>
      <SchoolSearchContainer>
        <SchoolSearchHeader>
          <SearchIcon src="icons/search.svg" />
          <SchoolSearchInput type="text" name="selectedValue" placeholder="Search School Name / ID" />
          <SearchButton>Search</SearchButton>
        </SchoolSearchHeader>
      </SchoolSearchContainer>
    </SchoolsContainer>
  )
}

export default SchoolsTab
