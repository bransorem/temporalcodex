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

const formSchema = z.object({
  password: z.string()
    .min(8, { message: 'At least 8 characters' })
    .max(30, { message: 'Max 30 characters' }),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"], // path of error
})

type PassForm = {
  onChange?: (success: boolean) => void;
}

export function PasswordForm({ onChange }: PassForm) {
  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore - infinite recursion detected
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = values

    console.log(data)

    const response = await fetch(`/api/stranger/name/give`, {
      method: 'POST',
      body: JSON.stringify(data)
    })

    const result = await response.json<{ message: string }>()

    if (result.message === 'success') {
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
                <TableHead>Confirm</TableHead>
                <TableHead className="text-right w-[55px]"></TableHead>
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
                <FormField
                  control={form.control}
                  name="confirm"
                  render={({ field }) => (
                    <TableCell className="text-left">
                      <FormControl>
                        <Input type="password" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </TableCell>
                  )}
                  />
                <TableCell className="text-right">
                  <Button type="submit">Change</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </Form>
    </>
  )
}
