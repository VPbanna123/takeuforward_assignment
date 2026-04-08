import { CalendarDay, DateRange } from '@/types/calendar';

const MONDAY_INDEX = 1;

export const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const MONTH_HEADER_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

export function normalizeDate(date: Date): Date {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

export function isSameDay(first: Date, second: Date): boolean {
  return normalizeDate(first).getTime() === normalizeDate(second).getTime();
}

export function isBetween(date: Date, start: Date, end: Date): boolean {
  const current = normalizeDate(date).getTime();
  const startValue = normalizeDate(start).getTime();
  const endValue = normalizeDate(end).getTime();
  return current > startValue && current < endValue;
}

export function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function getSelectionKey(range: DateRange): string {
  if (!range.start) {
    return 'none';
  }

  const start = normalizeDate(range.start).toISOString().slice(0, 10);
  const end = range.end
    ? normalizeDate(range.end).toISOString().slice(0, 10)
    : 'open';

  return `${start}_${end}`;
}

export function getMonthLabel(date: Date): string {
  return MONTH_HEADER_FORMATTER.format(date);
}

function getOffsetFromMonday(day: number): number {
  return (day - MONDAY_INDEX + 7) % 7;
}

export function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

export function buildCalendarDays(monthDate: Date): CalendarDay[] {
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const startOffset = getOffsetFromMonday(monthStart.getDay());
  const daysInMonth = monthEnd.getDate();
  const totalCells = 42;
  const days: CalendarDay[] = [];
  const now = normalizeDate(new Date());

  for (let index = 0; index < totalCells; index += 1) {
    const dayNumber = index - startOffset + 1;
    const cellDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), dayNumber);

    days.push({
      date: cellDate,
      key: normalizeDate(cellDate).toISOString(),
      isCurrentMonth: dayNumber >= 1 && dayNumber <= daysInMonth,
      isToday: normalizeDate(cellDate).getTime() === now.getTime(),
      isWeekend: [0, 6].includes(cellDate.getDay()),
    });
  }

  return days;
}
