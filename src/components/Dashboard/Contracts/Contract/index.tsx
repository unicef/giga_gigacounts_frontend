import { useEffect } from 'react'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
import { ContractStatus, IContract } from 'src/components/Dashboard/Contracts/@types/ContractType'
import { ChildrenProps } from 'src/types/utils'
import { useContract } from '../state/hooks'
import PendingContract from './PendingContract'
import ContractStaged from './StagedContract'

interface ContractProps extends ChildrenProps {
  id?: string
}

const Contract: React.FC<ContractProps> = ({ id }: ContractProps): JSX.Element => {
  const {
    state: { loading, contracts },
    fetchContract,
  } = useContractsContext()

  const contract = useContract(id)

  useEffect(() => {
    if (
      id !== undefined &&
      contract?.details.data === undefined &&
      contract?.details.loading === false &&
      contract?.details.error === undefined
    ) {
      fetchContract(id)
    }
  }, [contract?.details.data, contract?.details.error, contract?.details.loading, fetchContract, id])

  if (loading || contracts === undefined || !contract?.details.data) {
    return <>Loading...</>
  }

  if (!contract) {
    return <>Not found</>
  }

  return contract.status === ContractStatus.Sent || contract.status === ContractStatus.Confirmed ? (
    <PendingContract contract={contract as IContract<ContractStatus.Sent>} />
  ) : (
    <ContractStaged contract={contract as IContract<ContractStatus.Ongoing>} />
  )
}

export default Contract
