import { Dispatch, SetStateAction, useState } from 'react'
import * as XLSX from 'xlsx'
import { ParseError, SchoolCell, Translation } from 'src/@types'
import { UploadBox } from 'src/components/upload-box'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

const COLUMNS = {
  external_id: 'A',
  budget: 'B'
} as const

const getSchool = (sheet: XLSX.WorkSheet, row: number, schools: SchoolCell[]) => {
  const external_id = sheet[`${COLUMNS.external_id}${row}`]?.v
  const school = schools.find((s) => s.external_id === String(external_id))
  if (!school) throw new ParseError('parse_errors.school_not_found', row)

  const budget = sheet[`${COLUMNS.budget}${row}`]?.v

  if (!external_id || typeof external_id !== 'number')
    throw new ParseError('parse_errors.school_id', row)
  if (!budget || typeof budget !== 'number') {
    throw new ParseError('parse_errors.school_budget_missing', row)
  }
  if (budget <= 0) throw new ParseError('parse_errors.school_budget_positive', row)

  return {
    ...school,
    budget: String(budget)
  }
}

export default function UploadSchoolFile({
  onUpload,
  setUploadErrorMessage,
  setParsingErrorMessages,
  schools
}: {
  onUpload: (schools: { external_id: string; budget: string }[]) => void
  setUploadErrorMessage: Dispatch<SetStateAction<Translation | ''>>
  setParsingErrorMessages: Dispatch<SetStateAction<string[]>>
  schools: SchoolCell[]
}) {
  const { translate } = useLocales()
  const translateErrorRow = (message: Translation, row: number) => `${translate(message)} ${row}`
  // const { spacing } = useTheme()
  const [reading, setReading] = useState(false)

  const handleDrop = (acceptedFiles: File[]): void => {
    setReading(true)
    setParsingErrorMessages([])
    if (acceptedFiles.length > 1) setUploadErrorMessage('upload_errors.one_file')
    const csv = acceptedFiles[0]
    if (csv.name.split('.').pop() !== 'csv') setUploadErrorMessage('upload_errors.csv')
    const fileReader = new FileReader()
    fileReader.onloadend = () => setReading(false)

    fileReader.onload = (event) => {
      const binaryString = event.target?.result
      const data = XLSX.read(binaryString, { type: 'binary' })
      const sheetName = data.SheetNames[0]
      const sheet = data.Sheets[sheetName]
      const addedSchools: SchoolCell[] = []
      Object.keys(sheet).forEach((key) => {
        if (!key.startsWith('A')) return
        const row = Number(key.slice(1))
        if (row === 1) return
        try {
          const school = getSchool(sheet, row, schools)
          addedSchools.push(school)
        } catch (err) {
          if (err instanceof ParseError && err.message)
            setParsingErrorMessages((prev) => [...prev, translateErrorRow(err.message, err.row)])
          else throw err
        }
      })
      onUpload(addedSchools.map((s) => ({ external_id: s.external_id, budget: s.budget })))
    }
    return fileReader.readAsBinaryString(csv)
  }

  return (
    <UploadBox
      status={reading ? 'uploading' : 'edit'}
      accept={['.csv']}
      showList={false}
      multiple={false}
      handleUpload={handleDrop}
      labelText={capitalizeFirstLetter(translate('drag_and_drop_csv_singular'))}
    />
  )
}
