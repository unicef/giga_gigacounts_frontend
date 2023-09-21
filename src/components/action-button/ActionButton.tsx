import { Button } from '@carbon/react'
import { MouseEventHandler } from 'react'
import { Icon, Translation } from 'src/@types'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  description: Translation
  icon: Icon
  disabled?: boolean
}

export default function ActionButton({ onClick, description, icon, disabled = false }: Props) {
  const { translate } = useLocales()
  return (
    <Button
      kind="ghost"
      onClick={onClick}
      iconDescription={capitalizeFirstLetter(translate(description))}
      hasIconOnly
      renderIcon={ICONS[icon]}
      disabled={disabled}
    />
  )
}
