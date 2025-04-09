import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { renderer } from './renderer'
import { NotFound } from './404'

const MAX_CODES = 501

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
async function digestMessage(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/api', async (c) => {
  return c.json({ message: 'Hello from API' })
})

app.get('/api/code', async (c) => {
  return c.json({ message: 'Hello from API' })
})

app.get('/api/stranger/name', async (c) => {
  const p = await c.env.CODEX.get('strangername')
  return c.json({ required: !!(p && p.length > 8) })
})

app.post('/api/stranger/name', async (c) => {
  const vals = await c.req.json()
  const hexIn = await digestMessage(vals.password)
  const hexOut = await c.env.CODEX.get('strangername')
  return c.json({ success: hexIn == hexOut })
})

app.post('/api/stranger/name/give', async (c) => {
  const vals = await c.req.json()

  if (vals.password !== vals.confirm) {
    return c.json({ success: false })
  }

  const hex = await digestMessage(vals.password)
  await c.env.CODEX.put('strangername', hex)
  return c.json({ success: true })
})

app.get('/api/code/list', async (c) => {
  const o = await c.env.CODEX.list({ limit: MAX_CODES })
  const k = o.keys.filter(a => a.name != 'strangername')
  return c.json(k.map(n =>
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
