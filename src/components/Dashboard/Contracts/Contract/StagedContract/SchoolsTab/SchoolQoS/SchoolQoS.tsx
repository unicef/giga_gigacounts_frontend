import { Fragment, useMemo } from 'react'
import Message, { MessageType } from 'src/components/common/Message/Message'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
import { MONTHS } from 'src/consts/months'
import {
  SchoolContent,
  SchoolHeader,
  SchoolQoSContainer,
  SchoolTableContent,
  SchoolTableHeader,
  SchoolTableRow,
  SchoolTableRowMetric,
  SchoolTableSection,
} from './styles'

const SchoolsQoS: React.FC = (): JSX.Element => {
  const {
    state: { noSchoolMetricData, schoolsQos },
  } = useContractsContext()

  const schoolQosTableHeader = useMemo(
    () => [
      { id: 1, title: 'Latency' },
      { id: 2, title: 'Uptime' },
      { id: 3, title: 'Download' },
      { id: 4, title: 'Upload' },
    ],
    [],
  )

  return (
    <SchoolQoSContainer>
      <SchoolHeader>
        <h5>Quality of Service Summary</h5>
        <small>
          In this section you can see the quality of service provided by the internet provider for the selected school
          categorized by period and type of metric
        </small>
      </SchoolHeader>
      <SchoolContent>
        {noSchoolMetricData ? (
          <Message
            type={MessageType.NOTICE}
            title="Quality of Service unavailable"
            description="Unfortunately this school has no connection data to display"
            showCloseBtn={false}
          />
        ) : (
          <>
            <SchoolTableHeader>
              {schoolQosTableHeader.map((header) => (
                <small key={header.id}>
                  <b>{header.title}</b>
                </small>
              ))}
            </SchoolTableHeader>
            <SchoolTableContent>
              {schoolsQos.map((item) => (
                <Fragment key={item.month}>
                  <SchoolTableSection>
                    <h6>{MONTHS[item.month]}</h6>
                  </SchoolTableSection>
                  <></>
                  <SchoolTableRow>
                    {Object.entries(item.metrics).map(([key, metric]) => (
                      <SchoolTableRowMetric key={key}>
                        <small>
                          {metric.value}
                          {metric.unit}
                        </small>
                      </SchoolTableRowMetric>
                    ))}
                  </SchoolTableRow>
                </Fragment>
              ))}
            </SchoolTableContent>
          </>
        )}
      </SchoolContent>
    </SchoolQoSContainer>
  )
}

export default SchoolsQoS
