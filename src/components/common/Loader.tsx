import React from 'react'
import styled from 'styled-components/macro'
import Spinner from 'src/components/common/Spinner'

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`
const Loader: React.FC = (): JSX.Element => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  )
}

export default Loader
