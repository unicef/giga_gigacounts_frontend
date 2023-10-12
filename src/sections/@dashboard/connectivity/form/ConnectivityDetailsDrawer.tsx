import { Button, Dropdown, TextInput } from '@carbon/react'
import { groupBy } from 'lodash'
import moment, { months } from 'moment'
import { useEffect, useState } from 'react'
import {
  ISchoolContact,
  ISchoolMeasures,
  Metric,
  MetricCamel,
  MetricSnake,
  Translation
} from 'src/@types'
import { getSchoolMeasures } from 'src/api/school'
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
import { generateRange } from 'src/utils/arrays'
import { formatDate } from 'src/utils/date'
import { getMetricLabel } from 'src/utils/metrics'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from 'src/utils/strings'

interface Props {
  schoolName: string
  schoolExternalId: string
  schoolId: string
  expectedValues?: {
    [K in MetricCamel]: number
  }
  onClose: VoidFunction
  open: boolean
  contactInformation: ISchoolContact
}

export default function ConnectivityDetailsDrawer({
  open,
  onClose,
  contactInformation,
  expectedValues,
  schoolExternalId,
  schoolId,
  schoolName
}: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const [measures, setMeasures] = useState<ISchoolMeasures[] | null>(null)

  const currentYear = moment().year()
  const currentMonth = moment().month()
  const MONTH_LIST = generateRange(0, 11).sort((a, b) => b - a)
  const YEARS_LIST = generateRange(2010, currentYear).sort((a, b) => b - a)

  const [filterMonth, setFilterMonth] = useState(currentMonth)
  const [filterYear, setFilterYear] = useState(currentYear)

  const handleCancel = () => {
    onClose()
    setFilterMonth(currentMonth)
    setFilterYear(currentYear)
  }
  const handleFilterMonth = (month: number) => {
    setFilterMonth(month)
    setPage(1)
  }
  const handleFilterYear = (month: number) => {
    setFilterYear(month)
    setPage(1)
  }

  useEffect(() => {
    if (!open) return
    const selectedDate = moment({ month: filterMonth, year: filterYear })
    getSchoolMeasures(
      schoolId,
      'day',
      selectedDate.toISOString(),
      selectedDate.add(1, 'month').toISOString()
    ).then(setMeasures)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterMonth, filterYear, open])

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
    ? Object.entries(groupBy(measures, (m) => formatDate(m.date)))
        .map(([key, value]) => ({
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
        .sort((a, b) => moment(b.date).diff(moment(a.date)))
    : null

  const metricsKeys = Array.from(Object.values(MetricCamel))

  const medians = measuresByDay
    ? (Object.fromEntries(
        metricsKeys.map((name) => {
          const availableMeasures = measuresByDay.filter((m) => m[name] !== null)
          return [
            name,
            availableMeasures.reduce((prev, curr) => prev + Number(curr[name]), 0) /
              availableMeasures.length
          ]
        })
      ) as { [K in (typeof metricsKeys)[number]]: number })
    : null

  const isEmpty = Boolean(measuresByDay && !measuresByDay.length)

  const downloadableData = measuresByDay
    ? measuresByDay.map((measure) => ({
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
          subtitle={`${translate('school')} ID ${schoolExternalId}`}
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
          <Stack style={{ marginBottom: spacing.md }} orientation="horizontal" gap={spacing.sm}>
            <Dropdown
              style={{ width: '75%' }}
              label={capitalizeFirstLetter(
                translate(uncapitalizeFirstLetter(months(0)) as Translation)
              )}
              onChange={(data) => handleFilterMonth(data.selectedItem as number)}
              id="month-selection"
              items={MONTH_LIST}
              itemToString={(i) =>
                `${capitalizeFirstLetter(
                  translate(uncapitalizeFirstLetter(months(i as number)) as Translation)
                )}`
              }
              selectedItem={filterMonth}
              disabled={MONTH_LIST.length === 0}
            />
            <Dropdown
              style={{ width: '25%' }}
              label={2010}
              onChange={(data) => handleFilterYear(data.selectedItem as number)}
              id="year-selection"
              items={YEARS_LIST}
              itemToString={String}
              selectedItem={filterYear}
              disabled={YEARS_LIST.length === 0}
            />
          </Stack>

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
            data={measuresByDay}
            page={page}
            setPage={setPage}
            isNotFound={false}
            isEmpty={isEmpty}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            tableHead={TABLE_HEAD}
            tableName="school-measures"
            emptyText="table_no_data.measures"
          />

          {contactInformation && (
            <Stack style={{ marginTop: spacing.lg }} orientation="vertical">
              <SectionTitle label="contact_information" />
              <Stack gap={spacing.sm}>
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
