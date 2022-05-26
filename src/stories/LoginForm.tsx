import React, { useState } from 'react';
import styled from 'styled-components';

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

    background: #FFFFFF;
`

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
`

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
`

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
`

const EmailErrorMessage = styled.p`
    color: var(--color-red)
`

const Input = styled.input`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 0px 18px;
    gap: 3px;

    width: 324px;
    height: 32px;

    border-radius: 2px;
    background: var(--color-lightest-grey)
    border: none;

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
`

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
`

const ErrorDescription = styled.p`
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    margin: 0;
    font-size: 12px;
`

/**
 * Primary UI component for user interaction
 */

const EMPTY_EMAIL_MESSAGE = 'Email field is empty';
const EMPTY_PASSWORD_MESSAGE = 'Password field is empty';
const WRONG_CREDENTIALS_TITLE = 'Invalid Credentials';
const WRONG_CREDENTIALS_DESCRIPTION = 'Please contact giga administrator for assistance';

export const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [wrongCredentialsError, setWrongCredentialsError] = useState(false);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmailError(false);
      setWrongCredentialsError(false);
      setEmail(event.target.value)
  }

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      setPasswordError(true);
      setWrongCredentialsError(false);
  }
  const login = () => {
      if(email === ''){
          setEmailError(true)
      } else if(password === ''){
          setPasswordError(true)
      } else {
        setWrongCredentialsError(true)
      }
  }
  return (
    <StyledLoginForm>
        <Logo alt='logo' src='./logos/giga-logo-color.svg'></Logo>
        <FormContainer>
            <InputContainer>
                <Input onChange={onEmailChange} value={email} />
                {emailError && <EmailErrorMessage>{EMPTY_EMAIL_MESSAGE}</EmailErrorMessage>}
                <Input onChange={onPasswordChange} type='password' value={password} />
                {passwordError && <EmailErrorMessage>{EMPTY_PASSWORD_MESSAGE}</EmailErrorMessage>}
            </InputContainer>
            {wrongCredentialsError && <ErrorContainer>
                <ErrorMessage>
                    <ErrorTitle><b>{WRONG_CREDENTIALS_TITLE}</b></ErrorTitle>
                    <ErrorDescription>{WRONG_CREDENTIALS_DESCRIPTION}</ErrorDescription>
                </ErrorMessage>
            </ErrorContainer>}
            <Button onClick={login}>Sign In</Button>
        </FormContainer>
    </StyledLoginForm>
  );
};
