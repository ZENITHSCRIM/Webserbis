const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());

let verificationCodes = {};

app.post('/sendVerificationEmail', (req, res) => {
    const email = req.body.email;
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes[email] = verificationCode;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Email Verification Code',
        text: `Your verification code is: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        } else {
            return res.status(200).send('Verification email sent');
        }
    });
});

app.post('/verifyEmailCode', (req, res) => {
    const email = req.body.email;
    const code = req.body.code;

    if (verificationCodes[email] === code) {
        delete verificationCodes[email];
        return res.status(200).send('Email verified successfully');
    } else {
        return res.status(400).send('Invalid verification code');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
