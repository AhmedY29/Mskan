import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.js"

export const sendWelcomeEmail= async (email , name) =>{
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "مسكن - مرحبا بك🎉",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}" , name),
            category: "Welcome"
        })
        console.log("Email sent successfully:", response.message)
    } catch (error) {
        console.error("Error sending email:", error)
        throw new Error("Failed to send welcom email:" , error)  // Rethrow the error for further handling in calling code  }
        
    }
}

export const sendVerificationEmail= async (email , verificationtoken) =>{
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "مسكن - تاكيد البريد الالكتروني",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}" , verificationtoken),
            category: "Verification"
        })
        console.log("Email sent successfully:", response.message)
    } catch (error) {
        console.error("Error sending email:", error)
        throw new Error("Failed to send verification email:" , error)  // Rethrow the error for further handling in calling code  }
        
    }
}


export const sendResetEmail = async (email , resturl) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "مسكن - اعادة كلمة المرور",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}" , resturl),
            category: "Reset Password"
        })
    } catch (error) {
        console.error("Error sending email:", error)
        throw new Error("Failed to send password reset email:" , error)
        
    }
}

export const sendResetEmailSuccess = async (email) => {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "مسكن - تمت عملية إعادة كلمة المرور بنجاح",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "success reset message",
        })
    } catch (error) {
        console.error("Error sending reset email", error);
        throw new Error("Failed to send success reset email:", error);
    }
}