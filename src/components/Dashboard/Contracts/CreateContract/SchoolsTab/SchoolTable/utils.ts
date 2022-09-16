import { ISchool } from 'src/api/school'

type SelectableSchool = ISchool & { selected: boolean }

export const sortSchools = (a: SelectableSchool, b: SelectableSchool) => {
  if (a.selected === b.selected) {
    return a.name >= b.name ? 1 : -1
  }

  return b.selected ? 1 : -1
}
