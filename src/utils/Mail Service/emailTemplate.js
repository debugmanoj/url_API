// Email template for account activation
const generateActivateEmailTemplate = (id) => {
    return `
        <html>
            <body>
                <p>This is a verification email from your URL Shortener service. Here's the link:</p>
                <a href="https://url-shortner-steel-rho.vercel.app/authenticate/${id}">Activate the account</a>
                <h4>Note</h4>
                <p>Please note that your account will not be activated until you click the link provided in the email.</p>
            </body>
        </html>
    `;
};

// Email template for password reset
const generateResetPasswordTemplate = (token, email) => {
    return `
        <html>
            <body>
                <p>No worries, your account will stay forever.</p>
                <p>Please reset your password using the link below:</p>
                <a href="https://url-shortner-steel-rho.vercel.app/resetPassword/${token}/${email}">Reset Password</a>
            </body>
        </html>
    `;
};

export { generateActivateEmailTemplate, generateResetPasswordTemplate };
