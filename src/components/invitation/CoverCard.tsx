import { useState } from "react";
import coverLeft from "@/assets/cover-left.png";
import coverRight from "@/assets/cover-right.png";

interface CoverCardProps {
  onOpen: () => void;
}

export function CoverCard({ onOpen }: CoverCardProps) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    // Let the parting animation breathe before the cover unmounts.
    window.setTimeout(onOpen, 1600);
  };

  return (
    <div
      className={`cover-overlay ${opening ? "cover-opening" : ""}`}
      onClick={handleOpen}
      role="presentation"
    >
      <p
        className="font-sans text-[0.68rem] uppercase tracking-[0.45em] text-muted-foreground"
        style={{ opacity: opening ? 0 : 1, transition: "opacity 0.4s ease" }}
      >
        You are cordially invited
      </p>

      <div className="cover-stage animate-float-soft">
        <img src={coverLeft} alt="Groom's Navy uniform half of the invitation card" className="cover-half" draggable={false} />
        <img src={coverRight} alt="Bride's doctor's coat half of the invitation card" className="cover-half" draggable={false} />
      </div>

      <button type="button" className="seal-btn" onClick={handleOpen}>
        <span aria-hidden className="text-base leading-none">&#10084;</span>
        Tap to Open
      </button>
    </div>
  );
}
