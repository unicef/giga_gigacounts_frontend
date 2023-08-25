import { Search } from '@carbon/icons-react'
import { Column, ComboBox, Grid } from '@carbon/react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { IContractPayment, ICountry, IDashboardContract, IDashboardSchools } from 'src/@types'
import { getContractsWithIssues, getSchools } from 'src/api/dashboard'
import { getPayments } from 'src/api/payments'
import { useAuthContext } from 'src/auth/useAuthContext'
import { Banner } from 'src/components/banner'
import CustomJoyride from 'src/components/custom-joyride/CustomJoyride'
import { Stack } from 'src/components/stack'
import { Views } from 'src/constants'
import { useBusinessContext } from 'src/context/business/BusinessContext'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useLocales } from 'src/locales'
import { ContractsIssuesWidget } from 'src/sections/@dashboard/contract/widgets'
import {
  OverduePaymentsWidget,
  UpcomingPaymentsWidget
} from 'src/sections/@dashboard/payment/widgets'
import { MapWidget, SchoolsIssuesWidget } from 'src/sections/@dashboard/school/widgets'
import { TakeActionWidget } from 'src/sections/@dashboard/user/widgets'
import { useTheme } from 'src/theme'

export default function GeneralAppPage() {
  const { spacing, palette } = useTheme()
  const { translate } = useLocales()
  const { canView } = useAuthorization()
  const canViewPayments = canView(Views.payment)
  const canViewContracts = canView(Views.contract)
  const [payments, setPayments] = useState<IContractPayment[]>()
  const [schools, setSchools] = useState<IDashboardSchools[]>()
  const [contracts, setContracts] = useState<IDashboardContract[] | null>(null)
  const { user, isAdmin } = useAuthContext()
  const { countries } = useBusinessContext()
  const [countryId, setCountryId] = useState(user?.country.id)

  useEffect(() => {
    if (canViewPayments)
      getPayments(countryId)
        .then(setPayments)
        .catch(() => setPayments(undefined))
  }, [canViewPayments, countryId])

  useEffect(() => {
    getSchools(countryId)
      .then(setSchools)
      .catch(() => setSchools(undefined))
  }, [countryId])

  useEffect(() => {
    getContractsWithIssues(countryId)
      .then(setContracts)
      .catch(() => setContracts(null))
  }, [countryId])

  return (
    <>
      <Helmet>
        <title> General: App | Gigacounts</title>
      </Helmet>
      {user && <CustomJoyride name="home" />}
      <Banner title={translate('dashboard')} />

      <div style={{ backgroundColor: palette.background.neutral }}>
        {isAdmin && (
          <Stack
            orientation="horizontal"
            alignItems="center"
            justifyContent="flex-start"
            style={{
              paddingBottom: spacing.md,
              width: '100%'
            }}
          >
            <Search
              color={palette.text.disabled}
              size={16}
              width={48}
              height={48}
              style={{
                borderBottom: `1px solid ${palette.grey[380]}`,
                padding: spacing.md
              }}
            />
            <div style={{ width: '100%' }}>
              <ComboBox
                className="dashboard-search"
                id="dashboard-country-filter"
                size="lg"
                onChange={({ selectedItem }: { selectedItem: ICountry | null }) => {
                  setCountryId(selectedItem?.id ?? user?.country.id)
                }}
                initialSelectedItem={user?.country}
                items={[...countries].sort((a, b) => a.name.localeCompare(b.name))}
                itemToString={(c: ICountry) => (c ? c.name : '')}
                placeholder={translate('search_country')}
              />
            </div>
          </Stack>
        )}

        <Grid fullWidth className="gap-16px" condensed>
          <Column md={spacing.xs} xlg={spacing.xs}>
            <MapWidget schools={schools} />
          </Column>
          {canViewContracts && (
            <Column md={spacing.xs} xlg={spacing.xs}>
              <ContractsIssuesWidget contracts={contracts} />
            </Column>
          )}
          <Column md={spacing.xs} xlg={spacing.xs}>
            <TakeActionWidget />
          </Column>
          {canViewContracts && (
            <Column md={spacing.xs} xlg={spacing.xs}>
              <SchoolsIssuesWidget schools={schools?.filter((s) => s.connectivity_issues)} />
            </Column>
          )}
          {canViewPayments && (
            <Column md={spacing.xs} xlg={spacing.xs}>
              <UpcomingPaymentsWidget payments={payments} />
            </Column>
          )}
          {canViewPayments && (
            <Column md={spacing.xs} xlg={spacing.xs}>
              <OverduePaymentsWidget payments={payments} />
            </Column>
          )}
        </Grid>
      </div>
    </>
  )
}
