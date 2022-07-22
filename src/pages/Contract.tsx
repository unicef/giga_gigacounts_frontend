import Contract from 'src/components/Dashboard/Contracts/Contract'
import ContractsLayout from 'src/components/layouts/ContractsLayout'
import { ChildrenProps } from 'src/types/utils'

const ContractView: React.FC<ChildrenProps> = (): JSX.Element => {
  return (
    <ContractsLayout>
      <Contract />
    </ContractsLayout>
  )
}

export default ContractView
