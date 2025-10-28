# 🧠 Quiz Maker App

A **Quiz Maker** built with **Next.js**, **Tailwind CSS**, and **TanStack Query (React Query)** for seamless API state management.
The backend is powered by **Node.js**, secured using a **custom token-based authentication system**.

This project allows users to **create, view, and manage coding-related quizzes** while demonstrating clean API integration and modern frontend architecture.

---

## 🚀 Tech Stack

### **Frontend**

* Next.js – React framework with SSR & routing
* Tailwind CSS – Utility-first styling
* TanStack Query – Data fetching, caching, and synchronization
* MUI –  UI components library

### **Backend**

* 🧩 **Node.js** – REST API server
* 💾 **SQLite** – Lightweight local database
* 🔐 **Dotenv** – Environment variable configuration

---

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
cd quiz-maker
```

### Install Dependencies and Start Frontend App

```bash
cd client
npm install
npm run dev
```

> Frontend runs on: **[http://localhost:3000](http://localhost:3000)**

---

🧪 Testing the API in Postman
Open Postman
Set method to GET or POST (depending on endpoint)
Add an Authorization Header:
dev-token: 1234567890

Example request:
GET http://localhost:4000/quizzes
