import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { ContractDetails, ContractStatus } from 'src/@types'
import { getContractDetails } from 'src/api/contracts'
import { getDraft } from 'src/api/drafts'
import Banner from 'src/components/banner/Banner'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'
import { STRING_DEFAULT, CONTRACT_STATUS_COLORS } from 'src/constants'
import { useWeb3Context } from 'src/hooks/useWeb3Context'
import { useLocales } from 'src/locales'
import {
  AttachmentsTab,
  ConnectionTab,
  OverviewTab,
  PaymentTab,
  Web3TransactionsTab
} from 'src/sections/@dashboard/contract/view'
import { formatDate } from 'src/utils/date'
import { parseContractStatus } from 'src/utils/status'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function ContractDetailsPage() {
  const state = useParams()
  const navigate = useNavigate()
  const [contractFunds, setContractFunds] = useState('0')
  const { translate } = useLocales()
  const [contract, setContract] = useState<ContractDetails | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { getContractBalance } = useWeb3Context()

  useEffect(() => {
    if (!state || !state.contractId || !state.contractStatus) navigate('/404')

    try {
      parseContractStatus(state.contractStatus)
    } catch (err) {
      navigate('/404')
    }
    if (state.contractStatus === ContractStatus.Draft)
      getDraft(state.contractId as string)
        .then((res) => setContract({ ...res, isContract: false }))
        .catch(() => navigate('/404'))
    else
      getContractDetails(state.contractId as string)
        .then((res) => setContract({ ...res, isContract: true }))
        .catch(() => navigate('/404'))
  }, [state, navigate])

  useEffect(() => {
    if (!state || !state.contractId || !state.contractStatus) navigate('/404')
    if (
      contract &&
      contract.automatic &&
      state.contractStatus !== ContractStatus.Draft &&
      state.contractStatus !== ContractStatus.Sent
    )
      getContractBalance(contract?.id).then((funds: string) => {
        setContractFunds(`${funds}`)
      })
  }, [contract, state, navigate, getContractBalance])

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

  const getBannerDetails = () => {
    if (!contract) return []
    const details = [
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
    ]

    if (contract.automatic && contract.isContract) {
      details.splice(3, 0, { label: `${contract.currency?.code ?? ''} ${contractFunds.toString() || '0'}`,  title: translate('funds') })
      details.splice(4, 0, { label: `${contract.currency?.code ?? ''} ${contract.cashback?.toString() || '0'}`, title: translate('cashback') })
    }

    return details
  }

  const expectedValues = contract?.isContract
    ? {
        uptime: Number(
          contract?.expectedMetrics.find((f) => f.metricName === 'Uptime')?.value ?? 0
        ),
        latency: Number(
          contract?.expectedMetrics.find((f) => f.metricName === 'Latency')?.value ?? 0
        ),
        downloadSpeed: Number(
          contract?.expectedMetrics.find((f) => f.metricName === 'Download speed')?.value ?? 0
        ),
        uploadSpeed: Number(
          contract?.expectedMetrics.find((f) => f.metricName === 'Upload speed')?.value ?? 0
        )
      }
    : {
        uptime: Number(contract?.expectedMetrics.find((f) => f.name === 'Uptime')?.value ?? 0),
        latency: Number(contract?.expectedMetrics.find((f) => f.name === 'Latency')?.value ?? 0),
        downloadSpeed: Number(
          contract?.expectedMetrics.find((f) => f.name === 'Download speed')?.value ?? 0
        ),
        uploadSpeed: Number(
          contract?.expectedMetrics.find((f) => f.name === 'Upload speed')?.value ?? 0
        )
      }

  const parsedStatus = state.contractStatus as ContractStatus
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
            details={getBannerDetails()}
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
              {contract.isContract && contract.automatic && (
                <Tab>{capitalizeFirstLetter(translate('web3_transcations'))}</Tab>
              )}
            </TabList>
            <TabPanels>
              <TabPanel>
                <OverviewTab expectedValues={expectedValues} contract={contract} />
              </TabPanel>
              {contract.isContract && (
                <TabPanel>
                  <ConnectionTab expectedValues={expectedValues} contract={contract} />
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
              {contract.isContract && contract.automatic && (
                <TabPanel>
                  <Web3TransactionsTab contract={contract} />
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </>
      )}
    </>
  )
}
