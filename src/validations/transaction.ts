import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { IBlockchainTransaction } from 'src/@types'

export const useTransacitionSchema = () => {
  const defaultValues: IBlockchainTransaction = {
    id: '',
    userId: 0,
    userDisplayName: '',
    userEmail: '',
    contractId: 0,
    contractName: '',
    walletAddress: '',
    networkId: 0,
    networkName: '',
    transactionType: '',
    transactionHash: '',
    status: '',
    createdAt: ''
  }

  const resolver = yupResolver(Yup.object().shape({}))

  return useForm({ resolver, defaultValues })
}
