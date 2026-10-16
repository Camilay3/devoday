import nodemailer from 'nodemailer';

export const user = process.env.EMAIL_USER;
export const mailer = nodemailer.createTransport({
	host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass: process.env.EMAIL_PASSWORD },
	connectionTimeout: 5000, // 5 segundos
    greetingTimeout: 5000,
    socketTimeout: 10000,
});
