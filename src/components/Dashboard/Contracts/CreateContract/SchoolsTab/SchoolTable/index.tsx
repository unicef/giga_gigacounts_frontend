import { useCallback, useMemo } from 'react'
import { ISchool } from 'src/api/school'
import {
  SchoolsTableHeader,
  NameHeaderLabel,
  IdHeaderLabel,
  TableRow,
  SelectButton,
  SchoolNameContainer,
  SchoolIDContainer,
  MainContainer,
  SchoolTableContent,
} from './styles'
import { sortSchools } from './utils'

interface SchoolTableProps {
  schools: ISchool[]
  onSelect: (id: string) => void
  selectedSchoolsIds: string[]
}

const SchoolTable = ({ schools, onSelect, selectedSchoolsIds }: SchoolTableProps) => {
  const sortedSchools = useMemo(
    () => schools.map((school) => ({ ...school, selected: selectedSchoolsIds.includes(school.id) })).sort(sortSchools),
    [schools, selectedSchoolsIds],
  )

  const onButtonSelect = useCallback(
    (id: string) => () => {
      onSelect(id)
    },
    [onSelect],
  )

  return (
    <MainContainer>
      <SchoolsTableHeader>
        <NameHeaderLabel>School Name</NameHeaderLabel>
        <IdHeaderLabel>ID</IdHeaderLabel>
      </SchoolsTableHeader>
      <SchoolTableContent>
        {sortedSchools.map((school) => (
          <TableRow key={school.id}>
            <SelectButton
              type="checkbox"
              onChange={onButtonSelect(school.id)}
              checked={school.selected}
              value={school.id}
            />
            <SchoolNameContainer>{school.name}</SchoolNameContainer>
            <SchoolIDContainer>{school.external_id}</SchoolIDContainer>
          </TableRow>
        ))}
      </SchoolTableContent>
    </MainContainer>
  )
}

export default SchoolTable
