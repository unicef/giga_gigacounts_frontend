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
    state: { schoolQosDate, schoolQosMedianValue, schoolQosMetricName, noSchoolMetricData },
  } = useContractsContext()

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
              {schoolQosMetricName &&
                schoolQosMetricName.map((name) => (
                  <small key={name}>
                    <b>{name}</b>
                  </small>
                ))}
            </SchoolTableHeader>
            <SchoolTableContent>
              {schoolQosDate &&
                schoolQosDate.map((month, index) => (
                  <>
                    <SchoolTableSection>
                      <h6>{month}</h6>
                    </SchoolTableSection>
                    <SchoolTableRow>
                      {schoolQosMedianValue &&
                        [schoolQosMedianValue?.[index]].map((median) =>
                          median.map((el) => (
                            <SchoolTableRowMetric key={`${Math.random()}`}>
                              <small>{el}</small>
                            </SchoolTableRowMetric>
                          )),
                        )}
                    </SchoolTableRow>
                  </>
                ))}
            </SchoolTableContent>
          </>
        )}
      </SchoolContent>
    </SchoolQoSContainer>
  )
}

export default SchoolsQoS
