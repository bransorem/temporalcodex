import Page from '@/client/home'
import { Coordinate, CoordinateTable } from '@/components/coordinates'
import { use, Suspense } from 'react'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../root'

export const fetchData = async () => {
  const data = await fetch('/api/code/list')
  return data.json<Coordinate[]>()
}

export const Component = ({ promise }: { promise: Promise<Coordinate[]> }) => {
  const data = use(promise)
  return <CoordinateTable coordinates={data} />
}

export function Stranger() {
  return (
    <>
      <Page>
        <Suspense fallback={'initializing...'}>
          <Component promise={fetchData()} />
        </Suspense>
      </Page>
    </>
  )
}

export const strangerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stranger',
  component: Stranger,
})

