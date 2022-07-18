import { IContractSchools } from '../../@types/ContractType'
import School from '../../../../common/School/School'
import { SchoolsTabContainer } from './styles'

interface IContractSchoolProps {
  contractSchools: IContractSchools[]
}

const SchoolsTab: React.FC<IContractSchoolProps> = ({ contractSchools }): JSX.Element => {
  return (
    <SchoolsTabContainer>
      {contractSchools &&
        contractSchools.map((school, i) => (
          <School 
            showIcon = {true}
            showStatus = {true}
            schoolName = {school.name}
            schoolID = {school.id}
            schoolLocation = {school.locations}
          />
        ))}

    </SchoolsTabContainer>
  )
}

export default SchoolsTab
