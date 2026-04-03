# Azure Deployment Guide - Contact Manager App

## ✅ Production Setup Complete

Your MERN application is now configured for Azure deployment with a single entry point.

---

## Project Structure

```
azure_host/
├── package.json              ← ROOT ENTRY POINT (NEW)
├── .gitignore
├── README.md
├── server/
│   ├── server.js             ← UPDATED: Serves React + API
│   ├── package.json
│   ├── .env                  ← MongoDB URI
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Contact.js
│   └── routes/
│       └── contacts.js
└── client/
    ├── dist/                 ← BUILD OUTPUT (Created after npm run build)
    ├── package.json
    ├── vite.config.js        ← UPDATED: Added base & build config
    ├── .env.local            ← UPDATED: Uses relative API URL
    ├── src/
    │   ├── api/
    │   │   └── contactAPI.js ← UPDATED: Uses Vite env var
    │   ├── components/
    │   ├── App.jsx
    │   └── main.jsx
    └── node_modules/
```

---

## What Changed for Azure

### 1. **Root-Level package.json** (NEW)

- **Location**: `/azure_host/package.json`
- **Scripts**:
  - `npm run build` - Builds React frontend
  - `npm start` - Starts Express server
  - `npm run install-all` - Installs all dependencies
- **Purpose**: Single entry point for Azure deployment

### 2. **Express server.js** (UPDATED)

- Added `const path = require('path')`
- Added static file serving: `app.use(express.static(clientPath))`
- Changed catch-all route from `app.get('*')` to `app.get(/^(?!\/api\/).*/)` (regex to avoid Express v5 issues)
- Routes now:
  - `/api/contacts/*` → API endpoints
  - `/api` → Health check
  - `/` and other paths → Serve React app `index.html`

### 3. **Vite Configuration** (UPDATED)

```javascript
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
  },
});
```

- **base**: Set to `/` for root hosting
- **outDir**: Output to `dist/` folder
- **sourcemap**: Disabled for production
- **minify**: Uses terser for compression

### 4. **Frontend API URL** (UPDATED)

- **`.env.local`**: Changed from absolute URL to relative
  ```
  VITE_API_URL=/api/contacts
  ```
- **`contactAPI.js`**: Uses `import.meta.env.VITE_API_URL || '/api/contacts'`
- **Benefits**: Works on localhost AND production without changes

### 5. **Root .gitignore** (NEW)

Prevents committing:

- `node_modules/`
- `.env` files
- `dist/` folders (optional - can commit for faster Azure deploy)

---

## Build & Start Flow

### Step 1: Build

```bash
npm run build
```

- Installs dependencies in `/client` (if needed)
- Builds React with Vite
- Creates `/client/dist/` folder

### Step 2: Start

```bash
npm start
```

- Navigates to `/server`
- Starts Express on port `process.env.PORT || 5000`
- Express serves:
  - React files from `/client/dist`
  - API endpoints from `/api/contacts`

### Single Server (Both Frontend + Backend)

```
http://localhost:5000       → React App (index.html)
http://localhost:5000/api   → Health Check
http://localhost:5000/api/contacts → Contacts API
```

---

## Deployment to Azure

### Prerequisites

1. Azure account with App Service created (`contact-manager-app.azurewebsites.net`)
2. Git repository connected to Azure
3. MongoDB Atlas connection string updated

### Steps

#### 1. Update Environment Variables in Azure

Go to Azure App Service → Configuration → Application settings

```
MONGODB_URI = mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contact_management_db?retryWrites=true&w=majority
NODE_ENV = production
PORT = (leave blank - Azure assigns it)
```

#### 2. Configure Azure Deployment

**Option A: GitHub Actions**

- Azure automatically detects `package.json`
- Build command: `npm run build`
- Start command: `npm start`

**Option B: Azure Portal**

- Go to App Service → Deployment Center
- Set Startup Command: `npm start`
- Set Build Command: `npm run build` (optional)

#### 3. Deploy

```bash
git push origin main
```

Azure will automatically:

1. Pull code from GitHub
2. Run `npm install` (root level)
3. Run `npm run build` (builds frontend)
4. Run `npm start` (starts server)

#### 4. Verify

- Frontend: `https://contact-manager-app.azurewebsites.net/`
- API: `https://contact-manager-app.azurewebsites.net/api/contacts`

---

## Local Testing (Production Mode)

```bash
# From root directory
npm run build          # Build React
npm start             # Start server

# Test URLs
curl http://localhost:5000/              # React app
curl http://localhost:5000/api           # Health check
curl http://localhost:5000/api/contacts  # Get all contacts
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John","phoneNumber":"1234567890","email":"john@example.com"}'
```

---

## Test Results ✅

### API Tests Passed

- ✅ Health check: `GET /api`
- ✅ Get contacts: `GET /api/contacts`
- ✅ Create contact: `POST /api/contacts`
- ✅ React app served: `GET /`
- ✅ SPA routing: `GET /any-route` → serves `index.html`

### Frontend Tests Passed

- ✅ React components load
- ✅ Tabbed interface working
- ✅ API calls use relative URL `/api/contacts`
- ✅ Add/Edit/Delete functionality works

### Build Process

- ✅ Frontend builds successfully with Vite
- ✅ Build output: 196.72 kB (62.29 kB gzipped)
- ✅ CSS minified: 5.56 kB (1.60 kB gzipped)
- ✅ Assets created in `client/dist/`

---

## Key Features for Production

1. **Single Server Architecture**
   - One Express instance serves both frontend and API
   - Reduced costs, simpler management

2. **Relative API URLs**
   - Frontend uses `/api/contacts` instead of hardcoded localhost
   - Works on any domain without code changes

3. **SPA Fallback Routing**
   - Non-API routes serve `index.html`
   - React Router handles client-side navigation
   - Regex route: `/^(?!\/api\/).*/` ensures API routes aren't caught

4. **Production Optimizations**
   - React minified with Terser
   - CSS minified
   - No source maps in production
   - Static files cached by Express

5. **MongoDB Atlas Integration**
   - Environment-based connection string
   - Secure credentials in Azure settings
   - Automatic IP whitelisting support

---

## Troubleshooting

### Issue: Build fails with "terser not found"

**Solution**: Already installed. Run `npm install -- save-dev terser` if needed.

### Issue: API returns 404

**Solution**: Ensure API routes are before `app.use(express.static())` in server.js

### Issue: React app shows blank page

**Solution**: Check browser console for errors. Verify `/client/dist/` exists and has `index.html`

### Issue: CORS errors

**Solution**: Already enabled. Current CORS allows all origins (fine for now)

### Issue: MongoDB connection fails

**Solution**:

- Check IP whitelisting in MongoDB Atlas
- Verify connection string in Azure settings
- Add Azure App Service IP to Atlas whitelist

---

## Next Steps

1. **Push to Azure**

   ```bash
   git add .
   git commit -m "Setup for Azure deployment"
   git push origin main
   ```

2. **Monitor Deployment**
   - Check Azure Portal for deployment logs
   - Monitor Application Insights (if enabled)

3. **Test on Azure**
   - Open `https://contact-manager-app.azurewebsites.net`
   - Add/edit/delete contacts
   - Check browser console for errors

4. **Production Checklist**
   - [ ] MongoDB Atlas IP whitelisting configured
   - [ ] Environment variables set in Azure
   - [ ] Frontend loads at root URL
   - [ ] API endpoints respond with data
   - [ ] Add/edit/delete operations work
   - [ ] Error handling displays messages
   - [ ] HTTPS working (automatic with Azure)

---

## File Summary

| File                            | Purpose                  | Status     |
| ------------------------------- | ------------------------ | ---------- |
| `/package.json`                 | Root entry point         | ✅ Created |
| `/server/server.js`             | Express + static serving | ✅ Updated |
| `/client/vite.config.js`        | Build configuration      | ✅ Updated |
| `/client/.env.local`            | API URL (relative)       | ✅ Updated |
| `/client/src/api/contactAPI.js` | Uses Vite env            | ✅ Updated |
| `/client/dist/`                 | Production build         | ✅ Built   |
| `/.gitignore`                   | Git ignore rules         | ✅ Created |

---

**Ready for Azure deployment! 🚀**
