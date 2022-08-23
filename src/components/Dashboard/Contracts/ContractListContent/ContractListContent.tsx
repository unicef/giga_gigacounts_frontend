import { useCallback, useMemo, useRef } from 'react'
import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems'
import ContractLoader from './ContractLoader/ContractLoader'
import { ContractListContainer } from './styles'
import ContractItem from './ContractLtaListItems/ContractItem/ContractItem'
import { useContractsContext } from '../state/useContractsContext'
import { useLtas, useOtherContracts, useSelectedContract } from '../state/hooks'
import { NEW_CONTRACT } from '../state/initial-state'
import { useMutiToggle } from 'src/hooks/useMultiToggle'

const ContractListContent: React.FC = (): JSX.Element => {
  const { state } = useContractsContext()
  const { loading } = state

  const ltas = useLtas()

  const contracts = useOtherContracts()

  const ref = useRef<HTMLDivElement>(null)

  const newContract = useMemo(() => state.newContract && state.newContract.ltaId === undefined, [state.newContract])

  const selectedContract = useSelectedContract()

  const { expanded, toggle } = useMutiToggle(
    useCallback(
      (initiate: (item: string) => void) => {
        if (!loading) {
          if (selectedContract?.lta?.id) {
            initiate(selectedContract.lta.id)
          } else if (state.newContract?.ltaId) {
            initiate(state.newContract.ltaId)
          }
        }
      },
      [loading, selectedContract?.lta?.id, state.newContract?.ltaId],
    ),
  )

  return (
    <ContractListContainer ref={ref}>
      {loading && ltas === undefined && contracts === undefined ? (
        <ContractLoader />
      ) : (
        <>
          {ltas?.map((lta, i) => (
            <ContractLtaListItems key={i} lta={lta} expanded={expanded === lta.id} onClick={toggle} />
          ))}
          <>
            {newContract && <ContractItem contract={NEW_CONTRACT} selected />}
            {contracts !== undefined &&
              contracts.map((contract, i) => (
                <ContractItem key={i} contract={contract} selected={selectedContract?.listId === contract.listId} />
              ))}
          </>
        </>
      )}
    </ContractListContainer>
  )
}

export default ContractListContent
