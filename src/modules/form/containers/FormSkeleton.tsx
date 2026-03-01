'use client';

export default function FormSubmissionSkeleton() {
  return (
    <div className="animate-pulse w-full">
      {/* Title */}
      <div className="h-7 w-2/3 rounded-lg bg-slate-200/60" />

      {/* Description lines */}
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded bg-slate-200/50" />
        <div className="h-4 w-5/6 rounded bg-slate-200/50" />
      </div>

      {/* Fake fields */}
      <div className="mt-6 space-y-4">
        <div className="h-10 w-full rounded-xl bg-slate-200/55" />
        <div className="h-10 w-full rounded-xl bg-slate-200/55" />
        <div className="h-10 w-full rounded-xl bg-slate-200/55" />
        <div className="h-24 w-full rounded-xl bg-slate-200/55" />
      </div>

      {/* Button */}
      <div className="mt-6 flex justify-end gap-3">
        <div className="h-10 w-32 rounded-xl bg-slate-200/60" />
      </div>
    </div>
  );
}
