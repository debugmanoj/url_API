import userSchema from "../database/formSchema.js"
import hasher from "../hashing/hasher.js"
import { sendActivateEmail, sendResetPasswordEmail } from "../utils/Mail Service/emailService.js";


// Add User API
const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).send({ message: "Name, Email and Password are required" });
        }

        const user = await userSchema.findOne({ email });
        if (user) {
            return res.status(400).send({ message: `User with ${email} already exists` });
        }

        const hashedPassword = await hasher.createHash(password);

        let newUser = await userSchema.create({ ...req.body, password: hashedPassword });
        let id = newUser._id.toString();

        sendActivateEmail(id, newUser?.email);

        return res.status(200).send({
            message: "User Added Successfully",
            checkMail: "Activate Link sent to your Email"
        });

    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Check User Login API
const checkUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).send({ message: "Email and Password are required" });
        }

        let data = await userSchema.findOne({ email });
        if (!data) {
            return res.status(400).send({
                message: `User with ${email} does not exist`,
                notValid: false,
                checks: "mailAlready"
            });
        }

        const isMatch = await hasher.hashCompare(password, data.password);
        if (!isMatch) {
            return res.status(400).send({
                message: "Incorrect Password",
                notValid: "false",
                checks: "incorrectpassword"
            });
        }

        if (!data.activateStatus) {
            return res.status(400).send({
                message: "Complete two-step authentication first. Check your mail.",
                notValid: "false",
                checks: "activate"
            });
        }

        return res.status(200).send({
            isPassed:true,
            notValid: "true",
            checks: "found",
            id:data._id,
            // email: data.email,
        });

    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Activate User API
const authenticateUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Validation
        if (!id) {
            return res.status(400).send({ message: "Invalid activation link" });
        }

        let data = await userSchema.findById(id);
        if (!data) {
            return res.status(400).send({ message: "Please click the link from the mail" });
        }

        data.activateStatus = true;
        await data.save();

        return res.status(200).send({
            message: "Url Shortner Welcomes You",
            data: data.name
        });

    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Reset Password Request API
const resetPassword = async (req, res) => {
    try {
        let { email } = req.body;

        // Validation
        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }

        let data = await userSchema.findOne({ email });
        if (!data) {
            return res.status(400).send({
                message: "Enter a valid mail",
                checks: "Enter Valid Mail"
            });
        }

        const token = await hasher.createToken({ name: data.name, email: data.email });

        data.passwordReset = token;
        await data.save();

        sendResetPasswordEmail(token, email);

        return res.status(200).send({ message: "Password reset link sent to your mail" });

    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Confirm Reset Password Token API
const checkResetPass = async (req, res) => {
    try {
        const { token, email } = req.params;

        // Validation
        if (!token || !email) {
            return res.status(400).send({ message: "Invalid request" });
        }

        const data = await userSchema.findOne({ email });
        if (!data) {
            return res.status(400).send({ message: "You are not allowed" });
        }

        data.passwordReset = "";
        await data.save();

        return res.status(200).send({ message: true });

    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
}

// Update Password API
const UpdatePass = async (req, res) => {
    try {
        const { email } = req.params;
        const { password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({ message: "Email and Password are required" });
        }

        let data = await userSchema.findOne({ email });
        if (!data) {
            return res.status(400).send({ message: "You are not allowed" });
        }

        const hashedPassword = await hasher.createHash(password);

        data.password = hashedPassword;
        await data.save();

        return res.status(200).send({ message: "Password updated successfully" });

    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
}

export default { addUser, checkUser, authenticateUser, resetPassword, checkResetPass, UpdatePass }
