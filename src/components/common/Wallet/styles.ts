import styled from 'styled-components/macro'

export const WalletContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-rows: min-content;
  grid-template-areas:
    'logo header'
    'logo wallet';
  gap: 2px 8px;
  padding: 8px 10px;
  border-radius: 2px;
  background-color: var(--color-lightest-grey);

  img {
    grid-area: logo;
    width: 44px;
  }
`

export const WalletHeader = styled.div`
  grid-area: header;
  display: flex;
  gap: 12px;
  padding: 2px 0 0 4px;
  align-items: center;
  color: var(--color-darkest-grey);
`

export const WalletNetwork = styled.span`
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 0 10px 0 1px;
  color: var(--color-dark-blue);
  background-color: var(--color-lightest-blue);
`

export const WalletAddress = styled.div`
  grid-area: wallet;
  display: flex;
  gap: 16px;
  align-items: center;
`

export const ShowAddress = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  color: var(--color-dark-grey);
  width: 100%;
`
export const CopyAddress = styled.button`
  background-color: transparent;
  color: var(--color-dark-grey);
  text-transform: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
`

export const ViewAddress = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color-dark-grey);
  text-decoration: none;
  white-space: nowrap;
`
