'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Menu, Sun, Moon, Bell, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavbarProps {
  onMenuClick?: () => void;
  title?: string;
}

export default function Navbar({ onMenuClick, title }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { profile, signOut } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 glass-card border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>
        {title && (
          <h1 className="text-base font-semibold text-slate-800 dark:text-slate-100 hidden sm:block">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.name} className="w-7 h-7 rounded-full" />
            ) : (
              <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                {profile?.name?.charAt(0) ?? 'U'}
              </div>
            )}
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden md:block max-w-[120px] truncate">
              {profile?.name}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl shadow-xl border border-white/20 dark:border-white/10 overflow-hidden"
              >
                <div className="p-3 border-b border-slate-100 dark:border-white/5">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{profile?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{profile?.email}</p>
                  <span className="badge badge-purple mt-1 capitalize">{profile?.role}</span>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => { setProfileOpen(false); signOut(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
