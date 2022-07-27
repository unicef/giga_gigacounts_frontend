import { useMemo } from 'react'
import Text, { TextProps } from '../Text'

interface FormattedDateProps extends TextProps {
  date: string | Date
  className?: string
}

enum Month {
  Jan = 0,
  Feb = 1,
  Mar = 2,
  Apr = 3,
  May = 4,
  Jun = 5,
  Jul = 6,
  Aug = 7,
  Sep = 8,
  Oct = 9,
  Nov = 10,
  Dec = 11,
}

const FormattedDate = ({ date, ...props }: FormattedDateProps) => {
  const dateObj = useMemo(() => new Date(date), [date])

  const { year, month, day } = useMemo(
    () => ({
      year: dateObj.getFullYear(),
      month: Month[dateObj.getMonth()],
      day: dateObj.getDate(),
    }),
    [dateObj],
  )

  return <Text title={dateObj.toLocaleString()} {...props}>{`${month} ${day}, ${year}`}</Text>
}

export default FormattedDate
