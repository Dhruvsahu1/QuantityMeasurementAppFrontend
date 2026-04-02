# Quantity Measurement App — Frontend
 
  
> Built with **React + Vite + Tailwind CSS**, this interface connects to the Spring Boot backend for unit conversion operations.
 
**Supported Quantities:** Length · Temperature · Volume · Weight  
**Authentication:** JWT (Register/Login) · Google OAuth2
---
 
## Repository Branch Structure
 
| Branch | Description |
|--------|-------------|
| `main` | React + Vite frontend (merged, default) |
| `QMA-Frontend-React` | React + Vite frontend (development branch) |
| `QMA-Frontend-VanillaJs` | Vanilla JS frontend (alternate implementation) |
 
---
 
## Table of Contents
 
1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Connecting to the Backend](#connecting-to-the-backend)
4. [Using the App](#using-the-app)
5. [Google OAuth2 Setup](#google-oauth2-setup)
6. [Production Build](#production-build)
7. [Troubleshooting](#troubleshooting)
 
---
 
## Prerequisites
 
| Tool    | Version     |
|---------|-------------|
| Node.js | 18 or above |
| npm     | 9+          |
 
> **Note:** This is a frontend-only repository. The Spring Boot backend must be running separately for API calls and authentication to work.
 
---
 
## Getting Started
 
### Step 1 — Clone the Repository
 
```bash
git clone <your-repo-url>
cd <repo-folder>
```
 
### Step 2 — Install Dependencies
 
```bash
npm install
```
 
### Step 3 — Start the Development Server
 
```bash
npm run dev
```
 
Open your browser at → `http://localhost:3000`
 
---
 
## Connecting to the Backend
 
This frontend is designed to work with the **Quantity Measurement App Spring Boot backend**.  
Ensure the backend is running at `http://localhost:8080` before using the app.
 
The API proxy is configured in `vite.config.js`:
 
```js
server: {
  proxy: {
    '/api': 'http://localhost:8080'
  }
}
```
 
If your backend runs on a different port, update the proxy target accordingly.
 
---
 
## Using the App
 
### Register / Login
 
1. Open `http://localhost:3000`
2. Click **Create one** on the login page → enter your email and password → register
3. Or sign in with your **Google account** using the **Continue with Google** button
4. You will be redirected to the dashboard automatically
 
### Measurement Operations
 
1. **Select Category** — Length, Weight, Temperature, or Volume
2. **Enter Value** in the input field
3. **Select From unit** and **To unit** from the dropdowns
4. Use the **⇄ swap button** to reverse the units instantly
5. Click **Convert** — the result appears below with a full breakdown
6. View your conversion history from the dashboard stats
 
---
 
## Google OAuth2 Setup
 
To enable the **Continue with Google** login button:
 
1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → **APIs & Services** → **Credentials**
3. Click **Create Credentials** → **OAuth 2.0 Client ID**
4. Set **Application type** to `Web application`
5. Add the following **Authorized Redirect URI**:
   ```
   http://localhost:8080/login/oauth2/code/google
   ```
6. Copy the **Client ID** and **Client Secret** into the backend `application.properties`
 
> OAuth2 authentication is handled by the Spring Boot backend. The frontend redirects to the backend OAuth2 flow and receives the JWT token on success.
 
---
 
## Production Build
 
```bash
npm run build
```
 
Output is generated in the `dist/` folder. Deploy to **Netlify**, **Vercel**, or any static file server.
 
> **Note:** For production deployments, update the proxy target in `vite.config.js` and the OAuth2 redirect URIs in the backend to match your production domain.
 
---
 
## Troubleshooting
 
| Problem | Fix |
|---------|-----|
| Blank page on load | Run `npm install` and restart with `npm run dev` |
| `CORS error` in browser | Ensure the Spring Boot backend is running on port `8080` |
| `401 Unauthorized` on API calls | Token has expired — log out and log in again |
| Google login not working | Verify OAuth2 credentials are set in the backend `application.properties` |
| Port 3000 already in use | Change `port: 3000` to another port (e.g. `5173`) in `vite.config.js` |
| Cannot connect to backend | Confirm the backend is running at `http://localhost:8080` |
 
---
> **Technology Stack:** React · Vite · Tailwind CSS · JWT · Google OAuth2
