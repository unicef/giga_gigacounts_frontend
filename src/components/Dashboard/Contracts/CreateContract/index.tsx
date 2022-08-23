import { useEffect } from 'react'
import CreateContractForm from './CreateContractForm'
import { CreateContractContextProvider } from './state/CreateContractContext'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'

const CreateContract: React.FC = (): JSX.Element => {
  const {
    actions: { setNewContract },
  } = useContractsContext()
  useEffect(() => {
    return () => {
      setNewContract(undefined)
    }
  }, [setNewContract])
  return (
    <CreateContractContextProvider>
      <CreateContractForm />
    </CreateContractContextProvider>
  )
}
export default CreateContract
