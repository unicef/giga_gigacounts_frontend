import React from 'react'
import ContractsLayout from 'src/components/layouts/ContractsLayout'
import { useUser } from 'src/state/hooks'

const Loading: React.FC = (): JSX.Element => {
  const user = useUser()
  if (user.data.name) {
    return <ContractsLayout />
  }

  return <>Loading...</>
}

export default Loading
