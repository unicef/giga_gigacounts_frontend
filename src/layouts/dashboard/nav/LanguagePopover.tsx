import { HeaderGlobalAction, MenuItem, Popover, PopoverContent, Theme } from '@carbon/react'
import { Stack } from 'src/components/stack'
import { Typography } from 'src/components/typography'
import { ICONS } from 'src/constants'
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
      <Stack
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
        orientation="horizontal"
      >
        <HeaderGlobalAction
          id="language-popover"
          aria-label={translate('change_lang')}
          isActive={popover.value}
          onClick={popover.toggle}
        >
          <Typography size={16} style={{ alignSelf: 'center', padding: spacing.xs }}>
            {capitalizeFirstLetter(currentLang.value)}
          </Typography>
          <ICONS.CaretDown />
        </HeaderGlobalAction>
      </Stack>
      <PopoverContent>
        <Theme theme="white">
          {allLangs.map((lang) => (
            <MenuItem
              key={lang.value}
              onClick={() => {
                onChangeLang(lang.value)
                popover.close()
              }}
              label={lang.label}
            />
          ))}
        </Theme>
      </PopoverContent>
    </Popover>
  )
}
