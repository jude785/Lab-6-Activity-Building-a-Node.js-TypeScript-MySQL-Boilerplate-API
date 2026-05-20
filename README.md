# Node.js + TypeScript + MySQL Boilerplate API

A fully-featured RESTful authentication API built with Node.js, TypeScript, and MySQL. Supports registration with email verification, JWT authentication with refresh tokens, and Role-Based Access Control (RBAC).

## 🚀 Live Deployment
- **Live API URL**: https://ipt-2026-backend-koy6.onrender.com
- **Swagger API Docs**: https://ipt-2026-backend-koy6.onrender.com/api-docs

## 🔗 Related Repository
- **Frontend (Angular 21)**: https://github.com/jude785/Lab-7-Activity-Angular-21-Auth-Boilerplate---Sign-Up-with-Verification-Login-and-Forgot-Password

## ✨ Features
- User registration with email verification
- JWT authentication + refresh token rotation (stored in `httpOnly` cookie)
- Forgot password / Reset password via email
- Role-Based Access Control (Admin / User)
- Swagger API documentation at `/api-docs`

## 🔒 Security & Configuration

Sensitive credentials are **never hardcoded**. They are managed through environment variables:

| Variable | Description |
|---|---|
| `NODE_ENV` | Set to `production` on Render |
| `PORT` | Server port (default: 4000) |
| `JWT_SECRET` | Secret key for signing JWTs |
| `CORS_ORIGIN` | URL of the deployed Angular frontend |
| `DB_HOST` | Aiven MySQL hostname |
| `DB_PORT` | Aiven MySQL port |
| `DB_USER` | Aiven MySQL username |
| `DB_PASSWORD` | Aiven MySQL password |
| `DB_NAME` | Aiven MySQL database name |
| `DB_SSL` | Set to `true` for Aiven |
| `SMTP_HOST` | SMTP server host for emails |
| `SMTP_PORT` | SMTP port (587) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `EMAIL_FROM` | Sender email address |

> The `.env` file is excluded from Git via `.gitignore`. Copy `.env.example` to `.env` and fill in your local values to run locally.

## 🛠️ Local Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jude785/Lab-6-Activity-Building-a-Node.js-TypeScript-MySQL-Boilerplate-API.git
   cd Lab-6-Activity-Building-a-Node.js-TypeScript-MySQL-Boilerplate-API
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your local MySQL and SMTP credentials
   ```

4. **Start the development server** (with hot-reload):
   ```bash
   npm run start:dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

The API will be available at `http://localhost:4000` and Swagger docs at `http://localhost:4000/api-docs`.
