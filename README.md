# 🏇 SamiAbi v1.3
### Advanced Tactical Horse Racing Intelligence Platform

SamiAbi is a high-performance, AI-powered racing analysis platform designed for advanced tactical modeling and race shape prediction. It synchronizes multiple data streams to project tactical maps, runner matrices, and win probabilities with military-grade precision.

---

## ⚡ Core Intelligence Features

- **🎯 Tactical Pace Mapping**: Real-time visualization of field positioning (Leaders, Pressers, Stalkers, Closers).
- **🤖 AI-Driven Analysis**: Leverage state-of-the-art LLMs (OpenAI/Gemini) to process complex racing structures.
- **📊 Scenario Probabilities**: Calculate and weight multiple race outcomes based on tactical variables.
- **🧬 Runner Matrix**: Deep-dive analytics for every horse, including win percentages and scenario-fit modeling.
- **📡 Real-Time Data Sync**: Modular ingestion units for Race Program, Performance History, and Tactical Split data.
- **🌑 Dark Terminal UI**: Premium, futuristic interface designed for high-focus tactical sessions.

## 🛠 Technical Architecture

- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org/)
- **Core Engine**: React 19 (Server & Client Components)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend API**: Edge-compatible Route Handlers
- **AI Integration**: OpenAI SDK (GPT-4o) / Google Generative AI (Gemini Flash)

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 20+** and **npm** installed on your system.

### 2. Environment Configuration
Create a `.env` file in the root directory and add your API credentials:

```bash
# Required for AI Core
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here

# Application Configuration
APP_URL=http://localhost:3000
```

### 3. Installation
```bash
npm install
```

### 4. Development Server
Start the development server with Turbopack for the fastest experience:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the tactical terminal.

## 🏗️ Deployment

The project is optimized for deployment on the [Vercel Platform](https://vercel.com/new).

For remote access during development, it is configured to run behind a **Cloudflare Tunnel**, providing secure HTTPS access to local HMR and dev resources.

---

*Classification: Restricted Access Intelligence Software*  
*© SamiAbi AI Systems 2026*
