import { SchoolContainer } from './styles'

interface SchoolProps {
  schoolName?: string
  schoolId?: string
  schoolLocation?: string
  schoolStatus?: number
  showIcon?: boolean
  showStatus?: boolean
}

const colorIcons = ( value: number) => {
  let style: string
  switch (true) {
    case value >= 90:
      style = `icon-green`
      break
    case value < 90 && value >= 50:
      style = `icon-orange`
      break
    case value < 50 && value >= 0:
      style = `icon-red`
      break
    default:
      style = `icon-light-grey`
      break
  }
  return style
}

const School: React.FC<SchoolProps> = ({
  schoolName = 'School Name',
  schoolId = '00000000',
  schoolLocation = 'Location',
  showIcon = false,
  showStatus = false,
  schoolStatus = 0
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
      {showStatus && <span className={`icon icon-18 ${colorIcons(schoolStatus)} icon-plug`}></span>}
    </SchoolContainer>
  )
}

export default School
