import { useEffect, useMemo } from 'react'
import styled from 'styled-components/macro'
import { usePriceContext } from 'src/context/priceContext/PriceContext'
import { useEthBalance } from 'src/web3/useEthBalance'
import Loader from 'src/components/common/Loader'

interface EthBalanceProps {
  account: string
}

export const Token = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-light-grey);

  gap: 6px;
  padding: 16px;
  margin-bottom: 8px;
  width: 100%;
`
export const Balance = styled.div`
  display: flex;
  align-items: baseline;
  color: var(--color-black);

  h6 {
    font-weight: 600;
    width: 50px;
  }
`

export const Price = styled.p`
  margin-left: auto;
  font-weight: 600;
  color: var(--color-black);
`

const EthBalance: React.FC<EthBalanceProps> = ({ account }: EthBalanceProps) => {
  const balance = useEthBalance(account)

  const {
    price,
    initiated,
    actions: { initPriceService },
  } = usePriceContext()

  const usdBalance = useMemo(
    () => (price !== undefined && balance !== undefined ? balance * price : undefined),
    [balance, price],
  )

  useEffect(() => {
    if (!initiated && account) {
      initPriceService()
    }
  }, [account, initPriceService, initiated])

  return (
    <Token>
      {balance === undefined ? (
        <Loader />
      ) : (
        <>
          <span className="icon icon-24 icon-eth icon-darker-grey" />
          <Balance>
            <h6>ETH</h6>
            <h5>{balance}</h5>
          </Balance>
          {usdBalance !== undefined && (
            <Price>
              {usdBalance > 0 && '~ '}
              {usdBalance} USD
            </Price>
          )}
        </>
      )}
    </Token>
  )
}

export default EthBalance
