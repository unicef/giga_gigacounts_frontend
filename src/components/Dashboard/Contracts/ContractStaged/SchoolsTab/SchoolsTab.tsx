import School from 'src/components/common/School/School'
import { IContractSchools } from '../../@types/ContractType'
import { SchoolsTabContainer } from './styles'

interface IContractSchoolProps {
  contractSchools: IContractSchools[]
}

const SchoolsTab: React.FC<IContractSchoolProps> = ({ contractSchools }: IContractSchoolProps): JSX.Element => {
  return (
    <SchoolsTabContainer>
      {contractSchools &&
        contractSchools.map((school, i) => (
          <School
            key={i}
            showIcon
            showStatus
            schoolName={school.name}
            schoolId={school.externalId}
            schoolLocation={school.locations}
            schoolStatus={school.connection.value}
          />
        ))}
    </SchoolsTabContainer>
  )
}

export default SchoolsTab
