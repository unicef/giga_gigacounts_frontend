import {
  PopoverAlignment,
  Theme,
  Toggletip,
  ToggletipButton,
  ToggletipContent
} from '@carbon/react'
import { ReactNode } from 'react'
import { Translation } from 'src/@types'
import { Typography } from 'src/components/typography'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  title: Translation | (string & {}) | ReactNode
  defaultOpen?: boolean
  align?: PopoverAlignment
}

export default function InfoToggletip({ title, align, defaultOpen = false }: Props) {
  const { translate } = useLocales()

  return (
    <Toggletip align={align} defaultOpen={defaultOpen}>
      <ToggletipButton>
        <ICONS.Information />
      </ToggletipButton>
      <ToggletipContent>
        <Theme theme="g90">
          {typeof title === 'string' ? (
            <Typography>{capitalizeFirstLetter(translate(title as Translation))}</Typography>
          ) : (
            title
          )}
        </Theme>
      </ToggletipContent>
    </Toggletip>
  )
}
