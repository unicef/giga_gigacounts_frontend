import styled from 'styled-components/macro'

export const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 70px 32px 0;
  gap: 16px;
  width: 400px;
  height: 100%;
  background: #ffffff;
  overflow-y: auto;
  justify-content: center;
`

export const Logo = styled.img`
  position: absolute;
  width: 200px;
  height: 70px;
  left: 44px;
  top: 40px;
  flex: none;
  order: 1;
  flex-grow: 0;
  z-index: 1;
`

export const Form = styled.form<{ error: boolean }>`
  button {
    width: 100%;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 100%;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  margin-bottom: 4px;
`

export const InputFrame = styled.div<{ order?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 18px;
  gap: 3px;
  width: 100%;
  border-radius: 2px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`

export const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 5px 12px;
  gap: 10px;
  width: 100%;
  height: 32px;
  background: #ffffff;
  border: 1px solid #f94b4b;
  border-radius: 2px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`

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
`
