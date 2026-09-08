'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, MessageCircle, PenTool, Code2, Rocket } from 'lucide-react';

const stages = [
  { title: 'คุยให้เข้าใจ', label: 'DISCOVER', icon: MessageCircle, detail: 'รับฟังเป้าหมาย วิเคราะห์ธุรกิจ และวางโครงสร้างเว็บไซต์ร่วมกัน', tags: ['เป้าหมาย', 'โครงสร้างเว็บไซต์'] },
  { title: 'ออกแบบให้เห็นภาพ', label: 'DESIGN', icon: PenTool, detail: 'วาง UI/UX พร้อม Mockup เพื่อให้คุณเห็นทิศทางก่อนลงมือพัฒนา', tags: ['UI / UX', 'Mockup'] },
  { title: 'ลงมือสร้าง', label: 'DEVELOP', icon: Code2, detail: 'พัฒนาเว็บไซต์ที่รองรับทุกหน้าจอ พร้อมระบบจัดการเนื้อหา', tags: ['Responsive', 'ระบบจัดการเนื้อหา'] },
  { title: 'พร้อมเปิดตัว', label: 'LAUNCH', icon: Rocket, detail: 'ทดสอบ นำขึ้นระบบจริง สอนใช้งาน และส่งต่อการดูแล', tags: ['ทดสอบ', 'ส่งมอบและดูแล'] },
];

export default function WorkProcess() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const cards = Array.from(root.current?.querySelectorAll<HTMLElement>('.ww-process-card') ?? []);
      let next = 0;
      cards.forEach((card, index) => { if (card.getBoundingClientRect().top <= window.innerHeight * .55) next = index; });
      setActive(next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);

  return <section ref={root} className="section ww-process" id="process" data-particle-label="ขั้นตอนการทำงาน">
    <div className="ww-process-intro">
      <span className="eyebrow muted">02 — HOW WE WORK</span>
      <h2>จากไอเดีย<br />สู่วัน<span className="ww-process-lime">เปิดตัว.</span></h2>
      <p>คุณมีไอเดีย เรามีวิธีทำให้เกิดขึ้นจริง<br />คุยกันตรง ๆ และเห็นความคืบหน้าไปด้วยกัน</p>
      <div className="ww-process-status" aria-hidden="true">
        <span className="ww-process-counter">0{active + 1}<small> / 04</small></span>
        <span className="ww-process-current">{stages[active].label}<ArrowDown size={18} /></span>
      </div>
      <div className="ww-process-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(active + 1) / 4})` }} /></div>
      <a className="ww-process-link" href="#contact">เริ่มจากคุยไอเดียของคุณ <ArrowUpRight size={20} /></a>
    </div>
    <ol className="ww-process-track" style={{ '--ww-progress': active / 3 } as CSSProperties}>
      {stages.map((stage, index) => <li key={stage.label} className={`ww-process-node${index === active ? ' is-current' : ''}${index < active ? ' is-past' : ''}`}>
        <span className="ww-process-dot" aria-hidden="true" />
        <article className="ww-process-card">
          <div className="ww-process-card-top"><span className="ww-process-label">{stage.label}</span><stage.icon size={26} strokeWidth={1.5} aria-hidden="true" /></div>
          <div className="ww-process-card-body"><span className="ww-process-number" aria-hidden="true">0{index + 1}</span><div><h3>{stage.title}</h3><p>{stage.detail}</p></div></div>
          <div className="ww-process-tags">{stage.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </article>
      </li>)}
    </ol>
  </section>;
}
