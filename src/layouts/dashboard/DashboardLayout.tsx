import { Theme } from '@carbon/react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LAYOUT_SIDEBAR_WIDTH } from 'src/constants'
import { useTheme } from 'src/theme'
import Header from './nav/Header'

export default function DashboardLayout() {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true)
  const { spacing } = useTheme()
  return (
    <>
      <Theme theme="g90">
        <Header isSideNavExpanded={isSideNavExpanded} setIsSideNavExpanded={setIsSideNavExpanded} />
      </Theme>
      <main
        style={{
          paddingLeft: isSideNavExpanded ? LAYOUT_SIDEBAR_WIDTH : 0,
          paddingTop: spacing.xl + spacing.md
        }}
      >
        <Outlet />
      </main>
    </>
  )
}
