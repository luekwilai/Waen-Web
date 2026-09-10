import type { ParticleShape } from './particle-config';

export type Shape = Float32Array;
type Point = [number, number, number?];
type Strokes = Point[][];

const seeded = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};
const put = (a: Shape, i: number, x: number, y: number, z: number) => {
  a[i * 3] = x; a[i * 3 + 1] = y; a[i * 3 + 2] = z;
};
const line = (...points: Point[]): Point[] => points;
const ellipse = (cx: number, cy: number, rx: number, ry: number, start = 0, end = Math.PI * 2, steps = 24): Point[] =>
  Array.from({ length: steps + 1 }, (_, i) => { const a = start + (end - start) * i / steps; return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]; });
const strokes: Record<string, Strokes> = {
  terminal: [line([-3, -2], [-3, 2], [3, 2], [3, -2], [-3, -2]), line([-1.8, .8], [-.3, -.2], [-1.8, -1.2]), line([.5, -1.2], [2, -1.2])],
  database: [ellipse(0, 1.8, 2.8, .8, 0, Math.PI * 2), line([-2.8, 1.8], [-2.8, -1.6]), line([2.8, 1.8], [2.8, -1.6]), ellipse(0, -1.6, 2.8, .8, Math.PI, Math.PI * 2), ellipse(0, .1, 2.8, .8, Math.PI, Math.PI * 2)],
  server: [line([-2.8, 2.5], [2.8, 2.5], [2.8, .6], [-2.8, .6], [-2.8, 2.5]), line([-2.8, -.1], [2.8, -.1], [2.8, -2.5], [-2.8, -2.5], [-2.8, -.1]), ellipse(-1.8, 1.55, .15, .15), ellipse(-1.8, -.75, .15, .15)],
  gitBranch: [ellipse(-2.3, 1.8, .48, .48), ellipse(-2.3, -1.8, .48, .48), ellipse(2.3, -1.8, .48, .48), line([-2.3, 1.3], [-2.3, -1.3]), line([-2.3, .3], [-.8, .3], [2.3, -.8], [2.3, -1.3])],
  braces: [line([-1, 2], [-1.7, 2], [-2.2, 1.4], [-2.2, .5], [-2.9, 0]), line([-2.9, 0], [-2.2, -.5], [-2.2, -1.4], [-1.7, -2], [-1, -2]), line([1, 2], [1.7, 2], [2.2, 1.4], [2.2, .5], [2.9, 0]), line([2.9, 0], [2.2, -.5], [2.2, -1.4], [1.7, -2], [1, -2])],
  chip: [line([-2, 1.8], [2, 1.8], [2, -1.8], [-2, -1.8], [-2, 1.8]), line([-3, 1], [-2, 1]), line([-3, 0], [-2, 0]), line([-3, -1], [-2, -1]), line([2, 1], [3, 1]), line([2, 0], [3, 0]), line([2, -1], [3, -1])],
  cloud: [line([-2.8, -.8], [-2.6, .5], [-1.7, 1.2], [-.6, 1.1]), ellipse(.3, .8, 1.4, 1.4, Math.PI * .9, Math.PI * 2.15), ellipse(1.6, .1, 1.5, 1.2, Math.PI * 1.05, Math.PI * 2.05), line([2.8, -.8], [-2.8, -.8])],
  browser: [line([-3, 2.2], [3, 2.2], [3, -2.2], [-3, -2.2], [-3, 2.2]), line([-3, 1.3], [3, 1.3]), ellipse(-2.3, 1.75, .12, .12), ellipse(-1.7, 1.75, .12, .12)],
  api: [line([-2.8, -1.8], [-1.5, 1.8], [-.2, -1.8]), line([-2.25, -.2], [-.75, -.2]), line([.5, -1.8], [.5, 1.8], [1.7, 1.8], [2.1, 1.1], [1.7, .4], [.5, .4]), line([2.5, -1.8], [2.5, 1.8])],
  network: [ellipse(0, 0, .5, .5), ellipse(-2.8, 1.8, .5, .5), ellipse(2.8, 1.8, .5, .5), ellipse(-2.4, -2, .5, .5), ellipse(2.4, -2, .5, .5), line([-.4, .3], [-2.4, 1.5]), line([.4, .3], [2.4, 1.5]), line([-.3, -.3], [-2, -1.7]), line([.3, -.3], [2, -1.7])],
  folder: [line([-3, 1.8], [-.5, 1.8], [.3, 1], [3, 1], [2.5, -2], [-3, -2], [-3, 1.8])],
  fileCode: [line([-2.2, 2.8], [1, 2.8], [2.5, 1.3], [2.5, -2.8], [-2.2, -2.8], [-2.2, 2.8]), line([1, 2.8], [1, 1.3], [2.5, 1.3]), line([-.5, .4], [-1.3, -.3], [-.5, -1]), line([.7, .4], [1.5, -.3], [.7, -1])],
  layers: [line([-3, 1.4], [0, 2.7], [3, 1.4], [0, .1], [-3, 1.4]), line([-3, -.1], [0, -1.4], [3, -.1]), line([-3, -1.4], [0, -2.7], [3, -1.4])],
  shieldCheck: [line([0, 2.8], [2.5, 1.7], [2.1, -1], [0, -2.8], [-2.1, -1], [-2.5, 1.7], [0, 2.8]), line([-1.2, .1], [-.2, -.8], [1.5, 1.1])],
};
const pathLengths = new WeakMap<object, number>();
const sampleStrokes = (path: Strokes, u: number): [number, number, number] => {
  let total = pathLengths.get(path) || 0;
  if (!total) { for (const stroke of path) for (let i = 1; i < stroke.length; i++) total += Math.hypot(stroke[i][0] - stroke[i - 1][0], stroke[i][1] - stroke[i - 1][1]); pathLengths.set(path, total); }
  let target = u * total;
  for (const stroke of path) for (let i = 1; i < stroke.length; i++) { const a = stroke[i - 1], b = stroke[i], length = Math.hypot(b[0] - a[0], b[1] - a[1]); if (target <= length) { const m = length ? target / length : 0; return [a[0] + (b[0] - a[0]) * m, a[1] + (b[1] - a[1]) * m, 0]; } target -= length; }
  return [0, 0, 0];
};

export function makeShape(shape: ParticleShape, count: number): Shape {
  const out = new Float32Array(count * 3); const random = seeded(0x7ae9e8); const offsetRandom = seeded(0x31c0ffee); const activeStart = Math.floor(count * .18); const t = (i: number) => (i - activeStart) / Math.max(1, count - activeStart - 1);
  for (let i = 0; i < count; i++) { const n = (random() - .5) * .35; let x = (random() - .5) * 14, y = (random() - .5) * 8, z = (random() - .5) * 2; if (i < activeStart) { put(out, i, x, y, z); continue; } const u = t(i);
    if (shape === 'galaxy') { const r = Math.pow(random(), .48), a = i % 3 * Math.PI * 2 / 3 + r * 8.5; x = Math.cos(a) * r * 5.5; y = Math.sin(a) * r * 3.15; z = (random() - .5) * (1 - r) * 2.4; }
    if (shape === 'code') { const q = i % 3, p = u * 2 - 1; x = q === 0 ? -3.6 + Math.abs(p) * 1.8 : q === 1 ? p * .25 : 3.6 - Math.abs(p) * 1.8; y = q === 1 ? p * 2.7 : p * 2.2; }
    if (shape === 'process') { const nodes = [[-4.5, .9], [-1.5, -.8], [1.5, .8], [4.5, -.55]], seg = Math.min(2, Math.floor(u * 3)), f = nodes[seg]!, to = nodes[seg + 1]!, p = u * 3 - seg; x = f[0] + (to[0] - f[0]) * p; y = f[1] + (to[1] - f[1]) * p; }
    if (shape === 'bars') { const c = i % 3, h = [1.6, 3.1, 4.5][c], bx = [-3.4, 0, 3.4][c]; x = bx + n * 3; y = -2.2 + random() * h; }
    if (shape === 'question') { const hook = [[-1.4, 1.5], [-1, 2.2], [0, 2.5], [1.2, 2], [1.5, 1.2], [1, .5], [0, 0], [0, -.8]]; if (u < .9) { const p = u / .9 * 7, s = Math.min(6, Math.floor(p)), m = p - s; x = hook[s][0] + (hook[s + 1][0] - hook[s][0]) * m; y = hook[s][1] + (hook[s + 1][1] - hook[s][1]) * m; } else { x = 0; y = -1.8; } }
    if (shape === 'w') { const p = u * 4, s = Math.min(3, Math.floor(p)), m = p - s, v = [[-4, 2], [-2, -2], [0, 1], [2, -2], [4, 2]], f = v[s], to = v[s + 1]; x = f[0] + (to[0] - f[0]) * m; y = f[1] + (to[1] - f[1]) * m; }
    const path = strokes[shape]; if (path) [x, y, z] = sampleStrokes(path, u);
    if (shape !== 'none') { const radius = offsetRandom() < .7 ? .16 : .28 + offsetRandom() * .08; x = x * .92 + (offsetRandom() * 2 - 1) * radius; y = y * .92 + (offsetRandom() * 2 - 1) * radius; z = z * .92 + (offsetRandom() * 2 - 1) * radius * 1.8; put(out, i, x, y, z); continue; } put(out, i, x + n, y + n, z);
  }
  return out;
}
