import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './root'
import { Stranger } from './stranger'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Stranger,
})

export * from './stranger'
export * from './root'
