'use client';

import { useMemo, useState } from 'react';
import { CalendarGrid } from './CalendarGrid';
import { HeroPanel } from './HeroPanel';
import { MonthNavigator } from './MonthNavigator';
import { NotesPanel } from './NotesPanel';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { addMonths, buildCalendarDays, getMonthKey, getSelectionKey, normalizeDate } from '@/lib/date';
import { DateRange, NoteScope } from '@/types/calendar';

const MONTH_NOTE_STORAGE_KEY = 'wall-calendar:month-notes';
const SELECTION_NOTE_STORAGE_KEY = 'wall-calendar:selection-notes';

export function WallCalendar() {
  const [activeMonth, setActiveMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [noteScope, setNoteScope] = useState<NoteScope>('month');

  const [monthNotes, setMonthNotes, monthHydrated] = useLocalStorage<Record<string, string>>(
    MONTH_NOTE_STORAGE_KEY,
    {},
  );
  const [selectionNotes, setSelectionNotes, selectionHydrated] = useLocalStorage<
    Record<string, string>
  >(SELECTION_NOTE_STORAGE_KEY, {});

  const days = useMemo(() => buildCalendarDays(activeMonth), [activeMonth]);
  const monthKey = getMonthKey(activeMonth);
  const selectionKey = `${monthKey}:${getSelectionKey(selectedRange)}`;

  const notesValue =
    noteScope === 'month'
      ? monthNotes[monthKey] ?? ''
      : selectionNotes[selectionKey] ?? '';

  const onDaySelect = (value: Date) => {
    const clicked = normalizeDate(value);

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: clicked, end: null });
      return;
    }

    const start = normalizeDate(selectedRange.start);

    if (clicked.getTime() < start.getTime()) {
      setSelectedRange({ start: clicked, end: null });
      return;
    }

    setSelectedRange({ start, end: clicked });
  };

  const onMonthChange = (delta: number) => {
    setActiveMonth((current) => addMonths(current, delta));
  };

  const onNoteChange = (nextValue: string) => {
    if (noteScope === 'month') {
      setMonthNotes((previous) => ({
        ...previous,
        [monthKey]: nextValue,
      }));
      return;
    }

    setSelectionNotes((previous) => ({
      ...previous,
      [selectionKey]: nextValue,
    }));
  };

  return (
    <article className="relative overflow-hidden rounded-2xl bg-[#fcfdff] shadow-paper">
      <div className="calendar-rings pointer-events-none absolute left-0 right-0 top-2 z-10 h-5 opacity-60" aria-hidden="true" />

      <HeroPanel monthDate={activeMonth} />

      <div className="grid gap-5 p-3 sm:p-4 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-6">
        <section className="grid gap-3 lg:self-start">
          <MonthNavigator monthDate={activeMonth} onMonthChange={onMonthChange} />
          <CalendarGrid
            days={days}
            selectedRange={selectedRange}
            onSelectDay={onDaySelect}
            onMonthEdgeClick={(date) =>
              setActiveMonth(new Date(date.getFullYear(), date.getMonth(), 1))
            }
          />
        </section>

        <NotesPanel
          selectedRange={selectedRange}
          noteScope={noteScope}
          onScopeChange={setNoteScope}
          value={notesValue}
          onChange={onNoteChange}
          isReady={monthHydrated && selectionHydrated}
        />
      </div>
    </article>
  );
}
