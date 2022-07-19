import { SchoolContainer } from './styles'

interface SchoolProps {
  schoolName?: string
  schoolId?: string
  schoolLocation?: string
  schoolStatus?: number
  showIcon?: boolean
  showStatus?: boolean
}

const School: React.FC<SchoolProps> = ({
  schoolName = 'School Name',
  schoolId = '00000000',
  schoolLocation = 'Location',
  showIcon = false,
  showStatus = false,
}): JSX.Element => {
  return (
    <SchoolContainer>
      <div className="school-name">
        {showIcon && <span className="icon icon-20 icon-school icon-light-grey"></span>}
        <small className="ellipsis">
          <b>{schoolName}</b>
        </small>
      </div>
      <small className="school-id">{schoolId}</small>
      <small className="school-region ellipsis">{schoolLocation}</small>
      {showStatus && <span className="icon icon-18 icon-plug icon-green"></span>}
    </SchoolContainer>
  )
}

export default School
