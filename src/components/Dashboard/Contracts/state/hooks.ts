import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { IContractSchools } from 'src/types/general'
import {
  selectContract,
  selectDraft,
  selectFilteredLtaContracts,
  selectFilteredLtas,
  selectFilteredOtherContracts,
} from './selectors'
import { useContractsContext } from './useContractsContext'

export const useLtas = () => selectFilteredLtas(useContractsContext().state)

export const useLtaContracts = (id?: string) => selectFilteredLtaContracts(id)(useContractsContext().state)

export const useOtherContracts = () => selectFilteredOtherContracts(useContractsContext().state)

export const useContract = (id?: string) => selectContract(id)(useContractsContext().state)

export const useDraft = (id?: string) => selectDraft(id)(useContractsContext().state)

export const useSelectedContract = () => {
  const { state } = useContractsContext()
  const { contractId } = useParams()
  const [searchParams] = useSearchParams()

  const draftId = useMemo(() => searchParams.get('draft') || '', [searchParams])

  const selector = useMemo(() => (draftId ? selectDraft(draftId) : selectContract(contractId)), [draftId, contractId])

  return useMemo(() => selector(state), [selector, state])
}

export const useSelectedSchool = (): IContractSchools | undefined => {
  const {
    state: { selectedSchool },
  } = useContractsContext()
  const selectedContract = useSelectedContract()

  return useMemo(
    () =>
      selectedContract && selectedSchool && selectedContract?.id === selectedSchool.contractId
        ? selectedContract?.details.data?.schools.find(({ id }) => id === selectedSchool.schoolId)
        : undefined,
    [selectedContract, selectedSchool],
  )
}

export const useSchoolQoS = (schoolId?: string) => {
  const {
    state: { schoolsQos },
  } = useContractsContext()

  return schoolId === undefined ? undefined : schoolsQos[schoolId]
}

export const useSelectedSchoolQos = () => {
  const {
    state: { selectedSchool },
  } = useContractsContext()

  return useSchoolQoS(selectedSchool?.schoolId)
}
