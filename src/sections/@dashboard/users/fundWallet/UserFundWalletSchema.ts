import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { WalletFundForm } from 'src/@types'
import { useLocales } from 'src/locales'

export const UserFundWalletSchema = () => {
  const { replaceTranslated, translate } = useLocales()

  const defaultValues: WalletFundForm = {
    name: '',
    currency: '',
    amount: 0,
    walletFrom: '',
    balanceFrom: 0,
    walletTo: '',
    balanceTo: 0
  }

  const resolver = yupResolver(
    Yup.object().shape({
      currency: Yup.string().required(
        replaceTranslated('field_errors.required', '{{field}}', 'currency')
      ),
      name: Yup.string(),
      walletFrom: Yup.string(),
      balanceFrom: Yup.number().nullable(),
      walletTo: Yup.string(),
      balanceTo: Yup.number().nullable(),
      amount: Yup.number()
        .required(replaceTranslated('field_errors.required', '{{field}}', 'amount'))
        .min(1, replaceTranslated('field_errors.positive', '{{field}}', 'amount'))
        .test(
          'is-less-than-balance-from',
          translate('fund_wallet.transfer_amount_error1'),
          function validate(value: number) {
            return value <= this.parent.balanceFrom
          }
        )
    })
  )

  return useForm({ resolver, defaultValues })
}
