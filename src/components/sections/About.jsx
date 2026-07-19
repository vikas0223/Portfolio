import React, { useState, useEffect } from 'react';
import SectionGlow from '../ui/SectionGlow';
import profileImg from '../../assets/images/profile-removebg-preview.png';
import { AboutDoodles } from '../ui/DesignerDoodles';
import { siteConfig } from '../../config/siteConfig';

export default function About() {
  const words = ["intention", "purpose", "intent", "clarity"]
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setVisible(true)
      }, 400)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="sec bg-d1 border-t border-border">
      <SectionGlow />
      <p className="slabel" data-r>About</p>
      <h2 className="stitle" data-r="c">Designing with <em><span
        style={{
          display: 'inline-block',
          transition: 'opacity 400ms ease-in-out, transform 400ms ease-in-out',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0px)' : 'translateY(-6px)',
        }}
      >{words[index]}</span></em></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[76px] items-start">
        <p className="bio" data-r="l" data-d="1">
          <strong className="text-t-hi font-medium">Computer Science &amp; Engineering graduate</strong> (specializing in AI &amp; ML) from Chandigarh University. I focus on creating interfaces that bridge complex system engineering and intuitive user experiences.<br /><br />
          My engineering background gives me an edge when collaborating with developers on technically complex interfaces, translating functional requirements into performant visuals. Currently seeking a <strong className="text-t-hi font-medium">UI/UX or Product Designer role</strong> to help build products that feel effortless to use.
        </p>

        {/* Right side profile image */}
        <div
          className="relative w-full flex justify-center md:justify-end -mt-16 md:-mt-[130px]"
          data-r="r"
          data-d="2"
        >
          <div className="relative inline-block select-none group">
            <img
              src={profileImg}
              alt="Profile"
              className="transition-transform duration-700 hover:scale-105"
              style={{
                maxHeight: '480px',
                width: 'auto',
                objectFit: 'contain',
                objectPosition: 'top'
              }}
            />
            {/* Figma-style inspector design annotations */}
            <AboutDoodles />
          </div>
        </div>
      </div>
    </section>
  );
}
