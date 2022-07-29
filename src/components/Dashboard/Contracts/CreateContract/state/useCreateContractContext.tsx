import { useContext } from 'react'
import { CreateContractContext, ICreateContractContext } from './CreateContractContext'

export const useCreateContractContext = (): ICreateContractContext =>
  useContext<ICreateContractContext>(CreateContractContext)
