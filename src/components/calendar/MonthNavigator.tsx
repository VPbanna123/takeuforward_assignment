import { getMonthLabel } from '@/lib/date';

type MonthNavigatorProps = {
  monthDate: Date;
  onMonthChange: (delta: number) => void;
};

export function MonthNavigator({ monthDate, onMonthChange }: MonthNavigatorProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        className="grid h-8 w-8 place-items-center rounded-full border border-slate-300 bg-white text-base text-slate-900 transition hover:scale-105 hover:bg-cyan-50"
        onClick={() => onMonthChange(-1)}
        aria-label="Go to previous month"
      >
        ←
      </button>
      <h3 className="m-0 text-[clamp(1rem,2.2vw,1.2rem)] uppercase tracking-[0.06em] text-slate-900">
        {getMonthLabel(monthDate)}
      </h3>
      <button
        type="button"
        className="grid h-8 w-8 place-items-center rounded-full border border-slate-300 bg-white text-base text-slate-900 transition hover:scale-105 hover:bg-cyan-50"
        onClick={() => onMonthChange(1)}
        aria-label="Go to next month"
      >
        →
      </button>
    </div>
  );
}
