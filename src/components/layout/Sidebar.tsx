'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/providers/AuthProvider';
import {
  LayoutDashboard, Users, BookOpen, Calendar, ClipboardList,
  MessageSquare, Megaphone, BarChart3, Settings, ChevronLeft,
  GraduationCap, Bell, FileText, UserCheck, Mail, X, BookMarked
} from 'lucide-react';

const studentNav = [
  { href: '/dashboard/student', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/student/attendance', label: 'Attendance', icon: ClipboardList },
  { href: '/dashboard/student/timetable', label: 'Timetable', icon: Calendar },
  { href: '/dashboard/student/syllabus', label: 'Syllabus', icon: BookOpen },
  { href: '/dashboard/student/remarks', label: 'Remarks', icon: MessageSquare },
  { href: '/dashboard/student/notifications', label: 'Notifications', icon: Bell },
];

const facultyNav = [
  { href: '/dashboard/faculty', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/faculty/attendance', label: 'Attendance', icon: ClipboardList },
  { href: '/dashboard/faculty/timetable', label: 'Timetable', icon: Calendar },
  { href: '/dashboard/faculty/syllabus', label: 'Syllabus', icon: BookMarked },
  { href: '/dashboard/faculty/remarks', label: 'Remarks', icon: MessageSquare },
  { href: '/dashboard/faculty/announcements', label: 'Announcements', icon: Megaphone },
];

const adminNav = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/admin/users', label: 'User Management', icon: Users },
  { href: '/dashboard/admin/students', label: 'Students', icon: GraduationCap },
  { href: '/dashboard/admin/faculty', label: 'Faculty', icon: UserCheck },
  { href: '/dashboard/admin/subjects', label: 'Subjects', icon: BookOpen },
  { href: '/dashboard/admin/attendance', label: 'Attendance', icon: ClipboardList },
  { href: '/dashboard/admin/timetable', label: 'Timetable', icon: Calendar },
  { href: '/dashboard/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/dashboard/admin/feedback', label: 'Feedback', icon: Mail },
  { href: '/dashboard/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const { profile } = useAuth();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems =
    profile?.role === 'admin'
      ? adminNav
      : profile?.role === 'faculty'
      ? facultyNav
      : studentNav;

  const roleLabel =
    profile?.role === 'admin' ? 'Admin Panel' :
    profile?.role === 'faculty' ? 'Faculty Portal' :
    'Student Portal';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-5 border-b border-slate-100 dark:border-white/5',
        collapsed && 'justify-center px-2'
      )}>
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-slate-800 dark:text-white text-sm">AcademyPro</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{roleLabel}</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                'sidebar-item',
                isActive ? 'sidebar-item-active' : 'sidebar-item-inactive',
                collapsed && 'justify-center px-2'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      {!collapsed && profile && (
        <div className="p-4 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.name} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{profile.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{profile.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        className="hidden lg:flex flex-col h-screen sticky top-0 bg-[rgb(var(--sidebar-bg))] border-r border-slate-100 dark:border-white/5 flex-shrink-0 overflow-hidden"
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -right-3 w-6 h-6 rounded-full glass-card flex items-center justify-center shadow-md z-10"
        >
          <ChevronLeft className={cn('w-3 h-3 text-slate-500 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              className="fixed left-0 top-0 h-screen w-64 bg-[rgb(var(--sidebar-bg))] border-r border-slate-100 dark:border-white/5 z-50 lg:hidden flex flex-col"
            >
              <button onClick={onMobileClose} className="absolute top-4 right-4">
                <X className="w-5 h-5 text-slate-500" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
