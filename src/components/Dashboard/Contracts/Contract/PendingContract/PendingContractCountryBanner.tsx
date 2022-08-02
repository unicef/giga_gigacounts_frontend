import styled from 'styled-components/macro'
import Flag from './Flag'
import { ICountry } from '../../@types/ContractType'

const Country = styled.h5`
  display: flex;
  gap: 12px;
`

const StyledP = styled.p`
  margin-top: 12px;
  height: 44px;
`

interface PendingContractCountryBannerProps {
  country: ICountry
  governmentBehalf?: boolean
}

const PendingContractCountryBanner = ({ country, governmentBehalf = false }: PendingContractCountryBannerProps) => {
  return (
    <div>
      <Country>
        {country.flagUrl && <Flag url={country.flagUrl} name={country.name} />} {country.name}
      </Country>
      {governmentBehalf && <StyledP>The contract is conducted by the government of Botswana</StyledP>}
    </div>
  )
}

export default PendingContractCountryBanner
