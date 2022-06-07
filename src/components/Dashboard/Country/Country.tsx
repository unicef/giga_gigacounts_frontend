import React from 'react';
import { StyledBlock, StyledImg, StyledLabel } from './Country.css';

type CountryBlockProps = {
  countryPath?: string;
  countryName?: string;
  collapsed: boolean;
};

const Country: React.FC<CountryBlockProps> = ({
  countryPath,
  countryName,
  collapsed = false
}: CountryBlockProps): JSX.Element => {
  return (
    <StyledBlock
      style={
        !collapsed ? { width: '174px', height: '24px' } : { justifyContent: 'center', width: '58px', height: '24px' }
      }
    >
      <StyledImg alt="flag" src={countryPath}></StyledImg>
      {!collapsed && (
        <StyledLabel>
          <p>
            <b>{countryName}</b>
          </p>
        </StyledLabel>
      )}
    </StyledBlock>
  );
};

export default Country;
