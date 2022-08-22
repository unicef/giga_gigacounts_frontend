import React from 'react'
import styled from 'styled-components/macro'
import Navigation from 'src/components/Dashboard/Navigation/Navigation'
import { ChildrenProps } from 'src/types/utils'

const Flex = styled.div`
  display: flex;
`

const DefaultLayout: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
  return (
    <Flex>
      <Navigation />
      {children}
    </Flex>
  )
}

export default DefaultLayout
