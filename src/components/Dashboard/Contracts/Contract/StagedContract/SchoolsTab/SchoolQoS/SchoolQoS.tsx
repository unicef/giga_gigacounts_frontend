import React, { useState } from 'react'
import Message, { MessageType } from 'src/components/common/Message/Message'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
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
    state: { schoolQosDate, schoolQosMedianValue, schoolQosMetricName },
  } = useContractsContext()

  const [noSchoolMetricData, setNoSchoolMetricData] = useState(false)
  
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
        {noSchoolMetricData && (
          <Message
          type={MessageType.NOTICE}
          title='Quality of Service unavailable'
          description='Unfortunately this school has no connection data to display'
          onClose={() => setNoSchoolMetricData(false)}
          />
        )}
        <SchoolTableHeader>
          <>
            {schoolQosMetricName &&
              schoolQosMetricName.map((name, i) => (
                <small key={i}>
                  <b>{name}</b>
                </small>
              ))}
          </>
        </SchoolTableHeader>
        <SchoolTableContent>
          {schoolQosDate &&
            schoolQosDate.map((month, i) => (
              <SchoolTableSection key={i}>
                <h6>{month}</h6>
              </SchoolTableSection>
            ))}
          <SchoolTableRow>
            <>
              {schoolQosMedianValue &&
                schoolQosMedianValue.map((value, i) => (
                  <SchoolTableRowMetric key={i} className="table-line-metric">
                    <small>{value}</small>
                  </SchoolTableRowMetric>
                ))}
            </>
          </SchoolTableRow>
        </SchoolTableContent>
      </SchoolContent>
    </SchoolQoSContainer>
  )
}

export default SchoolsQoS
