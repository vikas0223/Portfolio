import React, { useRef, useEffect } from 'react';

const WORDS = [
  'UI/UX Design', 'Wireframing', 'Prototyping', 'User Research',
  'Figma', 'Framer', 'Design Systems', 'Interaction Design',
  'Info Architecture', 'Visual Design', 'AI-Assisted Design', 'Frontend Dev',
];

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const words = track.querySelectorAll('.mq-word');
    const onEnter = () => track.classList.add('paused');
    const onLeave = () => track.classList.remove('paused');

    words.forEach(w => {
      w.addEventListener('mouseenter', onEnter);
      w.addEventListener('mouseleave', onLeave);
    });

    return () => {
      words.forEach(w => {
        w.removeEventListener('mouseenter', onEnter);
        w.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  const items = WORDS.map((w, i) => (
    <React.Fragment key={i}>
      <span className="mq-word">{w}</span>
      <span className="mq-sep">✦</span>
    </React.Fragment>
  ));

  return (
    <div id="mq" aria-hidden="true">
      <div className="mq-track" ref={trackRef}>
        <div className="mq-item">{items}</div>
        <div className="mq-item">{items}</div>
      </div>
    </div>
  );
}
