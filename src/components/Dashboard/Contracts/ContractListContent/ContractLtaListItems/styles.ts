import styled from 'styled-components';

export const ContractLtaListItemsContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  isolation: isolate;
  position: relative;
  width: 280px;
  height: auto;
`;

export const ContractLtaHeader = styled.div<{ isExpanded: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 12px 0px 0px;
  gap: 8px;
  height: 32px;
  background: ${(props) => (props.isExpanded ? 'var(--color-light-blue)' : 'var(--color-white)')};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const ContractLtaIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px;
  gap: 10px;
  width: 32px;
  height: 32px;
  background: var(--color-light-blue);
  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 2;
`;

export const ContractLtaNumber = styled.p<{ isExpanded: boolean }>`
  width: 196px;
  height: 22px;
  margin: 0;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 156%;
  letter-spacing: 0.003em;
  color: ${(props) => (props.isExpanded ? 'var(--color-white)' : 'var(--color-darkest-grey)')};
  flex: none;
  order: 1;
  flex-grow: 1;
  z-index: 1;
`;

export const IconShowMore = styled.span<{ isExpanded: boolean }>`
  flex: none;
  order: 2;
  flex-grow: 0;
  z-index: 0;
`;

export const ContractLtaSubHeader = styled.div`
  width: 272px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0px 0px 2px 2px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const ContractLtaSchoolStatus = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 12px;
  width: 280px;
  height: 65px;
  background: var(--color-white);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;

export const ContractLtaContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 2px;
  gap: 4px;
  width: 203px;
  height: 46px;
  flex: none;
  order: 0;
  flex-grow: 1;
`;

export const ContractLtaInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 2px;
  gap: 4px;
  flex: none;
  order: 0;
  flex-grow: 1;
`;

export const ContractNumber = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  height: 22px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const ContractStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  height: 18px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const ContractSchool = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  flex: none;
  order: 0;
  flex-grow: 0;
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
  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const ContractNetwork = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const ContractNetworkName = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 148%;
  letter-spacing: 0.018em;
  color: var(--color-dark-grey);
  flex: none;
  order: 1;
  flex-grow: 0;
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
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const ContractLtaInfoIconsName = styled.p`
  width: 26px;
  height: 15px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 148%;
  letter-spacing: 0.015em;
  margin: 0;
  color: var(--color-dark-grey);
  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const ContractLtaFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;
  gap: 10px;
  width: 280px;
  height: 46px;
  background: var(--color-white);
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;

export const ContractLtaCreateOne = styled.a`
  width: 256px;
  height: 22px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 156%;
  text-align: center;
  letter-spacing: 0.004em;
  text-decoration-line: underline;
  color: var(--color-dark-blue);
  flex: none;
  order: 0;
  flex-grow: 1;
`;
