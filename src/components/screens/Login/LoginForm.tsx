import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import web3 from 'web3';

const StyledLoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 360px 32px 32px 44px;
  gap: 16px;
  isolation: isolate;

  position: relative;
  width: 400px;
  height: 876px;

  /* Primary/White */

  background: #ffffff;
`;

const Logo = styled.img`
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

const FormContainer = styled.div`
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

const InputContainer = styled.div`
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

const EmailErrorMessage = styled.span`
  /* Error */

  width: 300px;
  height: 15px;

  /* Super Small */

  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 148%;
  /* identical to box height, or 15px */

  letter-spacing: 0.015em;

  /* Secondary/Red */

  color: #f94b4b;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;

const InputFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 18px;
  gap: 3px;

  width: 324px;
  height: 50px;

  border-radius: 2px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const Input = styled.input`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 12px;
  gap: 10px;

  width: 324px;
  height: 32px;

  /* Primary/Lightest Grey */

  background: #fafafa;
  border-radius: 2px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const Button = styled.button`
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

  /* Inside auto layout */

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;

const ErrorContainer = styled.div`
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

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 304px;
  height: 40px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 1;
`;

const ErrorTitle = styled.p`
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0;
`;

const ErrorDescription = styled.p`
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 0;
  font-size: 12px;
`;

/**
 * Primary UI component for user interaction
 */

const EMPTY_EMAIL_MESSAGE = 'The field can not be empty';
const EMPTY_PASSWORD_MESSAGE = 'Password field is empty';
const WRONG_CREDENTIALS_TITLE = 'Invalid Credentials';
const WRONG_CREDENTIALS_DESCRIPTION =
  'Please contact giga administrator for assistance';

export const LoginForm = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [wrongCredentialsError, setWrongCredentialsError] = useState(false);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(false);
    setWrongCredentialsError(false);
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setWrongCredentialsError(false);
  };

  const login = async () => {
    if (email === '') {
      setEmailError(true);
    }
    if (password === '') {
      setPasswordError(true);
    } else {
      try {
        setEmailError(false);
        setPasswordError(false);
        const encryptedPassword = await web3.utils.sha3(password);
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/login`,
          {
            email,
            password: encryptedPassword,
          }
        );
        localStorage.setItem('session', res.data.token);
        history.push('/dashboard');
      } catch (err) {
        setWrongCredentialsError(true);
      }
    }
  };

  return (
    <StyledLoginForm>
      <Logo alt='logo' src='./logos/giga-logo-color.svg'></Logo>
      <FormContainer>
        <InputContainer>
          <InputFrame>
            <Input
              type='text'
              onChange={onEmailChange}
              value={email}
              className={emailError ? 'input-error' : ''}
            />
            {emailError && (
              <EmailErrorMessage>{EMPTY_EMAIL_MESSAGE}</EmailErrorMessage>
            )}
          </InputFrame>
          <InputFrame>
            <Input
              onChange={onPasswordChange}
              type='password'
              value={password}
              className={passwordError ? 'input-error' : ''}
            />
            {passwordError && (
              <EmailErrorMessage>{EMPTY_EMAIL_MESSAGE}</EmailErrorMessage>
            )}
          </InputFrame>
        </InputContainer>
        {wrongCredentialsError && (
          <ErrorContainer>
            <ErrorMessage>
              <ErrorTitle>
                <b>{WRONG_CREDENTIALS_TITLE}</b>
              </ErrorTitle>
              <ErrorDescription>
                {WRONG_CREDENTIALS_DESCRIPTION}
              </ErrorDescription>
            </ErrorMessage>
          </ErrorContainer>
        )}
        <Button onClick={login}>Sign In</Button>
      </FormContainer>
    </StyledLoginForm>
  );
};
