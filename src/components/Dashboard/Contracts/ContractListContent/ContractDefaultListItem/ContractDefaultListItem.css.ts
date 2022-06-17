import styled from 'styled-components';
import icons from '../../../../../style/icons';

export const ContractDefaultListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 0px 0px 12px;
  width: 100%;
  height: 65px;
  background: var(--color-light-blue);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
`;

export const ContractDefaultListItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 2px;
  gap: 4px;
  width: 100%;
  height: 46px;
`;

export const ContractDefaultListItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 100%;
  height: 22px;

  & p {
    width: 94px;
    height: 22px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 156%;
    letter-spacing: 0.003em;
    color: var(--color-white);
  }
`;

export const ContractDefaultListItemSchoolStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 100%;
  height: 18px;
`;

export const ContractDefaultListItemStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  gap: 2px;
  width: 65px;
  height: 65px;
  background: var(--color-light-blue);
`;

export const StyledIcon = styled.img`
  mask: url(${icons.draft}) no-repeat center;
  width: 28px;
  height: 28px;
  background: var(--color-white);
`;

export const Status = styled.p`
  width: 26px;
  height: 15px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 148%;
  letter-spacing: 0.015em;
  color: var(--color-white);
  margin: 0;
`;
