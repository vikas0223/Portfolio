import React, { useState, useEffect, useRef } from 'react';
import ContactModel from '../../three/ContactScene';
import SectionGlow from '../ui/SectionGlow';
import { ContactDoodles } from '../ui/DesignerDoodles';
import { siteConfig } from '../../config/siteConfig';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHoveringSend, setIsHoveringSend] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [inView, setInView] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch((err) => console.error('AudioContext close error:', err));
        audioCtxRef.current = null;
      }
    };
  }, []);

  // Play click sound using Web Audio API
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 600, ctx.currentTime);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      console.error('Audio click error:', e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    playClickSound();
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Project description required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate connection encryption and transmission payload sending
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      projectType: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Monitor intersection to power it on
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => setInView(true),
      once: true
    });

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.contact-reveal-item');
      const card = document.querySelector('.contact-reveal-card');
      const quote = document.querySelector('.contact-reveal-quote');
      const modelContainer = document.getElementById('contact-3d-container');

      // Set initial states for clean entrance animations
      gsap.set(items, { opacity: 0, y: 20, filter: 'blur(6px)', scale: 0.99 });
      gsap.set(card, { opacity: 0, scale: 0.95, y: 15 });
      gsap.set(quote, { opacity: 0, y: 10 });
      if (modelContainer) gsap.set(modelContainer, { opacity: 0, scale: 0.96 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(items, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out'
      })
        .to(modelContainer, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out'
        }, '-=0.45')
        .to(card, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.2)'
        }, '-=0.3')
        .to(quote, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }, '-=0.2');
    }, el);

    return () => {
      trigger.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="contact" className="bg-d0 border-t border-border py-16 lg:py-0 lg:min-h-screen pt-[90px] md:pt-[100px] pb-12 px-5 sm:px-8 md:px-[72px] flex flex-col justify-center relative">
      <SectionGlow />

      <div className="w-full max-w-[1260px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-12 items-center justify-between relative z-10">

        {/* Form & Heading Section */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center">
          <p className="slabel contact-reveal-item mb-1">Get in Touch</p>
          <h2 className="ct-ti contact-reveal-item text-[clamp(1.8rem,3vw,2.8rem)] font-serif font-light leading-tight tracking-tight mb-2">
            Let's create <span className="text-gold italic font-normal">something extraordinary</span>.
          </h2>

          <p className="contact-reveal-item text-t-mid text-[0.88rem] leading-relaxed max-w-[390px] mb-4">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="contact-reveal-item w-full max-w-[480px] flex flex-col gap-4">

            {/* Name and Email side-by-side on tablet/desktop, stacked on mobile */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[0.6rem] font-mono tracking-[0.2em] uppercase text-t-lo/70">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  disabled={isSubmitting || isSubmitted}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="bg-transparent border-b border-border/80 focus:border-gold text-t-hi font-sans text-[0.92rem] outline-none pb-2 pt-1 px-0 min-h-[44px] transition-all duration-300 placeholder:text-t-lo/30 focus:placeholder:opacity-0 disabled:opacity-60"
                />
                {errors.name && <span className="text-[0.62rem] text-gold font-mono uppercase tracking-wider mt-0.5">{errors.name}</span>}
              </div>

              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[0.6rem] font-mono tracking-[0.2em] uppercase text-t-lo/70">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isSubmitting || isSubmitted}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  className="bg-transparent border-b border-border/80 focus:border-gold text-t-hi font-sans text-[0.92rem] outline-none pb-2 pt-1 px-0 min-h-[44px] transition-all duration-300 placeholder:text-t-lo/30 focus:placeholder:opacity-0 disabled:opacity-60"
                />
                {errors.email && <span className="text-[0.62rem] text-gold font-mono uppercase tracking-wider mt-0.5">{errors.email}</span>}
              </div>
            </div>

            {/* Project Type Dropdown */}
            <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
              <label className="text-[0.6rem] font-mono tracking-[0.2em] uppercase text-t-lo/70">Project Type</label>

              <button
                type="button"
                disabled={isSubmitting || isSubmitted}
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  playClickSound();
                }}
                className="w-full bg-transparent border-b border-border/80 focus:border-gold text-left text-t-hi font-sans text-[0.92rem] pb-2 pt-1 px-0 min-h-[48px] transition-all duration-300 flex items-center justify-between active:scale-[0.99] disabled:opacity-60"
              >
                <span className={formData.projectType ? 'text-t-hi' : 'text-t-lo/40'}>
                  {formData.projectType || 'Select project type...'}
                </span>
                <span className={`text-[0.65rem] text-gold transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 right-0 top-[102%] z-50 bg-d2 border border-border rounded-xl shadow-[0_8px_30px_rgba(201,169,110,0.15)] py-2 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                  {[
                    { label: 'Full-time', icon: '💼' },
                    { label: 'Collaboration', icon: '🤝' },
                    { label: 'Startup', icon: '🚀' },
                    { label: 'UI/UX', icon: '🎨' },
                    { label: 'Product Design', icon: '🧠' },
                    { label: 'Other', icon: '⚡' }
                  ].map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, projectType: option.label }));
                        setDropdownOpen(false);
                        playClickSound();
                      }}
                      className="w-full text-left px-4 py-3 min-h-[44px] hover:bg-gold hover:text-d0 active:bg-gold active:text-d0 font-sans text-[0.88rem] text-t-mid transition-colors duration-200 flex items-center gap-2.5"
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Company Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.6rem] font-mono tracking-[0.2em] uppercase text-t-lo/70">Company <span className="text-t-lo/40">(optional)</span></label>
              <input
                type="text"
                name="company"
                disabled={isSubmitting || isSubmitted}
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company name"
                className="bg-transparent border-b border-border/80 focus:border-gold text-t-hi font-sans text-[0.92rem] outline-none pb-2 pt-1 px-0 min-h-[44px] transition-all duration-300 placeholder:text-t-lo/30 focus:placeholder:opacity-0 disabled:opacity-60"
              />
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.6rem] font-mono tracking-[0.2em] uppercase text-t-lo/70">Project</label>
              <textarea
                name="message"
                required
                disabled={isSubmitting || isSubmitted}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Describe your project details..."
                rows={2}
                className="bg-transparent border-b border-border/80 focus:border-gold text-t-hi font-sans text-[0.92rem] outline-none pb-2 pt-1 px-0 transition-all duration-300 placeholder:text-t-lo/30 focus:placeholder:opacity-0 disabled:opacity-60 resize-none min-h-[70px]"
              />
              {errors.message && <span className="text-[0.62rem] text-gold font-mono uppercase tracking-wider mt-0.5">{errors.message}</span>}
            </div>

            {/* Submit Button & Sound controls */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                onMouseEnter={() => setIsHoveringSend(true)}
                onMouseLeave={() => setIsHoveringSend(false)}
                className={`group relative flex items-center justify-center gap-3 w-full py-3.5 min-h-[48px] text-d0 rounded-xl font-medium tracking-wide transition-all duration-300 active:scale-95 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(201,169,110,0.25)] text-[0.88rem] ${isSubmitted
                    ? 'bg-gold text-d0 opacity-90'
                    : isSubmitting
                      ? 'shimmer-btn text-d0'
                      : 'bg-gold hover:bg-[#d4b47a]'
                  }`}
              >
                {isSubmitted ? (
                  <span>✓ Message Sent</span>
                ) : isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Let's build something</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between">
                {isSubmitted ? (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-[0.68rem] font-mono tracking-wider uppercase text-gold/80 hover:text-gold transition-colors duration-200 underline underline-offset-4"
                  >
                    Send another message
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full border border-border/80 hover:border-gold/60 text-t-mid hover:text-gold transition-colors duration-200 font-mono text-[0.6rem] uppercase tracking-wider bg-d3/40 active:scale-95"
                >
                  <span>{soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Details footer */}
          <div className="contact-reveal-item flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 text-[0.58rem] font-mono tracking-[0.12em] text-t-lo/60 uppercase">
            <span>{siteConfig.availability.responseTime}</span>
            <span className="text-border/40">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-[sdot-ping_2s_infinite]"></span>
              {siteConfig.availability.freelance}
            </span>
          </div>
        </div>

        {/* 3D CRT Monitor Scene & Contact Card */}
        <div className="w-full lg:w-[50%] flex flex-col relative items-center justify-center mt-6 lg:mt-0 gap-4">

          {/* Retro Computer 3D Model Container */}
          <div id="contact-3d-container" className="w-full h-[320px] sm:h-[380px] lg:h-[450px] relative z-0 flex items-center justify-center bg-transparent touch-pan-y">
            <ContactModel
              formData={formData}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              isHoveringSend={isHoveringSend}
              inView={inView}
            />
            {/* System-inspired annotations */}
            <ContactDoodles />
          </div>

          {/* Contact Info Card */}
          <div className="contact-reveal-card w-full max-w-[420px] bg-d2 border border-border/80 rounded-2xl p-5 shadow-[0_8px_30px_rgba(201,169,110,0.06)] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
              </span>
              <span className="text-[0.72rem] text-t-hi font-medium uppercase tracking-wider font-mono">Available for Hire</span>
            </div>

            <div className="h-px bg-white/5 my-0.5"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <p className="text-[0.55rem] font-mono tracking-wider uppercase text-t-lo">Location</p>
                <p className="text-[0.74rem] text-t-hi font-medium mt-0.5">{siteConfig.location}</p>
              </div>
              <div>
                <p className="text-[0.55rem] font-mono tracking-wider uppercase text-t-lo">Response Time</p>
                <p className="text-[0.74rem] text-t-hi font-medium mt-0.5">{siteConfig.availability.responseTime}</p>
              </div>
              <div>
                <p className="text-[0.55rem] font-mono tracking-wider uppercase text-t-lo">Freelance</p>
                <p className="text-[0.74rem] text-t-hi font-medium mt-0.5">{siteConfig.availability.freelance}</p>
              </div>
            </div>
          </div>

          {/* Custom Quote Card */}
          <div className="contact-reveal-quote w-full max-w-[420px] p-4 border border-border/40 rounded-xl bg-d2/30 text-center relative">
            <p className="font-serif text-[1rem] text-t-hi italic leading-relaxed">
              {siteConfig.contactQuote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
