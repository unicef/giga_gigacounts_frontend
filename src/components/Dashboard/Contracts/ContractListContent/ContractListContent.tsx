import { useMemo, useRef } from 'react'
import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems'
import ContractLoader from './ContractLoader/ContractLoader'
import { ContractListContainer } from './styles'
import ContractItem from './ContractLtaListItems/ContractItem/ContractItem'
import { useContractsContext } from '../state/useContractsContext'
import { useLtas, useOtherContracts, useSelectedContract } from '../state/hooks'
import { NEW_CONTRACT } from '../state/initial-state'
import { useRoleCheck } from 'src/state/hooks'
import { UserRole } from 'src/types/general'
import Message from 'src/components/common/Message/Message'

const ContractListContent: React.FC = (): JSX.Element => {
  const {
    state,
    actions: { toggleExpandedLta },
  } = useContractsContext()
  const { loading } = state

  const ltas = useLtas()

  const contracts = useOtherContracts()

  const ref = useRef<HTMLDivElement>(null)

  const newContract = useMemo(() => state.newContract && state.newContract.ltaId === undefined, [state.newContract])

  const selectedContract = useSelectedContract()

  const showFlag = useRoleCheck(UserRole.ADMIN)

  return (
    <ContractListContainer ref={ref}>
      {loading && ltas === undefined && contracts === undefined ? (
        <ContractLoader />
      ) : (
        <>
          {!ltas?.length && !contracts?.length && <Message description="No contracts found" showCloseBtn={false} />}
          {ltas?.map((lta, i) => (
            <ContractLtaListItems
              key={i}
              lta={lta}
              expanded={state.expandedLtaId === lta.id}
              onClick={toggleExpandedLta}
            />
          ))}
          <>
            {newContract && <ContractItem contract={NEW_CONTRACT} selected showFlag={showFlag} />}
            {contracts !== undefined &&
              contracts.map((contract, i) => (
                <ContractItem
                  key={i}
                  contract={contract}
                  selected={selectedContract?.listId === contract.listId}
                  showFlag={showFlag}
                />
              ))}
          </>
        </>
      )}
    </ContractListContainer>
  )
}

export default ContractListContent
