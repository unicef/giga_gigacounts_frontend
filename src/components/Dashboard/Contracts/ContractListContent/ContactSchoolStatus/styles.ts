import styled from 'styled-components';
import { ContractStatus } from '../../@types/ContractType';

export const SchoolStatus = styled.section<{ status: string }>`
  display: grid;
  grid-template-columns: [first] 1fr [second] 65px [third];
  grid-template-rows: auto;
  grid-template-areas: 'first second';
  width: 100%;
  height: 65px;
  background: ${(props) =>
    props.status === ContractStatus.Draft || props.status === ContractStatus.Confirmed
      ? `var(--color-white-60)`
      : `var(--color-white)`};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const SchoolInfo = styled.div`
  display: grid;
  grid-template-columns: min-content 40px min-content auto;
  grid-template-rows: 22px 18px;
  grid-template-areas:
    'name  name   name   name'
    'first school second budget';
  gap: 4px 8px;
  justify-items: stretch;
  align-items: stretch;
  height: 46px;
  margin: 9px 12px;
`;

export const SchoolNumberCtr = styled.p`
  grid-area: name;
  margin: 0;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 156%;
  letter-spacing: 0.003em;
  color: var(--color-darkest-grey);
`;

export const Schools = styled.p`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 148%;
  letter-spacing: 0.018em;
  color: var(--color-dark-grey);
  margin: 0;
`;

export const Isp = styled(Schools)``;

export const Icons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  gap: 2px;
  height: 65px;
`;

export const IconsName = styled.p`
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

export const IconCompleted = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 3.2px solid var(--color-black-10);
  border-radius: 42px;
`;
