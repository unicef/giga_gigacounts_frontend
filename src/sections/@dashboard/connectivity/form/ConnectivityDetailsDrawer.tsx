import { Button, Dropdown, TextInput } from '@carbon/react'
import { months } from 'moment'
import { useState } from 'react'
import { ISchoolContact, ISchoolMeasures } from 'src/@types'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import Drawer from 'src/components/drawer/Drawer'
import { ComparingCard } from 'src/components/qos-card'
import { Stack } from 'src/components/stack'
import { useTable } from 'src/components/table'
import { SectionTitle, Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { MeasureTableRow } from 'src/sections/@dashboard/measures/list'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

interface Props {
  measures: ISchoolMeasures[]
  expectedValues?: {
    uptime: number
    uploadSpeed: number
    downloadSpeed: number
    latency: number
  }
  onClose: VoidFunction
  open: boolean
  contactInformation: ISchoolContact
}

export default function ConnectivityDetailsDrawer({
  open,
  measures,
  onClose,
  contactInformation,
  expectedValues
}: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const MONTH_LIST = Array.from(
    new Set(
      measures.map(
        (m) => `${months(new Date(m.date).getMonth())}-${new Date(m.date).getFullYear()}`
      )
    )
  )
  const [filterMonth, setFilterMonth] = useState('')
  const handleCancel = () => {
    onClose()
    setFilterMonth('')
  }
  const handleFilterMonth = (month: string | null) => {
    setFilterMonth(month ?? '')
    setPage(1)
  }

  const TABLE_HEAD = [
    { key: 'date', header: translate('day') },
    { key: 'metric_name', header: translate('metric_name') },
    { key: 'median_value', header: translate('median_value') }
  ]

  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'date'
  })
  const dataFiltered = applyFilter({
    inputData: measures,
    filterMonth
  })

  const medians = Object.fromEntries(
    ['Uptime', 'Latency', 'Upload speed', 'Download speed'].map((name) => {
      const specificMeasure = dataFiltered
        .filter((m) => m.metric_name === name)
        .map((m) => m.median_value)
      return [name, specificMeasure.reduce((prev, curr) => prev + curr, 0) / specificMeasure.length]
    })
  )

  const isNotFound = !dataFiltered.length

  return (
    <Drawer
      open={open}
      handleClose={handleCancel}
      content={
        <>
          <SectionTitle label="qos_summary" />
          <Typography style={{ marginTop: spacing.xxs, marginBottom: spacing.lg }}>
            {translate('qos_description')}
          </Typography>

          <Dropdown
            onChange={(data) => handleFilterMonth(data.selectedItem)}
            id="month-selection"
            items={MONTH_LIST}
            label="Month"
            selectedItem={filterMonth}
          />
          {expectedValues && (
            <Stack orientation="horizontal" gap={spacing.md}>
              <ComparingCard
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                width={200}
                hideExpected
                hideLabel
                name="uptime"
                value={parseInt(String(medians.Uptime), 10)}
                expectedValue={expectedValues.uptime}
              />
              <ComparingCard
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                hideExpected
                width={200}
                hideLabel
                name="upload_speed"
                value={parseInt(String(medians['Upload speed']), 10)}
                expectedValue={expectedValues.uploadSpeed}
              />
              <ComparingCard
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                hideExpected
                width={200}
                hideLabel
                name="download_speed"
                value={parseInt(String(medians['Download speed']), 10)}
                expectedValue={expectedValues.downloadSpeed}
              />
              <ComparingCard
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                hideExpected
                width={200}
                hideLabel
                name="latency"
                value={parseInt(String(medians.Latency), 10)}
                expectedValue={expectedValues.latency}
              />
            </Stack>
          )}
          <CustomDataTable
            isSortable
            RowComponent={MeasureTableRow}
            data={dataFiltered.map((m) => ({
              ...m,
              id: m.measure_id,
              school_name: null,
              school_external_id: null
            }))}
            page={page}
            setPage={setPage}
            isNotFound={isNotFound}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            tableHead={TABLE_HEAD}
            tableName="measures"
            noDataText="table_no_data.measures"
            title="Measures table"
          />

          {contactInformation && (
            <Stack style={{ marginTop: spacing.lg }} orientation="vertical">
              <SectionTitle label="contact_information" />
              <Stack orientation="horizontal" gap={spacing.md}>
                <TextInput
                  labelText={capitalizeFirstLetter(translate('name'))}
                  id="school-contact-name"
                  value={contactInformation.contactPerson}
                  disabled
                />
                <TextInput
                  labelText={capitalizeFirstLetter(translate('phone_number'))}
                  id="school-contact-phone-number"
                  value={contactInformation.phoneNumber}
                  disabled
                />
              </Stack>
              <TextInput
                labelText={capitalizeFirstLetter(translate('email'))}
                id="school-contact-email"
                value={contactInformation.email}
                disabled
              />
            </Stack>
          )}
        </>
      }
      footer={
        <Button
          className="btn-max-width-limit"
          style={{ width: '100%' }}
          kind="secondary"
          onClick={handleCancel}
        >
          {capitalizeFirstLetter(translate('close'))}
        </Button>
      }
    />
  )
}

function applyFilter({
  inputData,
  filterMonth
}: {
  inputData: ISchoolMeasures[]
  filterMonth: string
}) {
  if (filterMonth !== '')
    inputData = inputData.filter(
      (m) =>
        filterMonth.toLowerCase() ===
        `${months(new Date(m.date).getMonth())}-${new Date(m.date).getFullYear()}`.toLowerCase()
    )

  return inputData
}
