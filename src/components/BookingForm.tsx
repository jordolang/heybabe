"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { eventTypes, services, site } from "@/data/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";
type Errors = Partial<Record<string, string>>;

const FIELD =
  "w-full border-b bg-transparent py-3.5 text-ink placeholder:text-ink-faint/70 transition-colors duration-300 hairline focus:border-mauve focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow block">{label}</span>
      <div className="mt-1">{children}</div>
      {error && (
        <span role="alert" className="mt-2 block text-[0.8rem] text-mauve">
          {error}
        </span>
      )}
    </label>
  );
}

export default function BookingForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState("");

  // Deep links from the services cards land here with the format preselected.
  const initialType = useMemo(() => {
    const id = params.get("type");
    const match = services.find((s) => s.id === id);
    if (!match) return "";
    const label = eventTypes.find((t) =>
      t.toLowerCase().startsWith(match.kicker.toLowerCase().slice(0, 6)),
    );
    return label ?? "";
  }, [params]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 422) {
        const json = (await res.json()) as { errors: Errors };
        setErrors(json.errors ?? {});
        setStatus("error");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));

      const json = (await res.json()) as { delivered: boolean };
      if (json.delivered) {
        setStatus("sent");
        form.reset();
        return;
      }

      // No mail provider wired up yet — hand them a pre-filled draft rather
      // than claiming an enquiry was sent.
      const body = [
        `Name: ${data.name as string}`,
        `Email: ${data.email as string}`,
        data.phone && `Phone: ${data.phone as string}`,
        `Event type: ${data.eventType as string}`,
        data.date && `Date: ${data.date as string}`,
        data.guests && `Guests: ${data.guests as string}`,
        data.location && `Location: ${data.location as string}`,
        "",
        (data.message as string) || "",
      ]
        .filter(Boolean)
        .join("\n");
      setDraft(
        `mailto:${site.email}?subject=${encodeURIComponent(
          `New ${data.eventType as string} enquiry — ${data.name as string}`,
        )}&body=${encodeURIComponent(body)}`,
      );
      setStatus("fallback");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="border p-10 text-center hairline"
        role="status"
      >
        <p className="font-script text-[2.4rem] text-mauve">thank you, babe</p>
        <p className="mt-4 text-ink-soft">
          We have your details and we&rsquo;ll be back to you shortly &mdash;
          usually the same day.
        </p>
      </motion.div>
    );
  }

  if (status === "fallback") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="border p-10 text-center hairline"
        role="status"
      >
        <p className="font-script text-[2.2rem] text-mauve">nearly there</p>
        <p className="mx-auto mt-4 max-w-[42ch] text-ink-soft">
          Email delivery isn&rsquo;t connected on this site yet. Your details
          are ready to send &mdash; one tap opens them in your mail app.
        </p>
        <a
          href={draft}
          className="mt-8 inline-block rounded-full bg-ink px-9 py-4 text-[0.78rem] tracking-[0.18em] text-shell uppercase"
        >
          Open the email
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute h-0 w-0 opacity-0"
      />

      <Field label="Your name" error={errors.name}>
        <input name="name" required autoComplete="name" placeholder="Jane Doe" className={FIELD} />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          className={FIELD}
        />
      </Field>

      <Field label="Phone (optional)">
        <input name="phone" type="tel" autoComplete="tel" placeholder="(000) 000-0000" className={FIELD} />
      </Field>

      <Field label="Event type" error={errors.eventType}>
        <select
          name="eventType"
          required
          defaultValue={initialType}
          className={cn(FIELD, "appearance-none")}
        >
          <option value="" disabled>
            Choose one
          </option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Date (or roughly when)">
        <input name="date" type="text" placeholder="June 14, or 'late summer'" className={FIELD} />
      </Field>

      <Field label="Guest count">
        <input name="guests" type="text" inputMode="numeric" placeholder="25" className={FIELD} />
      </Field>

      <div className="sm:col-span-2">
        <Field label="Location">
          <input name="location" placeholder="Venue, neighbourhood or city" className={FIELD} />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <Field label="Anything else?" error={errors.message}>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about the event — vibe, timing, anything you're picturing."
            className={cn(FIELD, "resize-none")}
          />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative w-full overflow-hidden rounded-full bg-ink px-10 py-5 text-[0.78rem] tracking-[0.18em] text-shell uppercase disabled:opacity-60 sm:w-auto"
        >
          <span className="relative z-10">
            {status === "sending" ? "Sending…" : "Send enquiry"}
          </span>
          <span
            aria-hidden
            className="bg-babe absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-babe)] group-hover:translate-y-0"
          />
        </button>

        {status === "error" && !Object.keys(errors).length && (
          <p role="alert" className="mt-5 text-[0.9rem] text-mauve">
            Something went wrong sending that. Email us directly at{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
