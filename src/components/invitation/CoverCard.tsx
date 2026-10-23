import { useState } from "react";
import coverLeft from "@/assets/cover-left.png";
import coverRight from "@/assets/cover-right.png";
import anchorSeal from "@/assets/anchor-seal.png";

interface CoverCardProps {
  onOpen: () => void;
}

export function CoverCard({ onOpen }: CoverCardProps) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    // Let the 3D dual swing-doors swing fully open before unmounting
    window.setTimeout(onOpen, 1500);
  };

  return (
    <div
      className={`cover-overlay ${opening ? "cover-opening" : ""}`}
      role="presentation"
    >


      {/* Mobile-width container with CSS 3D perspective: 1200px */}
      <div className="card-3d-perspective animate-float-soft">
        <div className={`card-3d-doors ${opening ? "card-doors-open" : ""}`}>
          {/* Interior invitation card revealed when doors part */}
          <div className="card-interior" aria-hidden={!opening}>
            <div className="card-interior-content">
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-gold-deep">
                Bismillah
              </p>
              <h3 className="font-script text-3xl sm:text-4xl text-foreground mt-2 leading-tight">
                Wedding Celebration
              </h3>
              <div className="w-12 h-[1px] bg-gold/50 my-2 mx-auto" />
              <p className="font-serif text-lg text-gold-deep font-medium">
                Lt. Umer &amp; Dr. Zunaira
              </p>
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                Tap to enter our journey
              </p>
            </div>
          </div>

          {/* Left Door (50% width, transform-origin: left center, rotateY(-110deg)) */}
          <div className="door-flap door-flap-left">
            <img
              src={coverLeft}
              alt="Groom's Navy uniform half of the invitation card"
              className="door-img"
              draggable={false}
            />
            <div className="door-shadow door-shadow-left" />
          </div>

          {/* Right Door (50% width, transform-origin: right center, rotateY(110deg)) */}
          <div className="door-flap door-flap-right">
            <img
              src={coverRight}
              alt="Bride's doctor's coat half of the invitation card"
              className="door-img"
              draggable={false}
            />
            <div className="door-shadow door-shadow-right" />
          </div>

          {/* Luxury Gold Coin Medallion: Tap to Open with animations */}
          <button
            type="button"
            className={`coin-seal-btn ${opening ? "coin-seal-opening" : ""}`}
            onClick={handleOpen}
            aria-label="Tap to open invitation"
          >
            <div className="coin-glow-pulse" />
            <div className="coin-container">
              <img
                src={anchorSeal}
                alt="Gold Anchor Seal — Tap to Open"
                className="coin-img"
                draggable={false}
              />
              <div className="coin-glint" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
