import { useEffect } from 'react'
import { useContractsContext } from 'src/components/Dashboard/Contracts/state/useContractsContext'
import Loader from 'src/components/common/Loader'
import { ContractStatus, IContract } from 'src/types/general'
import { ChildrenProps } from 'src/types/utils'
import { useContract } from '../state/hooks'
import PendingContract from './PendingContract'
import StagedContract from './StagedContract'

interface ContractProps extends ChildrenProps {
  id?: string
}

const Contract: React.FC<ContractProps> = ({ id }: ContractProps): JSX.Element => {
  const {
    state: { loading, contracts },
    actions: { fetchContract },
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
    return <Loader />
  }

  if (!contract) {
    return <>Not found</>
  }

  return contract.status === ContractStatus.Sent || contract.status === ContractStatus.Confirmed ? (
    <PendingContract contract={contract as IContract<ContractStatus.Sent>} />
  ) : (
    <StagedContract contract={contract as IContract<ContractStatus.Ongoing>} />
  )
}

export default Contract
