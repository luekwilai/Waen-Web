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
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; emailSent?: boolean; text: string } | null>(null);
  useEffect(()=>setFeedback(null),[selection]);
  async function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true); setFeedback(null);
    const form = event.currentTarget;
    const payload: Record<string, unknown> = Object.fromEntries(new FormData(form).entries());
    payload.message = payload.details;
    if (selection) payload.selection = selection;
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof result.error === 'string' ? result.error : 'ส่งข้อมูลไม่สำเร็จ');
      form.reset();
      setFeedback({ ok: true, emailSent: result.emailSent === true, text: result.emailSent === true ? 'ได้รับข้อมูลแล้ว เราจะติดต่อกลับทางอีเมล' : 'ได้รับข้อมูลแล้ว แต่การแจ้งเตือนทางอีเมลยังไม่สำเร็จ เราจะตรวจสอบให้เร็วที่สุด' });
    } catch (error) { setFeedback({ ok: false, text: error instanceof Error ? error.message : 'ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง' }); }
    finally { setPending(false); }
  }
return <div className="ww-enquiry">
    <div className="ww-enquiry-intro"><span className="eyebrow">START A CONVERSATION</span><h2 id="enquiry-heading" tabIndex={-1}>เล่าโปรเจกต์<br /><span>ที่คุณอยากทำ.</span></h2><p>บอกเราเกี่ยวกับธุรกิจและเว็บไซต์ที่ต้องการ เพื่อช่วยวางขอบเขตงานและประเมินราคาเบื้องต้น</p><div className="ww-enquiry-contact-links"><a href="mailto:thawatsak28@gmail.com"><Mail size={18} /> thawatsak28@gmail.com</a><a href="https://line.me/ti/p/~thawatsak" target="_blank" rel="noreferrer"><span className="ww-enquiry-line-mark" aria-hidden="true">LINE</span> thawatsak <ArrowUpRight size={16} /></a></div></div>
    <form className="ww-enquiry-form" onSubmit={prepare}><fieldset disabled={pending} style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>{selection && <aside className="ww-enquiry-selection" aria-label="แพ็กเกจที่เลือก"><div><strong>{title}</strong><b>฿{total?.toLocaleString('th-TH')}</b></div><ul>{lines.map((line,index)=><li key={index}>{line}</li>)}</ul><p>ราคาเบื้องต้น ไม่รวม Hosting และ Domain</p><div className="ww-enquiry-selection-actions"><button type="button" onClick={onChangePackage}>เปลี่ยนแพ็กเกจ</button>{selection.kind==='custom'&&<button type="button" onClick={onEdit}>แก้ไขรายละเอียด</button>}<button type="button" onClick={onRemove}>นำออก</button></div></aside>}
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
      <p className="ww-enquiry-note">ข้อมูลของคุณจะถูกใช้เพื่อประเมินขอบเขตงานและติดต่อกลับเท่านั้น อ่านเพิ่มเติมได้ที่ <a href="/privacy-policy">นโยบายความเป็นส่วนตัว</a></p>
            <button className="ww-enquiry-submit" type="submit" disabled={pending}>{pending ? 'กำลังส่งข้อมูล…' : 'ส่งข้อมูลให้เรา'} <ArrowUpRight size={20} /></button>
      {feedback && <p className="ww-enquiry-feedback" role="status">{feedback.text}</p>}
</fieldset></form>
  </div>;
}
