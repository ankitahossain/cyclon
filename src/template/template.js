const RegistrationTemplate = (firstName, verification_link) => {
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
      <h2>Hello ${firstName},</h2>
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

module.exports = { RegistrationTemplate };
