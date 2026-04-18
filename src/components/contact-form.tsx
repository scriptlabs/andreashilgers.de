"use client";

import * as React from "react";
import { RiSendPlaneLine, RiCheckLine, RiErrorWarningLine, RiRefreshLine } from "react-icons/ri";

interface ContactFormProps {
  labels: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    optional: string;
    required: string;
    submit: string;
    placeholder_name: string;
    placeholder_email: string;
    placeholder_phone: string;
    placeholder_company: string;
    placeholder_message: string;
    char_limit: string;
    success_title: string;
    success_message: string;
    error_message: string;
    captcha_label: string;
    captcha_error: string;
  };
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  captcha: string;
  honeypot: string; // Invisible field for bot detection
}

interface FormErrors {
  email?: string;
  message?: string;
  captcha?: string;
  general?: string;
}

export function ContactForm({ labels }: ContactFormProps) {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    captcha: "",
    honeypot: "",
  });
  
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  
  // Simple math challenge
  const [captchaChallenge, setCaptchaChallenge] = React.useState({ a: 0, b: 0, sum: 0 });

  const generateCaptcha = React.useCallback(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptchaChallenge({ a, b, sum: a + b });
  }, []);

  React.useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const validate = (): boolean => {
    const next: FormErrors = {};
    
    // Email is required
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Valid email required";
    }
    
    // Message is required
    if (form.message.trim().length < 10) {
      next.message = "Please write at least 10 characters";
    }

    // Captcha validation
    if (parseInt(form.captcha) !== captchaChallenge.sum) {
      next.captcha = labels.captcha_error;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (form.honeypot) {
      // Quietly "succeed" for bots
      setSubmitted(true);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Contact form error:", err);
      setErrors({ general: labels.error_message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-5 py-4 bg-[var(--muted)] border border-[var(--border)] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all text-sm ${
      errors[field] ? "border-red-500/50 ring-2 ring-red-500/10" : "hover:border-[var(--primary)]/30"
    }`;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-6 shadow-inner shadow-emerald-500/20">
          <RiCheckLine size={40} className="animate-in zoom-in delay-300 fill-mode-both" />
        </div>
        <h3 className="text-2xl font-black mb-3 hero-gradient">{labels.success_title}</h3>
        <p className="text-[var(--secondary)] text-base max-w-sm mx-auto leading-relaxed">
          {labels.success_message}
        </p>
        <button
          onClick={() => { 
            setSubmitted(false); 
            setForm({ name: "", email: "", phone: "", company: "", message: "", captcha: "", honeypot: "" }); 
            generateCaptcha();
          }}
          className="mt-10 px-6 py-2 text-sm font-bold text-[var(--primary)] border border-[var(--primary)]/20 rounded-md hover:bg-[var(--primary)] hover:text-white transition-all"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 flex flex-col h-full">
      {/* Honeypot Field */}
      <div className="hidden">
        <input 
          type="text" 
          value={form.honeypot} 
          onChange={e => setForm(p => ({ ...p, honeypot: e.target.value }))} 
          tabIndex={-1} 
          autoComplete="off" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold flex justify-between items-center px-1">
            <span>{labels.name}</span>
            <span className="text-[10px] text-[var(--secondary)] font-normal uppercase tracking-wider">{labels.optional}</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder={labels.placeholder_name}
            className={inputClass("general")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold flex justify-between items-center px-1">
            <span>{labels.email}</span>
            <span className="text-[10px] text-[var(--primary)] uppercase tracking-wider">{labels.required}</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => { 
              setForm(p => ({ ...p, email: e.target.value })); 
              if (errors.email) setErrors(p => ({ ...p, email: undefined })); 
            }}
            placeholder={labels.placeholder_email}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="px-1 text-xs text-red-500 font-medium flex items-center gap-1"><RiErrorWarningLine size={12} />{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold flex justify-between items-center px-1">
            <span>{labels.phone}</span>
            <span className="text-[10px] text-[var(--secondary)] font-normal uppercase tracking-wider">{labels.optional}</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            placeholder={labels.placeholder_phone}
            className={inputClass("general")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold flex justify-between items-center px-1">
            <span>{labels.company}</span>
            <span className="text-[10px] text-[var(--secondary)] font-normal uppercase tracking-wider">{labels.optional}</span>
          </label>
          <input
            type="text"
            value={form.company}
            onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
            placeholder={labels.placeholder_company}
            className={inputClass("general")}
          />
        </div>
      </div>

      <div className="space-y-2 flex-grow flex flex-col">
        <div className="flex justify-between items-end px-1">
          <label className="text-sm font-bold flex items-center gap-2">
            <span>{labels.message}</span>
            <span className="text-[10px] text-[var(--primary)] uppercase tracking-wider">{labels.required}</span>
          </label>
          <span className={`text-[10px] font-bold ${form.message.length > 1900 ? "text-orange-500" : "text-[var(--secondary)]"}`}>
            {form.message.length} / 2000
          </span>
        </div>
        <textarea
          rows={6}
          value={form.message}
          maxLength={2000}
          onChange={e => { 
            setForm(p => ({ ...p, message: e.target.value })); 
            if (errors.message) setErrors(p => ({ ...p, message: undefined })); 
          }}
          placeholder={labels.placeholder_message}
          className={`${inputClass("message")} resize-none flex-grow font-mono leading-relaxed placeholder:font-sans`}
        />
        {errors.message && (
          <p className="px-1 text-xs text-red-500 font-medium flex items-center gap-1"><RiErrorWarningLine size={12} />{errors.message}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 pt-2">
        <div className="w-full sm:w-auto space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-[var(--secondary)] px-1 flex items-center gap-2">
            {labels.captcha_label.replace("{a}", captchaChallenge.a.toString()).replace("{b}", captchaChallenge.b.toString())}
            <button type="button" onClick={generateCaptcha} className="hover:text-[var(--primary)] transition-colors" title="Refresh Challenge">
              <RiRefreshLine size={14} />
            </button>
          </label>
          <input
            type="number"
            value={form.captcha}
            onChange={e => { 
              setForm(p => ({ ...p, captcha: e.target.value })); 
              if (errors.captcha) setErrors(p => ({ ...p, captcha: undefined })); 
            }}
            className={`${inputClass("captcha")} max-w-[120px]`}
          />
          {errors.captcha && (
            <p className="px-1 text-xs text-red-500 font-medium">{errors.captcha}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full sm:w-auto px-10 py-4 rounded-md flex items-center justify-center gap-2.5 font-bold shadow-xl shadow-[var(--primary)]/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 min-w-[200px]"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <RiSendPlaneLine size={18} />
              <span>{labels.submit}</span>
            </>
          )}
        </button>
      </div>

      {errors.general && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm font-medium flex items-center gap-3">
          <RiErrorWarningLine size={20} className="shrink-0" />
          {errors.general}
        </div>
      )}
    </form>
  );
}
