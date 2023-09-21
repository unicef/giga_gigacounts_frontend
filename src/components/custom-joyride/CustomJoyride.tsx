import { useMemo } from 'react'
import Joyride, { ACTIONS, CallBackProps, STATUS } from 'react-joyride'
import { TourName } from 'src/@types'
import { useSettingsContext } from 'src/components/settings'
import { useNavbar } from 'src/context/layout/NavbarContext'
import useTour from 'src/hooks/useTour'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

export interface CustomJoyrideProps {
  name: TourName
  run?: boolean
}

export default function CustomJoyride({ name, run = true }: CustomJoyrideProps) {
  const { tours, completeTour } = useSettingsContext()
  const { setExpanded } = useNavbar()
  const {
    currentLang: { value }
  } = useLocales()

  const isActive = useMemo(
    () => (name !== 'home' ? tours[name] : tours[`home_${value}`]),
    [name, tours, value]
  )

  const steps = useTour(name)

  const { palette } = useTheme('g90')
  const styles = {
    tooltip: { borderRadius: 0 },
    buttonNext: { borderRadius: 0 },
    buttonSkip: { color: palette.primary.main },
    options: {
      arrowColor: palette.grey[750],
      backgroundColor: palette.grey[750],
      overlayColor: 'none',
      textColor: palette.text.primary,
      primaryColor: palette.primary.main
    }
  }

  const handleFinish = (data: CallBackProps) => {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED)
      completeTour(name !== 'home' ? name : `home_${value}`)

    if (data.action === ACTIONS.START && name === 'home') {
      setExpanded(true)
    }
  }

  return (
    <Joyride
      showSkipButton
      continuous
      callback={handleFinish}
      styles={styles}
      run={run && isActive}
      steps={steps}
    />
  )
}
