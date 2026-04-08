import Image from 'next/image';
import { getMonthLabel } from '@/lib/date';

type HeroPanelProps = {
  monthDate: Date;
};

export function HeroPanel({ monthDate }: HeroPanelProps) {
  const [monthName, year] = getMonthLabel(monthDate).split(' ');

  return (
    <header className="relative min-h-[clamp(220px,42vw,360px)] overflow-hidden">
      <Image
        src="/images/calendar-hero.svg"
        alt="Mountain-themed wall calendar artwork"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 70vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,151,207,0.58)_0%,rgba(13,151,207,0.16)_20%,transparent_55%),linear-gradient(140deg,transparent_52%,rgba(13,151,207,0.88)_52%)]" />

      <div className="absolute bottom-[clamp(1.2rem,4vw,2.5rem)] right-[clamp(0.8rem,4vw,2.4rem)] z-10 text-right text-white">
        <p className="m-0 text-sm font-medium tracking-[0.08em]">{year}</p>
        <h2 className="m-0 text-[clamp(1.5rem,3vw,2.2rem)] tracking-[0.1em]">{monthName.toUpperCase()}</h2>
      </div>

      <div className="hero-cut absolute -bottom-12 -left-[8%] -right-[8%] h-[130px] bg-[#fcfdff]" />
    </header>
  );
}
