import { CreateBlockchainTransactionLog, IBlockchainTransaction } from 'src/@types'
import instance from './init'

export const getBlockchainTransactions = async (
  contractId?: string
): Promise<IBlockchainTransaction[]> => {
  const response = await instance.get(`/blk`, {
    params: {
      contractId
    }
  })
  return response.data
}

export const createBlockchainTransaction = async (
  data: CreateBlockchainTransactionLog
): Promise<IBlockchainTransaction> => {
  const response = await instance.post('/blk', {
    ...data
  })
  return response.data
}
