import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { CoordinateForm } from './addCoordinate'
import { useState } from 'react';

export type Symbols = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '-' | '=' | '@'

type CoordData = {
  data: {
    message: string;
  }
}

export type Coordinate = {
  location: string;
  show?: boolean;
} & CoordData

type CoordinateTableProps = {
  coordinates: Coordinate[];
}

export const fetchCoordinate = async (code: string) => {
  const data = await fetch(`/api/code/${code}`)
  return await data.json<CoordData>()
}

const deleteCoordinate = async (code: string) => {
  const resp = await fetch(`/api/code/${code}`, {
    method: 'DELETE'
  })
  return resp.json()
}

export function CoordinateTable({ coordinates }: CoordinateTableProps) {
  const [coords, setCoords] = useState(coordinates)

  const updateCoord = async (code: string) => {
    const data = await fetchCoordinate(code)
    if (data) {
      const show = true
      const cords = coords.map(c => {
        if (c.location === code) {
          return { ...c, ...data, show }
        }

        return c;
      })
      setCoords(cords)
    }
  }

  const insertCoord = async (coordinate: Coordinate) => {
    const c = coords.map(i => i)
    const f = coords.map(i => i.location).indexOf(coordinate.location)

    if (f > -1) {
      c[f] = coordinate
      setCoords(c)
    } else {
      setCoords([...coords, coordinate])
    }
  }

  const deleteCoord = async (coordinate: Coordinate) => {
    await deleteCoordinate(coordinate.location)
    const c = coords.filter(i => i.location !== coordinate.location)
    setCoords(c)
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Coordinate</TableHead>
              <TableHead>Recording</TableHead>
              <TableHead className="text-right w-[45px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coords.map((coordinate) => (
              <TableRow key={coordinate.location}>
                <TableCell className="font-medium text-left">{coordinate.location}</TableCell>
                <TableCell className="text-left relative px-3">
                  {coordinate.show && (
                    <>{coordinate.data?.message}</>
                  )}
                  { !coordinate.show && (
                    <>
                      {'This is a placedholder to avoid unnecessary bulk queries'}
                      <div className="absolute top-0 left-0 w-100 h-full backdrop-blur" />
                    </>
                  )}
                </TableCell>
                <TableCell className="text-right flex align-center justify-center">
                  <Button variant='outline' onClick={() => updateCoord(coordinate.location)}>Reveal</Button>
                  <Button variant='outline' onClick={() => deleteCoord(coordinate)} className='w-[36px] h-[36px] ml-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path></svg>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CoordinateForm onAdd={insertCoord} />
      </div>
    </>
  )
}
