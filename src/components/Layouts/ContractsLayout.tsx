import React from 'react'
import styled from 'styled-components/macro'
import Navigation from 'src/components/Dashboard/Navigation/Navigation'
import { ContractsMenu } from '../Dashboard/Contracts/styles'
import ContractListContent from '../Dashboard/Contracts/ContractListContent/ContractListContent'
import ContractListFooter from '../Dashboard/Contracts/ContractListFooter/ContractListFooter'
import { ContractsProvider } from '../Dashboard/Contracts/state/ContractsContext'
import { Outlet } from 'react-router-dom'

const Flex = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
`

const ContractsLayout: React.FC = (): JSX.Element => {
  return (
    <Flex>
      <ContractsProvider>
        <Navigation />
        <ContractsMenu>
          <ContractListContent />
          <ContractListFooter />
        </ContractsMenu>
        <Outlet />
      </ContractsProvider>
    </Flex>
  )
}

export default ContractsLayout
