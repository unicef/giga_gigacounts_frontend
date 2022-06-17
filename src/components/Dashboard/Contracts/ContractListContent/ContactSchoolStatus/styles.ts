import styled from 'styled-components';

export const ContractLtaSchoolStatus = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 12px;
  width: 100%;
  height: 65px;
  background: var(--color-white);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ContractLtaContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 2px;
  gap: 4px;
  width: 100%;
  height: 46px;
`;

export const ContractLtaInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 2px;
  gap: 4px;
`;

export const ContractNumber = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 22px;
`;

export const ContractStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  height: 18px;
`;

export const ContractSchool = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const ContractSchoolNumber = styled.p`
  width: 40px;
  height: 18px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 148%;
  letter-spacing: 0.018em;
  color: var(--color-dark-grey);
`;

export const ContractNetwork = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const ContractNetworkName = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 148%;
  letter-spacing: 0.018em;
  color: var(--color-dark-grey);
`;

export const ContractLtaInfoIcons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  gap: 2px;
  width: 65px;
  height: 65px;
`;

export const ContractLtaInfoIconsName = styled.p`
  width: auto;
  height: 15px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 148%;
  letter-spacing: 0.015em;
  margin: 0;
  color: var(--color-dark-grey);
`;
