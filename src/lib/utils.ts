import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAttendanceColor(percentage: number): string {
  if (percentage >= 75) return 'text-emerald-600 dark:text-emerald-400';
  if (percentage >= 60) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

export function getAttendanceBg(percentage: number): string {
  if (percentage >= 75) return 'bg-emerald-500';
  if (percentage >= 60) return 'bg-amber-500';
  return 'bg-red-500';
}

export function getAttendanceBadge(percentage: number): string {
  if (percentage >= 75) return 'badge-green';
  if (percentage >= 60) return 'badge-yellow';
  return 'badge-red';
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export function calculateAttendance(present: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
}
