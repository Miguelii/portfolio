export type logOptions = {
   logMessage: string | unknown
   serviceName: string
   type: 'ERROR' | 'INFO'
   status?: string | number
   code?: string
}

export const Logger = (req: logOptions) => {
   const timestamp = new Date().toISOString()
   const message =
      `${timestamp} | ` +
      `${req.serviceName} | ` +
      `${req.type} | ` +
      `${req.code ? `${req.code} | ` : ''}` +
      `${req.status ? `${req.status} | ` : ''}` +
      `${req.logMessage ? `LOG: ${req.logMessage} | ` : ''}`
   console.log(message)
}
