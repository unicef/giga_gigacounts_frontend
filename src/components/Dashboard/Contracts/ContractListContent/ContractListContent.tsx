import { useMemo, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems'
import ContractLoader from './ContractLoader/ContractLoader'
import { ContractListContainer } from './styles'
import ContractItem from './ContractLtaListItems/ContractItem/ContractItem'
import { useContractsContext } from '../state/useContractsContext'
import { useOtherContracts } from '../state/hooks'
import { NEW_CONTRACT } from '../state/initial-state'

const ContractListContent: React.FC = (): JSX.Element => {
  const { state } = useContractsContext()
  const { loading, ltas } = state
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const draftId = useMemo(() => searchParams.get('draft') || '', [searchParams])
  const contracts = useOtherContracts()

  const ref = useRef<HTMLDivElement>(null)

  const newContract = useMemo(() => state.newContract && state.newContract.ltaId === undefined, [state.newContract])

  const selectedId = useMemo(() => id ?? draftId, [draftId, id])

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
                <ContractItem key={i} contract={contract} selected={selectedId === contract.id} />
              ))}
          </>
        </>
      )}
    </ContractListContainer>
  )
}

export default ContractListContent
