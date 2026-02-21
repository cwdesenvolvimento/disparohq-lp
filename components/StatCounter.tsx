"use client";

type StatCounterProps = {
  label: string;
};

export default function StatCounter({ label }: StatCounterProps) {
  return (
    <div className="grid gap-2">
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}