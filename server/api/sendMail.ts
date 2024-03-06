import nodemailer from 'nodemailer'

const config = useRuntimeConfig()

const transporter = nodemailer.createTransport({
  host: config.mailer.host,
  port: config.mailer.port,
  secure: true,
  auth: {
    user: config.mailer.user,
    pass: config.mailer.pass,
  }
} as nodemailer.TransportOptions)

export default defineEventHandler(async (event) => {

  if(!config.mailer.to.length) throw createError(`Нет списка получателей!`)

  const data = await readMultipartFormData(event)

  if(!data) throw createError(`Что-то произошло с readMultipartFormData`)

  const mailOptions = {
    from: `Сообщение с сайта <no-reply@example.com>`,
    to: config.mailer.to,
    attachments: [] as { filename: string, content: Buffer }[],
    subject: '',
    html: '',
  }

  for(let item of data) {
    if(item.filename) {
      mailOptions.attachments.push({
        filename: item.filename,
        content: item.data,
      })
    }
    else if(item.name == 'subject') mailOptions.subject = item.data.toString('utf-8')
    else if(item.name == 'html') mailOptions.html = item.data.toString('utf-8')
  }

  await transporter.sendMail({...mailOptions})
  .catch((error) => {
    throw createError(`ERRORNodemailer ${error}`)
  })

})
