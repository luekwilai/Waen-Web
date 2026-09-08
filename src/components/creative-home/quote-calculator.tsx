'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import {
  ArrowUpRight,
  CalendarClock,
  Check,
  Clipboard,
  FileText,
  Languages,
  Mail,
  Minus,
  Plus,
  Search,
  ShoppingBag,

  X,
} from 'lucide-react';
import { Checkbox } from '@/components/creative-home/ui/checkbox';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/creative-home/ui/sheet';
import { calculateQuote, clampPageCount, MAX_PAGE_COUNT, MIN_PAGE_COUNT, QUOTE_FEATURES } from './calculator-model';
import type { EnquirySelection } from './enquiry-selection';

const money = new Intl.NumberFormat('th-TH');
const formatMoney = (amount: number) => `฿${money.format(amount)}`;
const featureIcons = [Search, ShoppingBag, Languages, FileText, CalendarClock, Mail];

export default function QuoteCalculator({open,onOpenChange,pageInput,setPageInput,selectedFeatures,setSelectedFeatures,onSelect,onContinue,returnFocus}:{open:boolean;onOpenChange:(open:boolean)=>void;pageInput:string;setPageInput:React.Dispatch<React.SetStateAction<string>>;selectedFeatures:string[];setSelectedFeatures:React.Dispatch<React.SetStateAction<string[]>>;onSelect:(value:EnquirySelection)=>void;onContinue:()=>void;returnFocus:React.RefObject<HTMLElement|null>}) {
  const continuing=useRef(false);
  useEffect(()=>{if(open) continuing.current=false;},[open]);


  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const pageCount = clampPageCount(pageInput);
  const quote = useMemo(() => calculateQuote(pageCount, selectedFeatures), [pageCount, selectedFeatures]);
  const summary = useMemo(() => [`สรุปแพ็กเกจเว็บไซต์`, `จำนวนหน้า: ${quote.pageCount} หน้า`, ...quote.items.map((item) => `${item.label}: ${formatMoney(item.amount)}`), `รวมโดยประมาณ: ${formatMoney(quote.total)}`, `ไม่รวม Hosting และ Domain`, `หมายเหตุ: ราคาเบื้องต้น ต้องยืนยันขอบเขตก่อนเริ่มงาน`].join('\n'), [quote]);
  useEffect(() => { setCopied(false); setCopyFailed(false); }, [summary]);

  const adjustPages = (delta: number) => setPageInput(String(Math.min(MAX_PAGE_COUNT, Math.max(MIN_PAGE_COUNT, pageCount + delta))));
  const toggleFeature = (id: string, checked: boolean) => setSelectedFeatures((current) => checked ? Array.from(new Set([...current, id])) : current.filter((featureId) => featureId !== id));
  const reset = () => { setPageInput('3'); setSelectedFeatures([]); setCopied(false); };
  const copySummary = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true); setCopyFailed(false); }
    catch { setCopied(false); setCopyFailed(true); }
  };
  const continueToForm = () => { onSelect({kind:'custom',pageCount:quote.pageCount,featureIds:[...quote.featureIds]}); continuing.current=true; onOpenChange(false); };

  return (
    <div className="quote-proposal">
      <div className="quote-cta-panel" aria-labelledby="quote-cta-title">
        <div className="quote-cta-copy">
          <span className="quote-eyebrow">SIMPLE PRICING</span>
          <p className="quote-cta-overline">แพ็กเกจสำเร็จรูปยังไม่พอดี?</p>
          <h2 id="quote-cta-title">เลือกเองได้ ทุกหน้า ทุกฟีเจอร์</h2>
          <p>จัดชุดเว็บไซต์ให้เข้ากับเป้าหมายของคุณ พร้อมเห็นราคาเบื้องต้นทันที</p>
        </div>
        <Sheet open={open} onOpenChange={onOpenChange} onOpenChangeComplete={(isOpen)=>{if(!isOpen && continuing.current){onContinue();}}}>
          <div className="quote-cta-action">
          <SheetTrigger render={<button type="button" className="quote-customize-button" />}>
            <span>ออกแบบแพ็กเกจด้วยตัวเอง</span><ArrowUpRight size={21} aria-hidden="true" />
          </SheetTrigger>
          <span className="quote-live-badge"><span aria-hidden="true" /> คำนวณสด · เริ่มต้น ฿10,000</span>
          </div>
          <SheetContent finalFocus={()=>continuing.current ? false : returnFocus.current ?? undefined} side="right" showCloseButton={false} className="quote-drawer">
            <SheetHeader className="quote-drawer-header">
              <div><span className="quote-eyebrow">CUSTOM QUOTE</span><SheetTitle>เว็บไซต์ในแบบของคุณ</SheetTitle><SheetDescription>เลือกจำนวนหน้าและฟีเจอร์ที่ตรงกับธุรกิจของคุณ</SheetDescription></div>
              <SheetClose className="quote-drawer-close" aria-label="ปิดหน้าต่างปรับแต่งแพ็กเกจ"><X size={20} aria-hidden="true" /></SheetClose>
            </SheetHeader>
            <div className="quote-drawer-body">
              <div className="quote-steps" aria-label="ขั้นตอนการคำนวณราคา"><span className="is-active"><b>01</b> หน้าเว็บไซต์</span><i /><span className={selectedFeatures.length ? 'is-active' : ''}><b>02</b> ฟีเจอร์</span><i /><span><b>03</b> สรุป</span></div>
              <div className="quote-drawer-grid">
                <div className="quote-controls">
                  <div className="quote-field-heading"><label htmlFor="quote-pages-proposal">จำนวนหน้าเว็บไซต์</label><span>1–30 หน้า</span></div>
                  <div className="quote-stepper"><button type="button" disabled={pageCount === MIN_PAGE_COUNT} onClick={() => adjustPages(-1)} aria-label="ลดจำนวนหน้า"><Minus size={19} /></button><input id="quote-pages-proposal" type="number" min={MIN_PAGE_COUNT} max={MAX_PAGE_COUNT} value={pageInput} onChange={(event) => setPageInput(event.target.value === '' ? '' : String(clampPageCount(event.target.value)))} onBlur={() => setPageInput(String(pageCount))} aria-describedby="quote-pages-help-proposal" /><button type="button" disabled={pageCount === MAX_PAGE_COUNT} onClick={() => adjustPages(1)} aria-label="เพิ่มจำนวนหน้า"><Plus size={19} /></button></div>
                  <p id="quote-pages-help-proposal" className="quote-help">เริ่มต้น 10,000 บาท รวม 1 หน้า · หน้าที่ 2–3 เพิ่มหน้าละ 3,000 บาท · ตั้งแต่หน้าที่ 4 เพิ่มหน้าละ 2,000 บาท</p>
                  <div className="quote-feature-heading"><h3>ฟีเจอร์เสริม</h3><span>เลือกได้ตามต้องการ</span></div>
                  <div className="quote-features">{QUOTE_FEATURES.map((feature, index) => { const Icon = featureIcons[index % featureIcons.length]; const checked = selectedFeatures.includes(feature.id); return <label className={`quote-feature ${checked ? 'is-selected' : ''}`} key={feature.id}><span className="quote-feature-icon"><Icon size={20} aria-hidden="true" /></span><span className="quote-feature-copy"><strong>{feature.label}</strong><small>{feature.description}</small></span><span className="quote-feature-price">+{formatMoney(feature.price)}</span><Checkbox checked={checked} onCheckedChange={(value) => toggleFeature(feature.id, value === true)} aria-label={feature.label} /></label>; })}</div>
                  <p className="quote-included"><Check size={17} aria-hidden="true" /> รองรับมือถือและทุกหน้าจอ รวมอยู่แล้ว</p>
                </div>
                <aside className="quote-summary" aria-label="สรุปราคา"><div className="quote-summary-top"><div><span className="quote-summary-label">ราคาโดยประมาณ</span><strong aria-live="polite">{formatMoney(quote.total)}</strong></div><span className="quote-pill">ยังไม่รวมโฮสต์ / โดเมน</span></div><div className="quote-items">{quote.items.map((item) => <div className="quote-item" key={item.id}><span>{item.label}{item.detail && <small>{item.detail}</small>}</span><b>{formatMoney(item.amount)}</b></div>)}</div><p className="quote-note">ราคาเบื้องต้น ต้องยืนยันขอบเขตก่อนเริ่มงาน</p><div className="quote-actions"><button type="button" className="quote-button quote-button-primary" onClick={()=>{onSelect({kind:'custom',pageCount:quote.pageCount,featureIds:[...quote.featureIds]});continuing.current=true;onOpenChange(false);}}>นำแพ็กเกจนี้ไปสอบถาม <ArrowUpRight size={18}/></button><button type="button" className="quote-button quote-button-secondary" onClick={reset}>เริ่มใหม่</button><button type="button" className="quote-button quote-button-secondary" onClick={copySummary}><Clipboard size={16} />{copied ? 'คัดลอกแล้ว' : 'คัดลอกสรุป'}</button><a className="quote-button quote-button-primary" href="https://line.me/ti/p/~thawatsak" target="_blank" rel="noreferrer">คุยรายละเอียดใน LINE</a></div><p className="quote-copy-status" role="status">{copied ? 'คัดลอกรายการล่าสุดแล้ว' : copyFailed ? 'คัดลอกอัตโนมัติไม่ได้ กรุณาเลือกข้อความด้านล่างเพื่อคัดลอก' : ''}</p>{copyFailed && <textarea className="quote-copy-fallback" aria-label="สรุปราคาเบื้องต้นสำหรับคัดลอก" readOnly value={summary} onFocus={(event) => event.target.select()} />}</aside>
              </div>
            </div>
            <footer className="quote-mobile-footer" aria-label="ยอดรวมและดำเนินการต่อ"><div><span>ราคาโดยประมาณ</span><strong aria-live="polite">{formatMoney(quote.total)}</strong><small>ไม่รวม Hosting / Domain</small></div><button type="button" className="quote-button quote-button-primary" onClick={continueToForm}>นำแพ็กเกจนี้ไปสอบถาม <ArrowUpRight size={18}/></button></footer>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
