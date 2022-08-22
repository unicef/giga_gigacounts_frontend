import { useMemo, useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { ContractsContext } from './ContractsContext'
import {
  selectContract,
  selectDraft,
  selectFilteredLtaContracts,
  selectFilteredLtas,
  selectFilteredOtherContracts,
} from './selectors'

export const useLtas = () => selectFilteredLtas(useContext(ContractsContext).state)

export const useLtaContracts = (id?: string) => selectFilteredLtaContracts(id)(useContext(ContractsContext).state)

export const useOtherContracts = () => selectFilteredOtherContracts(useContext(ContractsContext).state)

export const useContract = (id?: string) => selectContract(id)(useContext(ContractsContext).state)

export const useDraft = (id?: string) => selectDraft(id)(useContext(ContractsContext).state)

export const useSelectedContract = () => {
  const { state } = useContext(ContractsContext)
  const { contractId } = useParams()
  const [searchParams] = useSearchParams()

  const draftId = useMemo(() => searchParams.get('draft') || '', [searchParams])

  const selector = useMemo(() => (draftId ? selectDraft(draftId) : selectContract(contractId)), [draftId, contractId])

  return useMemo(() => selector(state), [selector, state])
}
