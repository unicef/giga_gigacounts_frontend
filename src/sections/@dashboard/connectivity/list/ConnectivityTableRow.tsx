import { View } from '@carbon/icons-react'
import { Button, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useEffect, useState } from 'react'
import { ISchoolMeasures } from 'src/@types'
import { getSchoolMeasures } from 'src/api/school'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'
import ConnectivityDetailsDrawer from '../form/ConnectivityDetailsDrawer'

type Props = {
  row: any
  rowProps: TableRowProps
  contractId: string
}

export default function ConnectivityTableRow({ row, contractId, rowProps }: Props) {
  const { translate } = useLocales()
  const [name, externalId] = row.cells.map((c: { value: any }) => c.value)
  const [measures, setMeasures] = useState<ISchoolMeasures[]>([])
  const details = useModal()

  useEffect(() => {
    getSchoolMeasures(row.id, contractId, 'day').then((res) => {
      if (res instanceof Error) throw res
      setMeasures(res)
    })
  }, [contractId, row.id])

  const getMeasures = (measureName: 'Uptime' | 'Latency' | 'Download speed' | 'Upload speed') => {
    const measure = measures.find((m) => m.metric_name === measureName)
    return `${measure?.median_value ?? ''} ${measure?.unit ?? ''}`
  }

  return (
    <TableRow {...rowProps}>
      <TableCell>{name}</TableCell>
      <TableCell>{externalId}</TableCell>

      <TableCell>{getMeasures('Uptime')}</TableCell>

      <TableCell>{getMeasures('Latency')}</TableCell>

      <TableCell>{getMeasures('Download speed')}</TableCell>
      <TableCell>{getMeasures('Upload speed')}</TableCell>

      <TableCell>
        <Button
          kind="ghost"
          onClick={details.open}
          iconDescription={capitalizeFirstLetter(translate('view'))}
          hasIconOnly
          renderIcon={View}
        />
      </TableCell>
      <TableCell>
        <ConnectivityDetailsDrawer
          item={row}
          measures={measures}
          onClose={details.close}
          open={details.value}
        />
      </TableCell>
    </TableRow>
  )
}
