"use client";

import { useState } from "react";
import { RiSendPlaneLine, RiCheckLine, RiErrorWarningLine } from "react-icons/ri";

interface ContactFormProps {
  labels: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    placeholder_name: string;
    placeholder_email: string;
    placeholder_message: string;
  };
  recipientEmail: string;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm({ labels, recipientEmail }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Valid email required";
    if (!form.subject.trim()) next.subject = "Required";
    if (form.message.trim().length < 10) next.message = "Please write at least 10 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const body = encodeURIComponent(
      `From: ${form.name} <${form.email}>\n\n${form.message}`
    );
    const subject = encodeURIComponent(form.subject);
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3.5 bg-[var(--muted)] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all text-sm ${
      errors[field]
        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
        : "border-[var(--border)] hover:border-[var(--primary)]/30"
    }`;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-5">
          <RiCheckLine size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Email client opened!</h3>
        <p className="text-[var(--secondary)] text-sm max-w-xs">
          Your message has been prepared in your email client. Just hit send and I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
          className="mt-6 text-sm text-[var(--primary)] underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--secondary)] mb-1.5">
            {labels.name}
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => { setForm(p => ({ ...p, name: e.target.value })); if (errors.name) setErrors(p => ({ ...p, name: undefined })); }}
            placeholder={labels.placeholder_name}
            className={inputClass("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><RiErrorWarningLine size={12} />{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--secondary)] mb-1.5">
            {labels.email}
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => { setForm(p => ({ ...p, email: e.target.value })); if (errors.email) setErrors(p => ({ ...p, email: undefined })); }}
            placeholder={labels.placeholder_email}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><RiErrorWarningLine size={12} />{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--secondary)] mb-1.5">
          {labels.subject}
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={e => { setForm(p => ({ ...p, subject: e.target.value })); if (errors.subject) setErrors(p => ({ ...p, subject: undefined })); }}
          placeholder={labels.subject}
          className={inputClass("subject")}
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><RiErrorWarningLine size={12} />{errors.subject}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[var(--secondary)] mb-1.5">
          {labels.message}
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={e => { setForm(p => ({ ...p, message: e.target.value })); if (errors.message) setErrors(p => ({ ...p, message: undefined })); }}
          placeholder={labels.placeholder_message}
          className={`${inputClass("message")} resize-none`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><RiErrorWarningLine size={12} />{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary w-full py-4 rounded-lg flex items-center justify-center gap-2.5 font-bold shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        <RiSendPlaneLine size={18} />
        {labels.submit}
      </button>
    </form>
  );
}
