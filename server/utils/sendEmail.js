import nodemailer from "nodemailer";
import { config } from "./config.js";

const sendEmail = async (email, subject, text) => {
  try {
    console.log("Sending email");
    const transporter = nodemailer.createTransport({
      service: "ovh",
      host: "smtp.mail.ovh.net",
      secure: true,
      port: 465,
      auth: {
        user: config.EMAIL_ACCOUNT,
        pass: config.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: config.EMAIL_ACCOUNT,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
export default sendEmail;
