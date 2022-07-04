import React from 'react'
import { RouteComponentProps, Switch, Route } from 'react-router-dom'

import Login from '../components/Login/index'
import { LOGIN_ROUTE, routes } from './routes'

export interface RouteProps {
  path: string | Array<string>
  exact?: boolean
  isPrivate?: boolean
  component: React.ComponentType
  redirect?: string
  render?: <T>(props: RouteComponentProps<T>) => React.ReactNode
  title?: JSX.Element | string
  url?: string
}

export interface RouteParams {
  id: string
}

export const RouterWrapper: React.FC<{ routes: Array<RouteProps> }> = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path={LOGIN_ROUTE}>
        <Login />
      </Route>
      {routes.map((route, i) => (
        <Route key={i} exact={route.exact} component={route.component} path={route.path} />
      ))}
    </Switch>
  )
}
