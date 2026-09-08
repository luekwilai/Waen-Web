'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Input } from '@/components/creative-home/ui/input';
import { Textarea } from '@/components/creative-home/ui/textarea';
import type { EnquirySelection } from './enquiry-selection';
import { calculateQuote } from './calculator-model';

export default function ContactForm({selection,onRemove,onChangePackage,onEdit,onCustomize}:{selection:EnquirySelection|null;onRemove:()=>void;onChangePackage:()=>void;onEdit:()=>void;onCustomize:(button:HTMLButtonElement)=>void}) {
  const quote=selection?.kind==='custom'?calculateQuote(selection.pageCount,selection.featureIds):null;
  const title=selection?.kind==='package'?selection.name:'Custom';
  const total=selection?.kind==='package'?selection.total:quote?.total;
  const lines=selection?.kind==='package'?selection.features:quote?[`${quote.pageCount} หน้า`,...quote.items.map(item=>`${item.label}: ฿${item.amount.toLocaleString('th-TH')}`)]:[];
  const [previewed, setPreviewed] = useState(false);
  useEffect(()=>setPreviewed(false),[selection]);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewed(true);
  }
return <div className="ww-enquiry">
    <div className="ww-enquiry-intro"><span className="eyebrow">START A CONVERSATION</span><h2 id="enquiry-heading" tabIndex={-1}>เล่าโปรเจกต์<br /><span>ที่คุณอยากทำ.</span></h2><p>บอกเราเกี่ยวกับธุรกิจและเว็บไซต์ที่ต้องการ เพื่อช่วยวางขอบเขตงานและประเมินราคาเบื้องต้น</p><div className="ww-enquiry-contact-links"><a href="mailto:thawatsak28@gmail.com"><Mail size={18} /> thawatsak28@gmail.com</a><a href="https://line.me/ti/p/~thawatsak" target="_blank" rel="noreferrer"><span className="ww-enquiry-line-mark" aria-hidden="true">LINE</span> thawatsak <ArrowUpRight size={16} /></a></div></div>
    <form className="ww-enquiry-form" onSubmit={prepare} onChange={() => setPreviewed(false)}>
      <p className="ww-enquiry-demo"><span>MOCKUP</span> แบบฟอร์มตัวอย่าง · ยังไม่ส่งอีเมลจริง</p>{selection && <aside className="ww-enquiry-selection" aria-label="แพ็กเกจที่เลือก"><div><strong>{title}</strong><b>฿{total?.toLocaleString('th-TH')}</b></div><ul>{lines.map((line,index)=><li key={index}>{line}</li>)}</ul><p>ราคาเบื้องต้น ไม่รวม Hosting และ Domain</p><div className="ww-enquiry-selection-actions"><button type="button" onClick={onChangePackage}>เปลี่ยนแพ็กเกจ</button>{selection.kind==='custom'&&<button type="button" onClick={onEdit}>แก้ไขรายละเอียด</button>}<button type="button" onClick={onRemove}>นำออก</button></div></aside>}
<div className="ww-enquiry-fields">
        <label htmlFor="enquiry-name">ชื่อผู้ติดต่อ <span>*</span><Input id="enquiry-name" name="name" autoComplete="name" required maxLength={100} placeholder="ชื่อของคุณ" /></label>
        <label htmlFor="enquiry-email">อีเมลติดต่อกลับ <span>*</span><Input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@company.com" /></label>
        <label htmlFor="enquiry-contact">โทรศัพท์ / LINE<Input id="enquiry-contact" name="contact" maxLength={100} placeholder="เบอร์โทรหรือ LINE ID" /></label>
        <label htmlFor="enquiry-business">ธุรกิจ / แบรนด์<Input id="enquiry-business" name="business" autoComplete="organization" maxLength={150} placeholder="ชื่อธุรกิจของคุณ" /></label>
        <label htmlFor="enquiry-budget">งบประมาณโดยประมาณ<Input id="enquiry-budget" name="budget" maxLength={100} placeholder="เช่น 25,000 บาท หรือขอคำแนะนำ" /></label>
        <label htmlFor="enquiry-timeline">อยากเริ่มหรือใช้งานเมื่อไร<Input id="enquiry-timeline" name="timeline" maxLength={100} placeholder="เช่น ภายใน 2 เดือน" /></label>
      </div>
      <label htmlFor="enquiry-details">เล่าเว็บไซต์ที่คุณต้องการ <span>*</span><Textarea id="enquiry-details" name="details" required minLength={10} maxLength={2000} rows={4} placeholder="อยากทำเว็บไซต์ประเภทไหน มีฟีเจอร์อะไรบ้าง หรือมีเว็บตัวอย่างที่ชอบไหม" /></label>
      <button className="ww-enquiry-customize" type="button" onClick={(event) => onCustomize(event.currentTarget)}>ออกแบบแพ็กเกจด้วยตัวเอง <ArrowUpRight size={19} aria-hidden="true" /></button>
      <p className="ww-enquiry-note">ลองกรอกเพื่อดูตัวอย่างการใช้งาน ข้อมูลจะไม่ถูกส่งหรือบันทึก หากต้องการติดต่อจริง ใช้อีเมลหรือ LINE ด้านล่าง</p>
            <button className="ww-enquiry-submit" type="submit">ทดลองส่งแบบฟอร์ม <ArrowUpRight size={20} /></button>
      {previewed && <p className="ww-enquiry-feedback" role="status">ตัวอย่าง: กรอกข้อมูลครบแล้ว {selection ? `${title} · ฿${total?.toLocaleString('th-TH')} — ${lines.join(' / ')}` : 'ยังไม่เลือกแพ็กเกจ'} · ยังไม่มีการส่งอีเมลหรือบันทึกข้อมูล</p>}
</form>
  </div>;
}
