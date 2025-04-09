import {
  Button,
  Input,
  Form,
  FormField,
  FormControl,
  FormMessage,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHeader,
  TableHead,
} from '@/components/ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({ password: z.string() })

type PassForm = {
  onChange?: (success: boolean) => void;
}

export function AccessForm({ onChange }: PassForm) {
  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore - infinite recursion detected
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = values

    const response = await fetch(`/api/stranger/name`, {
      method: 'POST',
      body: JSON.stringify(data)
    })

    const result = await response.json<{ success: boolean }>()

    if (result.success) {
      onChange?.(true)
      form.reset();
    }

    return result
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Password</TableHead>
                <TableHead className="text-right w-[75px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <TableCell className="font-medium text-left">
                      <FormControl>
                        <Input type="password" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </TableCell>
                  )}
                  />
                <TableCell className="text-right">
                  <Button type="submit">Submit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </Form>
    </>
  )
}
