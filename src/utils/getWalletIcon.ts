export const getWalletIcon = (wrongAddress: boolean, isVerified?: boolean) => {
  if (wrongAddress) {
    return 'icon-wallet-unknown'
  }

  if (isVerified) {
    return 'icon-wallet-verified'
  }

  return 'icon-wallet'
}
