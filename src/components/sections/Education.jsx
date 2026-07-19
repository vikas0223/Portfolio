import React from 'react';
import SectionGlow from './SectionGlow';

export default function Education() {
  return (
    <>
      {/* Education */}
      <section id="education" className="sec bg-d1 border-t border-border">
        <SectionGlow />
        <p className="slabel" data-r>Education</p>
        <h2 className="stitle" data-r="c">Academic <em>background</em></h2>
        <div className="flex flex-col gap-[3px]">
          <div className="er" data-r="l" data-d="1">
            <div>
              <p className="er-in">Chandigarh University, Chandigarh</p>
              <p className="er-dg">B.E. Computer Science Engineering (AI &amp; ML)</p>
            </div>
            <div className="er-rt">
              <p className="er-yr">2022 – 2026</p>
              <p className="er-sc text-gold font-mono text-[0.76rem]">GPA 7.35</p>
            </div>
          </div>
          <div className="er" data-r="l" data-d="2">
            <div>
              <p className="er-in">G.M.S.S.S Civil Lines, Patiala</p>
              <p className="er-dg">Senior Secondary (12th)</p>
            </div>
            <div className="er-rt">
              <p className="er-yr">2021 – 2022</p>
              <p className="er-sc text-gold font-mono text-[0.76rem]">89%</p>
            </div>
          </div>
          <div className="er" data-r="l" data-d="3">
            <div>
              <p className="er-in">Aman Public School, Patiala</p>
              <p className="er-dg">Matriculation (10th)</p>
            </div>
            <div className="er-rt">
              <p className="er-yr">2019 – 2020</p>
              <p className="er-sc text-gold font-mono text-[0.76rem]">95%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certs" className="sec bg-d0 border-t border-border">
        <SectionGlow />
        <p className="slabel" data-r>Certifications</p>
        <h2 className="stitle" data-r="c">Verified <em>learning</em></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[3px]">
          <div className="cc" data-r data-d="1">
            <p className="cc-org">Google</p>
            <p className="cc-nm">UX Design Certificate</p>
            <p className="cc-yr">2024</p>
          </div>
          <div className="cc" data-r data-d="2">
            <p className="cc-org">Oracle University</p>
            <p className="cc-nm">Generative AI</p>
            <p className="cc-yr">2024</p>
          </div>
          <div className="cc" data-r data-d="3">
            <p className="cc-org">University of Michigan</p>
            <p className="cc-nm">Python Data Structures</p>
            <p className="cc-yr">2023</p>
          </div>
        </div>
      </section>

      {/* Extra */}
      <section id="extra" className="sec bg-d1 border-t border-border">
        <SectionGlow />
        <p className="slabel" data-r>Beyond Design</p>
        <h2 className="stitle" data-r="c">Extra-curricular <em>achievements</em></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px]">
          <div className="ec" data-r="s" data-d="1">
            <p className="ec-rk">2nd</p>
            <p className="ec-ti">National Writing Competition — Tata</p>
            <p className="ec-ds">Runner-up among 500+ participants. Short story exploring the intersection of technology and human connection.</p>
          </div>
          <div className="ec" data-r="s" data-d="2">
            <p className="ec-rk">3rd</p>
            <p className="ec-ti">Drawing Competition — Reliance Foundation</p>
            <p className="ec-ds">Runner-up with a digital illustration on sustainable cities — visual storytelling beyond digital interfaces.</p>
          </div>
        </div>
      </section>
    </>
  );
}
