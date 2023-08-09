import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { IContractPayment, PaymentForm, PaymentStatus } from 'src/@types'
import { useLocales } from 'src/locales'

export const usePaymentSchema = (payment?: IContractPayment) => {
  const { replaceTranslated } = useLocales()

  const getDefaultValues = (pendingPayment?: IContractPayment) => ({
    status: pendingPayment?.status ?? PaymentStatus.OnHold,
    description: pendingPayment?.description ?? '',
    amount: pendingPayment?.amount ?? 0,
    payment: pendingPayment?.paidDate ?? { month: 0, year: 0 }
  })

  const [defaultValues, setDefaultValues] = useState<PaymentForm>(getDefaultValues(payment))

  useEffect(() => {
    setDefaultValues(getDefaultValues(payment))
  }, [payment])

  const resolver = yupResolver(
    Yup.object().shape({
      status: Yup.string().oneOf(Object.keys(PaymentStatus)),
      description: Yup.string()
        .trim()
        .required(replaceTranslated('field_errors.required', '{{field}}', 'description')),
      amount: Yup.number()
        .min(0, replaceTranslated('field_errors.positive', '{{field}}', 'amount'))
        .nullable()
        .transform((_, val) => (val ? Number(val) : null))
        .required(replaceTranslated('field_errors.required', '{{field}}', 'amount')),
      payment: Yup.object()
    })
  )

  return useForm({ resolver, values: defaultValues })
}
