const express = require("express")
const bodyParser = require("body-Parser")
const nodemailer = require("nodemailer")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/api/email', (req, res) => {
  console.log("FILE NODE", req)
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <h3>Contact Detail</h3>
    <ul>
      <li> Name: ${req.body.firstname + ' ' + req.body.lastname}</li>
      <li> Address: ${req.body.address}</li>
      <h3> Agent: ${req.body.agent}</h3>
      <li> Email: ${req.email}</li>
      <h3> Message </h3>
      <p>${req.body.message}</p>
      ${req.body.file}
    </ul>
    `

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'immanuel.turner16@ethereal.email',
          pass: 'utabbQ8YD8nwcgGRpJ'
      }
  });

    let mailOptions = {
      from: 'test@gmail.com',
      to: 'immanuel.turner16@ethereal.email',
      replyTo: 'test@gmail.com',
      subject: 'New Message',
      text: req.body.message,
      html: htmlEmail,
      attachments: [
        {
          filename: 'rebate.pdf',
          path: __dirname+'rebate.pdf'
          // content: new Buffer("PLEASE", 'utf-8') 
          // content: 'hello!!' 
        }
      ]
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        return console.log(err)
      }

      console.log('Message sent: %s', info.message)
      console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
      info.reset()
    })
  })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

