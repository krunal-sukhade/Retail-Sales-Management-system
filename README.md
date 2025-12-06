# 🧾 TruEstate Sales Management System

A full-stack Sales Management dashboard built as part of the TruEstate hiring assignment.  
The system provides powerful filtering, searching, sorting, pagination, and KPI summaries over a structured sales dataset.

---

## 🚀 Live Project Links  


- **Frontend (Vercel):** https://your-frontend-url.vercel.app
- **Backend (Render):** https://your-backend-url.onrender.com
- **GitHub Repository:** https://github.com/yourusername/truestate-sales-management

---

## 📚 Overview  

This application enables users to:

- Search customers by **name or phone number**
- Filter by **region, gender, age, category, tags, payment method, date**
- Adaptive partial matching for **search, category, tags**
- Sort by **Name**, **Date**, or **Quantity**
- View analytics such as:
  - **Total Amount**
  - **Total Units Sold**
  - **Total Discount**
- Copy customer phone number directly from the table
- Use clean pagination and table layout (matching Figma assignment)
- Responsive, minimal and professional dashboard UI  

---

## 🛠 Tech Stack

### **Frontend**
- React (Vite)
- Axios
- TailwindCSS / CSS
- Lucide / Emoji Icons

### **Backend**
- Node.js + Express
- Filtering Engine (custom)
- JSON Dataset (converted from CSV)
- Pagination Utility

### **Deployment**
- Frontend → **Vercel**
- Backend → **Render**
- Repo → **GitHub**

---

## 📁 Folder Structure


```bash
root/
├── backend/
│ ├── src/
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── services/
│ │ └── utils/
│ └── package.json
│
├── frontend/
│ ├── src/
│ └── package.json
│
├── docs/
│ └── architecture.md
│
└── README.md
```

---

## 🔧 Local Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/truestate-sales-management.git
cd truestate-sales-management

```

2️⃣ Setup Backend

```bash
cd backend
npm install
npm start

```

Backend runs at:

http://localhost:5000


3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev

```

Frontend runs at:

http://localhost:5173

---

🌐 Environment Variables

Create a .env file in frontend:

VITE_API_BASE_URL=https://your-backend-url.onrender.com

---
⭐ Features Summary

Adaptive search (partial matching)

Multi-filter logic (region, gender, age, tags, payment)

Category + Tag fuzzy matching

Sorting (name, date, quantity)

KPI summary cards

Copy phone number action

Pagination with metadata

Clean UI matching provided Figma

Fast JSON loading + optimized queries

---
📄 Documentation

Full technical architecture is provided in:
/docs/architecture.md

---
📬 Contact

Krunal Sukhade

Email:
krunalsukhade13@gmail.com