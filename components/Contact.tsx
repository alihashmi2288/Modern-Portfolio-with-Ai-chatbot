import React, { forwardRef, useState, useEffect } from 'react';
import Section from './Section';
import { GithubIcon, LinkedinIcon, MailIcon } from './IconComponents';
import { useToast } from './Toast';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Modern Web Guidance: Synchronize programmatic accessibility states (aria-invalid) with :user-invalid
  useEffect(() => {
    const updateAriaState = (event: Event) => {
      const input = event.target as HTMLElement;
      if (!input.matches?.('input, textarea, select')) return;

      const isUserInvalid = input.matches(':user-invalid');
      if (isUserInvalid) {
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.removeAttribute('aria-invalid');
      }
    };

    document.addEventListener('blur', updateAriaState, true);
    document.addEventListener('focus', updateAriaState, true);

    const handleInput = (event: Event) => {
      const input = event.target as HTMLElement;
      if (!input.matches?.('input, textarea, select')) return;
      if (input.getAttribute('aria-invalid') === 'true') {
        updateAriaState(event);
      }
    };
    document.addEventListener('input', handleInput, true);

    return () => {
      document.removeEventListener('blur', updateAriaState, true);
      document.removeEventListener('focus', updateAriaState, true);
      document.removeEventListener('input', handleInput, true);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending and trigger email client draft
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Opening pre-filled message draft in your email client...', 'success');

      const mailtoUrl = `mailto:hashmi.ali2288@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formData.subject || 'Collaboration'}`
      )}&body=${encodeURIComponent(
        `Hi Syed,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;

      window.open(mailtoUrl, '_blank');
    }, 600);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'success');
  };

  return (
    <Section ref={ref} id="contact" className="py-20 sm:py-28">
      <div className="text-center mb-14 reveal-on-scroll">
        <span className="text-cyan-400 font-mono text-sm tracking-wider uppercase">Get In Touch</span>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight mt-2">
          Let's Build Something <span className="gradient-text">Exceptional</span>
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-slate-400 text-base">
          Have an engineering opportunity, project collaboration, or technical challenge in mind? Drop me a line or connect directly.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-start max-w-5xl mx-auto">
        {/* Left Column: Direct Details & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-6">
            <h3 className="text-xl font-bold text-slate-100">Contact Details</h3>

            {/* Email Card */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Email Address</p>
                  <p className="text-sm font-semibold text-slate-200">hashmi.ali2288@gmail.com</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('hashmi.ali2288@gmail.com', 'Email')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700 transition-colors"
                title="Copy email"
              >
                Copy
              </button>
            </div>

            {/* Phone Card */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-mono">Direct Phone</p>
                  <p className="text-sm font-semibold text-slate-200">+92 319 7345923</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('+92 319 7345923', 'Phone number')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 hover:bg-slate-700 transition-colors"
                title="Copy phone"
              >
                Copy
              </button>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Location</p>
                <p className="text-sm font-semibold text-slate-200">Karachi, Pakistan (PKT / UTC+5)</p>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/alihashmi2288"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white font-medium text-sm transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/hashmiali2288"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white font-medium text-sm transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Accessible Interactive Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-5"
          >
            <h3 className="text-xl font-bold text-slate-100 mb-2">Send a Direct Message</h3>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Your Name <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                minLength={2}
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                aria-errormessage="name-error"
                className="form-input w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-all"
              />
              <span id="name-error" className="error-message hidden text-xs text-rose-400 mt-1 pl-1">
                Please provide your name (at least 2 characters).
              </span>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-cyan-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                aria-errormessage="email-error"
                className="form-input w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-all"
              />
              <span id="email-error" className="error-message hidden text-xs text-rose-400 mt-1 pl-1">
                Please enter a valid email address.
              </span>
            </div>

            {/* Subject Input */}
            <div>
              <label htmlFor="subject" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Full-Stack / AI Opportunity or Project Collaboration"
                className="form-input w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-all"
              />
            </div>

            {/* Message Area */}
            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Message <span className="text-cyan-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                minLength={10}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project, team, or opportunity..."
                aria-errormessage="message-error"
                className="form-input w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm transition-all resize-none"
              ></textarea>
              <span id="message-error" className="error-message hidden text-xs text-rose-400 mt-1 pl-1">
                Please write a message with at least 10 characters.
              </span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all disabled:opacity-60 text-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Formatting Dispatch...</span>
                </>
              ) : (
                <>
                  <span>Send Message Directly</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>

            {submitted && (
              <p className="text-xs text-emerald-400 text-center mt-2">
                Thank you! Your email client has been prepared with your message to Syed.
              </p>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
});

Contact.displayName = 'Contact';

export default Contact;