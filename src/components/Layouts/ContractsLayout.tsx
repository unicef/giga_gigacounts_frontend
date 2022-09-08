import React from 'react'
import Navigation from 'src/components/Dashboard/Navigation/Navigation'
import { ContractsMenu } from '../Dashboard/Contracts/styles'
import ContractListContent from '../Dashboard/Contracts/ContractListContent/ContractListContent'
import ContractListFooter from '../Dashboard/Contracts/ContractListFooter/ContractListFooter'
import { ContractsProvider } from '../Dashboard/Contracts/state/ContractsContext'
import { Outlet } from 'react-router-dom'
import PageWrapper from '../common/PageWrapper/PageWrapper'

const ContractsLayout: React.FC = (): JSX.Element => {
  return (
    <PageWrapper>
      <ContractsProvider>
        <Navigation />
        <ContractsMenu>
          <ContractListContent />
          <ContractListFooter />
        </ContractsMenu>
        <Outlet />
      </ContractsProvider>
    </PageWrapper>
  )
}

export default ContractsLayout
