import { useState } from 'react';
import emailjs from '@emailjs/browser';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'invalid';
const COOLDOWN_MS = 60_000;
const MIN_FILL_MS = 3_000; // humans take longer than this to fill the form; bots don't
const COOLDOWN_KEY = 'contact:lastSent';
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;

// Spam guards here only slow bots down; the real limits are EmailJS's allowed-domain
// list and rate limits, configured in the EmailJS dashboard.
const readLastSent = () => { try { return Number(localStorage.getItem(COOLDOWN_KEY)) || 0; } catch { return 0; } };
const writeLastSent = (t: number) => { try { localStorage.setItem(COOLDOWN_KEY, String(t)); } catch { /* private mode */ } };
// Strip control characters and trim, so nothing odd reaches the email template.
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const clean = (v: FormDataEntryValue | null) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();

export const Contact = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [openedAt] = useState(() => Date.now());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot (hidden field), too-fast submissions and repeat sends are dropped silently.
    if (clean(data.get('website')) || Date.now() - openedAt < MIN_FILL_MS) return setStatus('sent');
    if (Date.now() - readLastSent() < COOLDOWN_MS) return setStatus('sent');

    const params = {
      user_name: clean(data.get('user_name')).slice(0, 80),
      user_email: clean(data.get('user_email')).slice(0, 120),
      message: clean(data.get('message')).slice(0, 2000),
    };
    if (!params.user_name || !EMAIL.test(params.user_email) || params.message.length < 10) return setStatus('invalid');

    const { VITE_EMAILJS_SERVICE_ID: service, VITE_EMAILJS_TEMPLATE_ID: template, VITE_EMAILJS_PUBLIC_KEY: key } =
      import.meta.env;
    setStatus('sending');
    try {
      await emailjs.send(service, template, params, { publicKey: key });
      form.reset();
      writeLastSent(Date.now());
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <label className="field">
          <span className="label">Name</span>
          <input name="user_name" required maxLength={80} autoComplete="name" />
        </label>
        <label className="field">
          <span className="label">Email</span>
          <input name="user_email" type="email" required maxLength={120} autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span className="label">Message</span>
        <textarea name="message" rows={5} required minLength={10} maxLength={2000} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="flex items-center gap-6">
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p role="status" className="text-sm text-muted">
          {status === 'sent' && 'Thanks — I’ll reply soon.'}
          {status === 'error' && 'Something went wrong. Please email me directly.'}
          {status === 'invalid' && 'Add your name, a valid email and a message of at least 10 characters.'}
        </p>
      </div>
    </form>
  );
};
