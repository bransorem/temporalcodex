import Page from '@/client/admin'
import { Coordinate, CoordinateTable } from '@/components/coordinates'
import { useState } from 'react'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../root'
import { StrangerEntry, StrangerName } from '@/components/pass'
import { useSuspenseQuery } from '@tanstack/react-query'

export function Stranger() {
  const [show, setShow] = useState(false)

  const { data: hasPassword } = useSuspenseQuery({
    queryKey: ['passwordname'],
    queryFn: () => fetch('/api/stranger/name')
      .then(d => d.json<{ required: boolean }>())
  })

  const { data } = useSuspenseQuery({
    queryKey: ['coordinates'],
    queryFn: () => fetch('/api/code/list').then(d => d.json<Coordinate[]>())
  })

  return (
    <>
      <Page>
        { hasPassword?.required && !show &&
          <StrangerEntry onChange={(v) => setShow(v) } />
        }
        { (!hasPassword?.required || show) && data &&
          <div className="flex flex-col">
            <StrangerName />
            <CoordinateTable coordinates={data} />
          </div>
        }
      </Page>
    </>
  )
}

export const strangerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stranger',
  component: Stranger,
})
