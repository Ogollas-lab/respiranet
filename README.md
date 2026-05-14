# RespiroNet — AI Lung Sound Analysis

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Online-teal?style=for-the-badge&logo=vercel)](https://respiranet.lovable.app)

RespiroNet is a clinical decision-support web application that uses hybrid AI — combining digital signal processing (DSP) with large language model reasoning — to analyze lung sound recordings and patient symptoms for respiratory disease screening.

> **Medical Disclaimer:** This system is a decision-support tool and is not intended to replace professional medical diagnosis. Always consult a qualified healthcare professional.

---

## Features

- **AI-Powered Lung Sound Analysis** — Upload or record lung sounds and receive probability-based assessments for Normal, Pneumonia, Asthma, COPD, and Bronchitis.
- **Hybrid Diagnostic Model** — Fuses audio signal features (Zero Crossing Rate, Spectral Centroid, Harmonic Energy) with patient-reported symptoms for refined clinical reasoning.
- **Live Audio Recording** — Record lung sounds directly in the browser with real-time waveform visualization and noise suppression.
- **Symptom-Based Reasoning** — Capture fever, chest pain, wheezing, cough type, shortness of breath, and duration to enhance diagnostic accuracy.
- **Explainable Results** — Probability scores, confidence levels, and transparent clinical notes for each condition.
- **Analysis History** — Save, track, and compare past diagnostic results in a personal dashboard.
- **PDF Report Generation** — Export clinical reports with results and recommendations for offline sharing.
- **Audio Preview Player** — Review uploaded recordings with volume, mute, and seek controls.
- **Responsive Design** — Fully optimized for laptops, tablets, and mobile phones with a sticky bottom action bar on mobile.
- **Secure Authentication** — Email/password and Google OAuth sign-in with JWT validation and Row-Level Security (RLS).
- **Light & Dark Mode** — Theme-aware UI with a clinical teal/blue glass-morphism aesthetic.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript 5, Vite 5 |
| **Styling** | Tailwind CSS 3, shadcn/ui |
| **Animation** | Framer Motion |
| **Routing** | React Router v6 |
| **Backend** | Lovable Cloud (Supabase) — Auth, Database, Edge Functions |
| **AI/ML** | Google Gemini via Lovable AI Gateway |
| **PDF Export** | jsPDF |
| **Testing** | Vitest, Testing Library |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |

---

## Deployment

The application is deployed and publicly accessible at:

**[https://respiranet.lovable.app](https://respiranet.lovable.app)**

To publish your own updates:

1. Make your code changes.
2. Click **Share → Publish** in the Lovable editor.
3. Click **Update** in the publish dialog to push frontend changes live.

> Backend changes (edge functions, database migrations) deploy automatically.

### Custom Domain

You can connect a custom domain by navigating to **Project Settings → Domains** after publishing.

---

## Project Structure

```text
src/
  components/          # React components (UI, sections, reusable)
  components/ui/       # shadcn/ui primitive components
  hooks/               # Custom React hooks (auth, history, mobile)
  lib/                 # Utility functions (PDF generation, helpers)
  pages/               # Route-level page components
  integrations/        # Supabase client & Lovable integrations
  test/                # Vitest test files
supabase/
  functions/           # Edge functions (lung sound analysis)
public/                # Static assets
```

---

## How It Works

1. **Audio Upload or Recording** — The user uploads a lung sound file or records one live in the browser.
2. **DSP Feature Extraction** — The frontend extracts audio signal features (ZCR, Spectral Centroid, Harmonic Energy) using the Web Audio API.
3. **Symptom Collection** — The user reports symptoms via a structured form.
4. **AI Analysis** — An authenticated edge function sends the audio features and symptoms to a Gemini model via the Lovable AI Gateway.
5. **Clinical Assessment** — The AI returns probability scores for each condition, confidence levels, and recommendations.
6. **Results & History** — Results are displayed with visual probability bars and saved to the user's history for later review or comparison.

---

## License

This project is private and proprietary. All rights reserved.

---

## Support

Built with [Lovable](https://lovable.dev). For questions or issues, refer to the [Lovable documentation](https://docs.lovable.dev) or reach out via the [Lovable Discord community](https://discord.com/channels/1119885301872070706/1280461670979993613).
