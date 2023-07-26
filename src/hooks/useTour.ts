import { useState } from 'react'
import { TourProps } from 'src/components/custom-joyride/types'

type ReturnType = TourProps

export type UseTourProps = {
  completeTour?: boolean
}

export default function useTour(props?: UseTourProps): ReturnType {
  const [tour, setTour] = useState(!!props?.completeTour)

  return {
    tour,
    setTour
  }
}
