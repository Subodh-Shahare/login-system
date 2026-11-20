# LumaLogin — Login System

A responsive login interface built with HTML, CSS, and vanilla JavaScript.

## Features
- Responsive login form
- Email format and password length validation
- Password visibility toggle
- Live password strength meter
- Demo credential check with helpful error messages
- Remember-me email and demo session persistence using localStorage/sessionStorage
- Forgot-password and sign-up information dialogs

## Demo credentials
- Email: `demo@example.com`
- Password: `Demo@123`

## Run locally
1. Extract the ZIP file.
2. Open `index.html` in your browser, or open the folder in VS Code and use Live Server.
3. Click **Use demo credentials**, then **Sign in**.

## Deploy using GitHub Pages
1. Upload `index.html`, `style.css`, and `script.js` to the root of your GitHub repository.
2. Go to **Settings → Pages**.
3. Select **Deploy from a branch**, choose `main` and `/(root)`, then Save.
4. Wait for GitHub Pages to deploy and open the URL shown there.

## Security note
This is a front-end learning project, not production authentication. Demo credentials are visible in `script.js`. Real authentication must be performed on a secure backend, with salted password hashes, server-managed sessions, HTTPS, and protected endpoints. Never use this demo for real accounts.
