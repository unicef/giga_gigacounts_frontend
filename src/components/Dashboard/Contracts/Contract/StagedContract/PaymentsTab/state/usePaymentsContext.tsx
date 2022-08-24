import { useContext } from 'react'
import { IPaymentsContext, PaymentsContext } from './PaymentContext'

export const usePaymentsContext = (): IPaymentsContext => useContext<IPaymentsContext>(PaymentsContext)
