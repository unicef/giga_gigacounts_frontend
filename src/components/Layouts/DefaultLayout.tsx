import React from 'react'
import Navigation from 'src/components/Dashboard/Navigation/Navigation'
import { ChildrenProps } from 'src/types/utils'
import PageWrapper from '../common/PageWrapper/PageWrapper'

const DefaultLayout: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
  return (
    <PageWrapper>
      <Navigation />
      {children}
    </PageWrapper>
  )
}

export default DefaultLayout
