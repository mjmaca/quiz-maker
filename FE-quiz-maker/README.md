# 🧠 Quiz Maker App

A **Quiz Maker** built with **Next.js**, **Tailwind CSS**, and **TanStack Query (React Query)** for seamless API state management.

This project allows users to **create, view, and manage coding-related quizzes** while demonstrating clean API integration and modern frontend architecture.

---

## 🚀 Tech Stack

### **Frontend**
* Next.js – React framework with SSR & routing
* Tailwind CSS – Utility-first styling
* TanStack Query – Data fetching, caching, and synchronization
* MUI –  UI components library

## 🧩 Project Structure

```
Quiz-maker/
│
├── FE/                   # Frontend (Next.js)
|   ├── src/  
│            app/              # pages
│            components/       # reusable component
│            hooks/            # TanStack Query hooks
│            lib/              # api connections
│            styles            # globals css
│            types             # interfaces
│            providers         # QueryProvider
    ├─── package.json
    └── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mjmaca/quiz-maker.git

```

### Install Dependencies and Start Frontend App

```bash
cd quiz-maker/FE-quiz-maker
npm install
npm run dev
```

> Frontend runs on: **[http://localhost:3000]