import express from "express"
import otpGenerator from "otp-generator"
import { Resend } from "resend";
import UserOTPVerification from "../Data Models/UserOTPVerification.js";
import bcryptjs from "bcryptjs"

const router = express.Router()
const resend = new Resend("re_cZmVFhrk_466Ym3bzYKXqsZz2S2A6Jgxv");

router.post("/verify", async (req, res) => {
    const { id, email } = req.body

    try {
        // Check if OTP already exists for the userID
        let existingOTP = await UserOTPVerification.findOne({ userID: id });

        if (existingOTP) {
            // If OTP already exists, update the OTP
            const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
            console.log(OTP)
            const hashedOTP = await bcryptjs.hash(OTP, 10);

            existingOTP.otp = hashedOTP;
            existingOTP.createdAt = Date.now();
            existingOTP.expiresAt = Date.now() + 3600000;

            await existingOTP.save();

            // Send email with updated OTP
            const { data, error } = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: email,
                subject: "BookSwap - Please Verify Your Account, OTP Verification",
                html: `<strong>Hi</strong><p>Thank you for signing up for BookSwap!</p><p>To verify your email address and complete your registration, please enter the following one-time password (OTP) code:</p><h2>${OTP}</h2><p><b>Important:</b> This code is confidential. Please do not share it with anyone.</p><p>To verify your email address, please click the following link or enter the code on our app:</p><p>If you have any trouble verifying your email, please feel free to contact us at [Support Email Address] or visit our help center at [Help Center Link].</p><p>Sincerely,</p><p>The BookSwap Team</p>`
            });

            if (error) {
                return res.status(400).json({ success: false, error });
            }

            res.status(200).json({ success: true, data });
        } else {
            // If OTP doesn't exist, generate a new one and save it
            const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
            console.log(OTP)
            const hashedOTP = await bcryptjs.hash(OTP, 10);

            const newOTP = new UserOTPVerification({
                userID: id,
                otp: hashedOTP,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            });

            await newOTP.save();

            // Send email with new OTP
            const { data, error } = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: email,
                subject: "BookSwap - Please Verify Your Account, OTP Verification",
                html: `<strong>Hi</strong><p>Thank you for signing up for BookSwap!</p><p>To verify your email address and complete your registration, please enter the following one-time password (OTP) code:</p><h2>${OTP}</h2><p><b>Important:</b> This code is confidential. Please do not share it with anyone.</p><p>To verify your email address, please click the following link or enter the code on our app:</p><p>If you have any trouble verifying your email, please feel free to contact us at [Support Email Address] or visit our help center at [Help Center Link].</p><p>Sincerely,</p><p>The BookSwap Team</p>`
            });

            if (error) {
                return res.status(400).json({ success: false, error });
            }

            res.status(200).json({ success: true, data });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
