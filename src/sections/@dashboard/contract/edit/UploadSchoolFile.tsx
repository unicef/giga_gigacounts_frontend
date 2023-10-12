import { Dispatch, SetStateAction } from 'react'
import { Translation } from 'src/@types'
import { UploadBox } from 'src/components/upload-box'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import * as XLSX from 'xlsx'

const COLUMNS = {
  external_id: 'A',
  budget: 'B'
} as const

export default function UploadSchoolFile({
  onUpload,
  setUploadErrorMessage,
  setParsingErrorMessages
}: {
  onUpload: (schools: { external_id: string; budget: number | string; row: number }[]) => void
  setUploadErrorMessage: Dispatch<SetStateAction<Translation | ''>>
  setParsingErrorMessages: Dispatch<SetStateAction<string[]>>
}) {
  const { translate } = useLocales()

  const handleDrop = (acceptedFiles: File[]): void => {
    setParsingErrorMessages([])
    if (acceptedFiles.length > 1) setUploadErrorMessage('upload_errors.one_file')
    const csv = acceptedFiles[0]
    if (csv.name.split('.').pop() !== 'csv') setUploadErrorMessage('upload_errors.csv')
    const fileReader = new FileReader()

    fileReader.onload = (event) => {
      const binaryString = event.target?.result
      const data = XLSX.read(binaryString, { type: 'binary' })
      const sheetName = data.SheetNames[0]
      const sheet = data.Sheets[sheetName]
      const addedSchools: { external_id: string; row: number; budget: number | string }[] = []
      Object.keys(sheet).forEach((key) => {
        if (!key.startsWith('A')) return
        const row = Number(key.slice(1))
        if (row === 1) return
        const external_id = String(sheet[`${COLUMNS.external_id}${row}`]?.v)
        const budget = sheet[`${COLUMNS.budget}${row}`]?.v

        addedSchools.push({ row, external_id, budget })
      })
      onUpload(addedSchools)
    }
    return fileReader.readAsBinaryString(csv)
  }

  return (
    <UploadBox
      accept={['.csv']}
      showList={false}
      multiple={false}
      handleUpload={handleDrop}
      labelText={capitalizeFirstLetter(translate('drag_and_drop_csv_singular'))}
    />
  )
}
