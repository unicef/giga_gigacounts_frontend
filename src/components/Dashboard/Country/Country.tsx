import React from 'react'
import { StyledBlock, StyledImg, StyledLabel } from './styles'

export type CountryBlockProps = {
  countryFlag?: string
  countryName?: string
  collapsed: boolean
}

const Country: React.FC<CountryBlockProps> = ({
  countryFlag,
  countryName,
  collapsed = false,
}: CountryBlockProps): JSX.Element => {
  return (
    <StyledBlock collapsed={collapsed}>
      <StyledImg alt="flag" src={countryFlag} width="36px" height="24px" />
      {!collapsed && (
        <StyledLabel>
          <p>
            <b>{countryName}</b>
          </p>
        </StyledLabel>
      )}
    </StyledBlock>
  )
}

export default Country
