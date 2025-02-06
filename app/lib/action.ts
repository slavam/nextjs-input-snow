'use server'

// import { z } from 'zod'

// const FormSchema = z.object({
//     section1: z.string().
//     min(5, {message: "Раздел 1 не может быть меньше 5 символов.",}).
//     max(65,{message:'Раздел 1 не может быть длиннее 65 символов.'}),
//   })

// export type State = {
//   errors?:{
//     section1?: string[]
//   }
//   message?: string | null
// }

// export async function createSnow( prevState: State, formData: FormData) {     
//   console.log(JSON.stringify(formData))                                  
//     const validatedFields = FormSchema.safeParse({
//       section1: formData.get('section1')
//     })
//   if (!validatedFields.success) {                                                                                 
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,                                                          
//       message: 'Ошибка в телеграмме.',
//     };                                                                                                          
//   }
//   const { section1 } = validatedFields.data                                                   
//   try {
//     // let ipAddress = ((url.indexOf('localhost')>-1) || (url.indexOf('//10.54.')>-1))? '10.54.1.11:8083':'31.133.32.14:8083' 
//     let ipAddress = '10.54.1.11:8083'
//     let data = await fetch(`http://${ipAddress}/conservations/save_snow_data?mode=no-cors&telegram=${formData.get('section1')}`) //&report_date=${formData.get('reportDate')}&source_code=${formData.get('sourceCode')}`)
//     let observations = await data.json()
//     return observations
//   } catch (error) {                                                                                               
//     return {message: 'Ошибка при сохранении в ЦСДН.'}
//   }
// }

export async function saveSnowData(telegram: string, reportDate: string, sourceCode: string){
  try {
    const ipAddress = '10.54.1.11:8083' //((url.indexOf('localhost')>-1) || (url.indexOf('//10.54.')>-1))? '10.54.1.11:8083':'31.133.32.14:8083' 
    // const query = `http://${ipAddress}/conservations/save_snow_data?mode=no-cors&telegram=${telegram}&report_date=${reportDate}&source_code=${sourceCode}&format=json`
    const query = `http://${ipAddress}/conservations/save_snow_data?mode=no-cors&telegram=${telegram}&report_date=${reportDate}&source_code=${sourceCode}&format=json`
    await fetch(query)
  } catch (error) {                                                                                               
    console.log(JSON.stringify(error))
    return {message: 'Ошибка при сохранении в ЦСДН.'}
  }
}