'use client';
import {useEffect} from 'react';

export default function Motion(){
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  let teardown=()=>{};
  const setup=()=>{
   teardown();
   if(media.matches)return;
   const animations:Animation[]=[];
   const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const element=entry.target as HTMLElement;const siblings=element.parentElement?Array.from(element.parentElement.children):[];const delay=element.matches('.service,.step,.price-card')?Math.max(0,siblings.indexOf(element)%3)*90:0;animations.push(element.animate([{opacity:0,transform:'translate3d(0,32px,0)',filter:'blur(5px)'},{opacity:1,transform:'translate3d(0,0,0)',filter:'blur(0)'}],{duration:850,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}));observer.unobserve(element);}},{threshold:.12});
   document.querySelectorAll('.section-heading,.service,.step,.price-card,.faq>div,.faq-list,.contact-main').forEach(el=>observer.observe(el));
   const progress=document.querySelector<HTMLElement>('.scroll-progress');let frame=0;
   const update=()=>{frame=0;const range=document.documentElement.scrollHeight-window.innerHeight;if(progress)progress.style.transform=`scaleX(${range>0?window.scrollY/range:0})`;};
   const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};window.addEventListener('scroll',scroll,{passive:true});update();
   const cards=Array.from(document.querySelectorAll<HTMLElement>('.service,.price-card'));
   const handlers=cards.map(card=>{let raf=0;const move=(event:PointerEvent)=>{if(event.pointerType!=='mouse')return;cancelAnimationFrame(raf);const x=event.clientX,y=event.clientY;raf=requestAnimationFrame(()=>{const rect=card.getBoundingClientRect();card.style.setProperty('--spot-x',`${x-rect.left}px`);card.style.setProperty('--spot-y',`${y-rect.top}px`);});};card.addEventListener('pointermove',move);return()=>{cancelAnimationFrame(raf);card.removeEventListener('pointermove',move);};});
   teardown=()=>{observer.disconnect();animations.forEach(a=>a.cancel());cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);handlers.forEach(f=>f());};
  };
  setup();media.addEventListener('change',setup);return()=>{teardown();media.removeEventListener('change',setup);};
 },[]);
 return <div className="scroll-progress" aria-hidden="true"/>;
}
