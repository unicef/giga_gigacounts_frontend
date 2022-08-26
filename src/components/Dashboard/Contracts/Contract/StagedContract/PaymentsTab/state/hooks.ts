import { useMemo } from 'react'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { IContractDetails } from 'src/types/general'

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
