import CreateContract from 'src/components/Dashboard/Contracts/CreateContract'
import ContractsLayout from 'src/components/layouts/ContractsLayout'
import { ChildrenProps } from 'src/types/utils'

const CreateContractPage: React.FC<ChildrenProps> = (): JSX.Element => {
  return (
    <ContractsLayout>
      <CreateContract />
    </ContractsLayout>
  )
}

export default CreateContractPage
