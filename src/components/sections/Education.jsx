import React from 'react';
import SectionGlow from '../ui/SectionGlow';
import { EDUCATION_HISTORY, CERTIFICATIONS, ACHIEVEMENTS } from '../../config/education';

export default function Education() {
  return (
    <>
      {/* Education */}
      <section id="education" className="sec bg-d1 border-t border-border">
        <SectionGlow />
        <p className="slabel" data-r>Education</p>
        <h2 className="stitle" data-r="c">Academic <em>background</em></h2>
        <div className="flex flex-col gap-[3px]">
          {EDUCATION_HISTORY.map((item, idx) => (
            <div className="er" data-r="l" data-d={idx + 1} key={idx}>
              <div>
                <p className="er-in">{item.institution}</p>
                <p className="er-dg">{item.degree}</p>
              </div>
              <div className="er-rt">
                <p className="er-yr">{item.period}</p>
                <p className="er-sc text-gold font-mono text-[0.76rem]">{item.score}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certs" className="sec bg-d0 border-t border-border">
        <SectionGlow />
        <p className="slabel" data-r>Certifications</p>
        <h2 className="stitle" data-r="c">Verified <em>learning</em></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[3px]">
          {CERTIFICATIONS.map((item, idx) => (
            <div className="cc" data-r data-d={idx + 1} key={idx}>
              <p className="cc-org">{item.organization}</p>
              <p className="cc-nm">{item.name}</p>
              <p className="cc-yr">{item.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra */}
      <section id="extra" className="sec bg-d1 border-t border-border">
        <SectionGlow />
        <p className="slabel" data-r>Beyond Design</p>
        <h2 className="stitle" data-r="c">Extra-curricular <em>achievements</em></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px]">
          {ACHIEVEMENTS.map((item, idx) => (
            <div className="ec" data-r="s" data-d={idx + 1} key={idx}>
              <p className="ec-rk">{item.rank}</p>
              <p className="ec-ti">{item.title}</p>
              <p className="ec-ds">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
