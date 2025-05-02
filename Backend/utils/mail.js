import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "awaisrangrej9876@gmail.com",
    pass: "mhnrbkywqkkqhmtd",
  },

});

