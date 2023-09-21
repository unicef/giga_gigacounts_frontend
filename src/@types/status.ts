export enum ConnectivityStatus {
  Connected = 'Connected',
  PoorlyConnected = 'PoorlyConnected',
  Disconnected = 'Disconnected',
  Unknown = 'Unknown'
}

export enum ContractStatus {
  Draft = 'Draft',
  Sent = 'Sent',
  Confirmed = 'Confirmed',
  Ongoing = 'Ongoing',
  Expired = 'Expired',
  Completed = 'Completed'
}

export enum PaymentStatus {
  Unpaid = 'Unpaid',
  Paid = 'Paid',
  Draft = 'Draft'
}

export enum NotificationStatus {
  SENT = 'SENT',
  READ = 'READ'
}

export enum Web3TransactionStatus {
  OK = 'OK',
  ERROR = 'ERROR'
}
