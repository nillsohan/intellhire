# IntelliHire React starter

A responsive React + Vite frontend prototype for an AI-powered recruitment and career intelligence platform.

## Run locally

1. Install Node.js (LTS).
2. Extract this folder.
3. Open a terminal in the project folder.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually http://localhost:5173).

## Included screens

- Overview dashboard
- Resume Analyzer (file selection + demo-only sample result)
- Job Matches (searchable sample job cards)
- Skill Gap (sample skill levels and learning actions)
- Mock Interview (question practice and guidance)

## Important

This is a frontend prototype. It does **not** upload resumes to a server, parse documents, call an AI model, authenticate users, or retrieve live jobs. The displayed scores, jobs and skill data are sample data. For a production project, add a backend API, secure file upload and storage, document parsing, an AI service, database persistence, authentication, validation, and privacy controls. Never expose a private AI API key in React/browser code.
