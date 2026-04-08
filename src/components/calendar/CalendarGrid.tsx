import clsx from 'clsx';
import { getHolidayLabel } from '@/lib/holidays';
import { WEEKDAY_LABELS, isBetween, isSameDay } from '@/lib/date';
import { CalendarDay, DateRange } from '@/types/calendar';

type CalendarGridProps = {
  days: CalendarDay[];
  selectedRange: DateRange;
  onSelectDay: (date: Date) => void;
  onMonthEdgeClick: (date: Date) => void;
};

export function CalendarGrid({
  days,
  selectedRange,
  onSelectDay,
  onMonthEdgeClick,
}: CalendarGridProps) {
  const start = selectedRange.start;
  const end = selectedRange.end;

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-7">
        {WEEKDAY_LABELS.map((label) => (
          <span
            key={label}
            className="py-1 text-center text-[0.7rem] font-bold uppercase tracking-[0.08em] text-slate-500"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isStart = start ? isSameDay(day.date, start) : false;
          const isEnd = end ? isSameDay(day.date, end) : false;
          const isInRange = start && end ? isBetween(day.date, start, end) : false;
          const holiday = getHolidayLabel(day.date);

          return (
            <button
              key={day.key}
              type="button"
              className={clsx(
                'group relative grid min-h-10 place-items-center rounded-[10px] border border-transparent text-slate-800 transition duration-150 hover:border-cyan-300 hover:bg-cyan-50 sm:min-h-[2.65rem]',
                {
                  'text-slate-400': !day.isCurrentMonth,
                  'border-indigo-300': day.isToday,
                  'text-sky-600': day.isWeekend,
                  'border-cyan-600 bg-cyan-600 text-white hover:border-cyan-600 hover:bg-cyan-600':
                    isStart || isEnd,
                  'border-cyan-100 bg-cyan-100 text-slate-900': isInRange,
                },
              )}
              onClick={() => {
                if (!day.isCurrentMonth) {
                  onMonthEdgeClick(day.date);
                }
                onSelectDay(day.date);
              }}
              aria-label={day.date.toDateString()}
              aria-pressed={isStart || isEnd || isInRange}
            >
              <span className="font-semibold">{day.date.getDate()}</span>
              {holiday && (
                <span
                  className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-orange-500"
                  title={holiday}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
