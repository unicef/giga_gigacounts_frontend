import styled from 'styled-components';

export const ContractLtaListItemContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  isolation: isolate;
  position: relative;
  width: 100%;
  background: ${(props) => (props.isExpanded ? 'var(--color-light-blue)' : 'var(--color-white)')};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  transition: background 0.1s ease-out;

  &:hover {
    cursor: pointer;
  }
`;

export const ContractLtaHeader = styled.div<{ isExpanded: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 12px 0px 0px;
  gap: 8px;
  width: 100%;
  height: 32px;
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
`;

export const ContractLtaNumber = styled.p<{ isExpanded: boolean }>`
  width: 100%;
  height: 22px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 156%;
  letter-spacing: 0.003em;
  color: ${(props) => (props.isExpanded ? 'var(--color-white)' : 'var(--color-darkest-grey)')};
`;

export const IconShowMore = styled.span<{ isExpanded: boolean }>``;

export const ContractLtaContent = styled.div``;

export const ContractLtaEmptyText = styled.p`
  width: 100%;
  padding: 10px 16px 11px;
  margin: 0;
  color: var(--color-darker-grey);
  background: var(--color-white);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 156%;
  text-align: center;
  letter-spacing: 0.003em;
`;

export const ContractLtaFooter = styled.a`
  width: 100%;
  padding: 12px;
  margin: 0;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 156%;
  text-align: center;
  letter-spacing: 0.004em;
  text-decoration-line: underline;
  color: var(--color-dark-blue);
  background: var(--color-white);
`;
