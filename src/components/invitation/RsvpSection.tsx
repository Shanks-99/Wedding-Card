import { useState } from "react";

type Attending = "yes" | "no" | "";

export function RsvpSection() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please tell us your name.");
      return;
    }
    if (!attending) {
      setError("Please let us know if you can join us.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card-paper rounded-2xl px-8 py-12 text-center">
        <div className="text-4xl text-gold" aria-hidden>&#10084;</div>
        <p className="mt-4 font-script text-4xl text-foreground">Thank you, {name.trim()}!</p>
        <p className="mt-3 font-serif text-lg text-muted-foreground">
          {attending === "yes"
            ? "Your presence will make our day complete. We can't wait to celebrate with you."
            : "We will miss you — your prayers and good wishes mean the world to us."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-paper rounded-2xl px-6 py-8 sm:px-10 sm:py-10 text-left">
      <label className="block">
        <span className="font-sans text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">Your Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          placeholder="Your full name"
          className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 font-serif text-lg outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
        />
      </label>

      <fieldset className="mt-6">
        <legend className="font-sans text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">
          Will you be attending?
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {(
            [
              ["yes", "Joyfully, yes"],
              ["no", "Sadly, no"],
            ] as Array<[Attending, string]>
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setAttending(value)}
              className={`rounded-lg border px-4 py-3 font-sans text-sm tracking-wide transition ${
                attending === value
                  ? "border-gold bg-gold/15 text-foreground"
                  : "border-input bg-background text-muted-foreground hover:border-gold/60"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="font-sans text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">
          A note for the couple <span className="normal-case tracking-normal">(optional)</span>
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder="Your prayers & wishes…"
          className="mt-2 w-full resize-none rounded-lg border border-input bg-background px-4 py-3 font-serif text-lg outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40"
        />
      </label>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-primary px-6 py-3.5 font-sans text-sm uppercase tracking-[0.3em] text-primary-foreground transition hover:opacity-90 active:scale-[0.99]"
      >
        Send Wishes
      </button>
    </form>
  );
}
