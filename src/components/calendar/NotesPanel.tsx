import clsx from 'clsx';
import { DateRange, NoteScope } from '@/types/calendar';

type NotesPanelProps = {
  selectedRange: DateRange;
  noteScope: NoteScope;
  value: string;
  isReady: boolean;
  onScopeChange: (scope: NoteScope) => void;
  onChange: (value: string) => void;
};

const FULL_DATE = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function getRangeLabel(range: DateRange): string {
  if (!range.start && !range.end) {
    return 'Select dates in the grid to attach focused notes.';
  }

  if (range.start && !range.end) {
    return `Start selected: ${FULL_DATE.format(range.start)}. Pick an end date.`;
  }

  if (range.start && range.end) {
    return `Range: ${FULL_DATE.format(range.start)} to ${FULL_DATE.format(range.end)}.`;
  }

  return 'No range selected yet.';
}

export function NotesPanel({
  selectedRange,
  noteScope,
  value,
  isReady,
  onScopeChange,
  onChange,
}: NotesPanelProps) {
  const rangeLabel = getRangeLabel(selectedRange);

  return (
    <aside className="grid gap-3 border-t border-slate-200 pt-4 lg:h-fit lg:self-start lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
      <div>
        <h3 className="m-0 text-lg text-slate-900">Notes</h3>
        <p className="mt-1 text-sm text-slate-500">{rangeLabel}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={clsx(
            'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
            noteScope === 'month'
              ? 'border-cyan-600 bg-cyan-600 text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
          )}
          onClick={() => onScopeChange('month')}
        >
          Month Memo
        </button>
        <button
          type="button"
          className={clsx(
            'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
            noteScope === 'selection'
              ? 'border-cyan-600 bg-cyan-600 text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
          )}
          onClick={() => onScopeChange('selection')}
        >
          Selection Memo
        </button>
      </div>

      <label htmlFor="calendar-note" className="text-xs text-slate-600">
        {noteScope === 'month'
          ? 'General notes for this month'
          : 'Notes linked to the selected date range'}
      </label>

      <textarea
        id="calendar-note"
        className="min-h-[170px] w-full resize-y rounded-xl border border-slate-300 bg-white p-3 leading-relaxed text-slate-800 outline-none ring-cyan-300 transition focus:border-cyan-500 focus:ring-2"
        value={isReady ? value : ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write reminders, travel plans, sprint goals, or an event checklist..."
      />

      <div className="grid gap-2" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="block h-px bg-[linear-gradient(90deg,#cbd6e5_0%,transparent_100%)]"
          />
        ))}
      </div>
    </aside>
  );
}
