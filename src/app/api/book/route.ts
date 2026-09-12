import { NextResponse } from "next/server";
import { site } from "@/data/site";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const MAX = 4000;

/**
 * Booking enquiries.
 *
 * Delivery uses Resend when RESEND_API_KEY and BOOKING_TO are set. Until they
 * are, the route responds with `delivered: false` instead of pretending to
 * have sent anything — the form then hands the visitor a pre-filled mail
 * draft so an enquiry is never silently dropped on the floor.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (str(body.company)) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const eventType = str(body.eventType);
  const message = str(body.message);
  const phone = str(body.phone);
  const date = str(body.date);
  const guests = str(body.guests);
  const location = str(body.location);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please add your name.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = "Please add a valid email.";
  if (!eventType) errors.eventType = "Please pick an event type.";
  if (message.length > MAX) errors.message = "That message is a little too long.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    `Event type: ${eventType}`,
    date && `Date: ${date}`,
    guests && `Guests: ${guests}`,
    location && `Location: ${location}`,
    "",
    message || "(no message)",
  ].filter(Boolean);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO ?? site.email;
  const from = process.env.BOOKING_FROM;

  if (!apiKey || !from) {
    console.warn("[book] No mail provider configured; enquiry not delivered.", {
      name,
      email,
      eventType,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New ${eventType} enquiry — ${name}`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("[book] Provider rejected the message", await res.text());
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[book] Provider request failed", err);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
