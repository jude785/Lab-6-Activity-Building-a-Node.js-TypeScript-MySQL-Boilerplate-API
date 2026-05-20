"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const promise_1 = __importDefault(require("mysql2/promise"));
const sequelize_1 = require("sequelize");
const account_model_1 = __importDefault(require("../accounts/account.model"));
const refresh_token_model_1 = __importDefault(require("../accounts/refresh-token.model"));
const db = {};
exports.default = db;
initialize();
async function initialize() {
    const databaseConfig = config_1.default.database;
    const host = process.env.DB_HOST || databaseConfig.host;
    const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : (databaseConfig.port || 3306);
    const user = process.env.DB_USER || databaseConfig.user;
    const password = process.env.DB_PASSWORD || databaseConfig.password;
    const database = process.env.DB_NAME || databaseConfig.database;
    const ssl = process.env.DB_SSL === 'true';
    // Create DB if it doesn't exist (only locally)
    if (process.env.NODE_ENV !== 'production' && host === 'localhost') {
        const connection = await promise_1.default.createConnection({ host, port, user, password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    }
    // Connect to DB
    const sequelize = new sequelize_1.Sequelize(database, user, password, {
        host,
        port,
        dialect: 'mysql',
        dialectOptions: ssl ? { ssl: { rejectUnauthorized: false } } : undefined
    });
    // Init models
    db.Account = (0, account_model_1.default)(sequelize);
    db.RefreshToken = (0, refresh_token_model_1.default)(sequelize);
    // Define relationships
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);
    // Sync models with database
    await sequelize.sync();
}
