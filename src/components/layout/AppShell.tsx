import { WallCalendar } from '@/components/calendar/WallCalendar';

export function AppShell() {
  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.7),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(0,121,191,0.2),transparent_35%),linear-gradient(180deg,#f8f9fc_0%,#eceff5_100%)] p-3 sm:p-6">
      <section className="mx-auto grid w-full max-w-7xl gap-6">
        <header className="grid gap-2 text-slate-800">
          <h1 className="m-0 text-[clamp(1.45rem,2.2vw,2.2rem)] leading-tight">
            Interactive Wall Calendar
          </h1>
          <p className="m-0 max-w-3xl text-slate-600">
            Select a date range, add focused notes, and explore a responsive wall-calendar
            experience.
          </p>
        </header>

        <WallCalendar />
      </section>
    </main>
  );
}
