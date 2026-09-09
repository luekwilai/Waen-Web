'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { z } from 'zod';
import { ArrowRight, Circle, CircleCheck, FileText, BriefcaseBusiness, ShoppingCart, Settings2, MessageCircle, LockKeyhole } from 'lucide-react';
import { Input } from '@/components/creative-home/ui/input';
import { Textarea } from '@/components/creative-home/ui/textarea';
import type { EnquirySelection } from './enquiry-selection';
import { calculateQuote } from './calculator-model';

type PackageOption = { name:string; price:string; desc:string; time:string; features:string[] };
export default function ContactForm({selection,onSelect,onRemove,onEdit,onCustomize,packageOptions}:{selection:EnquirySelection|null;onSelect:(selection:EnquirySelection|null)=>void;onRemove:()=>void;onEdit:()=>void;onCustomize:(button:HTMLButtonElement)=>void;packageOptions:PackageOption[]}) {
  const quote=selection?.kind==='custom'?calculateQuote(selection.pageCount,selection.featureIds):null;
  const title=selection?.kind==='package'?selection.name:'Custom';
  const total=selection?.kind==='package'?selection.total:quote?.total;
  const lines=selection?.kind==='package'?selection.features:quote?[`${quote.pageCount} หน้า`,...quote.items.map(item=>`${item.label}: ฿${item.amount.toLocaleString('th-TH')}`)]:[];
  const [adviceSelected,setAdviceSelected]=useState(false);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; emailSent?: boolean; text: string } | null>(null);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const icons=[FileText,BriefcaseBusiness,ShoppingCart];
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
    for (const [key,label] of [['contact','โทรศัพท์หรือ LINE'],['business','ชื่อธุรกิจหรือแบรนด์'],['budget','งบประมาณ หรือระบุว่าขอคำแนะนำ'],['timeline','ช่วงเวลา หรือระบุว่ายังไม่แน่ใจ']]) { if (!String(values[key] || '').trim()) nextErrors[key] = `กรุณาระบุ${label}`; }
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); setPending(false); const first = Array.from(form.elements).find(element => element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement ? !!nextErrors[element.name] : false); if (first instanceof HTMLElement) { first.focus({preventScroll:true}); first.scrollIntoView({block:"center"}); } return; }
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

  function field(name:string,label:string,placeholder:string,maxLength:number,autoComplete?:string,type='text') {
    return <label htmlFor={`enquiry-${name}`}>{label} <span>*</span><Input ref={name==='name'?nameRef:undefined} id={`enquiry-${name}`} name={name} type={type} autoComplete={autoComplete} required maxLength={maxLength} placeholder={placeholder} aria-invalid={!!errors[name]} aria-describedby={errors[name]?`enquiry-${name}-error`:undefined}/>{errors[name]&&<small id={`enquiry-${name}-error`} className="ww-enquiry-error">{errors[name]}</small>}</label>;
  }
  return <div className="ww-enquiry">
    <aside className="ww-enquiry-package-rail" aria-label="เลือกแพ็กเกจ">
      <span className="ww-enquiry-step">01 / เลือกแพ็กเกจ</span>
      <h2>เลือกแพ็กเกจที่เหมาะกับคุณ</h2><p>เริ่มจากแพ็กเกจที่สนใจ หรือให้เราช่วยแนะนำ</p>
      <div className="ww-enquiry-plan-list">
        {packageOptions.map((option,index)=>{const selected=selection?.kind==='package'&&selection.name===option.name;const Icon=icons[index]||FileText;return <button key={option.name} type="button" disabled={pending} className={`ww-enquiry-plan ${selected?'is-selected':''}`} aria-pressed={selected} onClick={()=>{setAdviceSelected(false);onSelect({kind:'package',name:option.name,total:Number(option.price.replaceAll(',','')),features:option.features});}}>{selected?<CircleCheck size={20}/>:<Circle size={20}/>}<Icon size={24}/><span className="ww-enquiry-plan-copy"><strong>{option.name}</strong><small>{option.desc}</small></span><b>฿{option.price}</b></button>;})}
        <button type="button" disabled={pending} className={`ww-enquiry-plan ${selection?.kind==='custom'?'is-selected':''}`} aria-pressed={selection?.kind==='custom'} onClick={event=>selection?.kind==='custom'?onEdit():onCustomize(event.currentTarget)}>{selection?.kind==='custom'?<CircleCheck size={20}/>:<Circle size={20}/>}<Settings2 size={24}/><span className="ww-enquiry-plan-copy"><strong>Custom</strong><small>เลือกจำนวนหน้าและฟีเจอร์เอง</small></span><b>ปรับเอง</b></button>
        <button type="button" disabled={pending} className={`ww-enquiry-plan ${!selection&&adviceSelected?'is-selected':''}`} aria-pressed={!selection&&adviceSelected} onClick={()=>{setAdviceSelected(true);onRemove();}}>{!selection&&adviceSelected?<CircleCheck size={20}/>:<Circle size={20}/>}<MessageCircle size={24}/><span className="ww-enquiry-plan-copy"><strong>ขอคำแนะนำ</strong><small>ยังไม่แน่ใจ ให้เราช่วยเลือก</small></span><b>ปรึกษาฟรี</b></button>
      </div>
      <div className="ww-enquiry-estimate" aria-live="polite"><span>{selection?`ประมาณราคา · ${title}`:'ยังไม่ต้องตัดสินใจตอนนี้'}</span><b>{selection?`฿${total?.toLocaleString('th-TH')}`:'คุยกันก่อนได้'}</b><small>{selection?'ราคาเบื้องต้น ไม่รวม Hosting และ Domain':'เราช่วยประเมินขอบเขตและแนะนำแพ็กเกจให้ได้'}</small>{selection&&<details><summary>รายละเอียดที่เลือก</summary><ul>{lines.map((line,index)=><li key={index}>{line}</li>)}</ul></details>}</div>
      <button className="ww-enquiry-customize" type="button" disabled={pending} onClick={event=>selection?.kind==='custom'?onEdit():onCustomize(event.currentTarget)}><Settings2 size={20}/><span>{selection?.kind==='custom'?'แก้ไขแพ็กเกจ Custom':'ออกแบบแพ็กเกจเอง'}</span><ArrowRight size={18}/></button>
    </aside>
    <div className="ww-enquiry-main">
      <span className="ww-enquiry-step">02 / เล่ารายละเอียด</span><h2 id="enquiry-heading" tabIndex={-1}>ส่งรายละเอียดโปรเจกต์</h2><p>บอกเราเกี่ยวกับเว็บไซต์ที่อยากทำ แล้วเราจะติดต่อกลับเพื่อคุยรายละเอียด</p>
      {feedback?.ok?<div ref={successRef} className="ww-enquiry-success" role="status" tabIndex={-1}><CircleCheck size={32}/><h3>ส่งข้อมูลเรียบร้อยแล้ว</h3><p>{feedback.text}</p><button type="button" onClick={()=>{setFeedback(null);requestAnimationFrame(()=>nameRef.current?.focus());}}>เขียนข้อความใหม่</button></div>:<form className="ww-enquiry-form" aria-busy={pending} noValidate onSubmit={prepare} onChange={event=>{const target=event.target;if(target instanceof HTMLInputElement||target instanceof HTMLTextAreaElement){const name=target.name;setErrors(previous=>{if(!previous[name])return previous;const next={...previous};delete next[name];return next;});}}}>
        <fieldset disabled={pending}><legend className="ww-enquiry-group-title">ข้อมูลติดต่อ</legend><div className="ww-enquiry-fields">
          {field('name','ชื่อผู้ติดต่อ','ชื่อของคุณ',100,'name')}{field('email','อีเมลติดต่อกลับ','you@company.com',180,'email','email')}
          {field('contact','โทรศัพท์ / LINE','เบอร์โทรหรือ LINE ID',100)}{field('business','ธุรกิจ / แบรนด์','ชื่อธุรกิจของคุณ',120,'organization')}
        </div></fieldset>
        <fieldset disabled={pending}><legend className="ww-enquiry-group-title">เว็บไซต์ที่ต้องการ</legend><div className="ww-enquiry-fields">
          {field('budget','งบประมาณของคุณ','เช่น 25,000 บาท หรือขอคำแนะนำ',100)}{field('timeline','อยากเริ่มเมื่อไร','เช่น ภายใน 2 เดือน หรือยังไม่แน่ใจ',100)}
          <label className="ww-enquiry-required-details" htmlFor="enquiry-details">รายละเอียดเว็บไซต์ <span>*</span><Textarea id="enquiry-details" name="details" required minLength={10} maxLength={2000} rows={4} placeholder="ประเภทเว็บไซต์ ฟีเจอร์ที่ต้องการ หรือเว็บตัวอย่างที่ชอบ" aria-invalid={!!errors.details} aria-describedby={errors.details?'enquiry-details-error':'enquiry-details-hint'}/>{errors.details&&<small id="enquiry-details-error" className="ww-enquiry-error">{errors.details}</small>}<small id="enquiry-details-hint" className="ww-enquiry-hint">เล่าสั้น ๆ ได้ เราช่วยถามรายละเอียดต่อ</small></label>
        </div></fieldset>
        <button className="ww-enquiry-submit" type="submit" disabled={pending}>{pending?'กำลังส่งข้อมูล…':'ส่งข้อความ'}<ArrowRight size={20}/></button>
        <p className="ww-enquiry-note"><LockKeyhole size={15} aria-hidden="true"/><span>ใช้ข้อมูลเพื่อประเมินงานและติดต่อกลับเท่านั้น <a href="/privacy-policy">นโยบายความเป็นส่วนตัว</a></span></p>
        {feedback&&<p className="ww-enquiry-feedback" role="alert">{feedback.text}</p>}
      </form>}
    </div>
  </div>;
}
