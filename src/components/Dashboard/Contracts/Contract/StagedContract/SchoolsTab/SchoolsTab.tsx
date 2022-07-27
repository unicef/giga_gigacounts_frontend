import School from 'src/components/common/School/School'
import { IContractSchools } from 'src/components/Dashboard/Contracts/@types/ContractType'
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
            name={school.name}
            id={school.externalId}
            location={school.locations}
            status={school.connection.value}
          />
        ))}
    </SchoolsTabContainer>
  )
}

export default SchoolsTab
