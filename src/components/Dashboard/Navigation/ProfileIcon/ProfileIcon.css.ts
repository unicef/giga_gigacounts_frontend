import styled from 'styled-components';

export const StyledButton = styled.div`
  p {
    color: var(--color-white);
  }
  background-color: var(--color-dark-blue);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;

  height: 40px;

  flex: none;
  order: 2;
  flex-grow: 0;
`;

export const StyledIcon = styled.img`
  width: 40px;
  height: 40px;

  /* Primary/Light Blue */

  background: var(--color-light-blue);
  border-radius: 100px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: ;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 124px;
  height: 22px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const Role = styled.p`
  width: 124px;
  height: 18px;

  /* Small */

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 148%;
  margin: 0;

  letter-spacing: 0.018em;

  color: var(--color-light-blue);

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const NameText = styled.p`
  width: 102px;
  height: 22px;

  /* P Bold */

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 156%;
  margin: 0;

  letter-spacing: 0.003em;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;
