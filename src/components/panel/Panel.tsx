/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { capitalizeFirstLetter } from 'src/utils/strings'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from '@carbon/icons-react'
import { useTheme } from 'src/theme'
import { SectionTitle } from '../typography'

interface PanelProps {
  children: JSX.Element
  label: string
  defaultExpanded?: boolean
}

export default function Panel({ label, children, defaultExpanded = true }: PanelProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const { palette, spacing } = useTheme()
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginTop: spacing.xs
        }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <SectionTitle label={capitalizeFirstLetter(label)} />
        <div>
          {expanded ? (
            <ChevronUp size={20} style={{ color: palette.primary.main }} />
          ) : (
            <ChevronDown size={20} style={{ color: palette.primary.main }} />
          )}
        </div>
      </div>

      {expanded && <div style={{ width: 'auto' }}> {children}</div>}
    </>
  )
}
