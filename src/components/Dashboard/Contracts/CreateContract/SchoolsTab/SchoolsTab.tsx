import { useEffect, useCallback, useState, useRef, useMemo } from 'react'
import * as XLSX from 'xlsx'
import images from 'src/assets/images'
import {
  SchoolsContainer,
  UploadContainer,
  UploadHeader,
  UploadHeaderTitle,
  UploadHeaderText,
  UploadButtonContainer,
  UploadButton,
  SchoolSearchContainer,
  SchoolSearchHeader,
  SchoolSearchInput,
  SearchButton,
  SchoolsTableContainer,
  UploadErrorTitle,
  UploadFormatError,
} from './styles'
import SchoolTable from './SchoolTable'
import { useCreateContractContext } from '../state/useCreateContractContext'
import { CreateContractActionType } from '../state/types'
import Message, { MessageType } from 'src/components/common/Message/Message'
import Loader from 'src/components/common/Loader'

const SchoolsTab: React.FC = (): JSX.Element => {
  const {
    dispatch,
    state,
    actions: { fetchSchools },
  } = useCreateContractContext()

  const inputRef = useRef<HTMLInputElement>(null)
  const csvReaderRef = useRef<HTMLInputElement>(null)
  const acceptFiles = useMemo(() => ['.csv', '.xls', '.xlsx'], [])

  const [searchText, setSearchText] = useState<string>()
  const [schoolsNotFound, setSchoolsNotFound] = useState<number>(0)
  const [fileName, setFileName] = useState<string>()
  const [invalidFormat, setInvalidFormat] = useState<boolean>()

  useEffect(() => {
    if (!state.schools.loading) {
      if (state.schools.meta === undefined || state.schools.meta.country_id !== state.contractForm.countryId) {
        fetchSchools()
      }
    }
  }, [fetchSchools, state.contractForm.countryId, state.schools.loading, state.schools.meta])

  const handleSchoolSelection = useCallback(
    (id: string) => {
      dispatch({ type: CreateContractActionType.SELECT_SCHOOL, payload: { id } })
    },
    [dispatch],
  )

  const filteredSchools = useMemo(() => {
    if (searchText) {
      return (
        state.schools.data?.filter(
          (school) =>
            school.name.toLowerCase().includes(searchText.toLowerCase()) ||
            school.external_id.includes(searchText.toLowerCase()),
        ) ?? []
      )
    }
    return state.schools.data
  }, [state.schools, searchText])

  const handleSearch = useCallback(() => {
    setSearchText(inputRef.current?.value)
  }, [])

  const handleFileData = useCallback(
    (data: string[], fileInfo?: string) => {
      const listOfSchools: { id: string }[] = []
      let notFoundCount = 0
      data.forEach((id) => {
        const index = state.schools.data?.findIndex((school) => school.external_id === id)
        if (state.schools.data !== undefined && index !== undefined && index >= 0) {
          listOfSchools.push({ id: state.schools.data[index].id })
        } else {
          notFoundCount++
        }
      })

      setFileName(fileInfo)
      setSchoolsNotFound(notFoundCount)
      if (csvReaderRef.current) csvReaderRef.current.value = ''
      dispatch({ type: CreateContractActionType.SELECT_SCHOOL_BULK, payload: listOfSchools })
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
          const data = Object.keys(ws)
            // eslint-disable-next-line array-callback-return
            .map((key) => {
              if (key.includes('A')) {
                return ws[key].w
              }
            })
            .filter((v) => v) as string[]
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
            To link schools to the contract faster, you may upload a list of school id&apos;s through a file with the
            following format:
          </UploadHeaderText>
        </UploadHeader>
        <img src={images.sampleTable} alt="sample-table" />
        <UploadButtonContainer>
          {schoolsNotFound > 0 && (
            <Message
              type={MessageType.ERROR}
              title={schoolsNotFound + ' errors found in ' + fileName}
              description="Please add missing schools manually or re-upload a correct CSV file"
              onClose={() => setSchoolsNotFound(0)}
            />
          )}
          {invalidFormat && (
            <UploadFormatError>
              <UploadErrorTitle>Invalid format</UploadErrorTitle>
            </UploadFormatError>
          )}
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
          <div style={{ display: 'flex', width: '100%' }}>
            <span className="icon icon-24 icon-search icon-mid-grey"></span>
            <SchoolSearchInput
              type="text"
              name="search-input"
              placeholder="Search School Name / ID"
              ref={inputRef}
              disabled={state.schools.loading}
            />
          </div>
          <SearchButton onClick={handleSearch} disabled={state.schools.loading}>
            Search
          </SearchButton>
        </SchoolSearchHeader>
        <SchoolsTableContainer>
          {state.schools.error && (
            <Message
              type={MessageType.ERROR}
              title="Error"
              description={state.schools.error.message}
              showCloseBtn={false}
            />
          )}
          {state.schools.loading ? (
            <Loader />
          ) : (
            !!filteredSchools?.length && (
              <SchoolTable
                onSelect={handleSchoolSelection}
                schools={filteredSchools}
                selectedSchools={state.contractForm.schools.schools}
              />
            )
          )}
        </SchoolsTableContainer>
      </SchoolSearchContainer>
    </SchoolsContainer>
  )
}

export default SchoolsTab
