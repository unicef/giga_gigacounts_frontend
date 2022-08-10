import { useMemo, useRef } from 'react'
import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems'
import ContractLoader from './ContractLoader/ContractLoader'
import { ContractListContainer } from './styles'
import ContractItem from './ContractLtaListItems/ContractItem/ContractItem'
import { useContractsContext } from '../state/useContractsContext'
import { useOtherContracts } from '../state/hooks'
import { NEW_CONTRACT } from '../state/initial-state'

const ContractListContent: React.FC = (): JSX.Element => {
  const { state } = useContractsContext()
  const { loading, ltas, selectedContractListId } = state

  const contracts = useOtherContracts()

  const ref = useRef<HTMLDivElement>(null)

  const newContract = useMemo(() => state.newContract && state.newContract.ltaId === undefined, [state.newContract])

  return (
    <ContractListContainer ref={ref}>
      {loading && ltas === undefined && contracts === undefined ? (
        <ContractLoader />
      ) : (
        <>
          {ltas?.map((lta, i) => (
            <ContractLtaListItems key={i} lta={lta} />
          ))}
          <>
            {newContract && <ContractItem contract={NEW_CONTRACT} selected />}
            {contracts !== undefined &&
              contracts.map((contract, i) => (
                <ContractItem key={i} contract={contract} selected={selectedContractListId === contract.listId} />
              ))}
          </>
        </>
      )}
    </ContractListContainer>
  )
}

export default ContractListContent
