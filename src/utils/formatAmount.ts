const formatter = new Intl.NumberFormat()

export const formatAmount = (amount: number) => formatter.format(amount)
