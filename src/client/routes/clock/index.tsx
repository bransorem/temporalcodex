import Page from '@/client/page'
import { fetchCoordinate, Symbols } from '@/components/coordinates'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../root'
import { useEffect, useState } from 'react'

const CENTER = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
const HALF = 'absolute h-1/2 -top-1/2'
const DOT = 'rounded-full'

type TimeProps = {
  symbol: Symbols;
  rotate: number;
  onClick?: (symbol: Symbols) => void;
}

function Time({ symbol, rotate, onClick }: TimeProps) {
  return (
    <div className={`${CENTER} h-1/2 w-10 rotate-${rotate}`}>
      <div className={HALF}>
        <div className={`${DOT} w-22 h-22 -rotate-${rotate} cursor-pointer text-amber-300 text-8xl`} onClick={() => onClick?.(symbol)}>
          {symbol}
        </div>
      </div>
    </div>
  )
}

export function Clock() {
  const [code, setCode] = useState<Symbols[]>([])
  const [msg, setMsg] = useState<string>()
  const [fail, setFail] = useState<boolean>(false)
  const [tid, setTid] = useState<number>()

  const timer = () => {
    setMsg('')
    setCode([])
  }

  useEffect(() => {
    if (code.length === 3) {
      const c = code.join('')
      fetchCoordinate(c).then((r) => {
        if (r?.data?.message) {
          setMsg(r.data.message)
          setFail(false)
        } else {
          setFail(true)
        }

        const t = setTimeout(timer, 5000)
        setTid(t)
        setTimeout(() => setFail(false), 5000)
      })
    }
  }, [code])

  const clicker = (symbol: Symbols) => {
    clearTimeout(tid)
    if (code.length < 3) {
      setCode([...code, symbol])
    } else {
      setCode([symbol])
    }
  }

  return (
    <>
      <Page>
        <div className="flex flex-col">
          <div className="w-[500px] h-[500px] relative font-[Timeless]">
            <div className={`w-[300px] h-[300px] border-5 border-blue-900 rounded-full ${CENTER}`}></div>
            <div className={`${DOT} ${CENTER} w-18 h-18`}>
              <div className={`absolute w-full h-full border-3 border-blue-900 rounded-full -left-24`}>
                { code && code.length > 0 &&
                  (
                    <h1 className={`text-amber-300 text-8xl ${CENTER}`}>{code[0]}</h1>
                  )
                }
              </div>
            </div>
            <div className={`${DOT} ${CENTER} w-18 h-18`}>
              <div className={`absolute w-full h-full border-3 border-blue-900 rounded-full`}>
                { code && code.length > 1 &&
                  (
                    <h1 className={`text-amber-300 text-8xl ${CENTER}`}>{code[1]}</h1>
                  )
                }
              </div>
            </div>
            <div className={`${DOT} ${CENTER} w-18 h-18`}>
              <div className={`absolute w-full h-full border-3 border-blue-900 rounded-full left-24`}>
                { code && code.length > 2 &&
                  (
                    <h1 className={`text-amber-300 text-8xl ${CENTER}`}>{code[2]}</h1>
                  )
                }
              </div>
            </div>
            <Time symbol='1' rotate={30} onClick={clicker} />
            <Time symbol='2' rotate={60} onClick={clicker} />
            <Time symbol='3' rotate={90} onClick={clicker} />
            <Time symbol='4' rotate={120} onClick={clicker} />
            <Time symbol='5' rotate={150} onClick={clicker} />
            <Time symbol='6' rotate={180} onClick={clicker} />
            <Time symbol='7' rotate={210} onClick={clicker} />
            <Time symbol='8' rotate={240} onClick={clicker} />
            <Time symbol='9' rotate={270} onClick={clicker} />
            <Time symbol='-' rotate={300} onClick={clicker} />
            <Time symbol='=' rotate={330} onClick={clicker} />
            <Time symbol='@' rotate={0} onClick={clicker} />
          </div>
          { msg && (<div className="text-white pt-8">{msg}</div>) }
          { fail && (<div className="text-rose-500 pt-8">Unable to locate message</div>) }
        </div>
      </Page>
    </>
  )
}

export const clockRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Clock,
})


const TRICK = 'rotate-30 rotate-60 rotate-90 rotate-120 rotate-150 rotate-180 rotate-210 rotate-240 rotate-270 rotate-300 rotate-330'
const TRICK2 = '-rotate-30 -rotate-60 -rotate-90 -rotate-120 -rotate-150 -rotate-180 -rotate-210 -rotate-240 -rotate-270 -rotate-300 -rotate-330'
