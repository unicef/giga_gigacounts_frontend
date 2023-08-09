import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { ContractFundForm } from 'src/@types'
import { useLocales } from 'src/locales'

export const useContractFundSchema = () => {
  const { replaceTranslated, translate } = useLocales()

  const defaultValues: ContractFundForm = {
    currency: '',
    balance: 0,
    budget: 0,
    amount: 0
  }

  const resolver = yupResolver(
    Yup.object().shape({
      currency: Yup.string().required(
        replaceTranslated('field_errors.required', '{{field}}', 'currency')
      ),
      balance: Yup.number().nullable(),
      budget: Yup.number().nullable(),
      amount: Yup.number()
        .required(replaceTranslated('field_errors.required', '{{field}}', 'amount'))
        .positive(replaceTranslated('field_errors.positive', '{{field}}', 'amount'))
        .min(1, replaceTranslated('field_errors.positive', '{{field}}', 'amount'))
        .test(
          'is-less-than-budget',
          translate('fund_automatic_contract.transfer_amount_error1'),
          function validate(value: number) {
            return value <= this.parent.budget
          }
        )
        .test(
          'is-less-than-balance',
          translate('fund_automatic_contract.transfer_amount_error2'),
          function validate(value: number) {
            return this.parent.balance + value <= this.parent.budget
          }
        )
    })
  )

  return useForm({ resolver, defaultValues })
}
