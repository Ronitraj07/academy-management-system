import Link from 'next/link';
import { GraduationCap, Shield, BarChart3, Users, BookOpen, ArrowRight, Star, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">AcademyPro</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <Link href="/faculty" className="hover:text-white transition-colors">Faculty</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <Link href="/auth/login" className="btn-primary text-sm">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-transparent to-accent-900/20" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/50 border border-primary-700/50 text-primary-300 text-sm mb-8">
            <Star className="w-3.5 h-3.5" />
            Modern Academy ERP System
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Manage Your Academy
            <span className="block bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Smarter & Faster
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Complete academy management — attendance, timetable, syllabus, remarks, and analytics — all in one beautiful dashboard.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/auth/login" className="btn-primary flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Everything Your Academy Needs</h2>
          <p className="text-slate-400 text-center mb-12">Role-based dashboards for Students, Faculty, and Admins</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Role-Based Access', desc: 'Separate dashboards for Students, Faculty, and Admins with secure RLS', color: 'from-blue-500 to-indigo-500' },
              { icon: BarChart3, title: 'Attendance Tracking', desc: 'Subject-wise attendance with visual charts, trends, and color indicators', color: 'from-emerald-500 to-teal-500' },
              { icon: BookOpen, title: 'Syllabus Management', desc: 'Track curriculum progress, unit completion, and study materials', color: 'from-purple-500 to-pink-500' },
              { icon: Shield, title: 'Secure & Private', desc: 'Row Level Security ensures students only see their own data', color: 'from-amber-500 to-orange-500' },
              { icon: GraduationCap, title: 'Smart Timetable', desc: 'Weekly timetable with subject, room, and batch information', color: 'from-cyan-500 to-blue-500' },
              { icon: Star, title: 'PWA Ready', desc: 'Install as app on any device or convert to APK for Android', color: 'from-rose-500 to-pink-500' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-r from-primary-900/50 to-accent-900/50 border border-white/10">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Academy?</h2>
          <p className="text-slate-400 mb-8">Sign in with Google and get started in minutes.</p>
          <Link href="/auth/login" className="btn-primary inline-flex items-center gap-2">
            Start Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 text-center text-slate-500 text-sm">
        <p>© 2024 AcademyPro. Built with Next.js + Supabase.</p>
      </footer>
    </div>
  );
}
