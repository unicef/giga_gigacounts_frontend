import { Theme } from '@carbon/react'
import { CSSProperties } from 'react'
import { IUser } from 'src/@types'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter, threeDots } from 'src/utils/strings'
import { IExternalUser } from '../../@types/general'

type Props = {
  contact: IUser | IExternalUser
  width?: CSSProperties['width']
  style?: CSSProperties
  theme?: 'g90' | 'white'
  paymentReciever?: boolean
}

export default function ContractCard({
  width,
  contact,
  style,
  theme = 'white',
  paymentReciever = false
}: Props & JSX.IntrinsicAttributes) {
  const { spacing } = useTheme(theme)
  const { name, role, email, phoneNumber } = contact
  const { translate } = useLocales()

  return (
    <Theme theme={theme}>
      <Stack
        justifyContent="space-between"
        style={{ width, padding: spacing.md, aspectRatio: '1.1/0.9', ...style }}
      >
        <Stack justifyContent="space-between" orientation="horizontal">
          <Typography style={{ height: '60px' }} as="h5" size={20} weight={500}>
            {threeDots(name, 33)}
          </Typography>
          {paymentReciever && (
            <Typography size={12} as="p">
              {capitalizeFirstLetter(translate('pay_reciev'))}
            </Typography>
          )}
        </Stack>
        <Typography as="p" size={14} variant="textSecondary">
          {role.name && threeDots(role.name, 25)}
        </Typography>
        <Typography as="p" size={12} variant="textTertiary">
          {email || ''}
          <br />
          {phoneNumber || ''}
        </Typography>
      </Stack>
    </Theme>
  )
}
