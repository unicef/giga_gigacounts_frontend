import { DataTableRow, Dropdown, Modal, TableCell, TableRow } from '@carbon/react'
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import { useEffect, useState } from 'react'
import { IISP, IRole, IUser, Icon, Translation, UserRoles } from 'src/@types'
import { getIsp } from 'src/api/isp'
import { ActionLink } from 'src/components/action'
import { STRING_DEFAULT } from 'src/constants'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { isIspRole } from 'src/utils/roles'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { getOrderedFromCells } from 'src/utils/table'

type Props = {
  row: DataTableRow<(IUser & { roleName: string; ispName?: string })[]>
  rowProps: TableRowProps
  lastName?: string
  requestedRole: IRole
  approveUser: (role: UserRoles | '', ispId: string) => void
  roleOptions: Omit<IRole, 'permissions'>[]
  countryId: string
}

export default function UsersApprovalTableRow({
  row,
  rowProps,
  lastName,
  requestedRole,
  approveUser,
  roleOptions,
  countryId
}: Props) {
  const [countryName, name, email, roleName, ispName] = getOrderedFromCells(
    ['countryName', 'name', 'email', 'roleName', 'ispName'],
    row.cells
  )
  const [role, setRole] = useState<UserRoles | ''>(requestedRole?.code ?? '')
  const [ispId, setIspId] = useState('')
  const { translate, replaceTwoTranslated } = useLocales()
  const approve = useModal()
  const [ispOptions, setIspOptions] = useState<IISP[]>([])

  useEffect(() => {
    if (approve.value && isIspRole(role)) {
      getIsp(countryId).then((res) => {
        setIspOptions(res)
        if (!ispId) setIspId(res.find((i) => i.name === ispName)?.id ?? res[0]?.id ?? '')
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId, role])

  const actions: {
    icon: Icon
    label: Translation
    onClick: () => void
    variant?: 'error' | 'primary' | 'success'
  }[] = []

  if (countryName)
    actions.push({ icon: 'Success', label: 'approve', onClick: approve.open, variant: 'success' })

  const handleApprove = () => {
    approveUser(role, ispId)
    approve.close()
  }

  return (
    <TableRow {...rowProps}>
      <TableCell style={{ verticalAlign: 'middle', width: '17.5%' }}>
        {name} {lastName ?? ''}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '10%' }}>
        {roleName ?? STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '17.5%' }}>
        {countryName ?? STRING_DEFAULT}
      </TableCell>
      <TableCell style={{ verticalAlign: 'middle', width: '17.5%' }}>
        {ispName ?? STRING_DEFAULT}
      </TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '17.5%' }}>{email}</TableCell>

      <TableCell style={{ verticalAlign: 'middle', width: '20%' }}>
        {actions.map((opt) => (
          <ActionLink
            variant={opt.variant}
            key={name + opt.label}
            onClick={opt.onClick}
            description={opt.label}
            icon={opt.icon}
          />
        ))}
      </TableCell>
      <TableCell style={{ width: '0%' }}>
        <Modal
          id="user-approval-modal"
          open={approve.value}
          modalLabel={capitalizeFirstLetter(
            replaceTwoTranslated(
              'user_approve_modal.title',
              '{{name}}',
              '{{email}}',
              `${name} ${lastName || ''}`,
              email
            )
          )}
          modalHeading={capitalizeFirstLetter(translate('user_approve_modal.content'))}
          primaryButtonText={capitalizeFirstLetter(translate('approve'))}
          secondaryButtonText={capitalizeFirstLetter(translate('cancel'))}
          onRequestClose={() => {
            if (requestedRole) setRole(requestedRole.code)
            approve.close()
          }}
          onRequestSubmit={handleApprove}
        >
          <Dropdown
            id="user-approval-dropdown"
            label={roleOptions.find((r) => r?.code === role)?.name ?? ''}
            titleText={capitalizeFirstLetter(translate('role'))}
            items={roleOptions}
            itemToString={(item) => (item ? item.name : '')}
            onChange={(e) => {
              if (e.selectedItem) setRole(e.selectedItem.code)
            }}
          />
          {isIspRole(role) && (
            <Dropdown
              id="user-approval-isp"
              label={ispOptions.find((r) => r?.id === ispId)?.name ?? ''}
              titleText={capitalizeFirstLetter(translate('isp'))}
              items={ispOptions}
              itemToString={(item) => (item ? item.name : '')}
              onChange={(e) => {
                if (e.selectedItem) setIspId(e.selectedItem.id)
              }}
            />
          )}
        </Modal>
      </TableCell>
    </TableRow>
  )
}
