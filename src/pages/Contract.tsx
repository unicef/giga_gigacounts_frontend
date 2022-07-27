import { useParams } from 'react-router-dom'
import Contract from 'src/components/Dashboard/Contracts/Contract'
import ContractsLayout from 'src/components/layouts/ContractsLayout'
import { ChildrenProps } from 'src/types/utils'

const ContractView: React.FC<ChildrenProps> = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  return (
    <ContractsLayout>
      <Contract id={id} />
    </ContractsLayout>
  )
}

export default ContractView
