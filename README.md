# 🌐 Project Nexus - Campus Super App (Website)

Project Nexus is a modern campus-focused website designed to unify essential student services into one digital ecosystem.  
It provides students and administrators with a clean, user-friendly interface for managing daily campus life activities.

This project is built as a hackathon prototype with a focus on UI/UX, modular design, and integration-ready architecture.

---

## 🚀 Website Features

### 🔐 Authentication
- Login and Register pages
- Role-based flow (Student / Admin)
- Secure UI structure (ready for backend integration)

---

### 🏠 Dashboard (Main Hub)
The dashboard acts as the central hub of the ecosystem and displays:
- Daily mess menu preview
- Latest notices
- Lost & Found updates
- Marketplace listings preview
- Academic timetable preview

---

### 📌 Daily Pulse Module
- Mess menu display
- Notices section
- AI Email Summarizer UI (input + output format)

---

### 🔄 Student Exchange Module
- Lost & Found posting and browsing UI
- Buy/Sell Marketplace UI
- Cab Pooling travel post UI

---

### 🧭 Explorer’s Guide Module
- Nearby places listing
- Categorized student-friendly locations
- Ratings / tags UI support

---

### 🎓 Academic Cockpit Module
- Timetable display UI
- Assignment listing page UI
- LMS-lite structure for future integration

---

## 🎨 UI/UX Highlights
- Modern responsive design (mobile + desktop)
- Card-based dashboard layout
- Sidebar navigation for smooth experience
- Clean component structure
- Tailwind CSS styling

---

## 🛠 Tech Stack (Website)

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Lucide Icons

---

## 📂 Folder Structure

```
frontend/
│
├── src/
│   ├── assets/         # Images, icons
│   ├── components/     # Reusable UI components
│   ├── layouts/        # MainLayout, SidebarLayout
│   ├── pages/          # Dashboard, Login, Modules
│   ├── services/       # API calls (Axios setup)
│   ├── context/        # Auth Context (optional)
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions (Run Website Locally)

### 1️⃣ Clone the project
```bash
git clone <repo-link>
```

### 2️⃣ Go into the frontend folder
```bash
cd frontend
```

### 3️⃣ Install dependencies
```bash
npm install
```

### 4️⃣ Start the development server
```bash
npm run dev
```

The website will run at:
```
http://localhost:5173
```

---

## 🌍 Deployment
The frontend website can be deployed easily using:

- **Vercel**
- **Netlify**

### Deploy Steps (Vercel)
1. Push project to GitHub
2. Import GitHub repo into Vercel
3. Click Deploy

---

## 🧪 Smoke Test Checklist
- [ ] Landing page loads correctly
- [ ] Navbar / sidebar navigation works
- [ ] Dashboard cards render properly
- [ ] Login/Register pages work (UI)
- [ ] All module pages open without error
- [ ] Website is responsive on mobile view

---

## 🏆 Hackathon Summary
Project Nexus is a campus ecosystem website built to reduce student friction by centralizing daily needs such as food menus, notices, lost items, marketplace, cab sharing, and academic utilities into a single unified platform.

---

## 👨‍💻 Team Members
- Ayushmaan Ranawat
- (Add teammates here)

---

## 📜 License
This project is developed as a hackathon prototype for educational and demo purposes.
