"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
async function sendEmail({ to, subject, html, from = getEmailFrom() }) {
    const transporter = nodemailer_1.default.createTransport(getSmtpOptions());
    await transporter.sendMail({ from, to, subject, html });
}
function getSmtpOptions() {
    if (process.env.NODE_ENV === 'production' && !process.env.SMTP_HOST) {
        throw new Error('SMTP_HOST environment variable is required in production to send emails');
    }
    if (process.env.SMTP_HOST) {
        return {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: process.env.SMTP_USER ? {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            } : undefined
        };
    }
    if (!config_1.default.smtpOptions)
        throw new Error('SMTP configuration is missing');
    return config_1.default.smtpOptions;
}
function getEmailFrom() {
    return process.env.EMAIL_FROM || config_1.default.emailFrom;
}
