import nodemailer from "nodemailer";
import dotenv from "dotenv"; 
dotenv.config(); 

// Create a reusable transporter object using Gmail service
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.mailId,
        pass: process.env.pass,
    },
});

// Reusable function to send email
const sendMail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email: ", error);
        throw new Error("Failed to send email");
    }
};

export default sendMail;
