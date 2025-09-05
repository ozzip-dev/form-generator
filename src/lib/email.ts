// "use server";
// import nodemailer from "nodemailer";

// export async function sendEmail({
//   to,
//   subject,
//   text,
// }: {
//   to: string;
//   subject: string;
//   text: string;
// }) {

//   const transporter = nodemailer.createTransport({
//     host: "localhost",
//     port: 1025,
//     secure: false,
//     ignoreTLS: true,
//   });

//   const devFrom = "dev@localhost.com";

//   try {
//     const info = await transporter.sendMail({
//       from: devFrom,
//       to: to.toLowerCase().trim(),
//       subject: subject.trim(),
//       text: text.trim(),
//     });

//     console.log("Email sent (dev):", info.messageId);
//     console.log("Preview URL: http://localhost:1080");

//     return {
//       success: true,
//       messageId: info.messageId,
//     };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return {
//       success: false,
//       message: "Failed to send email. Is your local MailDev",
//     };
//   }
// }

// npm install -g maildev
// maildev

"use server";
import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"OZZIP" <${process.env.GMAIL_USER}>`,
      to: to.toLowerCase().trim(),
      subject: subject.trim(),
      text: text.trim(),
    });

    console.log("Email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email",
    };
  }
}
