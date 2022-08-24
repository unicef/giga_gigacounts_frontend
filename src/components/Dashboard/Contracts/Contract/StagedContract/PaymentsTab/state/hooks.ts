import { useMemo } from 'react'
import { useSelectedContract } from 'src/components/Dashboard/Contracts/state/hooks'
import { IContractDetails } from 'src/types/general'

export const usePayment = (paymentId?: string) => {
  const selectedContract = useSelectedContract()

  return useMemo(() => {
    if (paymentId && selectedContract && !selectedContract.details.loading && selectedContract.details.data) {
      return (selectedContract.details.data as IContractDetails)?.payments?.find((payment) => payment.id === paymentId)
    }

    return undefined
  }, [paymentId, selectedContract])
}
