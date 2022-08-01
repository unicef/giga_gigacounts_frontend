import Text from '../Text'
import { SchoolContainer, SchoolName } from './styles'

interface SchoolProps {
  id: string
  name: string
  location: string
  status: number
  showIcon?: boolean
  showStatus?: boolean
  schoolId?: string
  active?: boolean
  onSchoolSelected?: (schoolId: string) => void
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
  schoolId = '',
  active,
  onSchoolSelected,
}: SchoolProps): JSX.Element => {
  const onSchoolSelectedById = () => {
    onSchoolSelected?.(schoolId)
  }

  return (
    <SchoolContainer onClick={onSchoolSelectedById}>
      <SchoolName>
        {showIcon && (
          <span className={`icon icon-20 icon-school ${active ? 'icon-light-blue' : 'icon-light-grey'} `}></span>
        )}
        <Text
          textAlign="right"
          fontSize="12px"
          color={active ? 'var(--color-darkest-blue)' : 'var(--color-darkest-grey)'}
        >
          <b>{name}</b>
        </Text>
      </SchoolName>
      <Text textAlign="right" fontSize="12px" color={active ? 'var(--color-dark-blue)' : 'var(--color-darker-grey)'}>
        {id}
      </Text>
      <Text textAlign="right" fontSize="12px" color={active ? 'var(--color-dark-blue)' : 'var(--color-darker-grey)'}>
        {location}
      </Text>
      {showStatus && <span className={`icon icon-18 ${getIconColorClassName(status)} icon-plug`}></span>}
    </SchoolContainer>
  )
}

export default School
