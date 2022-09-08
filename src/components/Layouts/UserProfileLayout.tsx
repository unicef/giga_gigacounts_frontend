import React from 'react'
import Navigation from 'src/components/Dashboard/Navigation/Navigation'
import { ContractsProvider } from '../Dashboard/Contracts/state/ContractsContext'
import UserProfile from '../UserProfile/UserProfile'
import PageWrapper from '../common/PageWrapper/PageWrapper'

const UserProfileLayout: React.FC = (): JSX.Element => (
  <PageWrapper>
    <ContractsProvider>
      <Navigation />
      <UserProfile />
    </ContractsProvider>
  </PageWrapper>
)

export default UserProfileLayout
