import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import web3 from 'web3';
import { Button } from 'react-bootstrap';
import {
  StyledLoginForm,
  Logo,
  FormContainer,
  InputContainer,
  InputFrame,
  Input,
  EmailErrorMessage,
  ErrorContainer,
  ErrorMessage,
  ErrorTitle,
  ErrorDescription
} from './LoginForm.css';

const EMPTY_EMAIL_MESSAGE = 'The field can not be empty';
const WRONG_CREDENTIALS_TITLE = 'Invalid Credentials';
const WRONG_CREDENTIALS_DESCRIPTION = 'Please contact giga administrator for assistance';

export const LoginForm: React.FC = (): JSX.Element => {
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

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          email,
          password: encryptedPassword
        });
        localStorage.setItem('session', res.data.token);
        history.push('/dashboard');
      } catch (err) {
        setWrongCredentialsError(true);
      }
    }
  };

  return (
    <StyledLoginForm>
      <Logo alt="logo" src="./logos/giga-logo-color.svg"></Logo>
      <FormContainer>
        <InputContainer>
          <InputFrame>
            <Input
              type="email"
              onChange={onEmailChange}
              value={email}
              className={emailError ? 'input-error' : ''}
              placeholder="Email"
            />
            {emailError && <EmailErrorMessage>{EMPTY_EMAIL_MESSAGE}</EmailErrorMessage>}
          </InputFrame>
          <InputFrame>
            <Input
              onChange={onPasswordChange}
              type="password"
              value={password}
              placeholder="Password"
              className={passwordError ? 'input-error' : ''}
            />
            {passwordError && <EmailErrorMessage>{EMPTY_EMAIL_MESSAGE}</EmailErrorMessage>}
          </InputFrame>
        </InputContainer>
        {wrongCredentialsError && (
          <ErrorContainer>
            <ErrorMessage>
              <ErrorTitle>
                <b>{WRONG_CREDENTIALS_TITLE}</b>
              </ErrorTitle>
              <ErrorDescription>{WRONG_CREDENTIALS_DESCRIPTION}</ErrorDescription>
            </ErrorMessage>
          </ErrorContainer>
        )}
        <Button onClick={login}>Sign In</Button>
      </FormContainer>
    </StyledLoginForm>
  );
};
