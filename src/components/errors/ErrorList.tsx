/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ChevronDown, ChevronUp } from '@carbon/icons-react'
import { useState } from 'react'
import { Typography } from 'src/components/typography'
import { useTheme } from 'src/theme'
import { capitalizeFirstLetter } from 'src/utils/strings'

export default function ErrorList({
  title,
  errorMessages
}: {
  title: string
  errorMessages: string[]
}) {
  const { palette, spacing } = useTheme()
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      {errorMessages.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px ${palette.error.main} solid`,
            cursor: 'pointer',
            marginTop: spacing.xl
          }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          <Typography as="h6" variant="error">
            {capitalizeFirstLetter(title)}
          </Typography>
          <div>{expanded ? <ChevronUp /> : <ChevronDown />}</div>
        </div>
      )}
      {expanded && errorMessages.map((error) => <Typography variant="error">{error}</Typography>)}
    </>
  )
}
