export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type CalendarDay = {
  date: Date;
  key: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
};

export type NoteScope = 'month' | 'selection';
