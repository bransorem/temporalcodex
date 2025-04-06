import {
  Button,
  Input,
  Form,
  FormField,
  FormControl,
  FormMessage,
  Table,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from '@/components/ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Coordinate } from './coordinates'

const formSchema = z.object({
  location: z.string()
    .length(3, { message: 'Exactly 3' })
    .regex(new RegExp(/^[1-9-=@]{3}$/)),
  message: z.string()
    .min(5)
    .max(512)
})

type CoordinateFormProps = {
  onAdd?: (coordinate: Coordinate) => void;
}

export function CoordinateForm({ onAdd }: CoordinateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore - infinite recursion detected
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      message: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = { data: { message: values.message } }

    const response = await fetch(`/api/code/${values.location}`, {
      method: 'POST',
      body: JSON.stringify(data)
    })

    const result = await response.json<{ message: string }>()

    if (result.message === 'success') {
      onAdd?.({ ...data, show: true, location: values.location })
      form.reset();
    }

    return result
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Table>
            <TableCaption>Temporal coordinates</TableCaption>
            <TableFooter>
              <TableRow>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <TableCell className="font-medium text-left w-[100px]">
                      <FormControl>
                        <Input className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </TableCell>
                  )}
                  />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <TableCell className="text-left">
                      <FormControl>
                        <Input className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </TableCell>
                  )}
                  />
                <TableCell className="text-right">
                  <Button type="submit">Add</Button>
                  <p>{'‎'}</p>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </form>
      </Form>
    </>
  )
}
