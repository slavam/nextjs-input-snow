'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// const FormSchema = z.object({                                                                                     
//     groups1_0: z.string(),
    // customerId: z.string({                                                                                          
    //     invalid_type_error: 'Please select a customer.',
    // }),                                                                                                           
    // amount: z.coerce.number()
    // .gt(0, { message: 'Please enter an amount greater than $0.' }),                                               
    // status: z.enum(['pending', 'paid'],{
    //     invalid_type_error: 'Please select an invoice status.',                                                     
    // }),
//     date: z.string(),                                                                                           
// })

const FormSchema = z.object({
    section1: z.string().
    min(5, {message: "Раздел 1 не может быть меньше 5 символов.",}).
    max(59,{message:'Раздел 1 не может быть длиннее 59 символов.'}),
  })

export type State = {
    errors?: {                                                                                                      
      telegram?: string[];
      reportDate?: string[];                                                                                            
      sourceCode?: string[];
    };                                                                                                            
    message?: string | null;
  }
// const CreateSnow = FormSchema.omit({ date: true})

export async function createSnow( prevState: State, formData: FormData) {                                       
    const validatedFields = CreateSnow.safeParse({
        telegram: formData.get('telegram'),                                                                       
        reportDate: formData.get('reportDate'),
        sourceCode: formData.get('sourceCode'),                                                                             
    })
  if (!validatedFields.success) {                                                                                 
    return {
      errors: validatedFields.error.flatten().fieldErrors,                                                          
      message: 'Ошибка в телеграмме.',
    };                                                                                                          
}
  const { section1 } = validatedFields.data                                                   
//   const amountInCents = amount * 100
//   const date = new Date().toISOString().split('T')[0]                                                           
  try {
    // SOAP API
  } catch (error) {                                                                                               
    return {message: 'Ошибка при сохранении в ЦСДН.'}
  }

  revalidatePath('/dashboard/invoices')                                                                         
  redirect('/dashboard/invoices')
}