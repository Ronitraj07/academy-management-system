import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  gradient?: string;
  className?: string;
}

export default function StatCard({ title, value, subtitle, icon: Icon, trend, gradient, className }: StatCardProps) {
  return (
    <div className={cn('stat-card', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', gradient ?? 'gradient-primary')}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      {trend && (
        <div className={cn('text-xs font-medium flex items-center gap-1', trend.positive ? 'text-emerald-600' : 'text-red-500')}>
          <span>{trend.positive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}% from last month</span>
        </div>
      )}
    </div>
  );
}
