import React from 'react'
import ContractGuide from 'src/components/Dashboard/Contracts/ContractGuide/ContractGuide'
import ContractsLayout from 'src/components/layouts/ContractsLayout'

const Dashboard: React.FC = (): JSX.Element => {
  return (
    <ContractsLayout>
      <ContractGuide />
    </ContractsLayout>
  )
}

export default Dashboard
