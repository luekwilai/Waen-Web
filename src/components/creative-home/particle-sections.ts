import { normalizeSettings, type SectionParticleConfig, type ParticleTransition } from './particle-config';

export type ParticleSection = { id: string; label: string; element: HTMLElement };
export function sectionSettings(config: SectionParticleConfig, id: string, mobile = false) {
  return normalizeSettings(Object.hasOwn(config,id) ? config[id] : {}, mobile);
}

export function transitionAt(entries: number[], centers: number[], modes: ParticleTransition[], y: number, maxScroll: number) {
  if (centers.length < 2) return {index:0,mix:0};
  const at=Math.max(0,Math.min(maxScroll,y));
  let previous=0;
  for(let i=1;i<centers.length;i++) {
    const mode=modes[i] || 'blend';
    const target=Math.max(previous,Math.min(maxScroll,Math.max(0,mode==='entry'?entries[i]:centers[i])));
    if(at<target) return {index:i-1,mix:mode==='blend'?Math.max(0,Math.min(1,(at-previous)/Math.max(1,target-previous))):0};
    previous=target;
  }
  return {index:centers.length-2,mix:1};
}
export function discoverParticleSections(root: ParentNode = document): ParticleSection[] {
  const elements = Array.from(root.querySelectorAll<HTMLElement>('main section, main [data-particle-section]'));
  const used = new Set(Array.from(root.querySelectorAll<HTMLElement>('[id]')).map(e=>e.id));
  return elements.map((element, index) => {
    if (!element.id) {
      const title = element.dataset.particleLabel || element.querySelector('h1,h2,h3')?.textContent?.trim() || 'section';
      const base = 'particle-' + title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'-').slice(0,70);
      let id=base, suffix=2;
      while(used.has(id)) id=base+'-'+suffix++;
      element.id=id;used.add(id);
    }
    return {id:element.id, element, label:element.dataset.particleLabel || element.getAttribute('aria-label') || element.querySelector('h1,h2,h3')?.textContent?.trim() || `ส่วนที่ ${index+1}`};
  });
}
export function progressAt(centers: number[], y: number, maxScroll: number) {
  if(centers.length<2) return {index:0,mix:0};
  const clamped=centers.map(c=>Math.max(0,Math.min(maxScroll,c)));
  const at=Math.max(0,Math.min(maxScroll,y));
  for(let i=1;i<clamped.length;i++) if(at<clamped[i]) return {index:i-1,mix:Math.max(0,Math.min(1,(at-clamped[i-1])/Math.max(1,clamped[i]-clamped[i-1])))};
  return {index:clamped.length-2,mix:1};
}
