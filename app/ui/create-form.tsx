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
import { saveSnowData } from "../lib/action"
import { ChangeEvent, useState, useEffect } from "react"



const regexS1 = /^(1[0-9/]{4})? ?(2[0-9/]{4})? ?(3[0-9/]{3}[0-4/])? ?(4[0-9/]{4})? ?(5[0-9/]{4})? ?(6[0-9/]{3}[0-4/])? ?(7[0-3][0-9][01][0-9])? ?(8[0-3][0-9][01][0-9])? ?(9[0-3][0-9][01][0-9])? ?(0[0-3][0-9][01][0-9])? ?(7[0-3][0-9][01][0-9])? ?(9[0-3][0-9][01][0-9])? ?(7[0-3][0-9][01][0-9])? ?(9[0-3][0-9][01][0-9])?$/
const SnowSchema = z.object({
  section1: z.string().min(5).max(65).regex(regexS1).trim(),
})

let section0 = ''
const today = new Date()

export default function SnowForm() {
  const [currentUrl, setCurrentUrl] = useState("")
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Access the current URL using the window object
      setCurrentUrl(window.location.href);
    }
  }, [])
  
  // console.log(currentUrl)
  const [observDate, setObservDate] = useState(today.toISOString().slice(0,10))
  const pointCode = (currentUrl.indexOf('pointCode')>-1)? currentUrl.slice(-5):'99999'
  function onSubmit(values: z.infer<typeof SnowSchema>) {
    saveSnowData(`${section0} ${values.section1}=`, observDate, pointCode, currentUrl)
    alert('Данные сохранены')
    // {"response":{"success_count":"13","failed_count":"0","detail_message":null,"@xmlns:tns":"urn:CSDNIntf-ICSDN"}}
  }
  
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setObservDate(e.target.value)
      // params.set('observDate', e.target.value)
    // replace(`${pathname}?${params.toString()}`)
  }
  const observationDate = observDate.slice(8,10)+observDate.slice(5,7)+observDate[3]
  section0 = `${observationDate} ${pointCode}`
  const form = useForm<z.infer<typeof SnowSchema>>({
    resolver: zodResolver(SnowSchema),
    defaultValues: {
      section1: "",
    },
  })
  return (
    <main className="flex min-h-screen flex-col p-6">
      <p><b>Дата наблюдения</b></p>
      <input id="observ-date" type='date' value={observDate} onChange={(e)=> handleSearch(e)} className="peer block text-gray-800 w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 "/>
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