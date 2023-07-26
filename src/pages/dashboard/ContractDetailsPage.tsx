import { TabPanels as CarbonTabPanels, Tab, TabList, TabPanel, Tabs } from '@carbon/react'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router-dom'
import { ContractDetails, ContractStatus } from 'src/@types'
import { getContractDetails } from 'src/api/contracts'
import { getDraft } from 'src/api/drafts'
import Banner from 'src/components/banner/Banner'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'
import { STRING_DEFAULT } from 'src/constants/display-defaults'
import { CONTRACT_STATUS_COLORS } from 'src/constants/status'
import { useLocales } from 'src/locales'
import {
  AttachmentsTab,
  ConnectionTab,
  OverviewTab,
  PaymentTab
} from 'src/sections/@dashboard/contract/details'
import { formatDate } from 'src/utils/date'
import { parseContractStatus } from 'src/utils/status'
import { capitalizeFirstLetter } from 'src/utils/strings'

const TabPanels = ({ children }: { children: React.ReactNode[] }) => (
  // @ts-ignore
  <CarbonTabPanels>{children}</CarbonTabPanels>
)

export default function ContractDetailsPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!state || !state.contractId || !state.contractStatus) navigate('/404')
    if (state.contractStatus === ContractStatus.Draft)
      getDraft(state.contractId).then((res) => setContract({ ...res, isContract: false }))
    else
      getContractDetails(state.contractId).then((res) => setContract({ ...res, isContract: true }))
  }, [state, navigate])

  const { translate } = useLocales()

  const [contract, setContract] = useState<ContractDetails | null>(null)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleTabChange = (evt: { selectedIndex: number }) => {
    setSelectedIndex(evt.selectedIndex)
  }

  const getMetricLabel = (name: 'Uptime' | 'Download speed' | 'Upload speed' | 'Latency') => {
    if (!contract) return STRING_DEFAULT
    if (contract.expectedMetrics.length === 0) return STRING_DEFAULT

    if (contract.isContract) {
      const metric = contract.expectedMetrics.find((m) => m.metricName === name)
      return `${metric?.value} ${metric?.metricUnit}`
    }
    const metric = contract.expectedMetrics.find((m) => m.name === name)
    return metric ? `${metric.value}` : STRING_DEFAULT
  }

  const getIsp = () => {
    if (!contract) return STRING_DEFAULT
    if (contract.isContract) return contract.isp
    return contract.isp?.name ?? STRING_DEFAULT
  }

  const parsedStatus = parseContractStatus(state.contractStatus)
  return (
    <>
      <Helmet>
        <title> Contract: View | Gigacounts</title>
      </Helmet>

      <CustomBreadcrumbs />
      {contract && (
        <>
          <Banner
            label={{
              text: capitalizeFirstLetter(translate(`constant_status.contract.${parsedStatus}`)),
              color: CONTRACT_STATUS_COLORS[parsedStatus]
            }}
            title={contract.name}
            subtitle={`ID: ${contract.id}`}
            topThreeDetails={[
              {
                label: contract.startDate ? formatDate(contract.startDate, '/') : STRING_DEFAULT,
                title: translate('start_date')
              },
              {
                label: contract.endDate ? formatDate(contract.endDate, '/') : STRING_DEFAULT,
                title: translate('end_date')
              },
              {
                label: contract.launchDate ? formatDate(contract.launchDate, '/') : STRING_DEFAULT,
                title: translate('launch_date')
              }
            ]}
            details={[
              { label: getIsp(), title: translate('isp') },
              {
                label: String(contract.schools.length || STRING_DEFAULT),
                title: translate('schools')
              },
              {
                label: Number(contract.budget)
                  ? `${contract.currency?.code ?? ''} ${contract.budget}`
                  : STRING_DEFAULT,
                title: translate('budget')
              },
              { label: getMetricLabel('Uptime'), title: translate('uptime') },
              { label: getMetricLabel('Latency'), title: translate('latency') },
              {
                label: getMetricLabel('Download speed'),
                title: translate('download_speed')
              },
              {
                label: getMetricLabel('Upload speed'),
                title: translate('upload_speed')
              }
            ]}
          />

          <Tabs
            selectedIndex={selectedIndex}
            aria-label="schools and payments"
            onChange={handleTabChange}
          >
            <TabList
              aria-label="schools or payments tab list"
              title=""
              leftOverflowButtonProps={{}}
              rightOverflowButtonProps={{}}
            >
              <Tab>{capitalizeFirstLetter(translate('overview'))}</Tab>
              {contract.isContract && <Tab>{capitalizeFirstLetter(translate('schools'))}</Tab>}
              {contract.isContract && <Tab>{capitalizeFirstLetter(translate('payments'))}</Tab>}
              <Tab>{capitalizeFirstLetter(translate('attachments'))}</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <OverviewTab changeTab={setSelectedIndex} contract={contract} />
              </TabPanel>
              {contract.isContract && (
                <TabPanel>
                  <ConnectionTab id={contract.id} />
                </TabPanel>
              )}
              {contract.isContract && (
                <TabPanel>
                  <PaymentTab contract={contract} />
                </TabPanel>
              )}
              <TabPanel>
                <AttachmentsTab attachments={contract.attachments} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </>
  )
}
