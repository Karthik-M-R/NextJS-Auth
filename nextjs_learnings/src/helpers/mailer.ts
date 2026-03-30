import nodemailer from "nodemailer"
import User from "@/src/models/userModel"
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({
  email, emailType, userId
}: any) => {
    try{
     const hashedToken = await bcryptjs.hash(
    userId.toString(),
    10
     )

       if(emailType=="VERIFY"){
       await User.findByIdAndUpdate(userId,
        {
        
            verifyToken:hashedToken,
            verifyTokenExpiry:Date.now()+3600000
        
       }
    )

       }
       else if(emailType=="RESET"){
         
         await User.findByIdAndUpdate(
            userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000
            }
         )
       }

      const smtpUser = process.env.MUSER
      const smtpPass = process.env.MPASS

       if (!smtpUser || !smtpPass) {
        throw new Error("Mailtrap credentials are missing (MUSER/MPASS)")
       }

         const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: smtpUser,
            pass: smtpPass
        }
       })

       if (process.env.NODE_ENV !== "production") {
        console.log("Mailtrap: connecting as user", smtpUser?.slice(0, 4) + "***")
       }


     const mailOptions = {
    from: "no-reply@local.test",
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
     }

     const mailresponse = await transport.sendMail(mailOptions)
     if (process.env.NODE_ENV !== "production") {
      console.log("Mailtrap: message sent", {
        messageId: mailresponse.messageId,
        response: mailresponse.response,
      })
     }
     return mailresponse
        
    }
    catch(error:any){
      console.error("Mailtrap: send failed", error)
      throw new Error(error.message);
  }
}
