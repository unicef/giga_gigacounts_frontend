import { utils } from 'ethers'
import { useEffect, useState } from 'react'
import { infuraProvider } from './infura'

export const useEthBalance = (address: string) => {
  const [balance, setBalance] = useState<number | undefined>()

  useEffect(() => {
    let isNotCancelled = true

    const updateBalance = () => {
      infuraProvider.getBalance(address).then((bigBalance) => {
        if (isNotCancelled) {
          setBalance(+utils.formatEther(bigBalance))
        }
      })
    }

    infuraProvider.on('block', updateBalance)

    return () => {
      isNotCancelled = false
      infuraProvider.off('block', updateBalance)
    }
  }, [address])

  return balance
}
