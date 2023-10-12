import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ContractDetails,
  ContractStatus,
  Error404,
  Metric,
  MetricCamel,
  MetricSnake
} from 'src/@types'
import { getContractDetails } from 'src/api/contracts'
import { getDraft } from 'src/api/drafts'
import Banner from 'src/components/banner/Banner'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'
import CustomJoyride from 'src/components/custom-joyride/CustomJoyride'
import { CONTRACT_STATUS_COLORS, STRING_DEFAULT, Views } from 'src/constants'
import { useAuthorization } from 'src/hooks/useAuthorization'
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
  const { canView } = useAuthorization()
  const [contractFunds, setContractFunds] = useState('0')
  const { translate } = useLocales()
  const [contract, setContract] = useState<ContractDetails | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { getContractBalance } = useWeb3Context()
  const canViewPayments = canView(Views.payment)

  useEffect(() => {
    if (!state || !state.contractId || !state.contractStatus) Error404.redirect(navigate)

    try {
      parseContractStatus(state.contractStatus)
    } catch (err) {
      Error404.redirect(navigate)
    }

    if (state.contractStatus === ContractStatus.Draft)
      getDraft(state.contractId as string)
        .then((res) => setContract({ ...res, isDetails: false }))
        .catch(() => Error404.redirect(navigate))
    else
      getContractDetails(state.contractId as string)
        .then((res) => {
          if (parseContractStatus(res.status) !== state.contractStatus) Error404.redirect(navigate)
          setContract({ ...res, isDetails: true })
        })
        .catch(() => Error404.redirect(navigate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!state || !state.contractId || !state.contractStatus) Error404.redirect(navigate)
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

  const getMetricLabel = (name: Metric) => {
    if (!contract) return STRING_DEFAULT
    if (contract.expectedMetrics.length === 0) return STRING_DEFAULT

    if (contract.isDetails) {
      const metric = contract.expectedMetrics.find((m) => m.metricName === name)
      return `${metric?.value} ${metric?.metricUnit}`
    }
    const metric = contract.expectedMetrics.find((m) => m.name === name)
    return metric ? `${metric.value}` : STRING_DEFAULT
  }

  const getIsp = () => {
    if (!contract) return STRING_DEFAULT
    if (contract.isDetails) return contract.isp
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
      { label: getMetricLabel(Metric.Uptime), title: translate(MetricSnake.Uptime) },
      { label: getMetricLabel(Metric.Latency), title: translate(MetricSnake.Latency) },
      {
        label: getMetricLabel(Metric.DownloadSpeed),
        title: translate(MetricSnake.DownloadSpeed)
      },
      {
        label: getMetricLabel(Metric.UploadSpeed),
        title: translate(MetricSnake.UploadSpeed)
      }
    ]

    if (contract.automatic && contract.isDetails) {
      details.splice(3, 0, {
        label: `${contract.currency?.code ?? ''} ${contractFunds.toString() || '0'}`,
        title: translate('funds')
      })
      details.splice(4, 0, {
        label: `${contract.currency?.code ?? ''} ${contract.cashback?.toString() || '0'}`,
        title: translate('cashback')
      })
    }

    return details
  }

  const expectedValues: { [K in MetricCamel]: number } = contract?.isDetails
    ? {
        [MetricCamel.Uptime]: Number(
          contract?.expectedMetrics.find((f) => f.metricName === Metric.Uptime)?.value ?? 0
        ),
        [MetricCamel.Latency]: Number(
          contract?.expectedMetrics.find((f) => f.metricName === Metric.Latency)?.value ?? 0
        ),
        [MetricCamel.DownloadSpeed]: Number(
          contract?.expectedMetrics.find((f) => f.metricName === Metric.DownloadSpeed)?.value ?? 0
        ),
        [MetricCamel.UploadSpeed]: Number(
          contract?.expectedMetrics.find((f) => f.metricName === Metric.UploadSpeed)?.value ?? 0
        )
      }
    : {
        [MetricCamel.Uptime]: Number(
          contract?.expectedMetrics.find((f) => f.name === Metric.UploadSpeed)?.value ?? 0
        ),
        [MetricCamel.Latency]: Number(
          contract?.expectedMetrics.find((f) => f.name === Metric.Latency)?.value ?? 0
        ),
        [MetricCamel.DownloadSpeed]: Number(
          contract?.expectedMetrics.find((f) => f.name === Metric.DownloadSpeed)?.value ?? 0
        ),
        [MetricCamel.UploadSpeed]: Number(
          contract?.expectedMetrics.find((f) => f.name === Metric.UploadSpeed)?.value ?? 0
        )
      }

  const parsedStatus = state.contractStatus as ContractStatus
  return (
    <>
      <Helmet>
        <title> Contract: View | Gigacounts</title>
      </Helmet>
      {contract?.isDetails && <CustomJoyride name="contract_detail" />}
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
            <TabList aria-label="contract details tab list">
              <Tab>{capitalizeFirstLetter(translate('overview'))}</Tab>
              {contract.isDetails && (
                <Tab className="schools-tab">{capitalizeFirstLetter(translate('schools'))}</Tab>
              )}
              {contract.isDetails && canViewPayments && (
                <Tab className="payment-tab">{capitalizeFirstLetter(translate('payments'))}</Tab>
              )}
              <Tab>{capitalizeFirstLetter(translate('attachments'))}</Tab>
              {contract.isDetails && contract.automatic && (
                <Tab>{capitalizeFirstLetter(translate('web3_transcations'))}</Tab>
              )}
            </TabList>
            <TabPanels>
              <TabPanel>
                <OverviewTab expectedValues={expectedValues} contract={contract} />
              </TabPanel>
              {contract.isDetails && (
                <TabPanel>
                  <ConnectionTab expectedValues={expectedValues} contract={contract} />
                </TabPanel>
              )}
              {contract.isDetails && canViewPayments && (
                <TabPanel>
                  <PaymentTab contract={contract} />
                </TabPanel>
              )}
              <TabPanel>
                <AttachmentsTab attachments={contract ? contract.attachments : null} />
              </TabPanel>
              {contract.isDetails && contract.automatic && (
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
