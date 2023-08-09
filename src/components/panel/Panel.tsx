/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import { SectionTitle } from 'src/components/typography'
import { ICONS } from 'src/constants'
import { useTheme } from 'src/theme'

interface PanelProps {
  children: JSX.Element
  label: string
  defaultExpanded?: boolean
  required?: boolean
}

export default function Panel({ label, children, defaultExpanded = true, required }: PanelProps) {
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
        <SectionTitle label={label} required={required} />
        <div>
          {expanded ? (
            <ICONS.ChevronUp size={20} style={{ color: palette.primary.main }} />
          ) : (
            <ICONS.ChevronDown size={20} style={{ color: palette.primary.main }} />
          )}
        </div>
      </div>

      {expanded && <div style={{ width: 'auto' }}> {children}</div>}
    </>
  )
}
