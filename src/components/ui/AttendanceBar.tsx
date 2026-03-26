import { cn, getAttendanceBg, getAttendanceColor } from '@/lib/utils';

interface AttendanceBarProps {
  subject: string;
  present: number;
  total: number;
  percentage: number;
}

export default function AttendanceBar({ subject, present, total, percentage }: AttendanceBarProps) {
  const color = getAttendanceBg(percentage);
  const textColor = getAttendanceColor(percentage);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[60%]">{subject}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{present}/{total}</span>
          <span className={cn('text-sm font-bold tabular-nums', textColor)}>{percentage}%</span>
        </div>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-700', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
