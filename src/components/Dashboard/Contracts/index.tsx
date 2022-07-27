import ContractListContent from './ContractListContent/ContractListContent'
import ContractListFooter from './ContractListFooter/ContractListFooter'

import ContractGuide from './ContractGuide/ContractGuide'

import { ContractsMenu } from './styles'
import { ChildrenProps } from 'src/types/utils'

const Contracts: React.FC<ChildrenProps> = (): JSX.Element => {
  return (
    <>
      <ContractsMenu>
        <ContractListContent />
        <ContractListFooter />
      </ContractsMenu>
      <ContractGuide />
    </>
  )
}

export default Contracts
