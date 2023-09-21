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
      content: 'onboard_steps.home.language_popover',
      placement: 'bottom-end',
      target: '#language-popover'
    },
    {
      content: 'onboard_steps.home.notifications_popover',
      target: '#notifications-popover'
    },
    {
      content: 'onboard_steps.home.help_page_link',
      placement: 'top',
      target: '#help-page-link'
    },
    {
      content: 'onboard_steps.home.feedback_link',
      placement: 'top',
      target: '#feedback-link'
    },
    {
      content: 'onboard_steps.home.ask_for_help_link',
      placement: 'top',
      target: '#ask-for-help-link'
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
    {
      content: 'onboard_steps.contracts.new_contract',
      placement: 'bottom',
      target: '#new-contract'
    },
    {
      content: 'onboard_steps.contracts.filter',
      placement: 'bottom',
      target: '#contract-filter'
    },
    {
      content: 'onboard_steps.contracts.table_container',
      placement: 'top',
      target: '#contracts-table-container'
    }
  ],
  profile: [
    {
      content: 'onboard_steps.profile.wallet',
      placement: 'left',
      target: '#connect-wallet'
    }
  ],
  contract_detail: [
    {
      content: 'onboard_steps.contract_detail.schools',
      placement: 'bottom',
      target: '.schools-tab'
    },
    {
      content: 'onboard_steps.contract_detail.payment',
      placement: 'bottom',
      target: '.payment-tab'
    }
  ]
}
