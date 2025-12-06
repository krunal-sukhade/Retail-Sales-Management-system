


# System Architecture – TruEstate Sales Management System

This document describes the internal architecture of the TruEstate Sales Dashboard.

---

# 1️⃣ High-Level Design

Frontend (React + Vite)
↓
Backend (Node.js + Express)
↓
JSON Dataset (Converted from CSV)



The frontend sends query-based API requests such as:

GET /api/sales?page=1&limit=25&search=neha&category=beauty



The backend performs filtering, sorting, and pagination.

---

# 2️⃣ Frontend Architecture

### Structure

```bash
frontend/src/
├── components/
├── services/api.js
├── App.jsx
└── main.jsx
```

### Major Components
- **FiltersBar**  
- **SearchBar**  
- **SortDropdown**  
- **StatsCards**  
- **SalesTable**  
- **PaginationControls**  

### Data Flow

User input → React state → API call → Updated table + stats



All filtering/sorting happens on the backend.

---

# 3️⃣ Backend Architecture

### Directory Structure

```bash

backend/src/
├── routes/
├── controllers/
├── services/
│ └── salesService.js
├── utils/
└── data/salesData.json
```

### API Endpoint

GET /api/sales

Supported query parameters:

- search  
- region  
- gender  
- ageMin, ageMax  
- productCategory  
- tags  
- paymentMethod  
- dateFrom, dateTo  
- sortBy, sortOrder  
- page, limit  

---

# 4️⃣ Filtering Engine

Filtering is split into individual functions:

- `matchesSearch()`  
- `matchesRegion()`  
- `matchesGender()`  
- `matchesAge()`  
- `matchesProductCategory()`  
- `matchesTags()`  
- `matchesPaymentMethod()`  
- `matchesDateRange()`  

### Adaptive Matching

Categories & tags use:

string.includes(partialInput)


Allowing:

- `"bea"` → `"beauty"`  
- `"wire"` → `"wireless"`  

---

# 5️⃣ Sorting

Backend supports sorting by:

- `customerName`  
- `quantity`  
- `date`  

Sorting happens *after filtering*, before pagination.

---

# 6️⃣ Pagination

Backend splits results using:

page=1&limit=10



Response format:

```json
{
  "data": [...],
  "pagination": {
    "totalItems": 500,
    "totalPages": 20,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

---

7️⃣ Deployment Architecture
Frontend → Vercel
Build output served from CDN

Uses env variable:
VITE_API_BASE_URL

Backend → Render
Node server hosting Express API

Auto-deploys on GitHub push

---

8️⃣ Future Improvements
Debounced search

Fuzzy search (Levenshtein)

Chart-based visualizations

Export CSV/PDF

Authentication & roles


---
