"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useKit } from "./MotionKit";
import { CONTACT, LIMITS, PROJECT_TYPES } from "@/data/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GENERIC_ERROR = "The message couldn't be sent. Please try again, or email me directly.";

// Underline-style fields: quiet at rest, a clear violet line on focus.
// (No display class here, so the dropdown trigger can be a flex row without a clash.)
const FIELD =
  "outfit mt-1 w-full rounded-none border-0 border-b border-white/20 bg-transparent px-0 py-3 text-lg text-white placeholder:text-gray-600 transition-[border-color,box-shadow] duration-300 focus:border-violet-400 focus:shadow-[0_1px_0_0_#a78bfa] focus:outline-none aria-[invalid=true]:border-red-400";
const INPUT = `block ${FIELD}`;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please tell me your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn't look right. Check it and try again.";
  if (v.message.trim().length < LIMITS.minMessage)
    e.message = `Please write at least ${LIMITS.minMessage} characters so I can understand your project.`;
  return e;
}

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="outfit text-sm font-medium text-gray-400">
        {label}
        {required && <span aria-hidden="true" className="text-violet-400"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="outfit mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

// Custom dropdown in the site's style (a native <select> list can't be styled).
// Follows the ARIA "select-only combobox" pattern: focus stays on the button, arrow keys move the highlight.
function ProjectSelect({ id }) {
  const { reduce } = useKit();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef(null);
  const btn = useRef(null);
  const n = PROJECT_TYPES.length;

  // Close when clicking or tapping outside
  useEffect(() => {
    if (!open) return;
    const away = (e) => {
      if (!wrap.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, PROJECT_TYPES.indexOf(value)));
    setOpen(true);
  };
  const choose = (i) => {
    setValue(PROJECT_TYPES[i]);
    setOpen(false);
    btn.current?.focus();
  };

  function onKeyDown(e) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => (i + 1) % n);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => (i - 1 + n) % n);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(n - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={wrap} className="relative">
      <span id={`${id}-label`} className="outfit block text-sm font-medium text-gray-400">
        What do you need?
      </span>
      <input type="hidden" name="projectType" value={value} />
      <button
        ref={btn}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${FIELD} flex items-center justify-between gap-3 text-left focus-visible:border-violet-400 focus-visible:shadow-[0_1px_0_0_#a78bfa] ${
          open ? "!border-violet-400 shadow-[0_1px_0_0_#a78bfa]" : ""
        }`}
      >
        <span id={`${id}-value`} className={value ? "text-white" : "text-gray-600"}>
          {value || "Choose a project type"}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-4 w-4 shrink-0 text-violet-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={`${id}-list`}
            role="listbox"
            aria-labelledby={`${id}-label`}
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#07072b]/95 p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md"
          >
            {PROJECT_TYPES.map((t, i) => {
              const selected = t === value;
              return (
                <li
                  key={t}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()} // keep focus on the button
                  onClick={() => choose(i)}
                  className={`outfit flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 text-base transition-colors duration-150 ${
                    active === i ? "bg-violet-600/20 text-white" : "text-gray-300"
                  } ${selected ? "font-semibold text-violet-300" : ""}`}
                >
                  {t}
                  {selected && (
                    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const { item, stagger } = useKit();
  const formRef = useRef(null);
  const startedAt = useRef(Date.now()); // lets the server spot instant bot submissions
  const [formKey, setFormKey] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }

    setStatus("loading");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ts: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
        return;
      }
      if (json.errors) setErrors(json.errors);
      setServerMsg(json.error || GENERIC_ERROR);
      setStatus("error");
    } catch {
      setServerMsg(GENERIC_ERROR);
      setStatus("error");
    }
  }

  function reset() {
    setErrors({});
    setServerMsg("");
    setStatus("idle");
    setFormKey((k) => k + 1);
    startedAt.current = Date.now();
  }

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border border-violet-500/30 bg-violet-600/[0.06] p-8 md:p-10"
      >
        <h3 className="space-grotesk text-3xl font-bold md:text-4xl">Message sent.</h3>
        <p className="outfit mt-4 max-w-md text-lg text-gray-300">
          Thank you. I&apos;ll read it and reply to the email address you gave.
        </p>
        <button
          type="button"
          onClick={reset}
          className="outfit mt-8 min-h-12 rounded-full border border-[#3d0eb2] px-7 text-base font-semibold transition-colors duration-300 hover:bg-[#3d0eb2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  const loading = status === "loading";
  const describe = (id) => (errors[id] ? `contact-${id}-error` : undefined);

  return (
    <motion.form
      key={formKey}
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-label="Contact form"
      variants={stagger(0.09)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className="space-y-7"
    >
      {/* Honeypot: invisible to people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <motion.div variants={item}>
        <Field id="contact-name" label="Your name" required error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            placeholder="Your name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            className={INPUT}
          />
        </Field>
      </motion.div>

      <motion.div variants={item}>
        <Field id="contact-email" label="Email address" required error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            placeholder="you@company.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className={INPUT}
          />
        </Field>
      </motion.div>

      <motion.div variants={item}>
        <ProjectSelect id="contact-type" />
      </motion.div>

      <motion.div variants={item}>
        <Field id="contact-message" label="Tell me about your project" required error={errors.message}>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            maxLength={LIMITS.message}
            placeholder="What are you building, who is it for, and what should it do?"
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={describe("message")}
            className={`${INPUT} resize-y`}
          />
        </Field>
      </motion.div>

      <motion.div variants={item} className="pt-2">
        {status === "error" && (
          <p role="alert" className="outfit mb-5 rounded-2xl border border-red-400/30 bg-red-500/[0.07] p-4 text-base text-red-200">
            {serverMsg}{" "}
            <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 hover:text-white">
              {CONTACT.email}
            </a>
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="outfit inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#3d0eb2] px-8 text-base font-semibold transition-colors duration-300 hover:bg-violet-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {loading ? (
            <>
              <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Sending…
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </motion.div>
    </motion.form>
  );
}