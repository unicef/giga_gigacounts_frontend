import styled from 'styled-components/macro'

export const ContractLtaListItemsContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  isolation: isolate;
  position: relative;
  width: 100%;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.15));

  &:hover {
    cursor: pointer;
  }
`

export const Header = styled.div<{ isExpanded: boolean }>`
  display: grid;
  grid-template-columns: [first] 32px [second] 1fr [third] 36px;
  grid-template-rows: auto;
  grid-template-areas: 'first second third';
  gap: 8px;
  align-items: center;
  width: 100%;
  height: 32px;
  border-radius: 2px;
  transition: background 0.1s ease-out;
  background: ${(props) => (props.isExpanded ? 'var(--color-light-blue)' : 'var(--color-white)')};
`

export const Hand = styled.span`
  display: grid;
  place-items: center;
  height: 32px;
  width: 32px;
  background-color: var(--color-light-blue);
`

export const LtaNumber = styled.p<{ isExpanded: boolean }>`
  margin: 0;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 156%;
  letter-spacing: 0.003em;
  color: ${(props) => (props.isExpanded ? 'var(--color-white)' : 'var(--color-darkest-grey)')};
`

export const ShowMore = styled.span<{ isExpanded: boolean }>`
  grid-area: third;
  width: 24px;
  height: 24px;
`

export const ContractLtaSubHeader = styled.div`
  width: calc(100% - 10px);
  height: 6px;
  margin-right: 10px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0px 0px 2px 2px;
`

export const ContractLtaFooter = styled.button`
  display: inline;
  width: 100%;
  height: auto;
  padding: 12px;
  margin: 0;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  letter-spacing: 0.004em;
  color: var(--color-dark-blue);
  background: var(--color-white);

  &:hover {
    text-decoration-line: underline;
  }
`
