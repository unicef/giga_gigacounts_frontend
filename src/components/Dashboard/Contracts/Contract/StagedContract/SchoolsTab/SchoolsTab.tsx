import { useParams } from 'react-router-dom'
import School from 'src/components/common/School/School'
import { IContractSchools } from 'src/types/general'
import { useContractsContext } from '../../../state/useContractsContext'
import SchoolsQoS from './SchoolQoS/SchoolQoS'
import { SchoolsTabRow, SchoolTabContainer } from './styles'
interface IContractSchoolProps {
  contractSchools: IContractSchools[]
}

const SchoolsTab: React.FC<IContractSchoolProps> = ({ contractSchools }: IContractSchoolProps): JSX.Element => {
  let { id } = useParams()
  const {
    state: { selectedSchool },
    actions: { setSelectedSchool },
  } = useContractsContext()

  const onSchoolSelected = (schoolId: string) => {
    if (id) setSelectedSchool(schoolId, id)
  }

  return (
    <SchoolTabContainer>
      <div>
        {contractSchools &&
          contractSchools.map((school) => (
            <SchoolsTabRow key={school.id} active={selectedSchool?.schoolId === school.id}>
              <School
                showIcon
                showStatus
                name={school.name}
                id={school.externalId}
                location={school.locations}
                status={school.connection.value}
                schoolId={school.id}
                active={selectedSchool?.schoolId === school.id}
                onSchoolSelected={onSchoolSelected}
              />
            </SchoolsTabRow>
          ))}
      </div>
      {selectedSchool?.schoolId && <SchoolsQoS />}
    </SchoolTabContainer>
  )
}

export default SchoolsTab
