import Joyride, { CallBackProps, STATUS } from 'react-joyride'
import { useTheme } from 'src/theme'
import useTour from 'src/hooks/useTour'
import { TourName } from 'src/@types'
import { useSettingsContext } from 'src/components/settings'

export interface CustomJoyrideProps {
  name: TourName
  run?: boolean
}

export default function CustomJoyride({ name, run = true }: CustomJoyrideProps) {
  const { tours, completeTour } = useSettingsContext()
  const isActive = tours[name]
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
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) completeTour(name)
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
