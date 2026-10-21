import { useEffect, useState } from "react";
import { eventDetails } from "./event-details";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeRemaining(): Remaining {
  const diff = Math.max(0, new Date(eventDetails.dateIso).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

export function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(computeRemaining());
    const id = window.setInterval(() => setRemaining(computeRemaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units: Array<[string, number | undefined]> = [
    ["Days", remaining?.days],
    ["Hours", remaining?.hours],
    ["Minutes", remaining?.minutes],
    ["Seconds", remaining?.seconds],
  ];

  return (
    <div className="flex items-stretch justify-center gap-3 sm:gap-5">
      {units.map(([label, value]) => (
        <div key={label} className="card-paper rounded-xl px-4 py-5 sm:px-6 text-center min-w-[4.2rem] sm:min-w-[5.2rem]">
          <div className="font-display text-3xl sm:text-4xl text-foreground tabular-nums">
            {value === undefined ? "—" : String(value).padStart(2, "0")}
          </div>
          <div className="mt-2 font-sans text-[0.6rem] uppercase tracking-[0.28em] text-gold-deep">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
