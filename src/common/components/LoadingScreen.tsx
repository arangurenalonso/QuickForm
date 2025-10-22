'use client';

import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center">
      {/* === Fondo rotatorio usando tus variables HSL === */}
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
              [mask-image:radial-gradient(closest-side,black_55%,transparent_80%)]
              will-change-transform
            "
          />
        </div>

        {/* Velo para contraste según tu background + blur */}
        <div className="absolute inset-0 bg-[hsl(var(--background)/0.72)] backdrop-blur-sm" />
      </div>

      {/* === Contenido centrado === */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <Loader2
          className="size-6 animate-spin text-[hsl(var(--foreground))] motion-reduce:animate-none"
          aria-hidden
        />
        <span className="text-sm font-semibold tracking-wide uppercase text-[hsl(var(--muted-foreground))]">
          Loading
        </span>

        {/* Barra indeterminada usando primary */}
        <div className="mt-2 h-1.5 w-56 overflow-hidden rounded-full bg-[hsl(var(--muted))]">
          <div className="h-full w-1/3 rounded-full bg-[hsl(var(--primary))] motion-safe:animate-[progress_1.2s_ease-in-out_infinite] will-change-transform" />
        </div>
      </div>

      {/* Keyframes */}
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
