import { Theme, Toggletip, ToggletipButton, ToggletipContent } from '@carbon/react'
import { Translation } from 'src/@types'
import { Typography } from 'src/components/typography'
import { ICONS } from 'src/constants'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type Props = {
  title: Translation | (string & {})
  defaultOpen?: boolean
}

export default function InfoToggletip({ title, defaultOpen = false }: Props) {
  const { translate } = useLocales()

  return (
    <Toggletip defaultOpen={defaultOpen}>
      <ToggletipButton>
        <ICONS.Information />
      </ToggletipButton>
      <ToggletipContent>
        <Theme theme="g90">
          <Typography>{capitalizeFirstLetter(translate(title as Translation))}</Typography>
        </Theme>
      </ToggletipContent>
    </Toggletip>
  )
}
