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
  padding: 8px 16px 8px 10px;
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

export const StyledBadge = styled.span<{ connected?: boolean; error?: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 0 10px;
  color: var(--color-darkest-grey);
  background-color: var(--color-black-10);
  cursor: default;

  ${({ connected, error }) =>
    connected && {
      color: error ? 'var(--color-white)' : 'var(--color-dark-blue)',
      backgroundColor: error ? 'var(--color-red)' : 'var(--color-lightest-blue)',
    }}

  & > .icon {
    margin-left: -10px;
  }
`

export const WalletAddress = styled.div`
  grid-area: wallet;
  display: flex;
  gap: 16px;
  align-items: center;
`

export const ShowAddress = styled.div<{ verified?: boolean; error?: boolean }>`
  display: flex;
  gap: 4px;
  align-items: center;
  color: var(--color-dark-grey);
  width: 100%;
  flex-grow: 1;

  ${({ error }) =>
    error && {
      color: 'var(--color-darker-red)',
    }}

    & > .icon {
    ${({ verified, error }) => ({
      color: error ? 'var(--color-red)' : verified ? 'var(--color-green)' : 'var(--color-dark-grey)',
    })}

`

export const Description = styled.p`
  margin-bottom: 24px;
  color: --var(--color-darkest-grey);
`

export const Instructions = styled.p`
  margin-top: 24px;
  margin-bottom: 16px;
  color: --var(--color-darkest-grey);
`
