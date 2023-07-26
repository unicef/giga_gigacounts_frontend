import { CaretDown } from '@carbon/icons-react'
import {
  // @ts-ignore
  HeaderGlobalAction,
  // @ts-ignore
  MenuItem,
  Popover,
  PopoverContent
} from '@carbon/react'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { useModal } from 'src/hooks/useModal'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function LanguagePopover() {
  const popover = useModal()
  const { translate, currentLang, allLangs, onChangeLang } = useLocales()
  const { spacing } = useTheme()
  return (
    <Popover isTabTip onRequestClose={popover.close} open={popover.value} align="bottom-right">
      <Stack orientation="horizontal">
        <Typography style={{ alignSelf: 'center', padding: spacing.xs }}>
          {capitalizeFirstLetter(currentLang.value)}
        </Typography>
        <HeaderGlobalAction
          aria-label={translate('change_lang')}
          isActive={popover.value}
          onClick={popover.toggle}
        >
          <CaretDown />
        </HeaderGlobalAction>
      </Stack>
      <PopoverContent>
        {allLangs.map((lang) => (
          <MenuItem key={lang.value} onClick={() => onChangeLang(lang.value)} label={lang.label} />
        ))}
      </PopoverContent>
    </Popover>
  )
}
