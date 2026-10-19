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

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Opening pre-filled draft in your email client...', 'success');

      const mailtoUrl = `mailto:hashmi.ali2288@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formData.subject || 'Engineering Collaboration'}`
      )}&body=${encodeURIComponent(
        `Hi Syed,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;

      window.open(mailtoUrl, '_blank');
    }, 500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'success');
  };

  return (
    <Section ref={ref} id="contact" className="py-20 sm:py-28">
      {/* Header with Technical Eyebrow and Geist Sans Heading */}
      <div className="text-center mb-12 reveal-on-scroll">
        <span className="font-mono text-xs uppercase tracking-wider text-[#8f8f8f] font-medium block">
          // GET IN TOUCH
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#171717] tracking-[-1.28px] mt-2">
          Let's Build Together
        </h2>
        <p className="mt-2.5 max-w-xl mx-auto text-[#4d4d4d] text-base">
          Have an engineering opportunity, full-stack project, or AI workflow in mind? Reach out directly or dispatch a message.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Left Column: Direct Details & Quick Actions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 sm:p-7 rounded-[16px] border border-[#ebebeb] shadow-whisper space-y-4">
            <h3 className="text-lg font-semibold text-[#171717] tracking-[-0.4px]">Direct Contact</h3>

            {/* Email Card */}
            <div className="flex items-center justify-between p-3.5 rounded-[8px] bg-[#fafafa] border border-[#ebebeb]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[6px] bg-white text-[#171717] border border-[#ebebeb] shadow-whisper">
                  <MailIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-[#8f8f8f] font-mono">Email</p>
                  <p className="text-xs sm:text-sm font-medium text-[#171717]">hashmi.ali2288@gmail.com</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('hashmi.ali2288@gmail.com', 'Email')}
                className="text-xs font-mono font-medium px-2.5 py-1 rounded-[6px] border border-[#ebebeb] bg-white text-[#171717] hover:bg-[#f2f2f2] transition-colors shadow-whisper"
                title="Copy email"
              >
                Copy
              </button>
            </div>

            {/* Phone Card */}
            <div className="flex items-center justify-between p-3.5 rounded-[8px] bg-[#fafafa] border border-[#ebebeb]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[6px] bg-white text-[#171717] border border-[#ebebeb] shadow-whisper">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-[#8f8f8f] font-mono">Phone</p>
                  <p className="text-xs sm:text-sm font-medium text-[#171717]">+92 319 7345923</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('+92 319 7345923', 'Phone number')}
                className="text-xs font-mono font-medium px-2.5 py-1 rounded-[6px] border border-[#ebebeb] bg-white text-[#171717] hover:bg-[#f2f2f2] transition-colors shadow-whisper"
                title="Copy phone"
              >
                Copy
              </button>
            </div>

            {/* Location Card */}
            <div className="p-3.5 rounded-[8px] bg-[#fafafa] border border-[#ebebeb] flex items-center gap-3">
              <div className="p-2 rounded-[6px] bg-white text-[#171717] border border-[#ebebeb] shadow-whisper">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-[#8f8f8f] font-mono">Location</p>
                <p className="text-xs sm:text-sm font-medium text-[#171717]">Karachi, Pakistan (PKT / UTC+5)</p>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://github.com/alihashmi2288"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-[6px] bg-white border border-[#ebebeb] hover:border-[#171717] text-[#171717] font-medium text-xs sm:text-sm transition-all shadow-whisper"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/hashmiali2288"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-[6px] bg-white border border-[#ebebeb] hover:border-[#171717] text-[#171717] font-medium text-xs sm:text-sm transition-all shadow-whisper"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Accessible Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white p-6 sm:p-8 rounded-[16px] border border-[#ebebeb] shadow-whisper space-y-4"
          >
            <h3 className="text-lg font-semibold text-[#171717] tracking-[-0.4px]">Direct Message</h3>

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-[#8f8f8f] font-medium mb-1.5">
                Name <span className="text-[#0070f3]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                minLength={2}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                aria-errormessage="name-error"
                className="form-input w-full bg-white border border-[#ebebeb] rounded-[6px] px-3.5 py-2 text-[#171717] placeholder-[#8f8f8f] focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] text-sm shadow-whisper transition-all"
              />
              <span id="name-error" className="error-message hidden text-xs font-mono text-[#ee0000] mt-1 pl-1">
                Please provide your name (at least 2 characters).
              </span>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#8f8f8f] font-medium mb-1.5">
                Email Address <span className="text-[#0070f3]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-errormessage="email-error"
                className="form-input w-full bg-white border border-[#ebebeb] rounded-[6px] px-3.5 py-2 text-[#171717] placeholder-[#8f8f8f] focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] text-sm shadow-whisper transition-all"
              />
              <span id="email-error" className="error-message hidden text-xs font-mono text-[#ee0000] mt-1 pl-1">
                Please enter a valid email address.
              </span>
            </div>

            {/* Subject Input */}
            <div>
              <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-[#8f8f8f] font-medium mb-1.5">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Full-Stack / AI Opportunity or Collaboration"
                className="form-input w-full bg-white border border-[#ebebeb] rounded-[6px] px-3.5 py-2 text-[#171717] placeholder-[#8f8f8f] focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] text-sm shadow-whisper transition-all"
              />
            </div>

            {/* Message Area */}
            <div>
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-[#8f8f8f] font-medium mb-1.5">
                Message <span className="text-[#0070f3]">*</span>
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
                className="form-input w-full bg-white border border-[#ebebeb] rounded-[6px] px-3.5 py-2 text-[#171717] placeholder-[#8f8f8f] focus:outline-none focus:border-[#0070f3] focus:ring-1 focus:ring-[#0070f3] text-sm shadow-whisper transition-all resize-none"
              ></textarea>
              <span id="message-error" className="error-message hidden text-xs font-mono text-[#ee0000] mt-1 pl-1">
                Please write a message with at least 10 characters.
              </span>
            </div>

            {/* Marketing CTA Pill: rounded-[100px] */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-[100px] font-medium text-white bg-[#171717] hover:bg-black/90 active:scale-[0.98] transition-all disabled:opacity-60 text-sm shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Preparing Draft...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {submitted && (
              <p className="text-xs font-mono text-[#0070f3] text-center mt-2">
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