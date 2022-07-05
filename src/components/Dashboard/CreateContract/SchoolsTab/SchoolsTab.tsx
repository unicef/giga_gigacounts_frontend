import { Dispatch, useEffect, useCallback, useState, useRef } from 'react'
import CSVReader, { IFileInfo } from 'react-csv-reader'
import { Action, State, ActionType } from '../store/redux'
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
  SchoolsTableContainer,
  UploadError,
  UploadErrorTitle,
  UploadErrorText,
  UploadErrorHeader,
  UploadCloseBtn,
} from './styles'
import SchoolTable from './SchoolTable'
import { getSchools, ISchool } from 'src/api/school'
import icons from 'src/assets/icons'

interface ISchoolsProps {
  state: State
  dispatch: Dispatch<Action>
}

const SchoolsTab: React.FC<ISchoolsProps> = ({ state, dispatch }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)
  const csvReaderRef = useRef<HTMLInputElement>(null)

  const [schools, setSchools] = useState<ISchool[]>()
  const [searchText, setSearchText] = useState<string>()
  const [schoolsNotFound, setSchoolsNotFound] = useState<number>(0)
  const [fileName, setFileName] = useState<string>()

  const fetchSchools = useCallback(async () => {
    try {
      const response = await getSchools()
      dispatch({ type: ActionType.RESPONSE_SCHOOLS, payload: response })
    } catch (error) {
      dispatch({ type: ActionType.SET_ERROR, payload: error })
    }
  }, [dispatch])

  useEffect(() => {
    fetchSchools()
  }, [fetchSchools])

  useEffect(() => {
    if (state.schools.length) {
      setSchools(state.schools)
    }
  }, [state.schools])

  const handleSchoolSelection = (id: number) => {
    dispatch({ type: ActionType.SELECT_SCHOOL, payload: { id } })
  }

  const inputListener = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value)
    },
    [setSearchText],
  )

  const handleSearch = () => {
    if (searchText?.length === 0) {
      setSchools(state.schools)
    } else if (searchText) {
      const filteredSchool = state.schools.filter(
        (school) =>
          school.name.toLowerCase().includes(searchText.toLowerCase()) ||
          school.external_id.includes(searchText.toLowerCase()),
      )
      setSchools(filteredSchool)
    }
  }

  const handleUpload = useCallback(
    (data: string[], fileInfo: IFileInfo) => {
      setSchoolsNotFound(0)
      data.forEach((id) => {
        const index = state.schools.findIndex((school) => school.external_id === id[0])
        if (index >= 0) {
          handleSchoolSelection(state.schools[index].id)
        } else {
          setFileName(fileInfo.name)
          setSchoolsNotFound((current) => current + 1)
        }
      })
      if (csvReaderRef.current) csvReaderRef.current.value = ''
    },
    [handleSchoolSelection, setSchoolsNotFound, state.schools],
  )

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
          {schoolsNotFound > 0 ? (
            <UploadError>
              <UploadErrorHeader>
                <UploadErrorTitle>
                  {schoolsNotFound} errors found in {fileName}.
                </UploadErrorTitle>
                <UploadCloseBtn src={icons.cross} onClick={() => setSchoolsNotFound(0)} />
              </UploadErrorHeader>
              <UploadErrorText>Please add missing schools manually or re-upload a correct CSV file</UploadErrorText>
            </UploadError>
          ) : null}
          <UploadButton>
            <span>Upload file</span>
            <CSVReader
              parserOptions={{ header: false, skipEmptyLines: true }}
              onFileLoaded={(data, fileInfo) => handleUpload(data, fileInfo)}
              inputStyle={{ display: 'none' }}
              inputRef={csvReaderRef}
            />
          </UploadButton>
        </UploadButtonContainer>
      </UploadContainer>
      <SchoolSearchContainer>
        <SchoolSearchHeader>
          <SearchIcon src="icons/search.svg" />
          <SchoolSearchInput
            type="text"
            name="search-input"
            placeholder="Search School Name / ID"
            onChange={inputListener}
            ref={inputRef}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SchoolSearchHeader>
        <SchoolsTableContainer>
          {schools?.length ? (
            <SchoolTable onSelect={handleSchoolSelection} schools={schools} selectedSchools={state.selectedSchools} />
          ) : null}
        </SchoolsTableContainer>
      </SchoolSearchContainer>
    </SchoolsContainer>
  )
}

export default SchoolsTab
