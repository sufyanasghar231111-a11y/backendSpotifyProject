const otpGenerate = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

const otpHtml = (otp) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
body{
    font-family: Arial, sans-serif;
    background:#f5f5f5;
    padding:30px;
}
.container{
    max-width:500px;
    margin:auto;
    background:#ffffff;
    padding:30px;
    border-radius:10px;
    box-shadow:0 2px 10px rgba(0,0,0,.1);
}
h2{
    color:#333;
}
.otp{
    font-size:36px;
    font-weight:bold;
    letter-spacing:8px;
    color:#4CAF50;
    text-align:center;
    margin:30px 0;
}
.footer{
    font-size:14px;
    color:#777;
}
</style>
</head>
<body>

<div class="container">
    <h2>Email Verification</h2>

    <p>Hello,</p>

    <p>Your One-Time Password (OTP) is:</p>

    <div class="otp">
        ${otp}
    </div>

    <p>This OTP is valid for <strong>15 minutes</strong>. Do not share this code with anyone.</p>

    <p>If you didn't request this verification, you can safely ignore this email.</p>

    <hr>

    <div class="footer">
        Regards,<br>
        Your App Team
    </div>
</div>

</body>
</html>
    `
}

module.exports = { otpGenerate, otpHtml }