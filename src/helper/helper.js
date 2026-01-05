require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:"gmail",
    secure:process.env.NODE_ENV == "development" ? false: true,
    auth:{
        user:"ankitahossaina@gmail.com",
        pass:process.env.APP_PASSWORD || "liju fxer xdgh vsdt"
    }
});

exports.emailSend = async (email, template) => {
    const info = await transporter.sendMail({
        from: "Cyclon",
        to: email,
        subject: "Verify Your Email",
        html:template, //todo:html version of the message
        });
    console.log("Email sent:", info.messageId);
    return info;
};
