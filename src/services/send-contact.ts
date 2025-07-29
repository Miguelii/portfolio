'use server'

import { Logger } from '@/utils/logger'
import { z } from 'zod'
import { resendSendEmail } from './resend-send-email'

const ServiceSchema = z.object({
   name: z.string().min(1).max(255),
   email: z.string().min(1).max(255),
   text: z.string().min(1).max(500),
})

type ServiceSchemaValues = z.infer<typeof ServiceSchema>

type SendContactProps = ServiceSchemaValues

export default async function SendContact(req: SendContactProps) {
   try {
      const isValid = await ServiceSchema.safeParse(req)

      if (!isValid.success) {
         Logger({
            logMessage: `REQUEST NOT VALID: ${JSON.stringify(isValid.error)}`,
            serviceName: 'SEND_CONTACT_SERVICE',
            type: 'ERROR',
         })
         return {
            status: 400,
         }
      }

      const trimName = req?.name?.trim()
      const trimEmail = req.email.trim()?.toLowerCase()

      const trimText = req.text?.trim()

      const resendResponse = await resendSendEmail({
         to: 'miguelgoncalves18@hotmail.com',
         subject: `Pedido de contacto`,
         template: `<div>Nome: ${trimName}<br/>Email: ${trimEmail}<br/>Mensagem:<br/><br/>${trimText}</div>`,
      })

      return {
         status: resendResponse.status,
      }
   } catch (err) {
      Logger({
         logMessage: err,
         serviceName: 'SEND_CONTACT_SERVICE',
         type: 'ERROR',
      })
      return {
         status: 503,
      }
   }
}
