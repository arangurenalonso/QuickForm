import { heroStats } from '@/modules/lading/data/landing.data';

const HeroStats = () => {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {heroStats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border bg-card/70 p-4 shadow-sm"
        >
          <div className="text-2xl font-semibold tracking-tight text-foreground">
            {stat.value}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
