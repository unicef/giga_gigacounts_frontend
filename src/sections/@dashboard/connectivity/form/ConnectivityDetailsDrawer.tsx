import { Button, Dropdown, TextInput } from '@carbon/react'
import { groupBy } from 'lodash'
import { months } from 'moment'
import { useState } from 'react'
import { ISchoolContact, ISchoolMeasures } from 'src/@types'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { DownloadCsv } from 'src/components/download'
import Drawer from 'src/components/drawer/Drawer'
import { ComparingCard } from 'src/components/qos-card'
import { Stack } from 'src/components/stack'
import { useTable } from 'src/components/table'
import { SectionTitle, Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { removeDuplicates } from 'src/utils/arrays'
import { formatDate } from 'src/utils/date'
import { getMetricLabel } from 'src/utils/metrics'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { MeasureTableRow } from '../../measures/list'

interface Props {
  schoolName: string
  schoolId: string
  measures: ISchoolMeasures[] | null
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
  expectedValues,
  schoolId,
  schoolName
}: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const MONTH_LIST = measures
    ? removeDuplicates(
        measures.map(
          (m) => `${months(new Date(m.date).getMonth())}-${new Date(m.date).getFullYear()}`
        )
      )
    : []
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
    { key: 'uptime', header: translate('uptime') },
    { key: 'latency', header: translate('latency') },
    { key: 'downloadSpeed', header: translate('download_speed') },
    { key: 'uploadSpeed', header: translate('upload_speed') }
  ]

  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'date'
  })

  const measuresByDay = measures
    ? Object.entries(groupBy(measures, (m) => formatDate(m.date))).map(([key, value]) => ({
        id: key,
        date: key,
        uptime: value.find((m) => m.metric_name === 'Uptime')?.median_value ?? null,
        latency: value.find((m) => m.metric_name === 'Latency')?.median_value ?? null,
        downloadSpeed: value.find((m) => m.metric_name === 'Upload speed')?.median_value ?? null,
        uploadSpeed: value.find((m) => m.metric_name === 'Download speed')?.median_value ?? null
      }))
    : null

  const metricsKeys = ['uptime', 'latency', 'uploadSpeed', 'downloadSpeed'] as const

  const dataFiltered = measuresByDay
    ? applyFilter({
        inputData: measuresByDay,
        filterMonth
      })
    : null

  const medians = dataFiltered
    ? (Object.fromEntries(
        metricsKeys.map((name) => {
          const availableMeasures = dataFiltered.filter((m) => m[name] !== null)
          return [
            name,
            availableMeasures.reduce((prev, curr) => prev + Number(curr[name]), 0) /
              availableMeasures.length
          ]
        })
      ) as { [K in (typeof metricsKeys)[number]]: number })
    : null

  const isNotFound = Boolean(dataFiltered && !dataFiltered.length)

  const downloadableData = dataFiltered
    ? dataFiltered.map((measure) => ({
        'Date': `${formatDate(measure.date, '/')}`,
        'Uptime': `${measure.uptime}${getMetricLabel('uptime')}`,
        'Latency': `${measure.latency}${getMetricLabel('latency')}`,
        'Download speed': `${measure.downloadSpeed}${getMetricLabel('download_speed')}`,
        'Upload speed': `${measure.uploadSpeed}${getMetricLabel('upload_speed')}`
      }))
    : []

  return (
    <Drawer
      header={
        <Banner
          variant="sm"
          title={schoolName}
          subtitle={`${translate('school')} ID ${schoolId}`}
        />
      }
      wrapHeader={false}
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
                value={medians ? parseInt(String(medians.uptime), 10) : null}
                expectedValue={expectedValues.uptime}
              />
              <ComparingCard
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                hideExpected
                width={200}
                hideLabel
                name="latency"
                value={medians ? parseInt(String(medians.latency), 10) : null}
                expectedValue={expectedValues.latency}
              />
              <ComparingCard
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                hideExpected
                width={200}
                hideLabel
                name="download_speed"
                value={medians ? parseInt(String(medians.downloadSpeed), 10) : null}
                expectedValue={expectedValues.downloadSpeed}
              />
              <ComparingCard
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                hideExpected
                width={200}
                hideLabel
                name="upload_speed"
                value={medians ? parseInt(String(medians.uploadSpeed), 10) : null}
                expectedValue={expectedValues.uploadSpeed}
              />
            </Stack>
          )}
          <CustomDataTable
            ToolbarContent={
              <DownloadCsv
                type="button"
                buttonKind="ghost"
                fileName={`${schoolName}_${filterMonth || 'complete'}_connectivity_history`}
                data={downloadableData}
              />
            }
            isSortable
            RowComponent={MeasureTableRow}
            data={dataFiltered}
            page={page}
            setPage={setPage}
            isNotFound={isNotFound}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            tableHead={TABLE_HEAD}
            tableName="school-measures"
            noDataText="table_no_data.measures"
            title="School measures table"
          />

          {contactInformation && (
            <Stack style={{ marginTop: spacing.lg }} orientation="vertical">
              <SectionTitle label="contact_information" />
              <Stack orientation="horizontal" gap={spacing.md}>
                <TextInput
                  labelText={capitalizeFirstLetter(translate('name'))}
                  id="school-contact-name"
                  value={contactInformation.contactPerson}
                  readOnly
                />
                <TextInput
                  labelText={capitalizeFirstLetter(translate('phone_number'))}
                  id="school-contact-phone-number"
                  value={contactInformation.phoneNumber}
                  readOnly
                />
              </Stack>
              <TextInput
                labelText={capitalizeFirstLetter(translate('email'))}
                id="school-contact-email"
                value={contactInformation.email}
                readOnly
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
  inputData: {
    date: string
    id: string
    uptime: number | null
    downloadSpeed: number | null
    uploadSpeed: number | null
    latency: number | null
  }[]
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
