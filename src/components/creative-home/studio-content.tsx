import {
  ArrowUpRight,
  CalendarClock,
  Check,
  CircleDollarSign,
  Gauge,
  Headphones,
  LayoutGrid,
  Search,
  Smartphone,
} from 'lucide-react';
import portfolioProjects from './portfolio-data.json';

const benefits = [
  { icon: LayoutGrid, title: 'ออกแบบให้เข้ากับธุรกิจ', text: 'เริ่มจากตัวตน เป้าหมาย และกลุ่มลูกค้าของคุณ' },
  { icon: Search, title: 'วางโครงสร้าง SEO พื้นฐาน', text: 'จัดโครงสร้างเนื้อหาให้พร้อมต่อยอดการค้นหา ตามขอบเขตแพ็กเกจ' },
  { icon: Smartphone, title: 'ใช้งานดีทุกหน้าจอ', text: 'ประสบการณ์ลื่นไหลบนคอมพิวเตอร์ แท็บเล็ต และมือถือ' },
  { icon: Headphones, title: 'มีคนช่วยดูแลต่อ', text: 'ดูแลหลังเปิดใช้งานตามระยะเวลาที่ระบุในแพ็กเกจ' },
  { icon: CircleDollarSign, title: 'ประเมินราคาโปร่งใส', text: 'เห็นขอบเขตงานและรายการที่ไม่รวม เช่น Hosting และ Domain' },
  { icon: CalendarClock, title: 'วางไทม์ไลน์ร่วมกัน', text: 'กำหนดส่งมอบตามแพ็กเกจและความพร้อมของเนื้อหา' },
] as const;

const articles = [
  {
    category: 'Web Design',
    readTime: '7 min',
    title: 'เทรนด์เว็บไซต์ปี 2026 ที่ธุรกิจไทยควรรู้และเตรียมรับมือ',
    summary: 'มองแนวโน้มเว็บไซต์ปี 2026 และสิ่งที่ธุรกิจไทยควรเตรียมตัวให้พร้อม',
    image: '/creative-home/images/articles/editorial-trends.webp',
    href: 'https://waenweb.com/blog/website-2026-trend-thurai-thai-tong-ru',
  },
  {
    category: 'SEO',
    readTime: '7 min',
    title: 'Content Marketing สำหรับธุรกิจไทย ทำเองได้ไม่ต้องจ้างเอเจนซี่แพงๆ',
    summary: 'แนวทางเริ่มทำ Content Marketing สำหรับธุรกิจไทยด้วยตัวเองอย่างเป็นระบบ',
    image: '/creative-home/images/articles/editorial-content.webp',
    href: 'https://waenweb.com/blog/content-marketing-samnab-website-thurakit-thai',
  },
  {
    category: 'Analytics',
    readTime: '8 min',
    title: 'อ่าน Analytics ยังไงให้เป็นประโยชน์ต่อธุรกิจ ไม่ใช่แค่ดูตัวเลข',
    summary: 'ทำความเข้าใจ Analytics เพื่อเปลี่ยนตัวเลขบนเว็บไซต์ให้เป็นข้อมูลช่วยตัดสินใจ',
    image: '/creative-home/images/articles/editorial-analytics.webp',
    href: 'https://waenweb.com/blog/an-analytics-website-yang-rai-hai-pen-prayot-tor-thurakit',
  },
] as const;

export function WhyChooseUs() {
  const portfolioCount = portfolioProjects.length;

  return (
    <section className="studio-section why-section" id="why-us" data-particle-label="ทำไมต้องเรา">
      <div className="studio-section-heading">
        <div>
          <span className="eyebrow muted">WHY WAENWEB</span>
          <h2>เหตุผลที่ธุรกิจ<br /><span>เลือกทำงานกับเรา.</span></h2>
        </div>
        <p>ตั้งใจทำทุกขั้นตอนให้ชัดเจน<br className="desktop-break" /> ตั้งแต่ไอเดียแรกจนถึงวันส่งมอบ</p>
      </div>
      <div className="why-proof-row">
        <a className="why-proof" href="#portfolio">
          <span className="why-proof-number">{portfolioCount}</span>
          <span><strong>โปรเจกต์ในพอร์ต</strong><small>ดูผลงานที่ผ่านมา <ArrowUpRight size={14} aria-hidden="true" /></small></span>
        </a>
        <p className="why-proof-note"><Gauge size={17} aria-hidden="true" /> วางแผนจากสิ่งที่ธุรกิจต้องการจริง</p>
      </div>
      <div className="benefit-grid">
        {benefits.map(({ icon: Icon, title, text }, index) => (
          <article className="benefit-card" key={title}>
            <div className="benefit-card-top"><span>0{index + 1}</span><Icon size={21} strokeWidth={1.5} aria-hidden="true" /></div>
            <h3>{title}</h3>
            <p>{text}</p>
            <Check className="benefit-check" size={15} aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}

export { articles };
export { EditorialArticles as ArticlesSection } from './editorial-articles';
