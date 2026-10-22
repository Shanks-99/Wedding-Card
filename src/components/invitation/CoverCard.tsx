import { useEffect, useRef, useState } from "react";
import coverFull from "@/assets/cover-card.png";
import coverLeft from "@/assets/cover-left.png";
import coverRight from "@/assets/cover-right.png";

// The two halves slide off to their own sides revealing the full joined card,
// which then lifts gracefully into the invitation.
const SLIDE_MS = 1300;
const PAUSE_MS = 250;
const LIFT_MS = 950;

interface CoverCardProps {
  /** Fires as the full card begins lifting — reveal the invitation & start music. */
  onOpen: () => void;
  /** Fires once the cover has fully faded — safe to unmount the overlay. */
  onClosed: () => void;
}

export function CoverCard({ onOpen, onClosed }: CoverCardProps) {
  const [sliding, setSliding] = useState(false);
  const [lifting, setLifting] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const handleOpen = () => {
    if (sliding) return;
    setSliding(true);
    timers.current.push(
      window.setTimeout(() => {
        setLifting(true);
        onOpen();
      }, SLIDE_MS + PAUSE_MS),
    );
    timers.current.push(window.setTimeout(onClosed, SLIDE_MS + PAUSE_MS + LIFT_MS));
  };

  return (
    <div
      className={`cover-overlay ${sliding ? "cover-opening" : ""} ${lifting ? "cover-lifting" : ""}`}
      onClick={handleOpen}
      role="presentation"
    >
      <p
        className="font-sans text-[0.68rem] uppercase tracking-[0.45em] text-muted-foreground"
        style={{ opacity: sliding ? 0 : 1, transition: "opacity 0.4s ease" }}
      >
        You are cordially invited
      </p>

      <div className="cover-stage animate-float-soft">
        <img
          src={coverFull}
          alt="The wedding invitation card: Lt. Umer's Pakistan Navy uniform beside Dr. Momina's doctor's coat"
          className="cover-full"
          draggable={false}
        />
        <img src={coverLeft} alt="" aria-hidden className="cover-half cover-half-left" draggable={false} />
        <img src={coverRight} alt="" aria-hidden className="cover-half cover-half-right" draggable={false} />
      </div>

      <button type="button" className="seal-btn" onClick={handleOpen}>
        <span aria-hidden className="text-base leading-none">&#10084;</span>
        Tap to Open
      </button>
    </div>
  );
}
