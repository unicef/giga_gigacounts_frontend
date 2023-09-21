const en = {
  demo: {
    title: `English`,
    introduction: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  },
  docs: {
    hi: `Hi`,
    description: `Need help? \n Please check our docs.`,
    documentation: `documentation`
  },
  login: {
    signin: 'Sign in to Gigacounts',
    newuser: 'New User?',
    createaccount: 'Create an account',
    auth_error: 'Invalid Credentials'
  },
  authLoginForm: {
    forgot_password: 'Forgot password?',
    login: 'Login'
  },
  accountChangePassword: {
    old_password_required: 'Old Password is required',
    min_password: 'Password must be at least 6 characters',
    min_password_short: 'Password must be at least 6+',
    password_must_be_different: 'New password must be different than old password',
    new_password: 'New Password',
    old_password: 'Old Password',
    match_password: 'Passwords must match'
  },
  authNewPasswordForm: {
    confirm_new_password: 'confirm New Password',
    update_password: 'Update Password',
    change_success: 'Change password success!'
  },
  authRegisterForm: {
    createaccount: 'Create account'
  },
  authResetPasswordForm: {
    sendrequest: 'Send Request'
  },
  authVerifyCodeForm: {
    success: 'Verify success!',
    verify: 'Verify'
  },
  authWithSocial: {
    or: 'or'
  },
  resetPassword: {
    forgot_password: 'Forgot your password?',
    forgot_msg:
      'Please enter the email address associated with your account and We will email you a link to reset your password.',
    return_msg: 'Return to sign in'
  },
  newPassword: {
    request_sent: 'Request sent  for school',
    request_msg1: `We’ve sent a 6-digit confirmation email to your email.`,
    request_msg2: 'Please enter the code in below box to verify your email.',
    no_code: `Don’t have a code?`,
    resend: 'Resend code',
    return: 'Return to sign in'
  },
  header: {
    need_help: 'Need Help?'
  },
  register: {
    introtitle:
      'Easy monitoring of connectivity and payments tracking for internet connectivity in schools',
    register: 'Register to Gigacounts',
    already: 'Already have an account?',
    signin: 'Sign In',
    agreeto: 'By signing up, I agree to',
    terms: 'Terms of Service',
    and: 'and',
    privacy: 'Privacy Policy'
  },
  loginLayout: {
    welcome: 'Hi, Welcome back'
  },
  autosave: {
    saving: 'Saving...',
    saved: 'Saved',
    created: 'Not created yet. Enter a contract name to auto-save',
    unsaved_changes: 'You have unsaved changes'
  },
  push: {
    knowledge_base_error: 'Knowledge base for this page not yet implemented',
    changed_reliability: 'Reliability has been changed for school',
    changed_reliability_error: 'There was an error changing reliability for school',
    sent_feedback: 'Feedback has been sent',
    sent_feedback_error: 'There was an error sending feedback',
    sent_help_request: 'Help request has been sent',
    sent_help_request_error: 'There was an error sending help request',
    duplicated_contract: 'The contract has been duplicated',
    duplicated_contract_error: 'There was an error duplicating the contract',
    published_contract: 'The contract has been published',
    published_contract_error: 'There was an error publishing the contract',
    saved_as_draft: 'The contract has been saved as draft',
    saved_as_draft_error: 'There was an error saving the contract as draft',
    deleted_contract: 'The contract has been deleted.',
    deleted_contract_error: 'There was an error deleting the contract',
    approve_contract: 'The contract has been approved',
    approve_contract_error: 'There was an error approving the contract',
    fund_contract: 'The contract has been funded',
    fund_contract_error: 'There was an error funding the contract',
    fund_wallet: 'The wallet has been funded',
    fund_wallet_error: 'There was an error funding the wallet',
    approve_automatic_contract_invalid_wallet:
      "Contract cannot be approved. Make sure you have a connected wallet, and it's the same one you verified in your profile",
    fund_automatic_contract_invalid_wallet:
      "Contract cannot be funded. Make sure you have a connected wallet, and it's the same one you verified in your profile",
    fund_wallet_invalid_wallet:
      'Unable to transfer funds. Make sure you have a connected wallet and that it is the same one you have verified in your profile.',
    fund_automatic_contract_low_balance: 'Insufficient token balance to transfer to the contract.',
    added_payment: 'The payment has been added',
    added_payment_error: 'There was an error adding the payment',
    updated_payment: 'The payment has been updated',
    updated_payment_error: 'There was an error updating the payment',
    approve_payment: 'The payment has been approved',
    approve_payment_error: 'There was an error approving the payment',
    reject_payment: 'The payment has been rejected',
    reject_payment_error: 'There was an error rejecting the payment',
    pay_payment: 'The payment has been marked as paid',
    pay_payment_error: 'There was an error marking the payment as paid',
    approved_manually_contract: 'The contract was approved manually',
    approved_manually_contract_error: 'There was an error approving the contract manually'
  },
  duplicate_contract: {
    title: 'Duplicate contract',
    content: 'Do you want to duplicate the selected contract?',
    footer: 'This contract will be created with the status of "Draft"'
  },
  delete_contract: {
    title: 'You are about to delete the contract. You will have 10 minutes to recover it.',
    content: 'Are you sure you want to delete this contract?',
    footer: 'You can recover the contract by clicking the undo button.'
  },
  approve_contract: {
    title: 'You are about to approve the contract.',
    content: 'Are you sure you want to approve this contract?'
  },
  approve_automatic_contract: {
    title: 'You are about to approve the automatic contract.',
    content: 'Are you sure you want to approve this automatic contract?'
  },
  fund_wallet: {
    title: 'Fund Wallet',
    transfer_amount_error1: 'The amount must be less than or equal that your wallet balance',
    info: 'Stay tuned for signature requests that will appear in your wallet, to allow the transfer of funds. The process may take several seconds.',
    field_user_name: 'User Name',
    field_wallet_from: 'Wallet From',
    field_wallet_to: 'Wallet To',
    field_wallet_from_balance: 'Current Balance',
    field_wallet_to_balance: 'Current Balance',
    view_in_explorer: 'View in blockchain explorer'
  },
  fund_automatic_contract: {
    title: 'You are about to transfer funds to the automatic contract.',
    content: 'Are you sure you want to transfer funds to this automatic contract?',
    info: 'Stay tuned for signature requests that will appear in your wallet, to allow the transfer of funds to the contract. The process may take several seconds. Upon completion, you can see the transactions made in the contract details.',
    data: 'Fund Data',
    contract_current_balance: 'Current Contract Balance',
    contract_budget: 'Contract Budget',
    transfer_amount: 'Amount to Transfer to Contract',
    transfer_amount_error1: 'The amount must be less than or equal to the contract budget',
    transfer_amount_error2: 'The amount you want to transfer exceeds the amount pending to transfer'
  },
  transactions_tab: {
    detail: 'Transaction Detail',
    increase_allowance: 'Increase Allowance',
    fund_contract: 'Contract Funding',
    fund_wallet: 'Wallet Funding',
    transaction_hash: 'Transaction Hash',
    transaction_type: 'Transaction Type',
    transaction_network: 'Network'
  },
  without_walllet: {
    title: 'cannot proceed without connected and verified wallet',
    to_approve:
      'To approve an automatic contract, you must have a verified and connected wallet. Please set one up in your profile.',
    to_fund_contract:
      'To transfer funds to an automatic contract, you must have a verified and connected wallet. Please set one up in your profile.',
    to_fund_Wallet:
      'To transfer funds to another wallet, you must have a verified and connected wallet. Please set one up in your profile.'
  },
  publish_contract_modal: {
    title: 'You are about to publish the contract.',
    content: 'Are you sure you want to publish this contract?'
  },
  contract_draft_modal: {
    title:
      'Your contract was saved as a draft! To officially start the contract you need to publish it.',
    content: 'Find and edit your contract in the list of contracts with the draft status.'
  },
  contract_published_modal: {
    choose: {
      title: 'You are one step away from an active contract.',
      content:
        'You can send the contract to ISP for signature or you can validate the contract yourself.',
      primaryText: 'Send to ISP for signature',
      secondaryText: 'Confirm signature manually'
    },
    send: {
      title: 'You are about to send the contract for isp signature.',
      content: 'You will recieve a notification when ISP signs.',
      primaryText: 'Send to ISP for signature',
      secondaryText: 'Back'
    },
    manual: {
      title: 'You are about to confirm ISP signature for yourself.',
      content:
        'By confirming the ISP signature for yourself, you confirm that the ISP is well informed and in agreement of the contract terms. This action can only be done for manual contracts.',
      primaryText: 'Confirm signature manually',
      secondaryText: 'Back'
    }
  },
  contract_cancel_modal: {
    title: 'Cancel contract creation',
    content:
      'Are you sure you want to cancel your contract creation? Your contract will be discarded.'
  },
  contract_discard_changes_modal: {
    title: 'Discard changes',
    content:
      'Are you sure you want to cancel your contract creation? Any unsaved changes will be discarded.'
  },
  payment_pay_modal: {
    title: 'Mark payment as paid',
    content: 'Are you sure you want to mark this payment as paid? This change cannot be undone.'
  },
  comment_section: {
    title: 'Additional comments',
    placeholder: 'Add here any additional comment or information about your contract'
  },
  contract_draft_descriptions: {
    attachments:
      'Please, attach any document related to the contract signature process that you find useful to keep in the system, such as service level agreements, original contracts, etc.',
    budget:
      'In this step you can determine the total budget for the contract. You can select either fiat or crypto',
    schools:
      'In this step you can add the lists of schools that will be covered under the contract. You can then select schools by manually searching or by uploading a reference csv file for batch adding. Once you add the schools you will be able to customize the budget to each school.'
  },
  notifications_popover: {
    news: 'New',
    you_have: 'You have',
    unread_messages: 'unread messages',
    before_that: 'Before that',
    view_all: 'View All',
    dismiss_all: 'dismiss all',
    mark_all_as_read: 'Mark all as read',
    empty: 'You have no notifications'
  },
  upload_errors: {
    one_file: 'You cannot upload more than one file at a time',
    csv: 'You can only upload CSV files',
    pdf: 'You can only upload PDF files',
    distinct_name: 'You cannot upload two attachments with the same name'
  },
  field_errors: {
    required: '{{field}} is required',
    required_plural: '{{field}} are required',
    unique: '{{field}} must be unique',
    positive: '{{field}} should be positive',
    less_than: '{{field}} should be less than {{number}}',
    multiple_missing: 'Fields are missing',
    start_date: 'Start date must be after today',
    end_date: 'End date must be after Start date',
    launch_date_min: 'Launch date must be after Start date',
    launch_date_max: 'Launch date must be before End date',
    is_invalid: '{{field}} is invalid'
  },
  parse_errors: {
    school_not_found: 'School not found on row',
    school_id: "School's external_id missing or malformed on row",
    school_budget_missing: "School's budget missing or malformed on row",
    school_budget_positive: "School's budget cannot be zero or negative on row"
  },
  functionalities: {
    connectivity_viewing: 'Connectivity viewing',
    contract_creation: 'Contract creation',
    contract_viewing: 'Contract viewing',
    dashboard: 'Home',
    feedback: 'Feedback',
    help_request: 'Help request',
    login: 'Login',
    other: 'Other',
    payment_creation: 'Payment creation',
    payment_viewing: 'Payment viewing',
    register: 'Registration',
    user_profile: 'User Profile',
    user_settings: 'User settings'
  },
  contract_creation: 'Contract creation',
  help_request: {
    bug: 'Report a bug',
    feedback: 'Give feedback to help us improve',
    types: {
      display: 'Something is not displaying properly',
      behavior: 'Something is not working properly',
      improvement: 'I would like to suggest improvements for current functionality',
      new_feature: 'I would like to suggest a new functionality'
    },
    other: 'other'
  },
  functionality: 'Functionality',
  ticket: {
    code: 'What can we help you with?',
    type: 'Which of the following best suites your ticket?',
    description: {
      placeholder: 'Add here any additional comment or information about your feedback ticket'
    }
  },
  add_contract_details: 'add contract details',
  add_budgets_and_schools: 'add budgets and schools',
  add_the_total_budget:
    'Add the total budget for the contract. You can select in either fiat or crypto currency.',
  total_budget_of_the_contract: 'Total budget of the contract',
  schools_list: 'Schools list',
  add_the_list_of_schools:
    'Add the list of schools that will be covered by this contract. You can manually select schools or upload a reference csv file. Once you add the schools you can customize the budget to each school.',
  to_link_schools: `To link schools to the contract faster, you may upload a list of school id's.
  Download this `,
  quality_of_service_terms: 'quality of service terms',
  add_the_terms_agreed: 'Add the terms agreed upon between you and the ISP in the contract.',
  contract_breaking_rules: 'contract breaking rules',
  add_rules_and_guidelines:
    'Add rules and guidelines to follow when ISPs do not fulfill contract terms.',
  payment_settings: 'Payment settings',
  add_payment_frequency: 'Add payment frequency for this contract.',
  payment_interval: 'Payment interval',
  add_contract_terms: 'add contract terms',
  add_the_general_details: 'Add the general contract details',
  add_the_contract_managers: 'Add contract managers, contract monitors and others',
  review_and_save: 'review and save',
  contract_team: 'Contract team',
  documents_and_attachments: 'Documents and attachments',
  add_any_document: 'Add any document related to this contract',
  publish_error: 'Unable to publish',
  government_behalf: 'Government behalf',
  metrics: 'Metrics',
  uploaded_with_errors: 'Uploaded with errors',
  upload_error: 'Upload error',
  yes: 'yes',
  no: 'no',
  undo: 'undo',
  password: `password`,
  email: `email`,
  email_address: `email address`,
  code_required: 'Code is required',
  email_valid: 'Email must be a valid email address',
  password_required: 'Password is required',
  confirm_password_required: 'Confirm password is required',
  email_required: 'Email is required',
  first_name: 'name',
  last_name: 'last name',
  first_name_required: 'First name is required',
  last_name_required: 'Last name is required',
  app: `app`,
  user: `user`,
  list: `list`,
  edit: `Edit`,
  delete: `Delete`,
  shop: `shop`,
  blog: `blog`,
  post: `post`,
  mail: `mail`,
  chat: `chat`,
  cards: `cards`,
  posts: `posts`,
  create: `create`,
  kanban: `kanban`,
  general: `general`,
  banking: `banking`,
  booking: `booking`,
  profile: `profile`,
  account: `account`,
  product: `product`,
  details: `details`,
  checkout: `checkout`,
  calendar: `calendar`,
  analytics: `analytics`,
  ecommerce: `e-commerce`,
  management: `management`,
  contracts: 'contracts',
  payment: 'payment',
  payments: 'payments',
  payments_log: 'payments log',
  automatic_contracts: 'automatic contracts',
  automatic_contracts_list: 'automatic contracts list',
  automatic_contracts_check_info:
    'This is an automatic contract, so payments will be managed automatically using a smart contract.',
  invoice: `invoice`,
  invoices: `invoices`,
  workflows: `workflows`,
  description: `description`,
  other_cases: `other cases`,
  item_by_roles: `item by roles`,
  only_admin_can_see_this_item: `Only admin can see this item`,
  dashboard: 'dashboard',
  search_country: 'Search country to show data',
  users: 'users',
  settings: 'settings',
  account_settings: 'account settings',
  payments_list: 'payments list',
  users_list: 'users list',
  contracts_list: 'contracts list',
  filter: 'Filter',
  change_lang: 'Change Language',
  notifications: 'Notifications',
  all: 'all',
  name: 'name',
  status: 'status',
  isp: 'isp',
  region: 'region',
  lta_name: 'lta name',
  generated: 'generated',
  add_an_isp: 'Add ISP Contacts',
  add_a_team_member: 'add a contract team member',
  add_team_member: 'add team member',
  team_member_saved: 'team member saved',
  enable_bypass: 'enable bypass ISP confirmation',
  important: 'important',
  add_a_contract_launch_day:
    'add a contract launch date (if launch date is different than start date add it here)',
  link_schools: "link schools faster by uploading a list of school id's and budgets",
  breaking_rules: 'breaking rules contract',
  enter_all_breaking: 'enter all the breaking rules for this contract',
  enter_the_payment: 'enter the payment details for this contract',
  accept_the_terms: 'i accept the terms and conditions of creating a contract.',
  dense: 'dense',
  update_success: 'Update success!',
  save_changes: 'Save Changes',
  contract_details: 'Contract details',
  contract_name: 'Contract name',
  contract_id: 'Contract ID',
  start_date: 'Start date',
  end_date: 'End date',
  date_from: 'Date from',
  date_to: 'Date to',
  launch_date: 'Launch date',
  umbrella: 'Umbrella',
  quality_of_service: 'Quality of service',
  uptime: 'Uptime',
  latency: 'Latency',
  download_speed: 'Download speed',
  upload_speed: 'Upload speed',
  attachments: 'Attachments',
  main_info: 'Main info',
  lta: 'Long term agreement',
  valid_through: 'Valid through',
  internet_provider: 'Internet provider',
  upload: 'Upload',
  other_users: 'Other users',
  schools_and_budget: 'Schools and budget',
  schools_list_budget: 'School list & budget allocation',
  schools: 'Schools',
  stakeholders_and_collaborators: 'Stakeholders & collaborators',
  stakeholders: 'Stakeholders',
  final_review: 'Final review',
  back: 'back',
  save: 'save',
  as: 'as',
  continue: 'continue',
  finish: 'Finish',
  cancel: 'Cancel',
  contract: 'contract',
  contract_type: 'contract type',
  new: 'new',
  add: 'add',
  partners: 'partners',
  export: 'export',
  and: 'and',
  upload_csv: 'Upload csv file',
  download_csv: 'You can download',
  upload_reference: 'Upload reference file',
  upload_relevant: 'Upload relevant documents',
  upload_files: 'Upload files',
  search_and_add_schools: 'Search and add schools',
  publish_and_send_to_isp: 'publish & send to isp',
  publish_contract: 'publish contract',
  create_another_contract: 'create another contract',
  view_contract: 'view contract',
  currency: 'currency',
  budget: 'budget',
  search: 'Search',
  read: 'read',
  delete_confirm_item: 'Are you sure want to delete?',
  delete_confirm_items: 'Are you sure you want to delete <strong>{{number}}</strong> items?',
  section: 'section',
  no_collaborators_added: 'No collaborators added.',
  no_attachments_added: 'No attachments added.',
  see_all_schools: 'See all schools',
  number_of_schools: 'number of schools',
  message: 'message',
  date: 'date',
  clear: 'clear',
  collaborators: 'collaborators',
  no_data: 'No Data',
  total_budget: 'total budget',
  the_users: 'The users you add will be displayed in this section',
  add_users: 'add users',
  phone_number: 'phone number',
  exceeds_budget_error: 'total budget is not the same as contract budget',
  contract_budget: 'contract budget',
  publish: 'Publish',
  period: 'period',
  from: 'from',
  to: 'to',
  change: 'change',
  print: 'print',
  send: 'send',
  share: 'share',
  mark_as_paid: 'mark as paid',
  close: 'close',
  service_type: 'Service type',
  search_user: 'Search user...',
  view_connectivity: 'See connectivity',
  view_payments: 'View payments',
  view_payment: 'View payment',
  view: 'View',
  download: 'download',
  total: 'Total',
  verified: 'Verified',
  pending: 'Pending',
  rejected: 'Rejected',
  new_payment: 'new payment',
  client: 'Client',
  due: 'Due',
  amount: 'Amount',
  add_payment: 'Add payment',
  update_payment: 'update payment',
  payment_detail: 'payment details',
  approve: 'Approve',
  fund: 'Fund',
  funds: 'Funds',
  cashback: 'Cashback',
  discount: 'Discount',
  decline: 'Decline',
  find_the_invoice:
    'Find the invoice here. Remember that this is a legal document that supports the payment created.',
  find_the_receipt:
    'Find the receipt here. Remember that this is a legal document that supports the payment was done  for school',
  payment_cancel_modal: {
    title: 'Cancel payment creation',
    content:
      'Are you sure you want to cancel your payment creation? Your payment will be discarded.'
  },
  payment_created_modal: {
    title: 'Your payment was created successfully!',
    content: 'Find your payment in the list of payments'
  },
  payment_approve_modal: {
    title: 'Payment approval',
    content: 'Are you sure you want to approve this payment?'
  },
  payment_reject_modal: {
    title: 'Payment rejection',
    content: 'Are you sure you want to reject this payment?'
  },
  country: 'country',
  no_schools_for_selected_country: 'There are no schools for the selected country',
  schools_equal_or_above_average: 'Schools equal or above average',
  schools_below_average: 'Schools below average',
  schools_without_connection: 'Schools without connection',
  qos_summary: 'Quality of service summary',
  qos_description:
    'In this section you can see the quality of service provided by the internet provider for the selected school categorized by period and type of metric',
  very_weak_connection: 'very weak connection',
  weak_connection: 'weak connection',
  strong_connection: 'strong connection',
  strong: 'strong',
  weak: 'weak',
  very_weak: 'very weak',
  connectivity_list: 'connectivity list',
  connection: 'connection',
  location: 'location',
  no_available_payments: 'No available payments for this contract',
  currency_type: 'Currency type',
  contact: 'contact',
  other: 'other',
  automatic: 'Automatic',
  forgot_password: 'Forgot password',
  wallet: {
    switch_subtitle:
      'By enabling this switch, you can configure a wallet here, and a new main menu option will be available to view the automatic contracts (requires logging off and logging in again).',
    switch_update_msg_ok: 'Saved',
    switch_update_msg_error: 'Error in saving setting',
    label: 'Wallet',
    copied: 'Copied!',
    copy_wallet: 'Copy wallet Address',
    view_explorer: 'View on Blockchain Explorer',
    attached_wallet: 'Attached Wallet',
    wallet_explain_1:
      'This wallet will be used to sign the transactions, creating a crypto contract, managing budget on the platform. Install',
    metamask: 'MetaMask',
    wallet_explain_2:
      'plugin in your browser and please refresh the page. Make sure that you are logged in or create a new MetaMask account. Alternatively, you can connect your wallet with',
    wallet_connect: 'Wallet Connect',
    wallet_metamask: 'MetaMask Wallet',
    wallet_trust: 'Trust Wallet',
    wallet_coinbase: 'Coinbase Wallet',
    connect: 'Connect',
    disconnect: 'Disconnect',
    wallet_not_verified: 'Wallet not verified',
    wallet_verified: 'Wallet verified',
    wallet_connected: 'Wallet connected',
    verify_msg_error: 'Error verifing wallet',
    verify_msg_error_already_Attached: 'Wallet selected is already attached to another user',
    connect_msg_error: 'Error connecting wallet',
    verify: 'Verify connected wallet',
    verify_msg: "Connected wallet doesn't match your verified wallet on Gigacounts.",
    verify_msg_choose: 'Verify connected wallet or choose WALLET_ADDRESS in your wallet provider.',
    verify_msg_choose_wtihout_wallet: 'The connected wallet is not verified on Gigacounts.',
    gigacounts_crypto_balance: 'Gigacounts Crypto Balance',
    wallet_this_is: 'This is a',
    gnosis_explain_1:
      'that is shared with all administrators users. To deposit funds to your Gnosis-Safe',
    gnosis_instructions: 'follow these instructions',
    gnosis_label: 'Account Safe',
    address_not_set: 'Address not set',
    automatic_contracts: 'Automatic Contracts',
    automatic_enabled: 'on',
    automatic_disabled: 'off',
    network_supported: 'Network Supported',
    network_unsupported: 'Network not Supported'
  },
  role_base_guard: {
    permission_denied: 'Permission Denied',
    without_permission: 'You do not have permission to access this page'
  },
  wallet_external_component: {
    connect: {
      selectingWallet: {
        header: 'Available Wallets',
        sidebar: {
          heading: '',
          subheading: 'Connect your wallet',
          paragraph:
            'Connecting your wallet is like “logging in” to Web3. Select your wallet from the options to get started.',
          IDontHaveAWallet: "I don't have a wallet"
        },
        recommendedWalletsPart1: '{app} only supports',
        recommendedWalletsPart2:
          'on this platform. Please use or install one of the supported wallets to continue',
        installWallet:
          'You do not have any wallets installed that {app} supports, please use a supported wallet',
        agreement: {
          agree: 'I agree to the',
          terms: 'Terms & Conditions',
          and: 'and',
          privacy: 'Privacy Policy'
        },
        whyDontISeeMyWallet: "Why don't I see my wallet?",
        learnMore: 'Click here to learn more'
      },
      connectingWallet: {
        header:
          '{connectionRejected, select, false {Connecting to {wallet}...} other {Connection Rejected}}',
        sidebar: {
          subheading: 'Approve Connection',
          paragraph:
            'Please approve the connection in your wallet and authorize access to continue.'
        },
        mainText: 'Connecting...',
        paragraph: 'Make sure to select all accounts that you want to grant access to.',
        previousConnection:
          '{wallet} already has a pending connection request, please open the {wallet} app to login and connect.',
        rejectedText: 'Connection Rejected!',
        rejectedCTA: 'Click here to try again',
        primaryButton: 'Back to wallets'
      },
      connectedWallet: {
        header: 'Connection Successful',
        sidebar: {
          subheading: 'Connection Successful!',
          paragraph: 'Your wallet is now connected to {app}'
        },
        mainText: 'Connected'
      }
    },
    modals: {
      actionRequired: {
        heading: 'Action required in {wallet}',
        paragraph: 'Please switch the active account in your wallet.',
        linkText: 'Learn more.',
        buttonText: 'Okay'
      },
      switchChain: {
        heading: 'Switch Chain',
        paragraph1:
          '{app} requires that you switch your wallet to the {nextNetworkName} network to continue.',
        paragraph2:
          '*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet.'
      },
      confirmDisconnectAll: {
        heading: 'Disconnect all Wallets',
        description: 'Are you sure that you would like to disconnect all your wallets?',
        confirm: 'Confirm',
        cancel: 'Cancel'
      },
      confirmTransactionProtection: {
        heading: 'Enable Transaction Protection',
        description:
          'Protect RPC Endpoints hide your transactions from front-running and sandwich bots to reduce unfavorable transaction settlement from slippage.',
        enable: 'Enable',
        dismiss: 'Dismiss'
      }
    },
    accountCenter: {
      connectAnotherWallet: 'Connect another Wallet',
      disconnectAllWallets: 'Disconnect all Wallets',
      currentNetwork: 'Current Network',
      enableTransactionProtection: 'Enable Transaction Protection',
      appInfo: 'App Info',
      learnMore: 'Learn More',
      gettingStartedGuide: 'Getting Started Guide',
      smartContracts: 'Smart Contract(s)',
      explore: 'Explore',
      poweredBy: 'powered by',
      addAccount: 'Add Account',
      setPrimaryAccount: 'Set Primary Account',
      disconnectWallet: 'Disconnect Wallet',
      copyAddress: 'Copy Wallet address'
    },
    notify: {
      transaction: {
        txRequest: 'Your transaction is waiting for you to confirm',
        nsfFail: 'You have insufficient funds for this transaction',
        txUnderpriced: 'The gas price for your transaction is too low, try a higher gas price',
        txRepeat: 'This could be a repeat transaction',
        txAwaitingApproval: 'You have a previous transaction waiting for you to confirm',
        txConfirmReminder: 'Please confirm your transaction to continue',
        txSendFail: 'You rejected the transaction',
        txSent: 'Your transaction has been sent to the network',
        txStallPending: 'Your transaction has stalled before it was sent, please try again',
        txStuck: 'Your transaction is stuck due to a nonce gap',
        txPool: 'Your transaction has started',
        txStallConfirmed: "Your transaction has stalled and hasn't been confirmed",
        txSpeedUp: 'Your transaction has been sped up',
        txCancel: 'Your transaction is being canceled',
        txFailed: 'Your transaction has failed',
        txConfirmed: 'Your transaction has succeeded',
        txError: 'Oops something went wrong, please try again',
        txReplaceError: 'There was an error replacing your transaction, please try again'
      },
      watched: {
        txPool:
          'Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txSpeedUp:
          'Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been sped up',
        txCancel:
          'Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been canceled',
        txConfirmed:
          'Your account  for school{verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txFailed:
          'Your account failed to {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txStuck: 'Your transaction is stuck due to a nonce gap'
      },
      time: {
        minutes: 'min',
        seconds: 'sec'
      }
    }
  },
  previous_page: 'Previous page',
  next_page: 'Next page',
  items_per_page: 'Items per page',
  page_number: 'Page number',
  address_copied: 'Address copied!',
  account_safe: 'Account safe',
  send_feedback: 'Send feedback',
  send_us_feedback: 'Send us feedback',
  flag: 'flag',
  personal_info: 'Personal info',
  role: 'role',
  country_name: 'Country name',
  address: 'address',
  day: 'day',
  median_value: 'Median value',
  metric_name: 'Metric name',
  clean_form: 'Clean form',
  add_contact: 'Add contact',
  payment_period: 'Payment period',
  receipt: 'Receipt',
  home: 'Home',
  more: 'more',
  overview: 'overview',
  size: 'size',
  spent_budget: 'Budget spent',
  duplicate: 'duplicate',
  bypass_isp_description:
    'If you activate this option the contract manager will be able to confirm the contract without ISP confirmation',
  contact_saved: 'Contact saved',
  help: 'Help',
  visit_help_page: 'visit help page',
  payment_frequency: 'payment frequency',
  of: 'of',
  items: 'items',
  pages: 'pages',
  monthly: 'monthly',
  weekly: 'weekly',
  biweekly: 'biweekly',
  daily: 'daily',
  log_out: 'Log out',
  connectivity: 'connectivity',
  schools_connectivity: 'Schools connectivity',
  no_comments_added: 'No comments added',
  constant_status: {
    payment: {
      Unpaid: 'confirmed but unpaid',
      Paid: 'paid',
      Draft: 'draft'
    },
    contract: {
      Draft: 'draft',
      Sent: 'sent',
      Confirmed: 'confirmed',
      Ongoing: 'ongoing',
      Expired: 'expired',
      Completed: 'completed'
    },
    connectivity: {
      Connected: 'connected',
      PoorlyConnected: 'poorly connected',
      Disconnected: 'disconnected',
      Unknown: 'unknown'
    },
    notification: {
      SENT: 'new',
      READ: 'read'
    },
    web_transaction: {
      OK: 'Ok',
      ERROR: 'Error'
    }
  },
  payment_status: 'payment status',
  set_payment_status: 'set payment status',
  connectivity_status_distribution: 'connectivity status distribution',
  connectivity_quality_check: 'connectivity quality check',
  mark_as_read: 'mark as read',
  title: 'title',
  yesterday: 'yesterday',
  today: 'today',
  current_delivery: 'current delivery',
  agreement: 'agreement',
  older: 'older',
  contract_frequency: 'contract frequency',
  has_reliable_measure_data: 'Has reliable measure data',
  schools_reliability: 'Schools measures reliability',
  reliable: 'reliable',
  unreliable: 'unreliable',
  drag_and_drop_pdf_multiple: 'Drag and drop .pdf file here or click to upload',
  drag_and_drop_pdf_singular: 'Drag and drop .pdf files here or click to upload',
  drag_and_drop_csv_singular: 'Drag and drop .csv file here or click to upload',
  drag_and_drop_csv_multiple: 'Drag and drop .csv files here or click to upload',
  knowledge_base: 'Knowledge base',
  contact_information: 'contact information',
  education_level: 'Education level',
  no_breaking_rules: 'No breaking rules added for this contract',
  schools_connected_out_of: 'schools connected out of',
  during: 'during',
  web3_transcations: 'Automatic Transactions',
  search_isp_contacts: 'Select ISP contacts',
  search_contract_team: 'Search for available contract team members',
  onboard_steps: {
    home: {
      account_nav_information: 'In this section you can edit your personal information',
      notifications_popover: 'You can view and manage your notifications',
      feedback_link: 'Here you can share your experience with the GIGACounts application',
      language_popover: 'Here you can select the language of the application',
      help_page_link: 'Here you can visit the help page',
      ask_for_help_link: 'Here you can ask for help'
    },
    contracts: {
      new_contract: 'This is the button to create a new contract',
      filter: 'Here you can apply certain filters',
      table_container: 'Here you can see the contracts that you can manage'
    },
    profile: {
      wallet: 'Here you can connect your wallet for the payment of automatic contracts'
    },
    contract_detail: {
      schools: 'Here you can see the list of schools and monitor the status of their connectivity',
      payment: 'Here you can export the invoices and add them'
    }
  },
  next: 'next',
  skip: 'skip',
  open: 'open',
  last: 'last',
  payment_receiver: 'ISP payment receiver',
  table_no_data: {
    contracts: 'contract',
    measures: 'measure',
    notifications: 'notification',
    payments: 'payment',
    schools: 'school',
    users: 'user',
    attachments: 'attachment',
    transactions: 'transaction'
  },
  table_empty: {
    title: 'No recorded data yet',
    subtitle: 'Start by creating a {{content}} and it will be registered in this space'
  },
  table_not_found: {
    title: 'Your search returned no results',
    subtitle: 'Try again verifying the data correctly or perform a new search'
  },
  fedback_rating: {
    1: 'I feel dissatisfied',
    2: 'It could be better',
    3: 'I like it',
    4: 'I like it a lot',
    5: 'I love it'
  },
  education_levels: {
    high_school: 'High school',
    primary: 'Primary',
    secondary: 'Secondary'
  },
  payment_receiver_warning:
    "The selected user does not have a configured wallet. He won't be able to receive automatic payments until he sets one up in his profile.",
  payment_details: 'Payment details',
  no_wallet_address: 'No wallet address',
  isp_contacts: 'ISP contacts',
  school: 'school',
  name_spaces_error: 'Name cannot contain spaces',
  budget_exceeds_max_error: 'Total budget in schools must be equal to contract budget',
  uploaded: 'uploaded',
  added_as_contact: 'added as contact',
  added_as_team_member: 'added as team member',
  failed_to_upload: 'failed to upload',
  failed_to_add_as_contact: 'failed to add as contact',
  failed_to_add_as_team_member: 'failed to add as team member',
  file_container_label_accept: 'Supported file types are {{accept}}',
  file_container_label_size: 'Max file size is {{size}}mb.',
  page_error: {
    403: {
      title: 'No permission',
      content:
        'The page you are trying access has restricted access. Please refer to your system administrator'
    },
    404: {
      title: 'Page not found',
      content:
        'Sorry, we could not find the page you are looking for. Please make sure the URL is correct.'
    },
    500: {
      title: 'Internal Server Error',
      content: 'There was an error. Please try again later.'
    },
    generic: {
      title: 'Looks like there was an error',
      content: 'Something went wrong processing your request. Please try again.'
    }
  },
  widgets: {
    map: {
      title: 'Schools map',
      average_latency: 'Average latency',
      average_uptime: 'Average uptime',
      average_download_speed: 'Average download speed',
      average_upload_speed: 'Average upload speed',
      you_are_here: 'You are here'
    },
    contract_issues: {
      title1: 'Contracts with',
      title2: 'issues',
      no_data: 'No contracts have SLA issues'
    },
    take_action: {
      title: 'Actions requiring attention',
      no_data: 'No actions to be taken'
    },
    school_issues: {
      title1: 'Schools with',
      title2: 'issues',
      no_data: 'No schools have SLA issues'
    },
    upcoming_payments: {
      title: 'Upcoming payments',
      no_data: 'No upcoming payments'
    },
    overdue_payment: {
      title: 'Overdue payments',
      no_data: 'No overdue payments'
    }
  },
  the_file_is_downloading: 'the file is downloading',
  copied_link: 'copied link',
  share_contract_details: 'Share contract details',
  contract_dates: 'Contract dates',
  options: 'options',
  copy_url: 'copy and share URL',
  distribute_budget_equally: 'Distribute budget equally',
  add_external_isp_contact: 'Add external ISP contact',
  ask_for_help: 'ask for help',
  contract_period: 'contract period',
  tooltips: {
    SLA: {
      line1: 'Level of quality of service contracted',
      line2: 'between the ISP and a',
      line3: 'contract creator for a school.'
    },
    upcoming_payments: {
      line1: 'Payments that are unpaid',
      line2: 'but their coverage period',
      line3: 'has not started yet.'
    },
    overdue_payments: {
      line1: 'Payments that are unpaid',
      line2: 'and their coverage period',
      line3: 'has ended.'
    },
    measures_24: 'Measures are from the last 24 hours',
    connectivity_distribution_status: {
      line1: 'Shows (in %) whether school(s) had good, bad or no connection.',
      line2: 'Measured for {{number}} schools under the contract,',
      line3: 'for the selected payment period of {{dateFrom}} to {{dateTo}}.'
    },
    connectivity_distribution_days: {
      line1: 'Shows (in %) whether school(s) were connected all days, some days or 0 days.',
      line2: 'Measured for {{number}} schools under the contract,',
      line3: 'for the selected payment period of {{dateFrom}} to {{dateTo}}.'
    },
    quality_of_service_comparison: {
      line1: 'Compares between the QoS agreed on in the contract and the QoS delivered',
      line2: 'for the selected payment period of {{dateFrom}} to {{dateTo}}.'
    },
    payment_status:
      'Allows you to decide and set a payment status. If nothing is selected the status will be set to draft.',
    connectivity_graph: {
      days: {
        success: '{{number}}% schools connected every day',
        warning: '{{number}}% schools connected some days',
        error: '{{number}}% schools disconnected every day',
        unknown: '{{number}}% schools with unknown data for connected days '
      },
      status: {
        success: '{{number}}% schools with good connection',
        warning: '{{number}}% schools with bad connection',
        error: '{{number}}% schools with no connection',
        unknown: '{{number}}% schools with unknown connection status'
      }
    }
  },
  install: 'install',
  month: 'month',
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December',
  for: 'for',
  percentage_schools_connected: 'percentage of schools connected',
  percentage_schools_connected_by_number_of_days:
    'percentage of schools connected by number of days',
  number_schools: '{{number}} schools',
  from_date_to_date: 'from {{dateFrom}} to {{dateTo}}',
  distributed_by_percentage_of_schools: 'distributed by percentage of schools',
  no_connection: 'no connection',
  bad_connection: 'bad connection',
  good_connection: 'good connection',
  unknown_data: 'unknown data',
  out_of_number_days: 'out of {{number}} days',
  out_of_number_schools: 'out of {{number}} schools',
  connected_number_days: 'connected {{number}} days',
  connected_every_day: 'connected every day',
  connected_1_to_number_days_out_of_max_days: 'connected 1 to {{number}} days out of {{max}} days',
  mark_as_reliable: 'mark as reliable',
  mark_as_unreliable: 'mark as unreliable',
  connectivity_distribution_by_status: 'connectivity distribution: by status',
  connectivity_distribution_by_days: 'connectivity distribution: by days',
  quality_of_service_comparison: 'quality of service comparison',
  none: 'None',
  pay_reciev: 'Pay. Reciev.'
}

export default en
