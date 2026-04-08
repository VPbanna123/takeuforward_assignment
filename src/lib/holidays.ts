export type HolidayMarker = {
  label: string;
  month: number;
  day: number;
};

export const HOLIDAY_MARKERS: HolidayMarker[] = [
  { label: 'New Year', month: 0, day: 1 },
  { label: 'Valentine', month: 1, day: 14 },
  { label: 'Earth Day', month: 3, day: 22 },
  { label: 'Independence Day', month: 6, day: 4 },
  { label: 'Halloween', month: 9, day: 31 },
  { label: 'Christmas', month: 11, day: 25 },
];

export function getHolidayLabel(date: Date): string | null {
  const marker = HOLIDAY_MARKERS.find(
    (item) => item.month === date.getMonth() && item.day === date.getDate(),
  );

  return marker?.label ?? null;
}
