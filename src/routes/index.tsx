import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CoverCard } from "@/components/invitation/CoverCard";
import { ScratchReveal } from "@/components/invitation/ScratchReveal";
import { Countdown } from "@/components/invitation/Countdown";
import { RsvpSection } from "@/components/invitation/RsvpSection";
import { eventDetails } from "@/components/invitation/event-details";
import backdrop from "@/assets/reveal-backdrop.jpg";
import musicAsset from "@/assets/wedding-piano.mp3.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lt. Bilal & Dr. Momina — Nikkah Invitation" },
      {
        name: "description",
        content:
          "Mr. & Mrs. Rana Muhammad Ahsan cordially invite you to the Nikkah ceremony of their beloved son Lt. Bilal with Dr. Momina.",
      },
      { property: "og:title", content: "Lt. Bilal & Dr. Momina — Nikkah Invitation" },
      {
        property: "og:description",
        content: "You are cordially invited to the Nikkah ceremony of Lt. Bilal & Dr. Momina.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lt. Bilal & Dr. Momina — Nikkah Invitation" },
      {
        name: "twitter:description",
        content: "You are cordially invited to the Nikkah ceremony of Lt. Bilal & Dr. Momina.",
      },
    ],
  }),
  component: Index,
});

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={`reveal px-6 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-xl text-center">{children}</div>
    </section>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-4xl sm:text-5xl text-foreground tracking-wide">{children}</h2>
  );
}

function HeartDivider() {
  return (
    <div className="mt-5 flex items-center justify-center gap-3 text-gold" aria-hidden>
      <span className="gold-rule w-16" />
      <span className="text-lg animate-heartbeat">&#10084;</span>
      <span className="gold-rule w-16" />
    </div>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    audioRef.current?.play().catch(() => {
      /* autoplay can be blocked; the guest can use the music button */
    });
  };

  return (
    <div className="relative min-h-screen">
      <audio ref={audioRef} src={musicAsset.url} loop preload="auto" />

      {!opened && <CoverCard onOpen={handleOpen} />}

      {opened && (
        <button
          type="button"
          aria-label={muted ? "Unmute music" : "Mute music"}
          onClick={() => {
            if (audioRef.current) audioRef.current.muted = !muted;
            setMuted((m) => !m);
          }}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-card/90 text-lg text-gold-deep shadow-lg backdrop-blur transition hover:scale-105"
        >
          {muted ? "🔇" : "🎵"}
        </button>
      )}

      <main aria-hidden={!opened}>
        {/* ---------- Reveal / main invitation ---------- */}
        <section
          className="relative overflow-hidden bg-cover bg-center px-6 pt-20 pb-16 sm:pt-24"
          style={{ backgroundImage: `url(${backdrop})` }}
        >
          <div className="mx-auto max-w-xl text-center">
            <p className="font-sans text-[0.68rem] uppercase tracking-[0.45em] text-muted-foreground">
              Bismillah &amp; with the blessings of Allah
            </p>
            <p className="mt-6 font-serif text-xl text-muted-foreground">We're getting married</p>
            <HeartDivider />

            <h1 className="mt-8 font-script text-6xl sm:text-7xl text-foreground leading-tight">
              {eventDetails.groom.name}
            </h1>
            <p className="mt-3 font-serif text-base text-muted-foreground leading-relaxed">
              Beloved son of {eventDetails.groom.parents}
              <br />
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-gold-deep">
                {eventDetails.groom.credential}
              </span>
            </p>

            <p className="my-6 font-display text-4xl text-gold-deep" aria-hidden>
              &amp;
            </p>

            <h1 className="font-script text-6xl sm:text-7xl text-foreground leading-tight">
              {eventDetails.bride.name}
            </h1>
            <p className="mt-3 font-serif text-base text-muted-foreground leading-relaxed">
              Beloved daughter of {eventDetails.bride.parents}
              <br />
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-gold-deep">
                {eventDetails.bride.credential}
              </span>
            </p>

            <div className="mt-10">
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.4em] text-muted-foreground">
                Nikkah Ceremony
              </p>
              <p className="mt-3 font-serif text-2xl text-foreground">{eventDetails.dateLabel}</p>
              <p className="font-serif text-lg text-muted-foreground">{eventDetails.timeLabel}</p>
            </div>
          </div>
        </section>

        {/* ---------- Save the date ---------- */}
        <Section>
          <SectionTitle>Our forever begins</SectionTitle>
          <HeartDivider />
          <div className="card-paper mx-auto mt-10 max-w-sm rounded-2xl px-8 py-10">
            <p className="font-sans text-[0.68rem] uppercase tracking-[0.4em] text-muted-foreground">
              You're invited
            </p>
            <p className="mt-4 font-display text-3xl text-foreground">{eventDetails.dateLabel}</p>
            <p className="mt-2 font-serif text-xl text-muted-foreground">
              {eventDetails.timeLabel} · {eventDetails.venueName}
            </p>
            <a
              href={eventDetails.calendarLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-sans text-xs uppercase tracking-[0.3em] text-primary-foreground transition hover:opacity-90"
            >
              Save the date
            </a>
          </div>
        </Section>

        {/* ---------- Scratch to reveal ---------- */}
        <Section>
          <SectionTitle>Scratch to Reveal</SectionTitle>
          <HeartDivider />
          <div className="mt-10">
            <ScratchReveal />
          </div>
        </Section>

        {/* ---------- Countdown ---------- */}
        <Section>
          <SectionTitle>Counting Down to Forever</SectionTitle>
          <HeartDivider />
          <div className="mt-10">
            <Countdown />
          </div>
        </Section>

        {/* ---------- Program timeline ---------- */}
        <Section>
          <SectionTitle>Program Timeline</SectionTitle>
          <HeartDivider />
          <ol className="relative mx-auto mt-10 max-w-sm text-left">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gold/40" aria-hidden />
            {eventDetails.timeline.map((item, i) => (
              <li key={item.time} className={`relative pl-10 pb-9 ${i === eventDetails.timeline.length - 1 ? "pb-0" : ""}`}>
                <span
                  className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-gold bg-card"
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-deep">{item.time}</p>
                <p className="mt-1 font-serif text-2xl text-foreground">{item.title}</p>
                <p className="mt-0.5 font-serif text-base text-muted-foreground">{item.note}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ---------- Venue ---------- */}
        <Section>
          <SectionTitle>Venue</SectionTitle>
          <HeartDivider />
          <p className="mt-8 font-serif text-3xl text-foreground">{eventDetails.venueName}</p>
          <p className="mt-1 font-serif text-lg text-muted-foreground">{eventDetails.venueAddress}</p>
          <a
            href={eventDetails.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.3em] text-gold-deep underline-offset-4 hover:underline"
          >
            Open in Maps ↗
          </a>
          <div className="card-paper mt-8 overflow-hidden rounded-2xl">
            <iframe
              title="Venue map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(eventDetails.mapsQuery)}&z=13&output=embed`}
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
        </Section>

        {/* ---------- RSVP ---------- */}
        <Section>
          <SectionTitle>RSVP</SectionTitle>
          <HeartDivider />
          <div className="mt-10">
            <RsvpSection />
          </div>
        </Section>

        {/* ---------- Footer ---------- */}
        <footer className="px-6 pb-14 pt-6 text-center">
          <div className="gold-rule mx-auto max-w-xs" />
          <p className="mt-8 font-script text-5xl text-foreground">
            B<span className="mx-2 text-2xl text-gold">&#10084;</span>M
          </p>
          <p className="mt-6 font-sans text-[0.68rem] uppercase tracking-[0.4em] text-muted-foreground">
            With prayers and love
          </p>
          <p className="mt-3 font-serif text-base text-muted-foreground">
            The {eventDetails.groom.parents.split(" ")[0]} family looks forward to celebrating with you
          </p>
        </footer>
      </main>
    </div>
  );
}
