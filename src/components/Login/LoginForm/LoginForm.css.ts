import styled from 'styled-components';

export const StyledLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 360px 32px 32px 44px;
  gap: 16px;
  isolation: isolate;
  position: relative;
  width: 400px;
  height: 876px;
  background: #ffffff;
`;

export const Logo = styled.img`
  position: absolute;
  width: 110px;
  height: 110px;
  left: 44px;
  top: 40px;
  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 20px;
  width: 324px;
  height: 156px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  z-index: 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 324px;
  height: 104px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const EmailErrorMessage = styled.span`
  width: 300px;
  height: 15px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 148%;
  letter-spacing: 0.015em;
  color: #f94b4b;
  flex: none;
  order: 0;
  flex-grow: 1;
`;

export const InputFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 18px;
  gap: 3px;
  width: 324px;
  height: 50px;
  border-radius: 2px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const Input = styled.input`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 12px;
  gap: 10px;
  width: 324px;
  height: 32px;
  background: #fafafa;
  border-radius: 2px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 9px 16px;
  gap: 4px;
  color: var(--color-white);
  width: 324px;
  height: 32px;
  background: var(--color-blue);
  border-radius: 2px;
  border-style: none;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 4px 12px 16px;
  gap: 4px;
  width: 324px;
  height: 60px;
  color: var(--color-white);
  background: var(--color-red);
  border-radius: 2px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 304px;
  height: 40px;
  flex: none;
  order: 0;
  flex-grow: 1;
`;

export const ErrorTitle = styled.p`
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0;
`;

export const ErrorDescription = styled.p`
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 0;
  font-size: 12px;
`;
