import React from 'react'
import ContractGuide from 'src/components/Dashboard/Contracts/ContractGuide/ContractGuide'
import ContractsLayout from 'src/components/layouts/ContractsLayout'
import { useUser } from 'src/state/hooks'

const Dashboard: React.FC = (): JSX.Element => {
  const user = useUser()
  return (
    <ContractsLayout>
      <ContractGuide user={user} />
    </ContractsLayout>
  )
}

export default Dashboard
