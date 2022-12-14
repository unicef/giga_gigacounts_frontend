import { useNavigate } from 'react-router-dom'

import { ContractStatus, IContract } from 'src/types/general'
import ContractSchoolStatus from 'src/components/Dashboard/Contracts/ContractListContent/ContactSchoolStatus/ContractSchoolStatus'
import ContractDefaultListItem from 'src/components/Dashboard/Contracts/ContractListContent/ContractDefaultListItem/ContractDefaultListItem'

interface ContractItemProps {
  contract: IContract
  selected?: boolean
  showFlag?: boolean
}

const ContractItem: React.FC<ContractItemProps> = ({
  contract,
  selected = false,
  showFlag = false,
}: ContractItemProps): JSX.Element => {
  const navigate = useNavigate()

  const handleSelected = (contract: IContract) => {
    if (contract && contract.status !== ContractStatus.Draft) {
      navigate(`/dashboard/contract/${contract?.id}`)
    } else {
      navigate(`/dashboard/contract?draft=${contract?.id}`)
    }
  }

  return (
    <>
      {contract?.added ? (
        <ContractDefaultListItem />
      ) : (
        <ContractSchoolStatus contract={contract} onToggle={handleSelected} selected={selected} showFlag={showFlag} />
      )}
    </>
  )
}

export default ContractItem
