import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import web3 from 'web3';

import { Button } from 'react-bootstrap';
import {
  LoginFormContainer,
  Logo,
  Form,
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

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [wrongCredentialsError, setWrongCredentialsError] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent): Promise<boolean | undefined> => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    if (email === '') {
      setEmailError(true);
      return false;
    }
    if (password === '') {
      setPasswordError(true);
      return false;
    }

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
  };

  return (
    <LoginFormContainer>
      <Logo alt="logo" src="./logos/giga-logo-color.svg"></Logo>
      <Form error={wrongCredentialsError} onSubmit={(e) => handleSubmit(e)}>
        <InputContainer order="0" error={wrongCredentialsError}>
          <InputFrame order="0">
            <Input type="email" name="email" className={emailError ? 'input-error' : ''} placeholder="Email" />
            {emailError && <EmailErrorMessage>{EMPTY_EMAIL_MESSAGE}</EmailErrorMessage>}
          </InputFrame>
          <InputFrame order="1">
            <Input
              type="password"
              name="password"
              className={passwordError ? 'input-error' : ''}
              placeholder="Password"
            />
            {passwordError && <EmailErrorMessage>{EMPTY_EMAIL_MESSAGE}</EmailErrorMessage>}
          </InputFrame>
          {wrongCredentialsError && (
            <InputFrame order="2">
              <ErrorContainer>
                <ErrorMessage>
                  <ErrorTitle>
                    <b>{WRONG_CREDENTIALS_TITLE}</b>
                  </ErrorTitle>
                  <ErrorDescription>{WRONG_CREDENTIALS_DESCRIPTION}</ErrorDescription>
                </ErrorMessage>
              </ErrorContainer>
            </InputFrame>
          )}
        </InputContainer>
        <Button type="submit">Sign In</Button>
      </Form>
    </LoginFormContainer>
  );
};
