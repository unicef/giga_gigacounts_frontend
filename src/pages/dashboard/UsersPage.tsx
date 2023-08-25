import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { ICountry, IUser } from 'src/@types'
import { getUsers } from 'src/api/user'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomDataTable from 'src/components/data-table/CustomDataTable'
import { useTable } from 'src/components/table'
import { KEY_DEFAULTS } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useLocales } from 'src/locales'
import { UsersTableRow, UsersTableToolbar } from 'src/sections/@dashboard/users/list'
import { redirectOnError } from '../errors/handlers'

export default function UsersPage() {
  const navigate = useNavigate()
  const { page, rowsPerPage, setPage, setRowsPerPage } = useTable()
  const { user } = useAuthContext()
  const { countries } = useBusinessContext()

  const [countryId, setCountryId] = useState(user?.country.id ?? '')
  const [tableData, setTableData] = useState<IUser[] | null>(null)
  const [filterName, setFilterName] = useState('')

  const { translate } = useLocales()

  const TABLE_HEAD = [
    { key: 'countryName', header: translate('country') },
    { key: 'completeName', header: translate('name') },
    { key: 'email', header: translate('email') },
    { key: 'role', header: translate('role') },
    { key: 'walletAddress', header: translate('wallet.label') },
    { key: KEY_DEFAULTS[0], header: '' },
    { key: KEY_DEFAULTS[1], header: '' }
  ]

  useEffect(() => {
    getUsers(countryId, [])
      .then(setTableData)
      .catch((err) => redirectOnError(navigate, err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId])

  const dataFiltered = tableData
    ? applyFilter({
        inputData: tableData,
        filterName
      })
    : null

  const isNotFound = Boolean(dataFiltered && !dataFiltered.length)

  const handleFilterCountry = (countryName: string) => {
    const selectedCountry = countries.find((c) => c.name === countryName) as ICountry
    setCountryId(selectedCountry.id)
  }

  return (
    <>
      <Helmet>
        <title> Users: List | Gigacounts</title>
      </Helmet>
      <Banner title={translate('users')} />
      <CustomDataTable
        isSortable
        RowComponent={UsersTableRow}
        getRowComponentProps={(row) => ({
          role: row.role
        })}
        ToolbarContent={
          <UsersTableToolbar
            countryName={countries.find((c) => c.id === countryId)?.name ?? ''}
            setFilterCountry={handleFilterCountry}
            setFilterSearch={setFilterName}
            setPage={setPage}
            countryOptions={countries.map((c) => c.name)}
          />
        }
        data={dataFiltered}
        page={page}
        setPage={setPage}
        isNotFound={isNotFound}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        tableHead={TABLE_HEAD}
        tableName="users-list"
        noDataText="table_no_data.users"
        title="Users table"
      />
    </>
  )
}

function applyFilter({ inputData, filterName }: { inputData: IUser[]; filterName: string }) {
  if (filterName)
    inputData = inputData.filter(
      (school) => school.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )
  return inputData
}
