import React from 'react';
import styled from 'styled-components';
import { LoginForm } from './LoginForm';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;

    position: absolute;
    width: 1512px;
    height: 982px;
    left: 0px;
    top: 0px;

    background: #FFFFFF;
    /* Transparent/Black 10% */

    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`
const ImageContainer = styled.img`
    width: 1099px;
    height: 982px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 1;
`

const Login: React.FC = () => {
    return (
        <LoginContainer>
            <LoginForm />
            <ImageContainer src='./utils/loginImage.png' />
        </LoginContainer>
    )
}
  
  export default Login