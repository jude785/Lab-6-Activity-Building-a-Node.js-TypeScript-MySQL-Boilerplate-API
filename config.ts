import 'dotenv/config';

let localConfig: any = {};
try {
  localConfig = require('./config.json');
} catch (e) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('config.json not found. Ensure environment variables are set.');
  }
}

const config = {
  database: {
    host: process.env.DB_HOST || localConfig.database?.host,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : localConfig.database?.port,
    user: process.env.DB_USER || localConfig.database?.user,
    password: process.env.DB_PASSWORD || localConfig.database?.password,
    database: process.env.DB_NAME || localConfig.database?.database
  },
  secret: process.env.JWT_SECRET || process.env.SECRET || localConfig.secret,
  emailFrom: process.env.EMAIL_FROM || localConfig.emailFrom,
  smtpOptions: {
    host: process.env.SMTP_HOST || localConfig.smtpOptions?.host,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : localConfig.smtpOptions?.port,
    secure: process.env.SMTP_SECURE === 'true' || localConfig.smtpOptions?.secure,
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    } : localConfig.smtpOptions?.auth
  }
};

export default config;
