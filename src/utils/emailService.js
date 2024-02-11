import nodemailer from "nodemailer";
import dotenv from "dotenv"; 
dotenv.config(); 
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
  
  
  const mailOptions =async(id,email)=> {
    const htmlContent = `
        <html>
            <body>
                <h1>URL Shortner</h1>
                <p>This is a verification email from your Url Shortner service. Here's the link:</p>
                <a href="https://url-shortner-steel-rho.vercel.app/authenticate/${id}">Activate the account &nbsp; ☺</a>
                <h4>Note</h4>
                <p>Please note that your account will not be activated until you click the link provided in the email</p>
            </body>
        </html>
    `;
    const mailOptions={
        from: "manojkumarwork01@gmail.com",
        to: [`${email}`],// mutiplae email receipents ithu vanthu
        subject: "I am from Url Shortner 😊",
        html: htmlContent,
    }
    return mailOptions
    // attachments: [{
    //   filename: 'hi.jpg', // Ithu filename oda patha
    //   path: 'hi.jpg', // Ithu imgae oda path
    //   cid: 'unique@nodemailer.com'
    // }]
  }
  const restMailOption =async(token,email)=> {
    const htmlContent = `
        <html>
            <body>
                <h1>URL Shortner</h1>
                <p>No worries your account will stay forever 😊 </p>
                <p>please reset the password using the Link:</p>
                <a href="https://url-shortner-steel-rho.vercel.app/resetPassword/${token}/${email}">Reset Password &nbsp; ☺</a>
            
            
            </body>
        </html>
    `;
    const mailOptions={
        from: "manojkumarwork01@gmail.com",
        to: [`${email}`],// mutiplae email receipents ithu vanthu
        subject: "I am from Url Shortner 😊",
        html: htmlContent,
    }
    return mailOptions
    // attachments: [{
    //   filename: 'hi.jpg', // Ithu filename oda patha
    //   path: 'hi.jpg', // Ithu imgae oda path
    //   cid: 'unique@nodemailer.com'
    // }]
  }
  
  

  const sendActivateEmail = async (id, email) => {
    try {
        const options = await mailOptions(id, email);
        await transporter.sendMail(options);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};
const resetMail = async (token, email) => {
  try {
      const options = await restMailOption( token,email);
      await transporter.sendMail(options);
      console.log("Reset mail  sent successfully!");
  } catch (error) {
      console.error("Error sending email: ", error);
  }
};


  export default {sendActivateEmail,resetMail}