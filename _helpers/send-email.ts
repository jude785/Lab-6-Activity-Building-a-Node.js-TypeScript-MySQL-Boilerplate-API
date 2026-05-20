import nodemailer from 'nodemailer';

function loadFileConfig() {
    try {
        return require('../config.json');
    } catch (e) {
        return {};
    }
}
const fileConfig: any = process.env.NODE_ENV === 'production' ? {} : loadFileConfig();

export default async function sendEmail({ to, subject, html, from = getEmailFrom() }: any) {
    const hasResend = !!process.env.RESEND_API_KEY;

    if (hasResend) {
        return await sendWithResend({ to, subject, html, from });
    }

    const transporter = nodemailer.createTransport(getSmtpOptions());
    await transporter.sendMail({ from, to, subject, html });
}

async function sendWithResend({ to, subject, html, from }: any) {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: from || process.env.EMAIL_FROM || 'onboarding@resend.dev',
            to,
            subject,
            html
        })
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Resend API Error: ${res.status} ${res.statusText} - ${errorText}`);
    }
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
    if (!fileConfig.smtpOptions) throw new Error('SMTP configuration is missing');
    return fileConfig.smtpOptions;
}

function getEmailFrom() {
    return process.env.EMAIL_FROM || fileConfig.emailFrom;
}