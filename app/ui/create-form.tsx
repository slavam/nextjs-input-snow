'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
 
const regexS1 = /^(1[0-9/]{4})? ?(2[0-9/]{4})? ?(3[0-9/]{3}[0-4/])? ?(4[0-9/]{4})? ?(5[0-9/]{4})? ?(6[0-9/]{3}[0-4/])? ?(7[0-3][0-9][01][0-9])? ?(8[0-3][0-9][01][0-9])? ?(9[0-3][0-9][01][0-9])? ?(0[0-3][0-9][01][0-9])?$/
const SnowSchema = z.object({
  section1: z.string().min(5).max(59).regex(regexS1).trim(),
})
let section0 = ''
export default function SnowForm() {
  const form = useForm<z.infer<typeof SnowSchema>>({
    resolver: zodResolver(SnowSchema),
    defaultValues: {
      section1: "",
    },
  })
  const sourceCode = '99999'
  let od = new Date().toISOString().slice(0,10)
  const observationDate = od.slice(8,10)+od.slice(5,7)+od[3]
  section0 = `HHSS ${sourceCode} ${observationDate}`

  return (
    <main className="flex min-h-screen flex-col p-6">
      <p><b>Телеграмма</b></p>
      <p>{section0}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <FormField
            control={form.control}
            name="section1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Раздел 1</FormLabel>
                <FormControl >
                  <Input placeholder="1sssK 2ddll 3RRRE 4sssK 5ddLL 6RRRE 7YYMM 8YYMM 9YYMM 0YYMM" {...field} />
                </FormControl>
                =
                <FormDescription>
                  Введите данные раздела 1.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Сохранить</Button>
        </form>
      </Form>
    </main>
  )
}

function onSubmit(values: z.infer<typeof SnowSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(`${section0} ${values.section1}=`)
}

// export default function Form(){
//   const sourceCode = '99999'
//   let od = new Date().toISOString().slice(0,10)
//   const observationDate = od.slice(8,10)+od.slice(5,7)+od[3]
//   const section0: string = `HHSS ${sourceCode} ${observationDate}=`
//   const initialState: State = { message: null, errors: {} }
//   const [state, formAction] = useActionState(createSnow, initialState)
//   return(
//     <main className="flex min-h-screen flex-col p-6">
//     <p>{section0}</p>
//     <form action={formAction}>                                                                                      
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         <Input type="text" name='groups1_0' placeholder="1sssK 2ddll 3RRRE 4sssK 5ddLL 6RRRE 7YYMM 8YYMM 9YYMM 0YYMM" />
//         <Button type="submit">Сохранить</Button>                                                               
//       </div>
//     </form>
//     </main>
//   )
// }