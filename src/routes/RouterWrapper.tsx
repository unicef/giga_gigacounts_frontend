import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../components/Login/index'
import { LOGIN_ROUTE, routes } from './routes'

export interface RouteProps {
  path: string
  isPrivate?: boolean
  component: React.ComponentType
  redirect?: string
  title?: JSX.Element | string
  url?: string
}

export const RouterWrapper: React.FC<{ routes: Array<RouteProps> }> = (): JSX.Element => {
  return (
    <Routes>
      <Route path={LOGIN_ROUTE}>
        <Login />
      </Route>
      {routes.map((route, i) => {
        const Element = route.component
        return <Route key={i} path={route.path} element={<Element />} />
      })}
    </Routes>
  )
}
