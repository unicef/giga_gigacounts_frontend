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
  if (response.status === 200) {
    return response.data
  }

  throw new Error('Failed to get the blockchain transactions')
}

export const createBlockchainTransaction = async (
  data: CreateBlockchainTransactionLog
): Promise<IBlockchainTransaction> => {
  console.log(data)
  try {
    const response = await instance.post('/blk', {
      ...data
    })
    return response.data
  } catch (ex) {
    throw new Error(ex.mesage)
  }
}
