import styled from 'styled-components';

export const ContractListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 58px 16px 58px;
  gap: 8px;
  isolation: isolate;
  width: 320px;
  height: 100vh;
  overflow-y: scroll;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 1;
  z-index: 0;
`;

export const ContractListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 14px 10px 14px;
  gap: 6px;
  width: 280px;
  height: 65px;
  background: red;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;
