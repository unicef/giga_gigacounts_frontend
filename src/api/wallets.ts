import instance from './init'

export const getWalletRandomString = async () => {
  const response = await instance.get(`/user/wallet-random-string`)
  return response.data
}

export const attachWallet = async (address: string, message: string) => {
  const response = await instance.post(`/user/attach-wallet`, {
    address,
    message
  })
  return response.data
}

export const getGigaTokenOwnerWalletAddress = async () => {
  const response = await instance.get(`/user/giga-token-owner-wallet-address`)
  return response.data
}
