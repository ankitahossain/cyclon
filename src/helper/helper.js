require('dotenv').config();
const nodemailer = require("nodemailer")
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service:"gmail",
  secure: process.env.NODE_ENV == "development" ?false:true, // true for 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

exports.emailSend = async () =>{
    const info = await transporter.sendMail({
    from: 'cyclon',
    to: "ankitahossaina@gmail.com",
    subject: "Confirm Registration",
    html: `  <body>
    <section>
    <img src="../../icon.png"alt=""/>
    <a href = "www.frontendurl.com/login">Click here</a>
</section>
</body> `, // HTML body
  });
  console.log("Message sent:", info.messageId);
}


