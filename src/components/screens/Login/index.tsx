import React from 'react';
import styled from 'styled-components';
import { LoginForm } from './LoginForm';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  max-width: 100vw;
  max-height: 100vh;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;

  background: #ffffff;
  /* Transparent/Black 10% */

  // border: 1px solid rgba(0, 0, 0, 0.1);
  // border-radius: 8px;
`;
const ImageContainer = styled.img`
  //   width: 100%;
  //   height: auto;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
`;

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <LoginForm />
      <ImageContainer src='./utils/loginImage.png' />
    </LoginContainer>
  );
};

export default Login;
