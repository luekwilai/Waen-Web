'use client';
import { useEffect, useRef, useState } from 'react';
import { Waves, Dna, Infinity as InfinityIcon, Box, Pyramid, Donut, Flower2, Bug, Diamond, Shell, ScatterChart, Orbit, Code2, CircleHelp, Circle, ChartNoAxesColumnIncreasing, Globe2, Heart, RotateCcw, Save, Settings2, Star, Workflow, X, ArrowDown } from 'lucide-react';
import { Slider } from '@/components/creative-home/ui/slider';
import { SHAPES, normalizeSettings, type ParticleShape, type ParticleSettings, type SectionParticleConfig } from './particle-config';
import { makeShape, type Shape } from './particle-shapes';
import { discoverParticleSections, transitionAt, sectionSettings, type ParticleSection } from './particle-sections';

const ICONS = {none:ScatterChart,wave:Waves,helix:Dna,infinity:InfinityIcon,cube:Box,pyramid:Pyramid,torus:Donut,flower:Flower2,butterfly:Bug,diamond:Diamond,spiral:Shell,galaxy:Orbit,code:Code2,process:Workflow,bars:ChartNoAxesColumnIncreasing,question:CircleHelp,w:null,heart:Heart,star:Star,globe:Globe2,ring:Circle};
const NAMES:Record<ParticleShape,string>={none:'None',wave:'คลื่น',helix:'เกลียวคู่',infinity:'อินฟินิตี้',cube:'ลูกบาศก์',pyramid:'พีระมิด',torus:'โดนัท',flower:'ดอกไม้',butterfly:'ผีเสื้อ',diamond:'เพชร',spiral:'เกลียว',galaxy:'กาแล็กซี',code:'โค้ด',process:'ขั้นตอน',bars:'แท่งระดับ',question:'คำถาม',w:'ตัว W',heart:'หัวใจ',star:'ดาว',globe:'ลูกโลก',ring:'วงแหวน'};
const CONTROLS = [
  {key:'count',label:'จำนวนจุดแสง',min:300,max:4000,step:50},
  {key:'size',label:'ขนาด / ความหนาของจุด',min:.5,max:3,step:.1},
  {key:'speed',label:'ความเร็วการเคลื่อนไหว',min:0,max:2,step:.05},
  {key:'motion',label:'ระยะการเคลื่อนไหว',min:0,max:1,step:.05},
  {key:'smoothness',label:'ความนุ่มนวลในการเปลี่ยนรูป',min:0,max:1,step:.05},
] as const;
export default function ParticleBackground({ canCustomizeBackground = false, initialConfig = {} }: { canCustomizeBackground?: boolean; initialConfig?: SectionParticleConfig }) {
  const host=useRef<HTMLDivElement>(null);
  const toggle=useRef<HTMLButtonElement>(null);
  const closeButton=useRef<HTMLButtonElement>(null);
  const [sections,setSections]=useState<ParticleSection[]>([]);
  const sectionsRef=useRef<ParticleSection[]>([]);
  const configRef=useRef<SectionParticleConfig>({});
  const [revision,setRevision]=useState(0);
  const [open,setOpen]=useState(false);
  const [selected,setSelected]=useState('');
  const [mobile,setMobile]=useState(false);
  const [status,setStatus]=useState('');
  const [saving,setSaving]=useState(false);
  const [unavailable,setUnavailable]=useState(false);
  const requestDraw=useRef<()=>void>(()=>{});
  const mobileRef=useRef(false);

  useEffect(()=>{
    const media=window.matchMedia('(max-width:700px)');
    mobileRef.current=media.matches;setMobile(media.matches);
    configRef.current=initialConfig;
    const discover=()=>{
      const next=discoverParticleSections();
      if(next.length===sectionsRef.current.length&&next.every((s,i)=>s.id===sectionsRef.current[i].id&&s.label===sectionsRef.current[i].label&&s.element===sectionsRef.current[i].element))return;
      sectionsRef.current=next;setSections(next);
      setSelected(old=>next.some(s=>s.id===old)?old:next[0]?.id||'');
      requestDraw.current();
    };
    discover();
    const observer=new MutationObserver(discover);
    const main=document.querySelector('main');
    if(main)observer.observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['id','data-particle-label','data-particle-section','aria-label']});
    const resize=()=>{mobileRef.current=media.matches;setMobile(media.matches);requestDraw.current();};
    media.addEventListener('change',resize);
    return()=>{observer.disconnect();media.removeEventListener('change',resize);};
  },[initialConfig]);

  useEffect(()=>{
    let disposed=false;
    let cleanup=()=>{};
    const init=async()=>{
      const THREE=await import('three');
      if(disposed||!host.current)return;
      const el=host.current;
      let renderer:import('three').WebGLRenderer;
      try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{setUnavailable(true);return;}
      renderer.setClearColor(0,0);el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute('aria-hidden','true');
      const max=4000,positions=new Float32Array(max*3),current=new Float32Array(max*3),sizes=new Float32Array(max),colors=new Float32Array(max*3);
      const palette=[[.74,1,.54],[.34,1,.86],[.27,.72,1],[1,.69,.4]];
      for(let i=0;i<max;i++){sizes[i]=1.2+(i*0.61803398875%1)*3.5;colors.set(palette[i%4],i*3);}
      const geometry=new THREE.BufferGeometry();
      const attribute=new THREE.BufferAttribute(positions,3);attribute.setUsage(THREE.DynamicDrawUsage);
      geometry.setAttribute('position',attribute);geometry.setAttribute('aSize',new THREE.BufferAttribute(sizes,1));geometry.setAttribute('aColor',new THREE.BufferAttribute(colors,3));
      const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
        uniforms:{uSize:{value:1},uPixelRatio:{value:1},uTintA:{value:new THREE.Vector3(1,1,1)},uTintB:{value:new THREE.Vector3(1,1,1)},uSingleA:{value:0},uSingleB:{value:0},uMix:{value:0}},
        vertexShader:'attribute float aSize;attribute vec3 aColor;varying vec3 vColor;uniform float uSize;uniform float uPixelRatio;uniform vec3 uTintA;uniform vec3 uTintB;uniform float uSingleA;uniform float uSingleB;uniform float uMix;void main(){vColor=mix(mix(aColor,uTintA,uSingleA),mix(aColor,uTintB,uSingleB),uMix);gl_PointSize=aSize*uSize*uPixelRatio;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
        fragmentShader:'varying vec3 vColor;void main(){float d=length(gl_PointCoord-.5);float glow=1.-smoothstep(.08,.5,d);if(glow<=0.)discard;gl_FragColor=vec4(vColor,glow*glow*.72);}'
      });
      const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-7,7,4.5,-4.5,.1,100);
      camera.position.z=20;
      const points=new THREE.Points(geometry,material);points.frustumCulled=false;scene.add(points);
      const cache=new Map<ParticleShape,Shape>();
      const shape=(name:ParticleShape)=>{let value=cache.get(name);if(!value){value=makeShape(name,max);cache.set(name,value);}return value;};
      const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
      let frame=0,last=0,phase=0,failed=false,first=true;
      const draw=(now:number)=>{
        frame=0;if(disposed||failed||document.hidden)return;
        const dt=last?Math.min(.05,(now-last)/1000):1/60;last=now;
        const live=sectionsRef.current,maxScroll=Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
        const centers=live.map(s=>s.element.getBoundingClientRect().top+window.scrollY+s.element.offsetHeight/2-window.innerHeight/2);
        const entries=live.map(s=>s.element.getBoundingClientRect().top+window.scrollY-window.innerHeight);
        const p=transitionAt(entries,centers,live.map(s=>sectionSettings(configRef.current,s.id,mobileRef.current).transition),window.scrollY,maxScroll);
        const a=sectionSettings(configRef.current,live[p.index]?.id||'hero',mobileRef.current);
        const b=sectionSettings(configRef.current,live[p.index+1]?.id||live[p.index]?.id||'hero',mobileRef.current);
        const mix=reduced.matches?(p.mix<.5?0:1):p.mix;
        const lerp=(key:'count'|'size'|'speed'|'motion'|'smoothness')=>a[key]+(b[key]-a[key])*mix;
        const count=Math.round(lerp('count')),speed=lerp('speed'),motion=lerp('motion'),smooth=lerp('smoothness');
        const targetA=shape(a.shape),targetB=shape(b.shape);
        phase+=dt*speed;
        const snap=(mix===0&&a.transition!=='blend')||(mix===1&&b.transition!=='blend');
        const alpha=first||reduced.matches||snap||smooth===0?1:1-Math.exp(-dt/Math.max(.016,smooth*.65));
        let error=0;
        for(let j=0;j<count;j++){
          // Sample across the entire target at every density, preserving the complete glyph.
          const source=Math.round(j*(max-1)/Math.max(1,count-1));
          for(let axis=0;axis<3;axis++){
            const i=j*3+axis,k=source*3+axis;
            const drift=reduced.matches||source<max*.18||speed===0?0:motion*.4*(axis===0?Math.sin(phase+source*.013):axis===1?Math.cos(phase+source*.011):0);
            const screenPoint=(value:number,name:ParticleShape)=>name==='none'||source<max*.18 ? value*(axis===0?camera.right/7/points.scale.x:axis===1?4.5/4/points.scale.y:1):value;
            const from=screenPoint(targetA[k],a.shape),to=screenPoint(targetB[k],b.shape);
            const target=from+(to-from)*mix+drift;
            const delta=target-current[i];current[i]+=delta*alpha;positions[i]=current[i];error=Math.max(error,Math.abs(delta));
          }
        }
        first=false;geometry.setDrawRange(0,count);attribute.needsUpdate=true;material.uniforms.uSize.value=lerp('size');
        const tint=(hex:string,target:import('three').Vector3)=>target.set(parseInt(hex.slice(1,3),16)/255,parseInt(hex.slice(3,5),16)/255,parseInt(hex.slice(5,7),16)/255);
        tint(a.color,material.uniforms.uTintA.value);tint(b.color,material.uniforms.uTintB.value);
        material.uniforms.uSingleA.value=a.colorMode==='single'?1:0;material.uniforms.uSingleB.value=b.colorMode==='single'?1:0;material.uniforms.uMix.value=mix;
        renderer.render(scene,camera);
        if(!reduced.matches&&(speed>0&&motion>0||error>.001))frame=requestAnimationFrame(draw);
      };
      const request=()=>{if(!frame&&!failed&&!disposed&&!document.hidden)frame=requestAnimationFrame(draw);};
      requestDraw.current=request;
      const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;const aspect=w/h;camera.left=-4.5*aspect;camera.right=4.5*aspect;camera.updateProjectionMatrix();points.scale.setScalar(Math.min(1,4.5*aspect/6));const dpr=Math.min(window.devicePixelRatio,2);renderer.setPixelRatio(dpr);renderer.setSize(w,h,false);material.uniforms.uPixelRatio.value=dpr;request();};
      const visibility=()=>{cancelAnimationFrame(frame);frame=0;last=0;if(!document.hidden)request();};
      const lost=(event:Event)=>{event.preventDefault();failed=true;cancelAnimationFrame(frame);frame=0;setUnavailable(true);};
      const restored=()=>{failed=false;first=true;setUnavailable(false);request();};
      const observer=new ResizeObserver(resize);observer.observe(el);
      if(document.querySelector('main'))observer.observe(document.querySelector('main')!);
      window.addEventListener('scroll',request,{passive:true});document.addEventListener('visibilitychange',visibility);
      reduced.addEventListener('change',request);renderer.domElement.addEventListener('webglcontextlost',lost);renderer.domElement.addEventListener('webglcontextrestored',restored);
      resize();
      cleanup=()=>{requestDraw.current=()=>{};cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',request);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',request);renderer.domElement.removeEventListener('webglcontextlost',lost);renderer.domElement.removeEventListener('webglcontextrestored',restored);geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();cache.clear();};
    };
    init().catch(()=>{if(!disposed)setUnavailable(true);});
    return()=>{disposed=true;cleanup();};
  },[]);
  useEffect(()=>{requestDraw.current();},[revision]);
  useEffect(()=>{
    if(!open)return;
    closeButton.current?.focus();
    const focusEditorEntry=()=>{const entry=document.querySelector<HTMLButtonElement>('.wh-site-header__menu-trigger');if(entry)entry.focus();else toggle.current?.focus();};
    const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);focusEditorEntry();}};
    window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
  },[open]);
  useEffect(()=>{ if(!canCustomizeBackground)return; const openFromMenu=()=>setOpen(true); window.addEventListener('waenweb:open-particle-editor',openFromMenu); return()=>window.removeEventListener('waenweb:open-particle-editor',openFromMenu); },[canCustomizeBackground]);
  const settings=sectionSettings(configRef.current,selected,mobile);
  const update=(patch:Partial<ParticleSettings>)=>{
    if(!canCustomizeBackground||!selected||saving)return;
    configRef.current={...configRef.current,[selected]:normalizeSettings({...settings,...patch},mobile)};
    setRevision(v=>v+1);setStatus('ปรับแล้ว • กดบันทึกเพื่อเก็บไว้');
  };
  const save=async()=>{
    if(!canCustomizeBackground||saving)return;
    setSaving(true);setStatus('กำลังบันทึก…');
    try {
      const response=await fetch('/api/particle-background',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify(configRef.current)});
      if(!response.ok)throw new Error('save failed');
      setStatus('บันทึกแล้ว ผู้เข้าชมทุกคนจะเห็นค่าใหม่นี้เมื่อเปิดหรือรีเฟรชหน้า');
    } catch { setStatus('บันทึกไม่สำเร็จ ลองอีกครั้ง'); }
    finally { setSaving(false); }
  };
  const reset=()=>{
    if(!canCustomizeBackground||saving)return;
    configRef.current={};setRevision(v=>v+1);setStatus('คืนค่าเริ่มต้นในฉบับร่างแล้ว • กดบันทึกเพื่อเผยแพร่');
  };
  const close=()=>{setOpen(false);const entry=document.querySelector<HTMLButtonElement>('.wh-site-header__menu-trigger');if(entry)entry.focus();else toggle.current?.focus();};
  if(!canCustomizeBackground)return <div ref={host} className="particle-background" aria-hidden="true"/>;
  return <>
    <div ref={host} className="particle-background" aria-hidden="true"/>
    <button ref={toggle} type="button" className="particle-editor-toggle" aria-expanded={open} aria-controls="particle-editor" onClick={()=>setOpen(v=>!v)}><Settings2 size={18}/> ปรับพื้นหลัง</button>
    {open&&<aside id="particle-editor" className="particle-editor" aria-labelledby="particle-editor-title">
      <div className="particle-editor-heading"><div><span>BACKGROUND STUDIO</span><h2 id="particle-editor-title">ออกแบบจุดแสง</h2></div><button ref={closeButton} type="button" onClick={close} aria-label="ปิดแผงปรับพื้นหลัง"><X size={20}/></button></div>
      <p className="particle-editor-note">ปรับแล้วเห็นผลทันที ค่าในฉบับร่างจะเผยแพร่เมื่อกดบันทึก</p>
      {unavailable&&<p role="status">อุปกรณ์นี้ยังแสดงจุดแสงไม่ได้ แต่เลือกและบันทึกค่าได้</p>}
      <label className="particle-section-label" htmlFor="particle-section">เลือกส่วนของหน้า</label>
      <select id="particle-section" value={selected} onChange={e=>setSelected(e.target.value)}>{sections.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</select>
      <button type="button" className="particle-jump" onClick={()=>sections.find(s=>s.id===selected)?.element.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'})}><ArrowDown size={15}/> ไปดูส่วนนี้</button>
      <div className="particle-extra-controls">
        <label htmlFor="particle-color-mode">สีของจุดแสง</label><select id="particle-color-mode" value={settings.colorMode} disabled={!selected} onChange={e=>update({colorMode:e.target.value as 'palette'|'single'})}><option value="palette">ชุดสีเดิมของเว็บ</option><option value="single">กำหนดสีเอง</option></select>
        {settings.colorMode==='single'&&<div className="particle-color-row"><label htmlFor="particle-color">เลือกสี</label><input id="particle-color" type="color" value={settings.color} disabled={!selected} onChange={e=>update({color:e.target.value})}/><output>{settings.color.toUpperCase()}</output></div>}
        <label htmlFor="particle-transition">จังหวะเปลี่ยนเข้าสู่ส่วนนี้</label><select id="particle-transition" disabled={!selected} value={settings.transition} onChange={e=>update({transition:e.target.value as ParticleSettings['transition']})}><option value="blend">ค่อย ๆ แปลงตามการเลื่อน</option><option value="entry">ทันทีที่ส่วนนี้เริ่มเข้าจอ</option><option value="center">เมื่อกลางส่วนนี้ถึงกลางจอ</option></select>
        <p className="particle-editor-note">แบบทันทีจะเปลี่ยนรูปที่จุดกำหนดโดยไม่รอความนุ่มนวล ใช้ได้ทั้งเลื่อนลงและย้อนขึ้น</p>
      </div>
      <fieldset disabled={!selected}><legend>เลือกรูปทรง · None คือจุดกระจายทั่วหน้า</legend><div className="particle-shape-grid">{SHAPES.map(name=>{const Icon=ICONS[name];return <button type="button" key={name} aria-pressed={settings.shape===name} onClick={()=>update({shape:name})}>{Icon?<Icon size={23}/>:<b aria-hidden="true">W</b>}<span>{NAMES[name]}</span></button>;})}</div></fieldset>
      <div className="particle-ranges">{CONTROLS.map(c=><div className="particle-control" key={c.key}><div><label id={'particle-label-'+c.key}>{c.label}</label><output>{c.key==='count'?settings[c.key].toLocaleString('th-TH'):settings[c.key].toFixed(2)}</output></div><Slider disabled={!selected} aria-labelledby={'particle-label-'+c.key} value={[settings[c.key]]} min={c.min} max={c.max} step={c.step} onValueChange={value=>update({[c.key]:Array.isArray(value)?value[0]:value})}/></div>)}</div>
      <p className="particle-editor-note">เลือกค่า 0 เพื่อหยุดการเคลื่อนไหวหรือตอบสนองต่อการเลื่อนทันที ระบบจะลดการเคลื่อนไหวตามการตั้งค่าอุปกรณ์</p>
      <p className="particle-editor-status" role="status">{status}</p>
      <div className="particle-editor-actions"><button type="button" onClick={save} disabled={saving}><Save size={16}/> {saving?'กำลังบันทึก…':'บันทึกทั้งหมด'}</button><button type="button" onClick={reset} disabled={saving}><RotateCcw size={16}/> คืนค่าเริ่มต้น</button></div>
      <p className="particle-editor-note">ส่วนใหม่ของเว็บจะปรากฏในรายการโดยอัตโนมัติ</p>
    </aside>}
  </>;
}
