import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { renderer } from './renderer'
import { NotFound } from './404'

const MAX_CODES = 200

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/api', async (c) => {
  return c.json({ message: 'Hello from API' })
})

app.get('/api/code', async (c) => {
  return c.json({ message: 'Hello from API' })
})

app.get('/api/code/list', async (c) => {
  const o = await c.env.CODEX.list({ limit: MAX_CODES })
  return c.json(o.keys.map(n =>
    ({
      location: n.name,
      data: { message: '' },
    })
  ))
})

app.get('/api/code/:code', async (c) => {
  const code = c.req.param('code')
  // TODO: middleware
  if (!/^[1-9-=@]{3}$/.test(code)) {
    throw new HTTPException(401, { message: 'Invalid code' })
  }
  const o = await c.env.CODEX.get(code)
  return o ? c.json(JSON.parse(o)) : c.json({})
})

app.post('/api/code/:code', async (c) => {
  const code = c.req.param('code')
  if (!/^[1-9-=@]{3}$/.test(code)) {
    throw new HTTPException(401, { message: 'Invalid code' })
  }

  const r = await c.env.CODEX.list()
  if (r.keys.length > MAX_CODES-1) {
    throw new HTTPException(401, { message: 'Maximum codes reached' })
  }

  const fd = await c.req.json()
  const data = JSON.stringify(fd)
  await c.env.CODEX.put(code, data)
  return c.json({ message: 'success' })
})

app.delete('/api/code/:code', async (c) => {
  const code = c.req.param('code')
  if (!/^[1-9-=@]{3}$/.test(code)) {
    throw new HTTPException(401, { message: 'Invalid code' })
  }
  await c.env.CODEX.delete(code)
  return c.json({ message: 'success' })
})

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <>
      <div id="root"></div>
    </>
  )
})

app.get('/stranger', (c) => {
  return c.render(
    <>
      <div id="root"></div>
    </>
  )
})

app.get('/*', (c) => {
  return c.render(
    <>
      <NotFound />
    </>
  )
})

export default app
