exports.RegistrationTemplate = (firstName, verification_link, otp, expireTime) => {
  return `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
  <style>
    body { background:#f7f7f7; font-family:Arial, sans-serif; margin:0; padding:0; }
    .container { max-width:600px; margin:30px auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.1); }
    .header { background:#4a90e2; color:#fff; padding:25px; text-align:center; font-size:28px; font-weight:bold; }
    .content { padding:25px; color:#333; font-size:16px; line-height:1.6; }
    .btn { display:inline-block; background:#4a90e2; color:#fff !important; padding:12px 22px; border-radius:5px; text-decoration:none; margin:15px 0; font-weight:bold; }
    .footer { background:#f3f3f3; color:#777; padding:20px; text-align:center; font-size:14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Welcome to Cyclon</div>
    <div class="content">
      <h2>Hello ${firstName},</h2></br>

       <p> Your OTP is: ${otp},</p> </br> </br>

              <p>this otp will expire within : ${expireTime},</p> </br> </br>

      <p>Thank you for registering with <strong>Cyclon</strong>! Your account has been created successfully.</p>
      <p>To complete your registration, please verify your email by clicking the button below:</p>
      <p style="text-align:center;">
        <a href="${verification_link}" class="btn">Verify Email</a>
      </p>
      <p>If you did not create this account, you can safely ignore this email.</p>
      <p>If you need help, just reply to this email — we’re here for you!</p>
      <br/>
      <p>Best regards,<br/>The Cyclon Team</p>
    </div>
    <div class="footer">© 2025 Cyclon. All rights reserved.</div>
  </div>
</body>
</html>
`;
};



// reset password email template
exports.resetpasswordemailtemplate = (
  firstName,
  verifyLink,
  otp,
  expireTime
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .header {
        background: #4f46e5;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 30px;
        color: #333333;
      }
      .otp {
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 6px;
        text-align: center;
        margin: 20px 0;
        color: #4f46e5;
      }
      .button {
        display: inline-block;
        padding: 12px 25px;
        background: #4f46e5;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
      .footer {
        font-size: 12px;
        color: #777777;
        text-align: center;
        padding: 15px;
        background: #f4f6f8;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Password Reset Verification</h2>
      </div>

      <div class="content">
        <p>Hi <strong>${firstName}</strong>,</p>

        <p>
          You requested to reset your password.  
          Please use the OTP below to verify your email.
        </p>

        <div class="otp">${otp}</div>

        <p>
          This OTP will expire in <strong>${expireTime}</strong> minutes.
        </p>

        <p>
          Or you can verify directly by clicking the button below:
        </p>

        <p style="text-align:center;">
          <a href="${verifyLink}" class="button">Verify Email</a>
        </p>

        <p>
          If you did not request this, please ignore this email.
        </p>

        <p>Thanks,<br/>Cyclon Team</p>
      </div>

        <div class="footer">
        <p>
          This email was sent automatically. Please do not reply to this
          message.
        </p>
        <p>© 2026 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

