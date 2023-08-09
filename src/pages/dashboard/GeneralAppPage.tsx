import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { IContractPayment, IDashboardSchools } from 'src/@types'
import { getPayments } from 'src/api/payments'
import { getSchools } from 'src/api/dashboard'
import { Banner } from 'src/components/banner'
import CustomJoyride from 'src/components/custom-joyride/CustomJoyride'
import { Stack } from 'src/components/stack'
import { Views } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
import { useLocales } from 'src/locales'
import { ContractsIssuesWidget } from 'src/sections/@dashboard/contract/widgets'
import {
  OverduePaymentsWidget,
  UpcomingPaymentsWidget
} from 'src/sections/@dashboard/payment/widgets'
import { MapWidget, SchoolsIssuesWidget } from 'src/sections/@dashboard/school/widgets'
import { TakeActionWidget } from 'src/sections/@dashboard/user/widgets'


export default function GeneralAppPage() {
  const { translate } = useLocales()
  const { canView } = useAuthorization()
  const canViewPayments = canView(Views.payment)
  const canViewContracts = canView(Views.contract)
  const [payments, setPayments] = useState<IContractPayment[]>()
  const [schools, setSchools] = useState<IDashboardSchools[]>()

  useEffect(() => {
    if (canViewPayments) getPayments().then(setPayments)
  }, [canViewPayments])

  useEffect(() => {
    const fetchAndSetSchools = async () => {
      const fetchedSchools = await getSchools()
      const correctedSchools = fetchedSchools.map(school => ({
        ...school,
        lat: (parseFloat(school.lat) + (Math.random() - 0.5) * 0.02).toString(),
        lng: (parseFloat(school.lng) + (Math.random() - 0.5) * 0.02).toString()
      }))

      setSchools(correctedSchools)
    }

    if (!schools?.length) {
      fetchAndSetSchools()
    }
  }, [schools])

  return (
    <>
      <Helmet>
        <title> General: App | Gigacounts</title>
      </Helmet>
      <CustomJoyride name="home" />
      <Banner title={translate('dashboard')} />
      <Stack orientation="horizontal" style={{ width: '100%', height: '70dvh' }}>
        <MapWidget schools={schools} />
      </Stack>
      <Stack orientation="vertical" style={{ width: '100%', height: '100%' }}>
        <Stack orientation="horizontal" style={{ width: '100%', height: '42dvh' }}>
          {canViewPayments && <OverduePaymentsWidget payments={payments} />}
          {canViewContracts && <ContractsIssuesWidget />}
          {canViewContracts && <SchoolsIssuesWidget />}
        </Stack>

        <Stack orientation="horizontal" style={{ width: '100%', height: '42dvh' }}>
          {canViewPayments && <UpcomingPaymentsWidget payments={payments} />}
          <TakeActionWidget />
        </Stack>
      </Stack>
    </>
  )
}
