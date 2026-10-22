import { useEffect, useRef, useState } from "react";

const CANVAS_SIZE = 300;
const BRUSH_RADIUS = 24;

/** Scratch-off gold foil card that uncovers the message underneath. */
export function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    ctx.scale(dpr, dpr);

    // Gold glitter foil
    const foil = ctx.createLinearGradient(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    foil.addColorStop(0, "#b98a2f");
    foil.addColorStop(0.35, "#e9c877");
    foil.addColorStop(0.5, "#c89b3c");
    foil.addColorStop(0.7, "#f0d895");
    foil.addColorStop(1, "#a97e26");
    ctx.fillStyle = foil;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Glitter speckles
    ctx.globalAlpha = 0.35;
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "#fff3d1" : "#8a6414";
      const r = Math.random() * 1.6 + 0.4;
      ctx.beginPath();
      ctx.arc(Math.random() * CANVAS_SIZE, Math.random() * CANVAS_SIZE, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = "rgba(74, 52, 8, 0.85)";
    ctx.font = "500 15px Jost, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH HERE", CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 10);
    ctx.font = "400 12px Jost, sans-serif";
    ctx.fillText("a message awaits", CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 14);
  }, []);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * CANVAS_SIZE;
    const y = ((clientY - rect.top) / rect.height) * CANVAS_SIZE;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    const total = canvas.width * canvas.height;
    for (let i = 3; i < data.length; i += 4 * 8) {
      if (data[i] === 0) clear++;
    }
    const sampled = total / 8;
    if (clear / sampled > 0.5) setCleared(true);
  };

  return (
    <div className="relative mx-auto" style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
      {/* Message underneath */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center rounded-full px-6 text-center transition-opacity duration-700"
        style={{ opacity: cleared ? 1 : 0 }}
      >
        <p className="font-script text-4xl text-gold-deep leading-snug">Forever begins</p>
        <p className="font-serif text-lg text-foreground/80 mt-3 leading-relaxed">
          with Bismillah — <br />
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Umer &amp; Momina
          </span>
        </p>
      </div>

      {/* Foil layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none rounded-full cursor-pointer transition-opacity duration-700"
        style={{
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          opacity: cleared ? 0 : 1,
          pointerEvents: cleared ? "none" : "auto",
        }}
        onPointerDown={(e) => {
          drawing.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          scratchAt(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          scratchAt(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          drawing.current = false;
          checkProgress();
        }}
      />
    </div>
  );
}
