# 🎓 AcademyPro — Academy Management System

A **production-ready, full-stack SaaS Academy ERP** built with Next.js 14, Tailwind CSS, and Supabase.

![AcademyPro Banner](https://via.placeholder.com/1200x400/4f46e5/ffffff?text=AcademyPro+Academy+Management+System)

## ✨ Features

### 🔐 Authentication & Security
- Google OAuth via Supabase Auth
- Role-Based Access Control (Student / Faculty / Admin)
- Row Level Security (RLS) on all Supabase tables
- Admin approves users after Google login

### 👨‍🎓 Student Dashboard
- Attendance overview with visual progress bars
- Subject-wise attendance % with color indicators
- Weekly timetable view
- Remarks from faculty
- Announcements & notifications

### 👨‍🏫 Faculty Dashboard
- Mark & edit attendance per class
- Create/manage timetable
- Add/update syllabus
- Write student remarks
- Send announcements

### 🧑‍💼 Admin Dashboard
- Full analytics overview
- Approve users & assign roles
- Attendance reports (CSV/PDF export)
- Manage subjects, classes, batches
- View contact/feedback submissions

### 🌐 Public Website
- Home, About, Courses, Faculty, Contact pages
- Contact form → stored in Supabase
- Admission inquiry form

### 🎨 Design
- Minimalist SaaS UI with Glassmorphism
- Light + Dark mode
- Deep blue / purple gradient
- Mobile-first, fully responsive
- PWA-ready (APK-convertible via TWA)

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| Charts | Recharts |
| State | TanStack Query |
| PWA | next-pwa |
| Deployment | Vercel |

## 📦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Ronitraj07/academy-management-system.git
cd academy-management-system
npm install
```

### 2. Set up environment variables
```bash
cp .env.local.example .env.local
# Fill in your Supabase credentials
```

### 3. Set up Supabase
- Create a new project at [supabase.com](https://supabase.com)
- Run the SQL migrations from `supabase/migrations/`
- Enable Google OAuth in Supabase Auth settings
- Add your site URL to Supabase Auth redirect URLs

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

See `supabase/migrations/001_initial_schema.sql` for full schema with RLS policies.

## 📱 PWA / APK

This app is PWA-ready. To convert to APK:
1. Build the app: `npm run build`
2. Deploy to Vercel
3. Use [PWABuilder](https://www.pwabuilder.com) or Bubblewrap/TWA to generate APK

## 🔒 Security

- All tables protected with Supabase RLS
- Students can only view their own data
- Faculty can only manage their assigned classes
- Admin has full access
- No service role key exposed to client

## 📄 License

MIT License — feel free to use for your academy!
