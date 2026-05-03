import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://brightsmile-dental.craigben.com",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Resend setup
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, date } = req.body;

    if (!name || !email || !phone || !date) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const readableDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });


    // EMAIL TO YOU (admin)
    const admin = await resend.emails.send({
      from: "BrightSmile <onboarding@resend.dev>",
      to: process.env.USER_EMAIL, // change this
      subject: `📅 New Appointment: ${name}`,
      html: `
        <h2>New Appointment Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Date:</b> ${readableDate}</p>
      `
    });

    // EMAIL TO CUSTOMER
    const customer = await resend.emails.send({
      from: "BrightSmile <noreply@craigben.com>",
      to: email,
      subject: "Appointment Received - BrightSmile Dental",
      html: `
        <h3>Hi ${name},</h3>
        <p>We received your appointment request for:</p>
        <p><b>${readableDate}</b></p>
        <p>We will contact you shortly at ${phone} to confirm.</p>
        <br/>
        <p>— BrightSmile Dental</p>
      `
    });

    return res.status(200).json({
      success: true,
      message: "Emails sent successfully"
    });

  } catch (err) {
    console.log("Email error:", err);
    return res.status(500).json({
      error: "Failed to send email"
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
