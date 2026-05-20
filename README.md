# Node.js + MySQL Authentication API

This is the backend API for the full-stack authentication system deployment. It provides user registration, login, verification, and role-based access control (RBAC).

## Live Deployed API
- **Live URL**: https://ipt-2026-backend.onrender.com
- **Swagger Documentation**: https://ipt-2026-backend.onrender.com/api-docs

## Security & Configuration
Sensitive information has been moved out of git tracking to follow security best practices.

1. **Environment Variables**:
   In production, ensure you set the following environment variables in your hosting platform (e.g., Render):
   - `NODE_ENV=production`
   - `PORT=4000`
   - `JWT_SECRET` (Your secure JWT secret key)
   - `CORS_ORIGIN` (The URL of your deployed frontend, e.g., `https://ipt-2026-frontend.onrender.com`)
   - **Database Variables**: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL=true|false`
   - **Email Variables**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`

2. **Local Development**:
   Copy `.env.example` to `.env` and fill in your local MySQL and SMTP credentials. The `.env` file is excluded from Git tracking to protect your secrets.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server (uses `nodemon` and `ts-node`):
   ```bash
   npm run start:dev
   ```

3. Build the project for production:
   ```bash
   npm run build
   ```

4. Start the production server (after building):
   ```bash
   npm start
   ```

## API Documentation
Once the server is running, you can access the Swagger documentation at:
- Local: http://localhost:4000/api-docs
- Production: https://ipt-2026-backend.onrender.com/api-docs
