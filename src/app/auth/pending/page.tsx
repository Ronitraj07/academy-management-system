'use client';
import { useAuth } from '@/components/providers/AuthProvider';
import { Clock, LogOut, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PendingPage() {
  const { profile, signOut } = useAuth();
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
        <div className="glass-card rounded-3xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Access Pending</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            Hello <strong>{profile?.name}</strong>! Your account is pending approval. The admin will assign your role shortly.
          </p>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-sm text-amber-700 dark:text-amber-400 mb-6">
            Please contact your academy administrator to get access assigned.
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 mx-auto text-sm text-slate-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  );
}
