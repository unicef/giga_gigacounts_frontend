import ContractLtaListItems from './ContractLtaListItems/ContractLtaListItems'
import ContractLoader from './ContractLoader/ContractLoader'

import { ContractListContainer } from './styles'
import ContractItem from './ContractLtaListItems/ContractItem/ContractItem'
import { useContractsContext } from '../state/useContractsContext'
import { useOtherContracts } from '../state/hooks'
import { UserState } from 'src/state/types'

interface Props {
  user: UserState
}

const ContractListContent: React.FC<Props> = ({ user }: Props): JSX.Element => {
  const { state } = useContractsContext()
  const { loading, ltasIds } = state

  const contracts = useOtherContracts()

  return (
    <ContractListContainer>
      {loading ? (
        <ContractLoader />
      ) : (
        <>
          {ltasIds?.map((item, i) => (
            <ContractLtaListItems key={i} ltaNumber={item} user={user} />
          ))}
          <>{contracts !== undefined && contracts.map((contract, i) => <ContractItem key={i} contract={contract} />)}</>
        </>
      )}
    </ContractListContainer>
  )
}

export default ContractListContent
