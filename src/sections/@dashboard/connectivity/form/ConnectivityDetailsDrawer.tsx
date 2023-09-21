import { Button, Dropdown, TextInput } from '@carbon/react'
import { groupBy } from 'lodash'
import { months } from 'moment'
import { useState } from 'react'
import {
  ISchoolContact,
  ISchoolMeasures,
  Metric,
  MetricCamel,
  MetricSnake,
  Translation
} from 'src/@types'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { DownloadCsv } from 'src/components/download'
import Drawer from 'src/components/drawer/Drawer'
import { ComparingCard } from 'src/components/qos-card'
import { Stack } from 'src/components/stack'
import { useTable } from 'src/components/table'
import { SectionTitle, Typography } from 'src/components/typography'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import SchoolMeasureTableRow from 'src/sections/@dashboard/measures/list/SchoolMeasureTableRow'
import { useTheme } from 'src/theme'
import { removeDuplicates } from 'src/utils/arrays'
import { formatDate } from 'src/utils/date'
import { getMetricLabel } from 'src/utils/metrics'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

interface Props {
  schoolName: string
  schoolId: string
  measures: ISchoolMeasures[] | null
  expectedValues?: {
    [K in MetricCamel]: number
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
    { key: MetricCamel.Uptime, header: translate(MetricSnake.Uptime) },
    { key: MetricCamel.Latency, header: translate(MetricSnake.Latency) },
    { key: MetricCamel.DownloadSpeed, header: translate(MetricSnake.DownloadSpeed) },
    { key: MetricCamel.UploadSpeed, header: translate(MetricSnake.UploadSpeed) }
  ]

  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'date'
  })

  const measuresByDay = measures
    ? Object.entries(groupBy(measures, (m) => formatDate(m.date))).map(([key, value]) => ({
        id: key,
        date: key,
        [MetricCamel.Uptime]:
          value.find((m) => m.metric_name === Metric.Uptime)?.median_value ?? null,
        [MetricCamel.Latency]:
          value.find((m) => m.metric_name === Metric.Latency)?.median_value ?? null,
        [MetricCamel.DownloadSpeed]:
          value.find((m) => m.metric_name === Metric.DownloadSpeed)?.median_value ?? null,
        [MetricCamel.UploadSpeed]:
          value.find((m) => m.metric_name === Metric.UploadSpeed)?.median_value ?? null
      }))
    : null

  const metricsKeys = Array.from(Object.values(MetricCamel))

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

  const isEmpty = Boolean(measuresByDay && !measuresByDay.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const downloadableData = dataFiltered
    ? dataFiltered.map((measure) => ({
        Date: `${formatDate(measure.date, '/')}`,
        [Metric.Uptime]: `${measure[MetricCamel.Uptime]}${getMetricLabel(MetricSnake.Uptime)}`,
        [Metric.Latency]: `${measure[MetricCamel.Latency]}${getMetricLabel(MetricSnake.Latency)}`,
        [Metric.DownloadSpeed]: `${measure[MetricCamel.DownloadSpeed]}${getMetricLabel(
          MetricSnake.DownloadSpeed
        )}`,
        [Metric.UploadSpeed]: `${measure[MetricCamel.UploadSpeed]}${getMetricLabel(
          MetricSnake.UploadSpeed
        )}`
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
            label={capitalizeFirstLetter(translate('month'))}
            itemToString={(i) =>
              `${capitalizeFirstLetter(
                translate(uncapitalizeFirstLetter(i?.split('-')[0] ?? '') as Translation)
              )}-${i?.split('-')[1]}`
            }
            selectedItem={filterMonth}
            disabled={MONTH_LIST.length === 0}
          />
          {expectedValues && (
            <Stack orientation="horizontal" gap={spacing.md}>
              <ComparingCard
                average
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                width={200}
                hideExpected
                hideLabel
                name={MetricSnake.Uptime}
                value={medians ? parseInt(String(medians.uptime), 10) : null}
                expectedValue={expectedValues.uptime}
              />
              <ComparingCard
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                hideExpected
                width={200}
                hideLabel
                name={MetricSnake.Latency}
                value={medians ? parseInt(String(medians.latency), 10) : null}
                expectedValue={expectedValues.latency}
                average
              />
              <ComparingCard
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                hideExpected
                average
                width={200}
                hideLabel
                name={MetricSnake.DownloadSpeed}
                value={medians ? parseInt(String(medians.downloadSpeed), 10) : null}
                expectedValue={expectedValues.downloadSpeed}
              />
              <ComparingCard
                style={{ marginBlock: spacing.md, padding: spacing.xs }}
                hideExpected
                width={200}
                average
                hideLabel
                name={MetricSnake.UploadSpeed}
                value={medians ? parseInt(String(medians[MetricCamel.UploadSpeed]), 10) : null}
                expectedValue={expectedValues[MetricCamel.UploadSpeed]}
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
            RowComponent={SchoolMeasureTableRow}
            data={dataFiltered}
            page={page}
            setPage={setPage}
            isNotFound={isNotFound}
            isEmpty={isEmpty}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            tableHead={TABLE_HEAD}
            tableName="school-measures"
            emptyText="table_no_data.measures"
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
          renderIcon={ICONS.Close}
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
  inputData: ({
    date: string
    id: string
  } & { [K in MetricCamel]: number | null })[]
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
