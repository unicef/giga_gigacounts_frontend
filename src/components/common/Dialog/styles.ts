import styled from 'styled-components/macro'

export const DialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-black-10);
  backdrop-filter: blur(20px);
  z-index: 1000;
  cursor: pointer;

  .icon {
    grid-area: icon;
  }
`

export const DialogBody = styled.div`
  width: 30%;
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-areas:
    'icon text'
    'icon cta';
  gap: 16px 12px;
  padding: 14px 24px 24px 20px;
  border: 1px solid var(--color-black-10);
  border-radius: 6px;
  background-color: var(--color-white);
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.1);
  cursor: auto;

  p {
    grid-area: text;
    width: 100%;
    padding-top: 6px;
    color: var(--color-black);
  }
`
export const DialogCta = styled.div`
  grid-area: cta;
  width: 100%;
  display: flex;
  gap: 8px;
`
