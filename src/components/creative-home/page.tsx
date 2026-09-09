'use client';
import { useState, useRef, useEffect } from 'react';
import type { EnquirySelection } from './enquiry-selection';
import SiteHeader from './site-header';
import { ArrowUpRight, ArrowDown, ArrowRight, Check, Code2, Globe2, ShoppingBag, Search, Smartphone, ShieldCheck, Wrench, Clock3, Rocket, Layers3, MousePointer2, ScanLine, Braces, MessageCircle, PenTool, Send, Atom, CircuitBoard } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/creative-home/ui/accordion';
import Laptop from './laptop';
import Motion from './motion';
import ParticleBackground from './particle-background';
import QuoteCalculator from './quote-calculator';
import Portfolio from './portfolio';
import WorkProcess from './work-process';
import ContactForm from './contact-form';
import { ArticlesSection } from './studio-content';
import SiteFooter from './site-footer';
import type { SectionParticleConfig } from './particle-config';
const line='https://line.me/ti/p/~thawatsak';
const services=[
 {icon:Smartphone,image:'/creative-home/images/services/responsive.webp',alt:'อุปกรณ์ดิจิทัลสีเขียวและงาช้างแสดงเว็บไซต์ที่ปรับตามหน้าจอ',title:'สวยในทุกหน้าจอ',en:'RESPONSIVE DESIGN',text:'ออกแบบให้ใช้งานลื่นไหล ทั้งบนคอมพิวเตอร์ แท็บเล็ต และมือถือ'},
 {icon:Search,image:'/creative-home/images/services/seo.webp',alt:'อุปกรณ์ดิจิทัลสีเขียวและงาช้างพร้อมกราฟการค้นหาเว็บไซต์',title:'พร้อมให้คนค้นเจอ',en:'SEO OPTIMIZATION',text:'วางโครงสร้าง SEO และปรับความเร็ว เพื่อเพิ่มโอกาสเข้าถึงลูกค้าใหม่'},
 {icon:ShoppingBag,image:'/creative-home/images/services/ecommerce.webp',alt:'อุปกรณ์ดิจิทัลสีเขียวและงาช้างแสดงร้านค้าออนไลน์และสินค้า',title:'เปิดร้านได้บนเว็บคุณ',en:'E-COMMERCE',text:'จัดการสินค้า ออเดอร์ และการชำระเงิน ด้วยร้านค้าออนไลน์ที่ดูแลเองได้'},
 {icon:ShieldCheck,image:'/creative-home/images/services/privacy.webp',alt:'อุปกรณ์ดิจิทัลสีเขียวและงาช้างพร้อมหน้าต่างยินยอมข้อมูลส่วนตัว',title:'ใส่ใจข้อมูลลูกค้า',en:'PRIVACY & CONSENT',text:'ติดตั้ง Cookie Consent และหน้าข้อมูลความเป็นส่วนตัวสำหรับเว็บไซต์'},
 {icon:Wrench,image:'/creative-home/images/services/support.webp',alt:'อุปกรณ์ดิจิทัลสีเขียวและงาช้างสำหรับการดูแลและสนับสนุนเว็บไซต์',title:'มีคนช่วยดูแลต่อ',en:'AFTER-SALES SUPPORT',text:'อัปเดตระบบ แก้ไขปัญหา และให้คำแนะนำ หลังเว็บไซต์ของคุณเปิดใช้งาน'},
 {icon:Clock3,image:'/creative-home/images/services/timeline.webp',alt:'อุปกรณ์ดิจิทัลสีเขียวและงาช้างพร้อมเส้นเวลาแสดงขั้นตอนโครงการ',title:'รู้ทุกขั้นตอนของงาน',en:'CLEAR TIMELINE',text:'วางแผนร่วมกันตั้งแต่เริ่ม พร้อมกำหนดส่งมอบที่ตกลงกันอย่างชัดเจน'},
];
const packages=[
 {name:'Startup',price:'16,000',desc:'เริ่มต้นตัวตนออนไลน์ให้ธุรกิจ',time:'15 วัน',features:['เว็บไซต์ไม่เกิน 3 หน้า','รองรับมือถือและแท็บเล็ต','ดูแลฟรี 3 เดือน','แก้ไขได้ 1 จุดใหญ่','ติดตั้งเครื่องมือรองรับ PDPA']},
 {name:'Business',price:'25,900',desc:'ยกระดับเว็บไซต์บริษัทให้เติบโต',time:'30 วัน',features:['เว็บไซต์ไม่เกิน 5 หน้า','รองรับมือถือและแท็บเล็ต','วางโครงสร้าง SEO พื้นฐาน','ดูแลฟรี 3 เดือน','แก้ไขได้ 3 จุดใหญ่']},
 {name:'E-Commerce',price:'35,900',desc:'เปลี่ยนผู้เข้าชมให้เป็นลูกค้า',time:'45 วัน',features:['เว็บไซต์ไม่เกิน 5 หน้าหลัก','รองรับมือถือและแท็บเล็ต','ระบบตะกร้าสินค้า 10 SKU','วางโครงสร้าง SEO','แก้ไขได้ 5 จุดใหญ่']},
];
const questions=[
 ['ต้องเตรียมอะไรบ้างก่อนเริ่มทำเว็บไซต์?','เตรียมโลโก้ ข้อความที่ต้องการสื่อสาร รูปภาพสินค้าหรือบริการ และชื่อโดเมนที่ต้องการ หากยังไม่มี เราช่วยแนะนำและวางแผนร่วมกันได้'],
 ['ทำเว็บไซต์ใช้เวลานานแค่ไหน?','ตามตารางแพ็กเกจ Startup ใช้เวลา 15 วัน, Business 30 วัน และ E-Commerce 45 วัน โดยยืนยันกำหนดการและความพร้อมของเนื้อหาร่วมกันก่อนเริ่มงาน'],
 ['ชำระเงินอย่างไร?','แบ่งชำระ 2 งวด: 50% ก่อนเริ่มงาน และอีก 50% เมื่องานเสร็จสมบูรณ์ก่อนส่งมอบ ผ่านการโอนเงินหรือ QR PromptPay'],
 ['มีค่าใช้จ่ายรายปีไหม?','มีค่า Hosting และโดเมนรายปี คุณสามารถจัดการเองหรือให้เราช่วยดูแลได้ โดยประเมินค่าใช้จ่ายให้ทราบก่อนตัดสินใจ'],
 ['ราคาแพ็กเกจและงานสั่งทำเริ่มต้นเท่าไร?','แพ็กเกจ Startup เริ่มต้นที่ 16,000 บาท ส่วนงานสั่งทำเริ่มต้นที่ 10,000 บาท โดยราคาไม่รวม Hosting และ Domain และยืนยันขอบเขตงานก่อนเริ่มโปรเจกต์'],
 ['แก้ไขงานและดูแลหลังส่งมอบอย่างไร?','จำนวนจุดแก้ไขใหญ่เป็นไปตามแพ็กเกจ: Startup 1 จุด, Business 3 จุด และ E-Commerce 5 จุด โดย Startup และ Business มีบริการดูแลฟรี 3 เดือนตามขอบเขตแพ็กเกจ'],
 ['เว็บไซต์ร้านค้าเชื่อมต่อ WooCommerce หรือ Payment Gateway ได้ไหม?','สามารถวางระบบ WooCommerce และเชื่อมต่อ Payment Gateway ได้ โดยรายละเอียดผู้ให้บริการ ขอบเขตฟีเจอร์ และค่าใช้จ่ายยืนยันแยกกันก่อนเริ่มงาน'],
 ['ทำ SEO แล้วเว็บไซต์จะติดอันดับแน่นอนไหม?','เราวางโครงสร้าง SEO ตามขอบเขตของแต่ละแพ็กเกจ แต่ผลการจัดอันดับขึ้นอยู่กับหลายปัจจัย จึงไม่รับประกันอันดับบน Search Engine'],
];
export default function Home({ canCustomizeBackground = false, initialParticleConfig = {} }: { canCustomizeBackground?: boolean; initialParticleConfig?: SectionParticleConfig }){
 const quoteReturnFocus=useRef<HTMLElement|null>(null);
 const [selection,setSelection]=useState<EnquirySelection|null>(null);
 const [quoteOpen,setQuoteOpen]=useState(false);
 const [pageInput,setPageInput]=useState('3');
 const [selectedFeatures,setSelectedFeatures]=useState<string[]>([]);
 const [compactPricing,setCompactPricing]=useState(false);
 useEffect(()=>{const media=window.matchMedia('(max-width: 600px)');const update=()=>setCompactPricing(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 const goToForm=()=>{const el=document.getElementById('enquiry-heading');el?.focus({preventScroll:true});el?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});};
 const changePackage=()=>{const el=document.getElementById('pricing');el?.scrollIntoView({behavior:'smooth'});document.querySelector<HTMLButtonElement>('.price-card button')?.focus({preventScroll:true});};

 return <div className="creative-home"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800&display=swap" /><ParticleBackground canCustomizeBackground={canCustomizeBackground} initialConfig={initialParticleConfig}/><Motion/><a className="skip-link" href="#main">ข้ามไปเนื้อหา</a>
 <SiteHeader canCustomizeBackground={canCustomizeBackground}/>
 <main id="main"><section className="hero" id="hero" data-particle-label="หน้าแรก"><div className="hero-topline"><span className="eyebrow"><span className="status-dot"/> AVAILABLE FOR YOUR NEXT PROJECT</span><span className="edition">DESIGN. DEVELOP. DELIVER.</span></div><div className="hero-copy"><div className="intro">WEB DESIGN & DEVELOPMENT STUDIO</div><h1>จากไอเดียของคุณ<br/><span>สู่เว็บไซต์ที่ใช่.</span></h1><p>สร้างเว็บไซต์ที่เป็นตัวคุณ และทำงานให้ธุรกิจคุณ<br className="desktop-break"/> ตั้งแต่ดีไซน์บรรทัดแรก ถึงวันที่พร้อมเติบโตไปด้วยกัน</p><div className="hero-actions"><a className="button primary" href="#contact">คุยเรื่องเว็บไซต์ของคุณ <ArrowUpRight size={19}/></a><a className="button text-button" href="#pricing">ดูแพ็กเกจ <ArrowRight size={18}/></a></div><div className="hero-proof"><span><PenTool size={15}/> ออกแบบเพื่อแบรนด์คุณ</span><span><Code2 size={16}/> พัฒนาอย่างใส่ใจ</span></div></div><div className="model-area"><Laptop/><div className="model-caption"><span>01 / FROM CODE TO EXPERIENCE</span><span>ลากเพื่อหมุนโมเดล <ArrowUpRight size={14}/></span></div></div><div className="hero-bottom"><span>CRAFTED WITH CARE. BUILT FOR YOU.</span><a href="#services">เลื่อนเพื่อรู้จักเรา <ArrowDown size={15}/></a></div></section>
 <div className="tech-strip"><span>OUR TOOLBOX</span><strong><Globe2/> WordPress</strong><strong><Atom/> React</strong><strong>Next.js</strong><strong><span className="ts-mark">TS</span> TypeScript</strong><strong><span className="tailwind-mark">≈</span> Tailwind CSS</strong></div>
 <Portfolio/><section className="section services" id="services" data-particle-label="บริการ"><div className="section-heading"><div><span className="eyebrow muted">01 — WHAT WE DO</span><h2>เว็บที่ดี ต้องมีมากกว่า<br/><span className="text-muted">แค่หน้าตาที่สวย.</span></h2></div><p>เรารวมงานออกแบบ การพัฒนา และการดูแล<br/>ไว้ในที่เดียว เพื่อให้คุณโฟกัสกับธุรกิจได้เต็มที่</p></div><div className="service-grid">{services.map((s,i)=><article className="service" key={s.en}><div className="service-visual"><img className="service-image" src={s.image} alt={s.alt} loading="lazy" decoding="async" width={1536} height={1024}/><div className="service-overlay"><div className="service-icon"><s.icon strokeWidth={1.4} size={19} aria-hidden="true"/></div><span>0{i+1}</span></div></div><span className="small-label">{s.en}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>
 <WorkProcess/>
 <span id="packages" aria-hidden="true" className="creative-home-anchor" /><section className="section pricing" id="pricing" data-particle-label="แพ็กเกจ"><div className="section-heading"><div><span className="eyebrow muted">03 — SIMPLE PRICING</span><h2>เลือกจุดเริ่มต้น<br/><span className="text-muted">ที่เหมาะกับคุณ.</span></h2></div><p>ขอบเขตชัดเจน วางแผนงบได้ตั้งแต่ต้น<br/>เลือกแพ็กเกจ หรือจัดฟีเจอร์และคำนวณราคาเอง</p></div><QuoteCalculator open={quoteOpen} onOpenChange={(open)=>{if(open)quoteReturnFocus.current=null;setQuoteOpen(open);}} returnFocus={quoteReturnFocus} pageInput={pageInput} setPageInput={setPageInput} selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures} onSelect={setSelection} onContinue={goToForm}/><div className="price-grid">{packages.map((p,i)=><article className={'price-card '+(i===1?'featured':'')} key={p.name}>{i===1&&<span className="popular">แนะนำสำหรับธุรกิจ <ArrowUpRight size={18} aria-hidden="true"/></span>}<div className="plan-top"><span className="plan-number">0{i+1} /</span><span className="plan-icon">{i===0?<Globe2 aria-hidden="true"/>:i===1?<Rocket/>:<ShoppingBag/>}</span></div><h3>{p.name}</h3><p className="plan-desc">{p.desc}</p><div className="price"><span>฿</span>{p.price}</div><div className="plan-time"><Clock3 size={14}/> ระยะเวลา {p.time}</div><button type="button" onClick={()=>{setSelection({kind:'package',name:p.name,total:Number(p.price.replaceAll(',','')),features:p.features});goToForm();}} className={'button '+(i===1?'primary':'outline')}>ปรึกษาแพ็กเกจนี้ <ArrowUpRight size={18}/></button><details className="price-features" open={!compactPricing}><summary>ดูรายละเอียดแพ็กเกจ · {p.features[0]} <ArrowDown size={15} aria-hidden="true" /></summary><ul>{p.features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul></details></article>)}</div><p className="pricing-note">ราคาแพ็กเกจไม่รวม Hosting และ Domain · ยืนยันขอบเขตงานก่อนเริ่มโปรเจกต์</p></section>
 <ArticlesSection/><section className="section faq" id="faq" data-particle-label="คำถามที่พบบ่อย"><div><span className="faq-symbol" aria-hidden="true"><MessageCircle size={29}/></span><span className="eyebrow muted">04 — GOOD TO KNOW</span><h2>เผื่อคุณ<br/><span className="text-muted">กำลังสงสัย.</span></h2><p>ยังมีคำถามอื่นอยู่ไหม?<br/><a href={line} target="_blank" rel="noreferrer">ทักมาคุยกับเราได้เลย <ArrowUpRight size={16}/></a></p></div><Accordion className="faq-list">{questions.map(([q,a],i)=><AccordionItem key={q} value={i}><AccordionTrigger className="faq-question">{q}</AccordionTrigger><AccordionContent className="faq-answer">{a}</AccordionContent></AccordionItem>)}</Accordion></section>
 <section className="contact section" id="contact" data-particle-label="ติดต่อเรา"><ContactForm selection={selection} onRemove={()=>setSelection(null)} onChangePackage={changePackage} onEdit={()=>{if(selection?.kind==='custom'){quoteReturnFocus.current=document.activeElement as HTMLElement;setPageInput(String(selection.pageCount));setSelectedFeatures([...selection.featureIds]);setQuoteOpen(true);}}} onCustomize={(button)=>{quoteReturnFocus.current=button;setQuoteOpen(true);}}/><div className="contact-bottom"><p>เล่าไอเดียให้เราฟัง ปรึกษาและประเมินราคาฟรี</p><a href={line} target="_blank" rel="noreferrer">LINE: thawatsak <ArrowUpRight size={17}/></a><a href="mailto:thawatsak28@gmail.com">thawatsak28@gmail.com <ArrowUpRight size={17}/></a></div></section>
 </main><SiteFooter/></div>;
}
