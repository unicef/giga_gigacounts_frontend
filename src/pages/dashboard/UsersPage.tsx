import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { ICountry, IExternalUserWithId, IUser } from 'src/@types'
import { getUsers } from 'src/api/user'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { FILTER_ALL_DEFAULT, KEY_DEFAULTS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useCustomSearchParams } from 'src/hooks/useCustomSearchParams'
import { useLocales } from 'src/locales'
import { UsersTableRow, UsersTableToolbar } from 'src/sections/@dashboard/users/list'
import { removeDuplicates } from 'src/utils/arrays'
import { redirectOnError } from '../errors/handlers'

export default function UsersPage() {
  const navigate = useNavigate()
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable()
  const { user, isAdmin } = useAuthContext()
  const { countries } = useBusinessContext()

  const [countryId, setCountryId] = useState(user?.country.id ?? '')
  const [tableData, setTableData] = useState<(IExternalUserWithId | IUser)[] | null>(null)

  const [searchParams, generateSetter] = useCustomSearchParams({
    filterName: '',
    filterRole: FILTER_ALL_DEFAULT,
    filterIsp: FILTER_ALL_DEFAULT
  })
  const { filterName, filterRole, filterIsp } = searchParams

  const setFilterName = generateSetter('filterName')
  const setFilterRole = generateSetter('filterRole')
  const setFilterIsp = generateSetter('filterIsp')

  const { translate } = useLocales()

  const TABLE_HEAD = [
    { key: 'name', header: translate('name') },
    { key: 'roleName', header: translate('role') },
    { key: 'countryName', header: translate('country') },
    { key: 'ispName', header: translate('isp') },
    { key: 'email', header: translate('email') },
    { key: 'phoneNumber', header: translate('phone_number') }
  ]
  if (isAdmin) TABLE_HEAD.push({ key: 'walletAddress', header: translate('wallet.label') })

  TABLE_HEAD.push({ key: KEY_DEFAULTS[0], header: '' }, { key: KEY_DEFAULTS[1], header: '' })

  useEffect(() => {
    getUsers(countryId, [], true)
      .then(setTableData)
      .catch((err) => redirectOnError(navigate, err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId])

  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        filterName,
        filterRole,
        filterIsp
      }).map((r) => ({ ...r, roleName: r.role.name }))
    : null

  const isEmpty = Boolean(tableData && !tableData.length)
  const isNotFound = !isEmpty && Boolean(dataFiltered && !dataFiltered.length)

  const roleOptions = tableData
    ? removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...tableData.map((u) => u.role.name || FILTER_ALL_DEFAULT)
      ])
    : []

  const ispOptions = tableData
    ? removeDuplicates([
        FILTER_ALL_DEFAULT,
        ...tableData.map((u) => ('ispName' in u ? u.ispName : FILTER_ALL_DEFAULT))
      ])
    : []

  const handleFilterCountry = (countryName: string) => {
    const selectedCountry = countries.find((c) => c.name === countryName) as ICountry
    setCountryId(selectedCountry.id)
  }
  const selectedCountryName = countries?.find((c) => c.id === countryId)?.name ?? ''

  return (
    <>
      <Helmet>
        <title> Users: List | Gigacounts</title>
      </Helmet>
      <Banner
        subtitle={selectedCountryName && isAdmin ? selectedCountryName : ''}
        title={translate('stakeholders_and_collaborators')}
      />
      <CustomDataTable
        isSortable
        RowComponent={UsersTableRow}
        getRowComponentProps={(row) => ({
          lastName: 'lastName' in row ? row.lastName : undefined
        })}
        ToolbarContent={
          <UsersTableToolbar
            filterSearch={filterName}
            filterIsp={filterIsp}
            setFilterIsp={setFilterIsp}
            ispOptions={ispOptions}
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            roleOptions={roleOptions}
            countryName={countries.find((c) => c.id === countryId)?.name ?? ''}
            setFilterCountry={handleFilterCountry}
            setFilterSearch={setFilterName}
            setPage={setPage}
            countryOptions={countries.map((c) => c.name)}
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
  filterRole,
  filterIsp
}: {
  filterRole: string
  inputData: (IUser | IExternalUserWithId)[]
  filterName: string
  filterIsp: string
}) {
  if (filterName)
    inputData = inputData.filter((user) =>
      user.name.toLowerCase().includes(filterName.toLowerCase())
    )
  if (filterRole !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((user) => user.role.name === filterRole)

  if (filterIsp !== FILTER_ALL_DEFAULT)
    inputData = inputData.filter((user) => ('ispName' in user ? user.ispName === filterIsp : false))

  return inputData
}
