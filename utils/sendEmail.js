const nodemailer = require('nodemailer');
const sendEmail = async options =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "4beae42b42f045",
          pass: "efe3be1b436587"
        }
      });
    const message = {
        from:`${process.env.SMTP_FROM_EMAIL} <${process.env.SMTP_FROM_EMAIL}>`,
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(message)
}
module.exports = sendEmail