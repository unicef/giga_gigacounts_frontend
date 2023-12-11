import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { IRole, IUser, UserRoles } from 'src/@types'
import { approveUser, getUserRoles, getUsersApprovalsRequest } from 'src/api/user'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useSnackbar } from 'src/hooks/useSnackbar'
import { useLocales } from 'src/locales'
import {
  UsersApprovalTableRow,
  UsersApprovalTableToolbar
} from 'src/sections/@dashboard/users/approval'
import { removeDuplicates } from 'src/utils/arrays'
import { redirectOnError } from 'src/utils/errorHandlers'

export default function UsersApprovalPage() {
  const navigate = useNavigate()
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable()
  const { pushSuccess, pushError } = useSnackbar()
  const { countries } = useBusinessContext()

  const [tableData, setTableData] = useState<(IUser & { roleName: string })[] | null>(null)
  const [userRoles, setUserRoles] = useState<Omit<IRole, 'permissions'>[] | null>(null)

  const [searchParams, generateSetter] = useCustomSearchParams({
    filterName: '',
    filterRole: FILTER_ALL_DEFAULT,
    filterIsp: FILTER_ALL_DEFAULT
  })
  const { filterName, filterRole } = searchParams

  const setFilterName = generateSetter('filterName')
  const setFilterRole = generateSetter('filterRole')

  const { translate } = useLocales()

  const TABLE_HEAD = [
    { key: 'name', header: translate('name') },
    { key: 'roleName', header: translate('role') },
    { key: 'countryName', header: translate('country') },
    { key: 'ispName', header: translate('isp') },
    { key: 'email', header: translate('email') },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' }
  ]

  useEffect(() => {
    getUsersApprovalsRequest()
      .then(setTableData)
      .catch((err) => redirectOnError(navigate, err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getUserRoles()
      .then(setUserRoles)
      .catch((err) => redirectOnError(navigate, err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        filterName,
        filterRole
      }).map((r) => ({ ...r, roleName: r.role?.name }))
    : null

  const isEmpty = Boolean(tableData && !tableData.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const tableRoleOptions = tableData
    ? removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...tableData.map((u) => u.role?.name || FILTER_ALL_DEFAULT)
      ])
    : []

  const handleApprove = (id: string) => (role: UserRoles | '', ispId: string) => {
    if (role === '') return
    const prevUsers = tableData
    setTableData((prev) => (prev ? prev.filter((u) => id !== u.id) : null))
    approveUser(id, role, ispId)
      .then(() => pushSuccess('push.user_approved'))
      .catch(() => {
        pushError('push.user_approved_error')
        setTableData(prevUsers)
      })
  }

  const filterOutRoles = [UserRoles.GIGA_ADMIN, UserRoles.GIGA_VIEW_ONLY]
  const roleOptions = userRoles
    ? removeDuplicates(userRoles)
        .filter((r) => r?.code && !filterOutRoles.includes(r?.code))
        .sort((a, b) => a.name.localeCompare(b.name))
    : []

  return (
    <>
      <Helmet>
        <title> User Approval: List | Gigacounts</title>
      </Helmet>
      <Banner title={translate('user_approval')} />
      <CustomDataTable
        isSortable
        RowComponent={UsersApprovalTableRow}
        getRowComponentProps={(row) => ({
          lastName: 'lastName' in row ? row.lastName : undefined,
          requestedRole: row.role,
          roleOptions,
          approveUser: handleApprove(row.id),
          countryId: countries.find((c) => c.name === row.countryName)?.id ?? ''
        })}
        ToolbarContent={
          <UsersApprovalTableToolbar
            filterSearch={filterName}
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            roleOptions={tableRoleOptions}
            setFilterSearch={setFilterName}
            setPage={setPage}
          />
        }
        getDataKey={(row) => row.email}
        data={dataFiltered}
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        isEmpty={isEmpty}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="users-list"
        emptyText="table_no_data.users"
      />
    </>
  )
}

function applyFilter({
  inputData,
  filterName,
  filterRole
}: {
  filterRole: string
  inputData: (IUser & { roleName: string })[]
  filterName: string
}) {
  if (filterName)
    inputData = inputData.filter((user) =>
      user.name.toLowerCase().includes(filterName.toLowerCase())
    )
  if (filterRole !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((user) => user.role.name === filterRole)

  return inputData
}
