import React, { Suspense } from 'react';
import ContactModel from './ContactModel';
import SectionGlow from './SectionGlow';

export default function Contact() {
  return (
    <section id="contact" className="bg-d0 border-t border-border pt-[68px] px-7 md:px-[72px] pb-[60px] flex flex-col items-start relative">
      <SectionGlow />
      <p className="slabel" data-r>Contact</p>
      <h2 className="ct-ti text-[clamp(2.2rem,3.8vw,3.4rem)]" data-r="c">Reach out and let's<br />bring your vision to <em>life</em></h2>
      
      <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-16 mt-10 relative items-start">
        {/* Left side: Form */}
        <div className="w-full lg:w-[45%] flex flex-col z-10">
          <div className="cf w-full !mt-0" data-r data-d="1">
            <div className="cf-row">
              <div className="cf-g !mb-0">
                <label className="cf-lb" htmlFor="cfn">Full Name</label>
                <input className="cf-in" id="cfn" type="text" placeholder="Vikas Singh" />
              </div>
              <div className="cf-g !mb-0">
                <label className="cf-lb" htmlFor="cfe">Email Address</label>
                <input className="cf-in" id="cfe" type="email" placeholder="hello@email.com" />
              </div>
            </div>
            <div className="h-[14px]"></div>
            <div className="cf-g">
              <label className="cf-lb" htmlFor="cfw">Website (optional)</label>
              <input className="cf-in" id="cfw" type="url" placeholder="Company Website" />
            </div>
            <div className="cf-g">
              <label className="cf-lb" htmlFor="cfb">Select Budget</label>
              <div className="cf-sw">
                <select className="cf-sel" id="cfb" defaultValue="">
                  <option value="" disabled>Select...</option>
                  <option>Under ₹50,000</option>
                  <option>₹50,000 – ₹1,00,000</option>
                  <option>₹1,00,000 – ₹3,00,000</option>
                  <option>₹3,00,000+</option>
                </select>
              </div>
            </div>
            <div className="cf-g">
              <label className="cf-lb" htmlFor="cfm">How may we assist you?</label>
              <textarea className="cf-ta" id="cfm" placeholder="Give us more info.."></textarea>
            </div>
            <button className="cf-sub" id="cf-btn" type="button">Send Your Message</button>
            
            <div className="cf-meta">
              <div className="cf-ml">
                <div className="cf-av">
                  <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
                    <circle cx="18" cy="13" r="6" fill="#c9a96e" opacity=".85" />
                    <ellipse cx="18" cy="30" rx="11" ry="7" fill="#c9a96e" opacity=".45" />
                  </svg>
                </div>
                <div className="cf-mi">
                  <p className="text-[0.77rem] text-t-mid">hello@vikassingh.com</p>
                  <span className="text-[0.69rem] text-t-lo block">reply within 24 hrs</span>
                </div>
              </div>
              <div className="cf-avl">
                <span className="cf-ad"></span>Available
              </div>
            </div>
          </div>
          
          <div className="cf-foot w-full max-w-[560px] mt-8" data-r data-d="2">
            <span className="cf-fl">Prefer to Book a call?</span>
            <a href="#book" className="cf-fr">Book a call anytime</a>
          </div>
        </div>

        {/* Right side: 3D Model */}
        <div id="contact-3d-container" className="w-full lg:w-[55%] h-[400px] lg:h-[650px] relative z-0 flex items-center justify-center">
          <ContactModel />
        </div>
      </div>
      
      <p className="ct-cp mt-12 w-full" data-r data-d="3">© 2026 Vikas Singh. All rights reserved.</p>
    </section>
  );
}
