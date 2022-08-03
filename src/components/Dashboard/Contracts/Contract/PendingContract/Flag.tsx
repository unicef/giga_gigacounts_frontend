import styled from 'styled-components/macro'

const StyledImg = styled.img`
  display: inline-block;
  border-radius: 2px;
`

interface FlagProps {
  url: string
  name: string
  size?: number
}

const Flag = ({ url, name, size = 36 }: FlagProps) => {
  return <StyledImg src={url} width={`${size}px`} alt="flag" title={name} />
}

export default Flag
