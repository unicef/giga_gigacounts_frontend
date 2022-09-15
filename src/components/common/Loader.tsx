import React from 'react'
import styled from 'styled-components/macro'
import Spinner from 'src/components/common/Spinner'
import { ClassNameProps } from 'src/types/utils'

const SpinnerWrapper = styled.div`
  color: var(--color-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  padding: 6px;
`
const Loader: React.FC<ClassNameProps> = ({ className }: ClassNameProps): JSX.Element => {
  return (
    <SpinnerWrapper>
      <Spinner className={className} />
    </SpinnerWrapper>
  )
}

export default Loader
