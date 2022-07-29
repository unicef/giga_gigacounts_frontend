import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems'
import ContractLoader from './ContractLoader/ContractLoader'
import { ContractListContainer } from './styles'
import ContractItem from './ContractLtaListItems/ContractItem/ContractItem'
import { useContractsContext } from '../state/useContractsContext'
import { useOtherContracts } from '../state/hooks'
import { ContractStatus } from '../@types/ContractType'

const ContractListContent: React.FC = (): JSX.Element => {
  const { state } = useContractsContext()
  const { loading, ltasIds } = state
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const draftId = useMemo(() => searchParams.get('draft') || '', [searchParams])
  const contracts = useOtherContracts()

  return (
    <ContractListContainer>
      {loading ? (
        <ContractLoader />
      ) : (
        <>
          {ltasIds?.map((item, i) => (
            <ContractLtaListItems key={i} ltaNumber={item} />
          ))}
          <>
            {contracts !== undefined &&
              contracts.map((contract, i) => (
                <ContractItem
                  key={i}
                  contract={contract}
                  selected={
                    contract?.id === id || (contract.id === draftId && contract.status === ContractStatus.Draft)
                  }
                />
              ))}
          </>
        </>
      )}
    </ContractListContainer>
  )
}

export default ContractListContent
