import { useMemo } from 'react'
import School from 'src/components/common/School/School'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
import SchoolsQoS from './SchoolQoS/SchoolQoS'
import { SchoolsRowWrapper, SchoolsTabRow, SchoolTabContainer } from './styles'

const SchoolsTab: React.FC = (): JSX.Element => {
  const {
    state: { selectedSchool },
    actions: { setSelectedSchool },
  } = useContractsContext()

  const selectedContract = useSelectedContract()

  const contractSchools = useMemo(
    () => selectedContract?.details.data?.schools,
    [selectedContract?.details.data?.schools],
  )

  return (
    <SchoolTabContainer>
      <SchoolsRowWrapper>
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
                onSchoolSelected={setSelectedSchool}
              />
            </SchoolsTabRow>
          ))}
      </SchoolsRowWrapper>
      {selectedSchool?.schoolId && <SchoolsQoS />}
    </SchoolTabContainer>
  )
}

export default SchoolsTab
