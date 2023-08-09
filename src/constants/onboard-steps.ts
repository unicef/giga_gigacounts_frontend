import { Step } from 'react-joyride'
import { TourName, Translation } from 'src/@types'

export const ONBOARD_TOUR_STEPS: Record<
  TourName,
  (Omit<Step, 'content'> & {
    content: Translation
  })[]
> = {
  home: [
    {
      content: 'onboard_steps.home.account_nav_information',
      placement: 'right-start',
      target: '#account-nav-information'
    },
    {
      content: 'onboard_steps.home.notifications_popover',
      target: '#notifications-popover'
    },
    {
      content: 'onboard_steps.home.feedback_link',
      placement: 'bottom-end',
      target: '#feedback-link'
    },
    {
      content: 'onboard_steps.home.language_popover',
      placement: 'bottom-end',
      target: '#language-popover'
    }
    // {
    //   content: 'Here you can connect your wallet for the payment of automatic contracts',
    //   placement: 'bottom-end',
    //   target: '#notification'
    // },
    // {
    //   content: 'Here you can see the list of schools and monitor the status of their connectivity',
    //   placement: 'bottom-end',
    //   target: '#notification'
    // }
    // {
    //   content: 'Here you can export the invoices and add them',
    //   placement: 'bottom-end',
    //   target: '#notification'
    // },
    // {
    //   content: 'Here you can see the list of contracts and create a contract where the payment will be automatic',
    //   placement: 'bottom-end',
    //   target: '#notification'
    // }
  ],
  contracts: [
    // {
    //   content:
    //     'To create a contract you must complete the following 4 modules, Add contract details, add budgets and schools, add contract terms, review and save',
    //   placement: 'bottom-end',
    //   target: '#new-contract'
    // },
    // {
    //   content: 'Here you can apply certain filters',
    //   placement: 'bottom-end',
    //   target: '#filter'
    // },
    {
      content: 'onboard_steps.contracts.table_container',
      placement: 'bottom-end',
      target: '#contracts-table-container'
    }
  ]
}
