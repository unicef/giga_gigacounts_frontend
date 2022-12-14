import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  SchoolsNumberBadge,
} from './styles'
import { sortSchools } from './utils'

interface SchoolTableProps {
  schools: ISchool[]
  onSelect: (id: string) => void
  selectedSchoolsIds: string[]
}

const SchoolTable = ({ schools, onSelect, selectedSchoolsIds }: SchoolTableProps) => {
  const tableRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState<number | undefined>(undefined)
  const sortedSchools = useMemo(
    () => schools.map((school) => ({ ...school, selected: selectedSchoolsIds.includes(school.id) })).sort(sortSchools),
    [schools, selectedSchoolsIds],
  )

  const onButtonSelect = useCallback(
    (id: string) => () => {
      setScrollTop(tableRef.current?.scrollTop)

      onSelect(id)
    },
    [onSelect],
  )

  useEffect(() => {
    if (scrollTop !== undefined && tableRef.current !== null) {
      tableRef.current.scrollTop = scrollTop
      setScrollTop(undefined)
    }
  }, [scrollTop])

  return (
    <MainContainer>
      <SchoolsTableHeader>
        <SchoolsNumberBadge title="Number of selected schools">{selectedSchoolsIds.length}</SchoolsNumberBadge>
        <NameHeaderLabel>School Name</NameHeaderLabel>
        <IdHeaderLabel>ID</IdHeaderLabel>
      </SchoolsTableHeader>
      <SchoolTableContent ref={tableRef}>
        {sortedSchools.map((school) => (
          <TableRow key={school.id} htmlFor={`school${school.id}`}>
            <SelectButton
              type="checkbox"
              onChange={onButtonSelect(school.id)}
              checked={school.selected}
              value={school.id}
              id={`school${school.id}`}
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
