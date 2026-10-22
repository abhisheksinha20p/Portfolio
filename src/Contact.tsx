import { useState } from 'react';
import emailjs from '@emailjs/browser';

type Status = 'idle' | 'sending' | 'sent' | 'error';
const COOLDOWN_MS = 60_000;

export const Contact = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [lastSent, setLastSent] = useState(0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot: real users never see or fill this field; bots do.
    if ((form.elements.namedItem('website') as HTMLInputElement).value) return setStatus('sent');
    if (Date.now() - lastSent < COOLDOWN_MS) return setStatus('sent');

    const { VITE_EMAILJS_SERVICE_ID: service, VITE_EMAILJS_TEMPLATE_ID: template, VITE_EMAILJS_PUBLIC_KEY: key } =
      import.meta.env;
    setStatus('sending');
    try {
      await emailjs.sendForm(service, template, form, { publicKey: key });
      form.reset();
      setLastSent(Date.now());
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
        </p>
      </div>
    </form>
  );
};
