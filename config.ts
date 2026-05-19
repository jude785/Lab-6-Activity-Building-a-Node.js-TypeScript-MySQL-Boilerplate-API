import localConfig from './config.json';

const config = {
  database: {
    host: process.env.DB_HOST || localConfig.database.host,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : localConfig.database.port,
    user: process.env.DB_USER || localConfig.database.user,
    password: process.env.DB_PASSWORD || localConfig.database.password,
    database: process.env.DB_NAME || localConfig.database.database
  },
  secret: process.env.SECRET || localConfig.secret,
  emailFrom: process.env.EMAIL_FROM || localConfig.emailFrom,
  smtpOptions: {
    host: process.env.SMTP_HOST || localConfig.smtpOptions.host,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : localConfig.smtpOptions.port,
    auth: {
      user: process.env.SMTP_USER || localConfig.smtpOptions.auth.user,
      pass: process.env.SMTP_PASS || localConfig.smtpOptions.auth.pass
    }
  }
};

export default config;
