import { useState } from 'react'
import Joyride from 'react-joyride'
// import useLocalStorage from 'src/hooks/useLocalStorage'
import { onboarSteps } from 'src/constants/onboard-steps'
// import useTour from 'src/hooks/useTour'
import { useTheme } from 'src/theme'
import { CustomJoyrideProps } from './types'
// import { useSettingsContext } from '../settings'
// import TooltipCustom from './TootipCustom'

export default function CustomJoyride({ name, ...other }: CustomJoyrideProps) {
  // const settingsContext = useSettingsContext()
  // const [settings, setSettings] = useLocalStorage('settings', settingsContext)

  // const settingsTourIndex = settings?.tours?.findIndex(
  //   (t: { name: string }) => t.name === 'contracts'
  // )
  const onboarStepsIndex = onboarSteps.findIndex((t: { name: string }) => t.name === 'contracts')

  const { palette } = useTheme('g90')

  const [joyride] = useState({
    run: false, // useTour(settings?.toursEnabled).tour,
    // (settings?.individualTourEnabled[settingsTourIndex]?.enabled || false),
    steps: onboarSteps[onboarStepsIndex].steps
  })

  return (
    <Joyride
      showSkipButton
      hideBackButton
      continuous
      disableOverlayClose
      styles={{
        tooltip: {
          borderRadius: 0
        },
        buttonNext: {
          borderRadius: 0
        },
        buttonSkip: {
          color: palette.primary.main
        },
        options: {
          arrowColor: palette.background.default,
          backgroundColor: palette.background.default,
          overlayColor: 'none',
          textColor: palette.text.primary,
          primaryColor: palette.primary.main
        }
      }}
      run={joyride.run}
      steps={joyride.steps}
    />
  )
}
