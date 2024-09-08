import { lazy } from 'react';

const BaseRoutes = [
  {
    path: '/*',
    component: lazy(() => import('./AuthRouter')),
    useAuth: false,
    exact: true,
  },

  {
    path: '/app/*',
    component: lazy(() => import('./AdminRouter')),
    useAuth: true,
    allowedRoles: ['Admin'],
    exact: true,
  },
  {
    path: '/instructor/*',
    component: lazy(() => import('./InstructorRouter')),
    useAuth: true,
    allowedRoles: ['Instructor'],
    exact: true,
  },
  {
    path: '/user/*',
    component: lazy(() => import('./UserRouter')),
    useAuth: true,
    allowedRoles: ['User'],
    exact: true,
  },
  {
    path: '*',
    component: lazy(() => import('../modules/NotFound')),
    useAuth: false,
    allowedRoles: ['User', 'Instructor', 'Admin'],
    exact: true,
  },
];

export default BaseRoutes;
