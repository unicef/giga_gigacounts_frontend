import CreateContractForm from './CreateContractForm'
import { CreateContractContextProvider } from './state/CreateContractContext'

const CreateContract: React.FC = (): JSX.Element => {
  return (
    <CreateContractContextProvider>
      <CreateContractForm />
    </CreateContractContextProvider>
  )
}
export default CreateContract
