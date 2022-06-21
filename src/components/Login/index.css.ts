import styled from 'styled-components';

export const LoginContainer = styled.div`
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
`;

export const ImageContainer = styled.div`
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
  background-image: url('./utils/loginImage.png');
  background-repeat: repeat;
  background-size: cover;
`;
