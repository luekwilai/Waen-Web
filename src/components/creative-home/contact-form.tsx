'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { z } from 'zod';
import { ArrowUpRight, ChevronDown, Mail } from 'lucide-react';
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
  const [errors, setErrors] = useState<Record<string,string>>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{if(feedback?.ok)successRef.current?.focus();},[feedback?.ok]);
  async function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true); setFeedback(null);
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const nextErrors: Record<string,string> = {};
    if (!String(values.name || '').trim()) nextErrors.name = 'กรุณาบอกชื่อของคุณ';
    if (!String(values.email || '').trim()) nextErrors.email = 'กรุณาใส่อีเมลสำหรับติดต่อกลับ';
    else if (!z.email().safeParse(String(values.email).trim()).success) nextErrors.email = 'อีเมลนี้ดูเหมือนไม่ถูกต้อง';
    if (String(values.details || '').trim().length < 10) nextErrors.details = 'เล่าเพิ่มเติมอย่างน้อย 10 ตัวอักษร';
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); setPending(false); const first = form.elements.namedItem(Object.keys(nextErrors)[0]); if (first instanceof HTMLElement) { first.focus({preventScroll:true}); first.scrollIntoView({block:"center"}); } return; }
    setErrors({});
    const payload: Record<string, unknown> = values;
    payload.email = String(payload.email || '').trim();
    payload.message = payload.details;
    if (selection) payload.selection = selection;
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) { const message=response.status===429?'ส่งข้อมูลบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่':response.status>=500?'ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง':'ตรวจสอบข้อมูลอีกครั้งแล้วลองใหม่'; throw new Error(message); }
      form.reset();
      setFeedback({ ok: true, emailSent: result.emailSent === true, text: result.emailSent === true ? 'ได้รับข้อมูลแล้ว เราจะติดต่อกลับทางอีเมล' : 'ได้รับข้อมูลแล้ว แต่การแจ้งเตือนทางอีเมลยังไม่สำเร็จ เราจะตรวจสอบให้เร็วที่สุด' });
    } catch (error) { setFeedback({ ok: false, text: error instanceof TypeError ? 'เชื่อมต่อไม่สำเร็จ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่ ข้อมูลที่กรอกยังอยู่ครบ' : error instanceof Error ? error.message : 'ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง' }); }
    finally { setPending(false); }
  }
return <div className="ww-enquiry">
    <div className="ww-enquiry-intro"><span className="eyebrow">START A CONVERSATION</span><h2 id="enquiry-heading" tabIndex={-1}>เล่าโปรเจกต์<br /><span>ที่คุณอยากทำ.</span></h2><p>เริ่มคุยกันได้ด้วยชื่อ อีเมล และไอเดียสั้น ๆ ยังไม่ต้องเลือกแพ็กเกจหรือรู้รายละเอียดทั้งหมด เราช่วยแนะนำได้</p><div className="ww-enquiry-contact-links"><a href="mailto:thawatsak28@gmail.com"><Mail size={18} /> thawatsak28@gmail.com</a><a href="https://line.me/ti/p/~thawatsak" target="_blank" rel="noreferrer"><span className="ww-enquiry-line-mark" aria-hidden="true">LINE</span> thawatsak <ArrowUpRight size={16} /></a></div></div>
    {feedback?.ok ? <div ref={successRef} className="ww-enquiry-success" role="status" tabIndex={-1}><h3>ส่งข้อมูลเรียบร้อยแล้ว</h3><p>{feedback.text}</p><button type="button" onClick={()=>{setFeedback(null);requestAnimationFrame(()=>nameRef.current?.focus());}}>เขียนข้อความใหม่</button></div> : <form className="ww-enquiry-form" aria-busy={pending} noValidate onSubmit={prepare} onChange={(event)=>{const name=(event.target as unknown as HTMLInputElement).name;if(name)setErrors(previous=>{if(!previous[name])return previous;const next={...previous};delete next[name];return next;});}}><fieldset disabled={pending} style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>{selection && <details className="ww-enquiry-selection"><summary><strong>{title}<small>ดูรายละเอียดแพ็กเกจ</small></strong><span>ราคาเบื้องต้น ฿{total?.toLocaleString('th-TH')} · ไม่รวม Hosting และ Domain</span><ChevronDown size={18} aria-hidden="true" /></summary><ul>{lines.map((line,index)=><li key={index}>{line}</li>)}</ul><div className="ww-enquiry-selection-actions"><button type="button" onClick={onChangePackage}>เปลี่ยนแพ็กเกจ</button>{selection.kind==='custom'&&<button type="button" onClick={onEdit}>แก้ไขรายละเอียด</button>}<button type="button" onClick={onRemove}>นำออก</button></div></details>}
<div className="ww-enquiry-fields">
        <label htmlFor="enquiry-name">ชื่อผู้ติดต่อ <span>*</span><Input ref={nameRef} id="enquiry-name" name="name" autoComplete="name" required maxLength={100} placeholder="เช่น คุณแพร" aria-invalid={!!errors.name} aria-describedby={errors.name?'enquiry-name-error':undefined} />{errors.name&&<small id="enquiry-name-error" className="ww-enquiry-error">{errors.name}</small>}</label>
        <label htmlFor="enquiry-email">อีเมลติดต่อกลับ <span>*</span><Input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email?'enquiry-email-error':undefined} />{errors.email&&<small id="enquiry-email-error" className="ww-enquiry-error">{errors.email}</small>}</label>
        <label className="ww-enquiry-required-details" htmlFor="enquiry-details">เล่าเว็บไซต์ที่คุณต้องการ <span>*</span><Textarea id="enquiry-details" name="details" required minLength={10} maxLength={2000} rows={4} placeholder="อยากทำเว็บไซต์ประเภทไหน หรืออยากให้ช่วยแก้ปัญหาอะไร" aria-invalid={!!errors.details} aria-describedby={errors.details?'enquiry-details-error':'enquiry-details-hint'} />{errors.details&&<small id="enquiry-details-error" className="ww-enquiry-error">{errors.details}</small>}<small id="enquiry-details-hint" className="ww-enquiry-hint">เล่าเท่าที่สะดวก เดี๋ยวเราช่วยถามต่อเอง</small></label>
        <details className="ww-enquiry-optional"><summary>ข้อมูลเพิ่มเติม (ไม่บังคับ)</summary><div className="ww-enquiry-fields">
        <label htmlFor="enquiry-contact">โทรศัพท์ / LINE<Input id="enquiry-contact" name="contact" maxLength={100} placeholder="เบอร์โทรหรือ LINE ID" /></label>
        <label htmlFor="enquiry-business">ธุรกิจ / แบรนด์<Input id="enquiry-business" name="business" autoComplete="organization" maxLength={120} placeholder="ชื่อธุรกิจของคุณ" /></label>
        <label htmlFor="enquiry-budget">งบประมาณโดยประมาณ<Input id="enquiry-budget" name="budget" maxLength={100} placeholder="เช่น 25,000 บาท หรือขอคำแนะนำ" /></label>
        <label htmlFor="enquiry-timeline">อยากเริ่มหรือใช้งานเมื่อไร<Input id="enquiry-timeline" name="timeline" maxLength={100} placeholder="เช่น ภายใน 2 เดือน" /></label>
        </div></details>
      </div>
      <button className="ww-enquiry-customize" type="button" onClick={(event) => onCustomize(event.currentTarget)}>อยากปรับแพ็กเกจเอง? เปิดตัวคำนวณราคา <ArrowUpRight size={19} aria-hidden="true" /></button>
      <p className="ww-enquiry-note">ข้อมูลของคุณจะถูกใช้เพื่อประเมินขอบเขตงานและติดต่อกลับเท่านั้น อ่านเพิ่มเติมได้ที่ <a href="/privacy-policy">นโยบายความเป็นส่วนตัว</a></p>
            <button className="ww-enquiry-submit" type="submit" disabled={pending}>{pending ? 'กำลังส่งข้อมูล…' : 'ส่งข้อมูลให้เรา'} <ArrowUpRight size={20} /></button>
      {feedback && <p className="ww-enquiry-feedback" role="status">{feedback.text}</p>}
</fieldset></form>}
  </div>;
}
