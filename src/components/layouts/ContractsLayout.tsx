import React from 'react'
import styled from 'styled-components/macro'
import Navigation from 'src/components/Dashboard/Navigation/Navigation'
import { ChildrenProps } from 'src/types/utils'
import { ContractsProvider } from '../Dashboard/context/ContractsContext'
import { ContractsMenu } from '../Dashboard/Contracts/styles'
import ContractListContent from '../Dashboard/Contracts/ContractListContent/ContractListContent'
import ContractListFooter from '../Dashboard/Contracts/ContractListFooter/ContractListFooter'

const Flex = styled.div`
  display: flex;
  height: 100vh;
`

const ContractsLayout: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
  return (
    <Flex>
      <Navigation />
      <ContractsProvider>
        <ContractsMenu>
          <ContractListContent />
          <ContractListFooter />
        </ContractsMenu>
        {children}
      </ContractsProvider>
    </Flex>
  )
}

export default ContractsLayout
