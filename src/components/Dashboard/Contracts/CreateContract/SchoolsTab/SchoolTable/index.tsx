import { useCallback, useRef } from 'react'
import {
  SchoolsTableHeader,
  NameHeaderLabel,
  IdHeaderLabel,
  TableRow,
  SelectButton,
  SchoolNameContainer,
  SchoolIDContainer,
  MainContainer,
} from './styles'
import { ISchool } from 'src/api/school'

interface SchoolTableProps {
  schools: ISchool[]
  onSelect: (id: string) => void
  selectedSchools: { id: string }[]
}

const SchoolTable = ({ schools, onSelect, selectedSchools }: SchoolTableProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onButtonSelect = useCallback(
    (id: string) => () => {
      onSelect(id)
    },
    [onSelect],
  )

  const isSelected = (id: string) => {
    return selectedSchools.findIndex((school) => school.id === id) >= 0
  }

  return (
    <MainContainer>
      <SchoolsTableHeader>
        <NameHeaderLabel>School Name</NameHeaderLabel>
        <IdHeaderLabel>ID</IdHeaderLabel>
      </SchoolsTableHeader>
      {schools.map((school) => (
        <TableRow key={school.id}>
          <SelectButton
            type="checkbox"
            ref={inputRef}
            onChange={onButtonSelect(school.id)}
            checked={isSelected(school.id)}
            value={school.id}
          />
          <SchoolNameContainer>{school.name}</SchoolNameContainer>
          <SchoolIDContainer>{school.external_id}</SchoolIDContainer>
        </TableRow>
      ))}
    </MainContainer>
  )
}

export default SchoolTable
