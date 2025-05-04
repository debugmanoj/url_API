import sendMail from "./mailer.js"; 
import { generateActivateEmailTemplate, generateResetPasswordTemplate } from "./emailTemplate.js";

// Constants for from address
const FROM_ADDRESS = "manojkumarwork01@gmail.com";

// Function to create email options for activation email
const createActivateEmailOptions = (id, email) => {
    return {
        from: FROM_ADDRESS,
        to: email,
        subject: "URL Shortener - Account Activation",
        html: generateActivateEmailTemplate(id),
    };
};

// Function to create email options for reset password email
const createResetPasswordEmailOptions = (token, email) => {
    return {
        from: FROM_ADDRESS,
        to: email,
        subject: "URL Shortener - Reset Password",
        html: generateResetPasswordTemplate(token, email),
    };
};

// Function to send activation email
const sendActivateEmail = async (id, email) => {
    const options = createActivateEmailOptions(id, email);
    await sendMail(options);
};

// Function to send reset password email
const sendResetPasswordEmail = async (token, email) => {
    const options = createResetPasswordEmailOptions(token, email);
    await sendMail(options);
};

export { sendActivateEmail, sendResetPasswordEmail };
