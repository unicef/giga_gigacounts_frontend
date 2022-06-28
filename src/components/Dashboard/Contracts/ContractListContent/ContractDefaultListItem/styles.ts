import styled from 'styled-components/macro'

export const SchoolInfo = styled.div`
  display: grid;
  grid-template-columns: min-content 40px min-content auto 65px;
  grid-template-rows: 22px 18px;
  grid-template-areas:
    'header header header header icon'
    'first  school second budget icon';
  gap: 4px 8px;
  align-items: center;
  padding: 10px 0 10px 12px;
  width: 100%;
  background: var(--color-light-blue);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);

  &:hover {
    cursor: pointer;
  }

  .header {
    grid-area: header;
    display: flex;
    gap: 8px;
  }
`

export const SchoolNumberCtr = styled.p`
  margin: 0;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 156%;
  letter-spacing: 0.003em;
  color: var(--color-white);
`

export const Icons = styled.div`
  grid-area: icon;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`

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
  color: var(--color-white);
`
