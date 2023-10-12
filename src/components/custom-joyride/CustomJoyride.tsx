import { Button, Theme } from '@carbon/react'
import { useMemo } from 'react'
import Joyride, { ACTIONS, CallBackProps, STATUS, TooltipRenderProps } from 'react-joyride'
import { TourName } from 'src/@types'
import { useSettingsContext } from 'src/components/settings'
import { useNavbar } from 'src/context/layout/NavbarContext'
import useTour from 'src/hooks/useTour'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'
import { Stack } from '../stack'
import { Typography } from '../typography'

const TooltipComponent = ({
  step,
  tooltipProps,
  backProps,
  primaryProps,
  closeProps,
  index,
  continuous,
  skipProps,
  isLastStep
}: TooltipRenderProps) => {
  const { palette, spacing } = useTheme('g90')
  const { translate } = useLocales()

  return (
    <div {...tooltipProps}>
      <Stack
        style={{
          backgroundColor: palette.grey[750],
          padding: spacing.lg,
          width: '450px'
        }}
        orientation="vertical"
        justifyContent="space-between"
        alignItems="center"
      >
        <Theme theme="g90">
          <div
            style={{
              height: '100%',
              backgroundColor: palette.grey[750]
            }}
          >
            <Typography>{step.content}</Typography>
          </div>
        </Theme>

        <Stack
          orientation="horizontal"
          justifyContent="space-between"
          style={{
            marginBlockStart: spacing.lg,
            width: '100%'
          }}
        >
          <div>
            {!continuous && (
              <Button kind="danger" {...closeProps}>
                {capitalizeFirstLetter(translate('close'))}
              </Button>
            )}
            {step.showSkipButton && (
              <Button kind="secondary" {...skipProps}>
                {capitalizeFirstLetter(translate('skip'))}
              </Button>
            )}
          </div>

          <div>
            {index > 0 && (
              <Button kind="secondary" {...backProps}>
                {capitalizeFirstLetter(translate('back'))}
              </Button>
            )}
            {continuous && (
              <Button {...primaryProps}>
                {capitalizeFirstLetter(translate(isLastStep ? 'finish' : 'next'))}
              </Button>
            )}
          </div>
        </Stack>
      </Stack>
    </div>
  )
}

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
    options: {
      arrowColor: palette.grey[750],
      overlayColor: 'none'
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
      styles={styles}
      showSkipButton
      continuous
      callback={handleFinish}
      tooltipComponent={TooltipComponent}
      run={run && isActive}
      steps={steps}
    />
  )
}
