import { ArrowUpRight, Code2, Mail, MessageCircle } from 'lucide-react';

const line = 'https://line.me/ti/p/~thawatsak';

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="site-footer-main">
      <div className="site-footer-brand-block">
        <a href="/#" className="site-footer-brand"><span className="site-footer-mark"><Code2 size={19} aria-hidden="true" /></span>waenweb<sup>®</sup></a>
        <p>ออกแบบและพัฒนาเว็บไซต์ที่ตั้งใจทำเพื่อธุรกิจของคุณ</p>
      </div>
      <nav className="site-footer-nav" aria-label="ลิงก์เว็บไซต์">
        <div><span className="site-footer-label">EXPLORE</span><a href="/#services">บริการ</a><a href="/#process">ขั้นตอนการทำงาน</a><a href="/#portfolio">ผลงาน</a><a href="/#pricing">แพ็กเกจ</a></div>
        <div><span className="site-footer-label">READ & KNOW</span><a href="/#articles">บทความ</a><a href="/#faq">คำถามที่พบบ่อย</a><a href="https://waenweb.com/blog" target="_blank" rel="noreferrer">อ่านบทความทั้งหมด <ArrowUpRight size={13} aria-hidden="true" /></a><a href="/#contact">ติดต่อเรา</a></div>
        <div><span className="site-footer-label">LEGAL</span><a href="/privacy-policy">นโยบายความเป็นส่วนตัว</a><a href="/terms-of-use">เงื่อนไขการใช้งาน</a></div>
      </nav>
    </div>
    <div className="site-footer-bottom"><span>© {new Date().getFullYear()} WAENWEB. Made with intention.</span><div><a href={line} target="_blank" rel="noreferrer"><MessageCircle size={14} aria-hidden="true" /> LINE</a><a href="mailto:thawatsak28@gmail.com"><Mail size={14} aria-hidden="true" /> อีเมล</a><a href="/#hero">กลับด้านบน <ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
  </footer>;
}
