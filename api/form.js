import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export default function handler(req, res) {
    if (req.method === 'POST') {

        const { name, email, message } = req.body;
        console.log(name, email, message);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        
        const mailOptions = {
            from: `"Gizmos Steam Services" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'Test Form Submission',
            text: message
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ message: 'Error sending email' });
            } else {
                res.status(200).json({ message: 'Email sent successfully' });
            }
        })
    }
}