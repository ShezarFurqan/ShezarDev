import { NextResponse } from "next/server";
import { LIMITS, PROJECT_TYPES } from "@/data/contact";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 1500; // a human can't fill the form faster than this
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Basic per-IP rate limit. It lives in server memory, so on serverless hosting each instance counts
// separately: good enough to stop casual abuse. For strict limits use a shared store (e.g. Upstash).
const hits = new Map();
function isLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return false;
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Strips control characters and trims; `single` also collapses line breaks (names, subjects).
function clean(value, max, single = false) {
  if (typeof value !== "string") return "";
  let v = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  if (single) v = v.replace(/[\r\n\t]+/g, " ");
  return v.trim().slice(0, max);
}

const ok = () => NextResponse.json({ ok: true });
const fail = (status, error, extra = {}) => NextResponse.json({ ok: false, error, ...extra }, { status });

function buildEmail({ name, email, projectType, message }) {
  const row = (label, value) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#111827">${value}</td></tr>`;
  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px">
  <h2 style="margin:0 0 16px;font-size:20px;color:#111827">New project enquiry</h2>
  <table style="border-collapse:collapse;font-size:15px">
    ${row("Name", escapeHtml(name))}
    ${row("Email", `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`)}
    ${row("Project type", escapeHtml(projectType))}
  </table>
  <div style="margin-top:20px;padding:16px;background:#f3f4f6;border-radius:8px;font-size:15px;line-height:1.6;color:#111827;white-space:pre-wrap">${escapeHtml(message)}</div>
  <p style="margin-top:20px;font-size:12px;color:#9ca3af">Sent from the contact form on Shezar.dev. Reply to this email to answer ${escapeHtml(name)} directly.</p>
</div>`;
  const text = `New project enquiry\n\nName: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}\n`;
  return { html, text };
}

export async function POST(request) {
  // Only accept requests coming from this site
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) return fail(403, "Request not allowed.");
    } catch {
      return fail(403, "Request not allowed.");
    }
  }

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (isLimited(ip)) return fail(429, "Too many messages in a short time. Please try again in a few minutes.");

  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return fail(413, "Your message is too long.");
    body = JSON.parse(raw);
  } catch {
    return fail(400, "Something was wrong with the request. Please try again.");
  }
  if (!body || typeof body !== "object") return fail(400, "Something was wrong with the request. Please try again.");

  // Spam traps: a filled honeypot or an impossibly fast submit gets a silent "success" and no email
  const elapsed = Date.now() - Number(body.ts);
  if ((typeof body.website === "string" && body.website.length > 0) || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    return ok();
  }

  const name = clean(body.name, LIMITS.name, true);
  const email = clean(body.email, LIMITS.email, true);
  const message = clean(body.message, LIMITS.message);
  const projectType = PROJECT_TYPES.includes(body.projectType) ? body.projectType : "Not specified";

  const errors = {};
  if (!name) errors.name = "Please tell me your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < LIMITS.minMessage) errors.message = "Please describe your project in a little more detail.";
  if (Object.keys(errors).length) return fail(400, "Please check the highlighted fields.", { errors });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("[contact] Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL.");
    return fail(500, "The message couldn't be sent right now. Please email me directly instead.");
  }

  try {
    const { html, text } = buildEmail({ name, email, projectType, message });
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `New project enquiry from ${name}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend rejected the request:", res.status, await res.text());
      return fail(502, "The message couldn't be sent right now. Please email me directly instead.");
    }
    return ok();
  } catch (err) {
    console.error("[contact] Send failed:", err);
    return fail(502, "The message couldn't be sent right now. Please email me directly instead.");
  }
}