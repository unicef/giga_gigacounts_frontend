import { useContext } from 'react'
import { Web3Context } from 'src/context/web3/Web3Context'

export const useWeb3Context = () => useContext(Web3Context)
