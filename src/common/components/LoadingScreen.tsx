'use client';

// import { Loader2 } from 'lucide-react';

type LoadingScreenProps = {
  message?: string;
  pendingCount?: number;
  // title?: string;
};

export default function LoadingScreen({
  message,
  pendingCount = 0,
  // title = 'Loading',
}: LoadingScreenProps) {
  const label = (message ?? '').trim() || 'Please wait...';

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center"
      role="dialog"
      aria-modal="true"
      // aria-label={title}
    >
      {/* === Background === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2">
          <div
            className="
              h-full w-full rounded-full
              [background:conic-gradient(from_0deg,_hsl(var(--primary)/.28),_hsl(var(--accent)/.22),_hsl(var(--secondary)/.20),_hsl(var(--primary)/.28))]
              blur-3xl opacity-80
              motion-safe:animate-[slowspin_45s_linear_infinite]
              motion-reduce:animate-none
              [mask-image:radial-gradient(closest-side,black_55%,transparent_80%)]
              will-change-transform
            "
          />
        </div>
        <div
          className={`absolute inset-0 backdrop-blur-sm ${
            pendingCount > 0
              ? 'bg-[hsl(var(--background)/0.05)]'
              : 'bg-[hsl(var(--background)/1)]'
          }`}
        />
      </div>

      {/* === Center content === */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        {/* <Loader2
          className="size-6 animate-spin text-[hsl(var(--foreground))] motion-reduce:animate-none"
          aria-hidden
        /> */}
        {/* 
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[hsl(var(--muted-foreground))]">
          {title}
        </span> */}

        <span
          className="max-w-[26rem] text-sm  text-[hsl(var(--foreground)/0.9)]"
          aria-live="polite"
          aria-atomic="true"
        >
          {label}
        </span>

        <div className="mt-2 h-1.5 w-56 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
          <div className="h-full w-1/3 rounded-full bg-[hsl(var(--primary))] motion-safe:animate-[progress_1.2s_ease-in-out_infinite] motion-reduce:animate-none will-change-transform" />
        </div>
        {pendingCount >= 1 && (
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            {pendingCount} tasks in progress
          </span>
        )}
      </div>

      <style jsx global>{`
        @keyframes slowspin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes progress {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(320%);
          }
        }
      `}</style>
    </div>
  );
}
