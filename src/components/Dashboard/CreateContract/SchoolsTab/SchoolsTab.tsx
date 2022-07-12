import { Dispatch, useEffect, useCallback, useState, useRef, useMemo } from 'react'
import * as XLSX from 'xlsx'
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
  UploadFormatError,
} from './styles'
import SchoolTable from './SchoolTable'
import { getSchools } from 'src/api/school'
import icons from 'src/assets/icons'

interface ISchoolsProps {
  state: State
  dispatch: Dispatch<Action>
}

const SchoolsTab: React.FC<ISchoolsProps> = ({ state, dispatch }): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)
  const csvReaderRef = useRef<HTMLInputElement>(null)
  const acceptFiles = useMemo(() => ['.csv', '.xls', '.xlsx'], [])

  const [searchText, setSearchText] = useState<string>()
  const [schoolsNotFound, setSchoolsNotFound] = useState<number>(0)
  const [fileName, setFileName] = useState<string>()
  const [invalidFormat, setInvalidFormat] = useState<boolean>()

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

  const handleSchoolSelection = useCallback(
    (id: number) => {
      dispatch({ type: ActionType.SELECT_SCHOOL, payload: { id } })
    },
    [dispatch],
  )

  const filteredSchools = useMemo(() => {
    if (searchText) {
      return state.schools.filter(
        (school) =>
          school.name.toLowerCase().includes(searchText.toLowerCase()) ||
          school.external_id.includes(searchText.toLowerCase()),
      )
    }
    return state.schools
  }, [state.schools, searchText])

  const handleSearch = useCallback(() => {
    setSearchText(inputRef.current?.value)
  }, [])

  const handleFileData = useCallback(
    (data: number[], fileInfo?: string) => {
      const listOfSchools: { id: number }[] = []
      let notFoundCount = 0
      data.forEach((id) => {
        const index = state.schools.findIndex((school) => school.external_id === id.toString())
        if (index >= 0) {
          listOfSchools.push({ id: state.schools[index].id })
        } else {
          notFoundCount++
        }
      })
      setFileName(fileInfo)
      setSchoolsNotFound(notFoundCount)
      if (csvReaderRef.current) csvReaderRef.current.value = ''
      dispatch({ type: ActionType.SELECT_SCHOOL_BULK, payload: listOfSchools })
    },
    [dispatch, setSchoolsNotFound, state.schools],
  )

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInvalidFormat(false)
      setSchoolsNotFound(0)
      if (e.target.files) {
        if (!acceptFiles.includes(`.${e.target.files[0].name.split('.').pop()}`)) return setInvalidFormat(true)
        const [file] = Array.prototype.slice.call(e.target.files)
        const fileName = e.target.files[0].name
        const reader = new FileReader()
        reader.onload = (evt) => {
          const bstr = evt.target?.result
          const wb = XLSX.read(bstr, { type: 'binary' })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false, skipHidden: true }) as number[]
          handleFileData(data, fileName)
        }
        reader.readAsBinaryString(file)
      }
    },
    [handleFileData, acceptFiles, setInvalidFormat, setSchoolsNotFound],
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
          {invalidFormat ? (
            <UploadFormatError>
              <UploadErrorTitle>Invalid format</UploadErrorTitle>
            </UploadFormatError>
          ) : null}
          <UploadButton>
            <span>Upload file</span>
            <input
              type="file"
              onChange={onChange}
              style={{ display: 'none' }}
              ref={csvReaderRef}
              accept={acceptFiles.join(',')}
            />
          </UploadButton>
        </UploadButtonContainer>
      </UploadContainer>
      <SchoolSearchContainer>
        <SchoolSearchHeader>
          <SearchIcon src="icons/search.svg" />
          <SchoolSearchInput type="text" name="search-input" placeholder="Search School Name / ID" ref={inputRef} />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SchoolSearchHeader>
        <SchoolsTableContainer>
          {filteredSchools?.length ? (
            <SchoolTable
              onSelect={handleSchoolSelection}
              schools={filteredSchools}
              selectedSchools={state.selectedSchools}
            />
          ) : null}
        </SchoolsTableContainer>
      </SchoolSearchContainer>
    </SchoolsContainer>
  )
}

export default SchoolsTab
