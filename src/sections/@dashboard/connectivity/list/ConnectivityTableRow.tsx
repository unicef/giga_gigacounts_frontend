import { Button, DataTableRow, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useEffect, useState } from 'react'
import { ISchoolContact, ISchoolMeasures } from 'src/@types'
import { getSchoolMeasures } from 'src/api/school'
import { ICONS, STRING_DEFAULT } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'
import { ConnectivityDetailsDrawer } from '../form'

type Props = {
  row: DataTableRow
  rowProps: TableRowProps
  contractId?: string
  budget?: string
  currencyCode?: string
  contactInformation: ISchoolContact
  expectedValues?: { uptime: number; latency: number; downloadSpeed: number; uploadSpeed: number }
}

export default function ConnectivityTableRow({
  row,
  contractId,
  rowProps,
  budget,
  currencyCode,
  contactInformation,
  expectedValues
}: Props) {
  const { translate } = useLocales()
  const [name, external_id] = getOrderedFromCells(['name', 'external_id'], row.cells)
  const [measures, setMeasures] = useState<ISchoolMeasures[] | null>(null)
  const details = useModal()

  useEffect(() => {
    if (contractId)
      getSchoolMeasures(row.id, contractId, 'day')
        .then(setMeasures)
        .catch(() => setMeasures([]))
  }, [contractId, row.id])

  const getMeasures = (measureName: 'Uptime' | 'Latency' | 'Download speed' | 'Upload speed') => {
    if (!measures) return STRING_DEFAULT
    const measure = measures.find((m) => m.metric_name === measureName)
    if (!measure || !measure.median_value || !measure.unit) return STRING_DEFAULT
    return `${measure.median_value ?? ''} ${measure.unit ?? ''}`
  }

  return (
    <TableRow {...rowProps}>
      <TableCell>{name}</TableCell>
      <TableCell>{external_id}</TableCell>
      {budget && currencyCode && (
        <TableCell>
          {currencyCode} {budget}
        </TableCell>
      )}

      <TableCell>{getMeasures('Uptime')}</TableCell>

      <TableCell>{getMeasures('Latency')}</TableCell>

      <TableCell>{getMeasures('Download speed')}</TableCell>
      <TableCell>{getMeasures('Upload speed')}</TableCell>

      <TableCell>
        <Button
          style={{ margin: 0, padding: 0 }}
          kind="ghost"
          onClick={details.open}
          iconDescription={capitalizeFirstLetter(translate('view'))}
          hasIconOnly
          renderIcon={ICONS.View}
        />
      </TableCell>
      <TableCell>
        <ConnectivityDetailsDrawer
          schoolId={external_id}
          schoolName={name}
          expectedValues={expectedValues}
          contactInformation={contactInformation}
          measures={measures}
          onClose={details.close}
          open={details.value}
        />
      </TableCell>
    </TableRow>
  )
}
