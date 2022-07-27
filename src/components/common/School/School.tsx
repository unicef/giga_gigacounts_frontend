import Text from '../Text'
import { SchoolContainer, SchoolName } from './styles'

interface SchoolProps {
  name: string
  id: string
  location: string
  status: number
  showIcon?: boolean
  showStatus?: boolean
}

const getIconColorClassName = (value: number) => {
  switch (true) {
    case value >= 90:
      return `icon-green`
    case value < 90 && value >= 50:
      return `icon-orange`
    case value < 50 && value >= 0:
      return `icon-red`
    default:
      return `icon-light-grey`
  }
}

const School: React.FC<SchoolProps> = ({
  name,
  id,
  location,
  status,
  showIcon = false,
  showStatus = false,
}: SchoolProps): JSX.Element => {
  return (
    <SchoolContainer>
      <SchoolName>
        {showIcon && <span className="icon icon-20 icon-school icon-light-grey"></span>}
        <Text textAlign="right" fontSize="12px">
          <b>{name}</b>
        </Text>
      </SchoolName>
      <Text textAlign="right" fontSize="12px">
        {id}
      </Text>
      <Text textAlign="right" fontSize="12px">
        {location}
      </Text>
      {showStatus && <span className={`icon icon-18 ${getIconColorClassName(status)} icon-plug`}></span>}
    </SchoolContainer>
  )
}

export default School
