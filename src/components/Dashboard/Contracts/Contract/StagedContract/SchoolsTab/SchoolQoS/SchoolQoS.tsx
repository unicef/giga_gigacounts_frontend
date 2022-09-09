import { Fragment } from 'react'
import Loader from 'src/components/common/Loader'
import Message, { MessageType } from 'src/components/common/Message/Message'
import { MONTHS } from 'src/consts/months'
import { useSelectedSchoolQos } from 'src/components/Dashboard/Contracts/state/hooks'
import { SCHOOLS_QOS_TABLE_HEADER } from './consts'
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
  const schoolsQos = useSelectedSchoolQos()

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
        {schoolsQos?.data === undefined && schoolsQos?.loading && <Loader />}
        {schoolsQos?.data?.length === 0 && (
          <Message
            type={MessageType.NOTICE}
            title="Quality of Service unavailable"
            description="Unfortunately this school has no connection data to display"
            showCloseBtn={false}
          />
        )}

        {!!schoolsQos?.data?.length && (
          <>
            <SchoolTableHeader>
              {SCHOOLS_QOS_TABLE_HEADER.map((header) => (
                <small key={header}>
                  <b>{header}</b>
                </small>
              ))}
            </SchoolTableHeader>
            <SchoolTableContent>
              {schoolsQos?.data?.map((item) => (
                <Fragment key={item.month}>
                  <SchoolTableSection>
                    <h6>
                      {MONTHS[item.month]} - {item.year}
                    </h6>
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
