import { useMemo } from 'react'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { IContractDetails } from 'src/types/general'
import { checkPaymentChanges } from '../utils'
import { usePaymentsContext } from './usePaymentsContext'

export const usePayments = () => {
  const selectedContract = useSelectedContract()
  return useMemo(() => {
    if (selectedContract && selectedContract.details.data !== undefined) {
      return (selectedContract.details.data as IContractDetails)?.payments
    }

    return {
      data: undefined,
      error: undefined,
      loading: false,
    }
  }, [selectedContract])
}

export const usePayment = (paymentId?: string) => {
  const payments = usePayments()

  return useMemo(() => {
    if (payments.data) {
      return payments.data.find((payment) => payment.id === paymentId)
    }

    return undefined
  }, [paymentId, payments.data])
}

export const useSelectedPayment = () => {
  const {
    state: { selectedPaymentId },
  } = usePaymentsContext()

  return usePayment(selectedPaymentId)
}

export const useIsPaymentDirty = () => {
  const {
    state: { paymentForm },
  } = usePaymentsContext()

  const selectedPayment = useSelectedPayment()

  return useMemo(
    () => !selectedPayment || checkPaymentChanges(selectedPayment, paymentForm),
    [paymentForm, selectedPayment],
  )
}
