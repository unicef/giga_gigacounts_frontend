import { Button } from '@carbon/react'
import { months } from 'moment'
import { useState } from 'react'
import { IContractSchools, ISchoolMeasures } from 'src/@types'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import Drawer from 'src/components/drawer/Drawer'
import { getComparator, useTable } from 'src/components/table'
import { Typography } from 'src/components/typography'
import SectionTitle from 'src/components/typography/SectionTitle'
import { useLocales } from 'src/locales'
import { MeasureTableRow, MeasureTableToolbar } from 'src/sections/@dashboard/measures/list'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

interface Props {
  item: IContractSchools
  measures: ISchoolMeasures[]
  onClose: VoidFunction
  open: boolean
}

export default function ConnectivityDetailsDrawer({ item, open, measures, onClose }: Props) {
  const { translate } = useLocales()
  const { spacing } = useTheme()
  const [filterMonth, setFilterMonth] = useState('')
  const handleCancel = () => onClose()

  const TABLE_HEAD = [
    { key: 'date', header: translate('day') },
    { key: 'median_value', header: translate('median_value') },
    { key: 'metric_name', header: translate('metric_name') }
  ]

  const { page, order, orderBy, rowsPerPage, setPage, setRowsPerPage } = useTable({
    defaultOrderBy: 'date'
  })
  const dataFiltered = applyFilter({
    inputData: measures,
    comparator: getComparator(order, orderBy),
    filterMonth
  })
  const isNotFound = !dataFiltered.length

  return (
    <Drawer
      open={open}
      handleClose={handleCancel}
      content={
        <>
          <SectionTitle label={translate('qos_summary')} />
          <Typography style={{ marginBlock: spacing.xxs }}>
            {translate('qos_description')}
          </Typography>
          <CustomDataTable
            isSortable
            RowComponent={MeasureTableRow}
            ToolbarContent={
              <MeasureTableToolbar setFilterSearch={setFilterMonth} setPage={setPage} />
            }
            data={dataFiltered.map((s, i) => ({ ...s, id: String(i) }))}
            page={page}
            setPage={setPage}
            isNotFound={isNotFound}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            tableHead={TABLE_HEAD}
            tableName="measures"
            title="Measures table"
          />
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
  comparator,
  filterMonth
}: {
  inputData: ISchoolMeasures[]
  comparator: (a: any, b: any) => number
  filterMonth: string
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (filterMonth !== '') {
    inputData = inputData.filter(
      (school) => filterMonth === months(new Date(school.date).getMonth())
    )
  }

  return inputData
}
