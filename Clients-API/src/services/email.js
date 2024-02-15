import nodemailer from "nodemailer";
import { message } from "../views/pages.js";

export function sendKey(name, email, key) {
  // TODO send email to the client using Nodemailer!
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e6a64c74bf1302",
      pass: "3dfb5f3d0876bd",
    },
  });
  const mailOptions = {
    from: "<support@clients-api.com>",
    to: `${email}`,
    subject: "Your Clients API Key",
    html: message(name, key),
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });

  console.log(`Hi ${name}!\n\nThis is your API key: ${key}\n\n`);
}
