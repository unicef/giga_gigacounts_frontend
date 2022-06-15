import styled from 'styled-components';

export const ContractLtaListItemContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 12px 0px 0px;
  isolation: isolate;
  position: relative;
  width: 280px;
  height: ${(props) => (props.isExpanded ? '143px' : '32px')};
  background: ${(props) => (props.isExpanded ? 'var(--color-light-blue)' : 'var(--color-white)')};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
`;

export const ContractLtaHeader = styled.div<{ isExpanded: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 12px 0px 0px;
  gap: 8px;
  height: 32px;
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

export const ContractLtaContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 16px 11px;
  gap: 4px;
  width: 280px;
  height: 65px;
  background: var(--color-white);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const ContractLtaEmptyText = styled.p`
  width: 248px;
  height: 44px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 156%;
  text-align: center;
  letter-spacing: 0.003em;
  margin: 0;
  color: var(--color-darker-grey);
  flex: none;
  order: 0;
  align-self: stretch;
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
