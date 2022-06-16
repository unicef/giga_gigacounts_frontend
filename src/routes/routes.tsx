import { lazy } from 'react';
import { RouteProps } from './RouterWrapper';

export const LOGIN_ROUTE = '/';
export const DASHBOARD_ROUTE = '/dashboard';
export const NOT_FOUND_ROUTE = '*';

const Dashboard = lazy(() => import('../components/Dashboard/index'));
const NotFound = lazy(() => import('../components/common/NotFound/NotFound'));

export const routes: Array<RouteProps> = [
  {
    path: DASHBOARD_ROUTE,
    exact: false,
    isPrivate: false,
    component: Dashboard,
    title: 'Dashboard'
  },
  {
    path: NOT_FOUND_ROUTE,
    exact: false,
    isPrivate: false,
    component: NotFound,
    title: 'Not Found'
  }
];
