import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { trace } from 'node:console';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});


dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/contact', async (req, res) => {
    const { name, email, phone, date } = req.body;

    const readableDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email, // VERY IMPORTANT: Allows you to click 'Reply' to the customer
        subject: `📅 New Appointment: ${name}`,
        text: `
        🌟 You have a new appointment request from your landing page!

        --------------------------------------------------
        CUSTOMER DETAILS
        --------------------------------------------------
        👤 Name:     ${name}
        📧 Email:    ${email}
        📞 Phone:    ${phone}

        --------------------------------------------------
        APPOINTMENT DETAILS
        --------------------------------------------------
        📅 Date:     ${readableDate}
        📝 Note:      New appointment requested via BrightSmile website.

        --------------------------------------------------
        Next Step: 
        Reach out to the customer at ${phone} or reply directly to this email.
    `
    };

    const customerOptions = {
        from: process.env.EMAIL_USER,
        to: email, // The customer's email
        subject: "Appointment Received - BrightSmile",
        text: `Hi ${name}, we've received your request for ${readableDate}. We will call you shortly at ${phone} to confirm!`
    };

    try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(customerOptions);
        res.send("message sent successfully!");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error sending messages");

    }
});

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
