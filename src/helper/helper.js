require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true if 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_KEY
    },
    tls: {
        rejectUnauthorized: false // avoids self-signed certificate errors
    }
});

exports.emailSend = async (to, html) => {
    const info = await transporter.sendMail({
        from: `"Cyclon" <${process.env.SMTP_USER}>`,
        to,
        subject: "Verify Your Email",
        html
    });
    console.log("Email sent:", info.messageId);
    return info;
};
