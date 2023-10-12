import { Theme } from '@carbon/react'
import { Outlet } from 'react-router-dom'
import { LAYOUT_SIDEBAR_WIDTH } from 'src/constants'
import { useNavbar } from 'src/context/layout/NavbarContext'
import { useTheme } from 'src/theme'
import Header from './nav/Header'

export default function DashboardLayout() {
  const { spacing } = useTheme()
  const { expanded } = useNavbar()

  return (
    <>
      <Theme theme="g90">
        <Header />
      </Theme>
      <main
        id="#main-content"
        style={{
          paddingLeft: expanded ? LAYOUT_SIDEBAR_WIDTH : 0,
          paddingTop: spacing.xl + spacing.md
        }}
      >
        <Outlet />
      </main>
    </>
  )
}
