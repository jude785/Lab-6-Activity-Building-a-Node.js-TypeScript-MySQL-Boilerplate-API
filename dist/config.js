"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
let localConfig = {};
try {
    localConfig = require('./config.json');
}
catch (e) {
    if (process.env.NODE_ENV !== 'production') {
        console.warn('config.json not found. Ensure environment variables are set.');
    }
}
const config = {
    database: {
        host: process.env.DB_HOST || ((_a = localConfig.database) === null || _a === void 0 ? void 0 : _a.host),
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : (_b = localConfig.database) === null || _b === void 0 ? void 0 : _b.port,
        user: process.env.DB_USER || ((_c = localConfig.database) === null || _c === void 0 ? void 0 : _c.user),
        password: process.env.DB_PASSWORD || ((_d = localConfig.database) === null || _d === void 0 ? void 0 : _d.password),
        database: process.env.DB_NAME || ((_e = localConfig.database) === null || _e === void 0 ? void 0 : _e.database)
    },
    secret: process.env.JWT_SECRET || process.env.SECRET || localConfig.secret,
    emailFrom: process.env.EMAIL_FROM || localConfig.emailFrom,
    smtpOptions: {
        host: process.env.SMTP_HOST || ((_f = localConfig.smtpOptions) === null || _f === void 0 ? void 0 : _f.host),
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : (_g = localConfig.smtpOptions) === null || _g === void 0 ? void 0 : _g.port,
        secure: process.env.SMTP_SECURE === 'true' || ((_h = localConfig.smtpOptions) === null || _h === void 0 ? void 0 : _h.secure),
        auth: process.env.SMTP_USER ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        } : (_j = localConfig.smtpOptions) === null || _j === void 0 ? void 0 : _j.auth
    }
};
exports.default = config;
