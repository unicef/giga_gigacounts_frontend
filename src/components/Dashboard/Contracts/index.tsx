import ContractListContent from './ContractListContent/ContractListContent'
import ContractListFooter from './ContractListFooter/ContractListFooter'
import { useUser } from 'src/state/hooks'

import ContractGuide from './ContractGuide/ContractGuide'

import { ContractsMenu } from './styles'
import { ChildrenProps } from 'src/types/utils'

const Contracts: React.FC<ChildrenProps> = (): JSX.Element => {
  const user = useUser()
  return (
    <>
      <ContractsMenu>
        <ContractListContent user={user} />
        <ContractListFooter user={user} />
      </ContractsMenu>
      <ContractGuide user={user} />
    </>
  )
}

export default Contracts
