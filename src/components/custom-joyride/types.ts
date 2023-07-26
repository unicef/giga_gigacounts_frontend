export type IndividualTourValue = {
  name: 'payments' | 'contracts' | 'notifications'
  enabled: boolean
}

export interface CustomJoyrideProps {
  name: string
}

export type TourProps = {
  tour: boolean
  setTour: React.Dispatch<React.SetStateAction<boolean>>
}
