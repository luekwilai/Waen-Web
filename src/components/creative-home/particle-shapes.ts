import type { ParticleShape } from './particle-config';

export type Shape = Float32Array;

const seeded = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

const put = (a: Shape, i: number, x: number, y: number, z: number) => {
  a[i * 3] = x;
  a[i * 3 + 1] = y;
  a[i * 3 + 2] = z;
};

export function makeShape(shape: ParticleShape, count: number): Shape {
  const out = new Float32Array(count * 3); const random = seeded(0x7ae9e8); const activeStart = Math.floor(count * .18); const t = (i: number) => (i - activeStart) / Math.max(1, count - activeStart - 1);
  for (let i = 0; i < count; i++) { const n = (random() - .5) * .35; let x = (random() - .5) * 14, y = (random() - .5) * 8, z = (random() - .5) * 2; if (i < activeStart) { put(out, i, x, y, z); continue; } const u = t(i);
    if (shape === 'galaxy') { const r = Math.pow(random(), .48), a = i % 3 * Math.PI * 2 / 3 + r * 8.5; x = Math.cos(a) * r * 5.5; y = Math.sin(a) * r * 3.15; z = (random() - .5) * (1 - r) * 2.4; }
    if (shape === 'code') { const q = i % 3, p = u * 2 - 1; x = q === 0 ? -3.6 + Math.abs(p) * 1.8 : q === 1 ? p * .25 : 3.6 - Math.abs(p) * 1.8; y = q === 1 ? p * 2.7 : p * 2.2; }
    if (shape === 'process') { const nodes = [[-4.5,.9],[-1.5,-.8],[1.5,.8],[4.5,-.55]], seg = Math.min(2, Math.floor(u * 3)), f = nodes[seg], to = nodes[seg + 1], p = u * 3 - seg; x = f[0] + (to[0] - f[0]) * p; y = f[1] + (to[1] - f[1]) * p; }
    if (shape === 'bars') { const c = i % 3, h = [1.6, 3.1, 4.5][c], bx = [-3.4, 0, 3.4][c]; x = bx + n * 3; y = -2.2 + random() * h; }
    if (shape === 'question') { const hook=[[-1.4,1.5],[-1,2.2],[0,2.5],[1.2,2],[1.5,1.2],[1,.5],[0,0],[0,-.8]]; if(u<.9){const p=u/.9*7,s=Math.min(6,Math.floor(p)),m=p-s;x=hook[s][0]+(hook[s+1][0]-hook[s][0])*m;y=hook[s][1]+(hook[s+1][1]-hook[s][1])*m;}else{x=0;y=-1.8;} }
    if (shape === 'w') { const p = u * 4, s = Math.min(3, Math.floor(p)), m = p - s, v = [[-4,2],[-2,-2],[0,1],[2,-2],[4,2]], f = v[s], to = v[s+1]; x = f[0] + (to[0]-f[0])*m; y = f[1] + (to[1]-f[1])*m; }
    if (shape === 'heart') { const a = u * Math.PI * 2; x = 2.5 * Math.sin(a) ** 3; y = 2.1 * Math.cos(a) - .8 * Math.cos(2*a) - .35 * Math.cos(3*a) - .15 * Math.cos(4*a); }
    if (shape === 'star') { const p = u * 10, vertex = Math.floor(p) % 10, mix = p - Math.floor(p), a1 = -Math.PI / 2 + vertex * Math.PI / 5, a2 = -Math.PI / 2 + ((vertex + 1) % 10) * Math.PI / 5, r1 = vertex % 2 ? 1.8 : 4, r2 = (vertex + 1) % 2 ? 1.8 : 4; x = Math.cos(a1) * r1 + (Math.cos(a2) * r2 - Math.cos(a1) * r1) * mix; y = Math.sin(a1) * r1 + (Math.sin(a2) * r2 - Math.sin(a1) * r1) * mix; }
    if (shape === 'globe') { const a = u * Math.PI * 2, b = Math.acos(1 - 2 * random()); x = 3.2 * Math.sin(b) * Math.cos(a); y = 3.2 * Math.cos(b); z = 3.2 * Math.sin(b) * Math.sin(a); }
    if (shape === 'ring') { const a = u * Math.PI * 2; x = Math.cos(a) * 4.2; y = Math.sin(a) * 1.8; z = n * 4; }
    if (shape === 'wave') { x = -5 + u * 10; y = 1.9 * Math.sin(x * 1.15) + .45 * Math.sin(x * 2.75) + (random() - .5) * .24; z = (random() - .5) * .45; }
    if (shape === 'helix') { const a = u * Math.PI * 4 + (i % 2) * Math.PI; x = Math.cos(a) * 2.8; y = -3.2 + u * 6.4; z = Math.sin(a) * 2.8; }
    if (shape === 'infinity') { const a = u * Math.PI * 2; const d = 1 + Math.sin(a) ** 2; x = 4.8 * Math.cos(a) / d; y = 3.1 * Math.sin(a) * Math.cos(a) / d; z = (random() - .5) * .35; }
    if (shape === 'cube') { const edge = i % 12, p = u * 12 - Math.floor(u * 12); const e = [[-2.8,-2.2,-2.8],[2.8,-2.2,-2.8],[2.8,2.2,-2.8],[-2.8,2.2,-2.8],[-2.8,-2.2,2.8],[2.8,-2.2,2.8],[2.8,2.2,2.8],[-2.8,2.2,2.8]]; const lines = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]], l = lines[edge], a = e[l[0]], b = e[l[1]]; x = a[0] + (b[0]-a[0]) * p; y = a[1] + (b[1]-a[1]) * p; z = a[2] + (b[2]-a[2]) * p; }
    if (shape === 'pyramid') { const edge = i % 8, p = u * 8 - Math.floor(u * 8); const e = [[-3,-2.2,-2.5],[3,-2.2,-2.5],[3,-2.2,2.5],[-3,-2.2,2.5],[0,2.9,0]], lines = [[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]], l = lines[edge], a = e[l[0]], b = e[l[1]]; x = a[0] + (b[0]-a[0]) * p; y = a[1] + (b[1]-a[1]) * p; z = a[2] + (b[2]-a[2]) * p; }
    if (shape === 'torus') { const a = u * Math.PI * 2, b = (i % 17) / 17 * Math.PI * 2; const r = 2.05 + .75 * Math.cos(b); x = r * Math.cos(a); y = r * Math.sin(a); z = .75 * Math.sin(b); }
    if (shape === 'flower') { const a = u * Math.PI * 2; const r = 2.2 + 1.25 * Math.cos(5 * a); x = r * Math.cos(a); y = r * Math.sin(a); z = (random() - .5) * .3; }
    if (shape === 'butterfly') { const a = u * Math.PI * 12; const r = Math.exp(Math.cos(a)) - 2 * Math.cos(4*a) + Math.sin(a/12) ** 5; x = 1.35 * Math.sin(a) * r; y = 1.05 * Math.cos(a) * r; z = (random() - .5) * .35; }
    if (shape === 'diamond') { const p = u * 4, s = Math.min(3, Math.floor(p)), m = p - s, v = [[0,3.6], [3.4,0], [0,-3.6], [-3.4,0], [0,3.6]], a = v[s], b = v[s+1]; x = a[0] + (b[0]-a[0]) * m; y = a[1] + (b[1]-a[1]) * m; z = (random() - .5) * .3; }
    if (shape === 'spiral') { const a = u * Math.PI * 6; const r = .25 + 4.65 * u; x = r * Math.cos(a); y = r * .62 * Math.sin(a); z = (u - .5) * 2.4; }
    if(shape==='cube'||shape==='pyramid'){const rx=x*.866+z*.5, rz=-x*.5+z*.866; x=rx; const ry=y*.94-rz*.342; z=y*.342+rz*.94; y=ry;}
    put(out, i, x + (shape === 'galaxy' ? 0 : n), y + (shape === 'galaxy' ? 0 : n), z);
  }
  return out;
}
