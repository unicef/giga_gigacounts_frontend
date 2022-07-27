import { ContractStatus } from 'src/components/Dashboard/Contracts/@types/ContractType'

export const contractStatusToId = (status?: string | (string | null)[] | null) => {
  switch (status) {
    case ContractStatus.Draft.toLowerCase():
      return 0

    case ContractStatus.Sent.toLowerCase():
      return 1

    case ContractStatus.Confirmed.toLowerCase():
      return 2

    case ContractStatus.Ongoing.toLowerCase():
      return 3

    case ContractStatus.Expired.toLowerCase():
      return 4

    case ContractStatus.Completed.toLowerCase():
      return 5

    default:
      return undefined
  }
}
