import Page from '@/client/admin'
import { Coordinate, CoordinateTable } from '@/components/coordinates'
import { use, Suspense } from 'react'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../root'

const fetchData = async () => {
  const data = await fetch('/api/code/list')
  return data.json<Coordinate[]>()
}

export const StrangerComponent = ({ promise }: { promise: Promise<Coordinate[]> }) => {
  const data = use(promise)
  return <CoordinateTable coordinates={data} />
}

export function Stranger() {
  return (
    <>
      <Page>
        <Suspense fallback={'initializing...'}>
          <StrangerComponent promise={fetchData()} />
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
