# CORSFIX 🛠️

**Stop fighting with CORS errors. Start fixing them.**

CORSFIX is a premium diagnostic tool designed to help developers identify, understand, and resolve Cross-Origin Resource Sharing (CORS) issues in seconds. Whether you're working with Express, Next.js, FastAPI, or Rust, CORSFIX provides the exact code snippets you need to get your API talking to your frontend.

---

## ✨ Features

### 🔍 Intelligent Error Analysis
Paste your console error directly into the analyzer. CORSFIX uses a heuristic engine to detect:
- **Framework Detection**: Automatically identifies if you're using Next.js, Laravel, Django, Express, Go (Fiber/Gin), or Rust (Actix).
- **Root Cause Isolation**: Distinguishes between missing headers, preflight failures, and credential mismatches.
- **Ready-to-Use Snippets**: Provides copy-pasteable configuration code tailored to your specific backend stack.

### 🛰️ API Health Probe
Live-test your endpoints from our server. See exactly what headers your API is actually returning in a real-world request scenario.
- Inspect `Access-Control-Allow-Origin` and other critical headers.
- Validate preflight (OPTIONS) request handling.

### ⚡ Local Proxy Tunnel (Pro)
Bypass CORS restrictions during local development without touching a single line of backend code. CORSFIX provides a managed proxy command to tunnel your requests securely.

### 📊 Error Logging & Snippet Saving (Pro)
Keep track of the errors you've encountered and save the working solutions to your personal dashboard for future reference.

---

## 🚀 How It Works

1. **Paste**: Copy the red text from your browser's console.
2. **Analyze**: CORSFIX breaks down the error type and calculates a confidence score.
3. **Fix**: Follow the step-by-step instructions and use the generated code snippet to update your server configuration.
4. **Verify**: Use the **Health Monitor** to probe your API and confirm the headers are now correctly set.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion
- **Authentication**: Clerk
- **Payments**: Polar.sh
- **Backend Logic**: Serverless Functions (Next.js API Routes)
- **Styling**: Premium "Glassmorphism" UI with Lucide Icons

---

## 🔒 Privacy & Security

We believe in security. CORSFIX only logs the structure of the error and the framework detected to improve our analysis engine. We never store sensitive API keys or private data sent through the probe service.

---

## 👨‍💻 Contributing

Found a framework we missed? Feel free to open a PR! We're constantly expanding our `parser.ts` to support more backend ecosystems.

---

*Built for developers who value their time.* [Try CORSFIX Live](https://corsfix.vercel.app)
