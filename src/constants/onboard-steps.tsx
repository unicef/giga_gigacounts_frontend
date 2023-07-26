import { Step as stepType } from 'react-joyride'

export type onboardStepsType = {
  name: 'contracts' | 'payments' | 'login' | 'notifications' | 'users'
  steps: stepType[]
}

export const onboarSteps: Array<onboardStepsType> = [
  {
    name: 'login',
    steps: []
  },
  {
    name: 'contracts',
    steps: [
      {
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        // locale: { skip: 'Saltar', next: 'Siguiente' },
        placement: 'center',
        target: 'body'
      },
      {
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        // locale: { skip: 'Saltar', back: 'Volver', next: 'Siguiente' },
        floaterProps: {
          disableAnimation: true
        },
        spotlightPadding: 20,
        target: '#tour-contracts-table'
      }
      // {
      //   content:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      //   // locale: { skip: 'Saltar', back: 'Volver', next: 'Siguiente' },
      //   placement: 'bottom',
      //   styles: {
      //     options: {
      //       width: 300
      //     }
      //   },
      //   target: '#tour-contracts-new',
      //   title: 'Contract Creation'
      // },
      // {
      //   content:
      //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      //   // locale: { skip: 'Saltar', back: 'Volver', last: 'Finalizar' },
      //   placement: 'top',
      //   target: '#tour-contracts-pagination',
      //   title: 'Contract Pagination'
      // }
    ]
  }
]

// content: <div><h4>The simplest way to onboard users.</h4><p>This appears in the center of the page because the target element in the Joyride step definition is 'body' and the placement is 'center'.</p></div>,
