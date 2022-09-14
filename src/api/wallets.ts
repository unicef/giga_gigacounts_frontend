import instance from './init'

export const getWalletRandomString = async () => {
  const response = await instance.get(`/wallet-random-string`)
  if (response.status === 200) return response.data
  throw new Error(`Could not obtain verification message`)
}

export const attachWallet = async (address: string, message: string) => {
  const response = await instance.post(`/user/attach-wallet`, {
    address,
    message,
  })
  if (response.status === 200) return response.data
  throw new Error(`Could not obtain verification message`)
}
