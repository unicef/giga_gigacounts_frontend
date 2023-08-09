import { Locale } from 'react-joyride'
import { TourName, Translation } from 'src/@types'
import { ONBOARD_TOUR_STEPS } from 'src/constants'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function useTour(name: TourName) {
  const { translate } = useLocales()
  const steps = ONBOARD_TOUR_STEPS[name]

  const locale: { [K in keyof Locale]: Translation } = {
    back: 'back',
    close: 'close',
    last: 'finish',
    next: 'next',
    open: 'open',
    skip: 'skip'
  }

  return steps.map((step) => ({
    ...step,
    content: capitalizeFirstLetter(translate(step.content)),
    locale: Object.fromEntries(
      Object.entries(locale).map(([key, value]) => [key, capitalizeFirstLetter(translate(value))])
    ),
    disableBeacon: true
  }))
}
