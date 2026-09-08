export const PARTICLE_STORAGE_KEY = 'waenweb-particle-background-v1';
export const SHAPES = ['none', 'galaxy', 'code', 'process', 'bars', 'question', 'w', 'heart', 'star', 'globe', 'ring', 'wave', 'helix', 'infinity', 'cube', 'pyramid', 'torus', 'flower', 'butterfly', 'diamond', 'spiral'] as const;
export type ParticleShape = (typeof SHAPES)[number];
export type ParticleTransition = 'blend' | 'entry' | 'center';
export type ParticleSettings = { count: number; size: number; speed: number; motion: number; smoothness: number; shape: ParticleShape; color: string; colorMode: 'palette' | 'single'; transition: ParticleTransition };
export type SectionParticleConfig = Record<string, ParticleSettings>;
export const DEFAULT_SETTINGS: ParticleSettings = { count: 1500, size: 1, speed: 0.5, motion: 0.15, smoothness: 0.3, shape: 'none', color: '#ccfa80', colorMode: 'palette', transition: 'blend' };
const LIMITS = { count: [300, 4000], size: [0.5, 3], speed: [0, 2], motion: [0, 1], smoothness: [0, 1] } as const;
const finite = (value: unknown, fallback: number, min: number, max: number) => typeof value === 'number' && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
export function normalizeSettings(value: unknown, mobile = false): ParticleSettings {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return { count: Math.round(finite(input.count, mobile ? 600 : DEFAULT_SETTINGS.count, ...LIMITS.count)), size: finite(input.size, DEFAULT_SETTINGS.size, ...LIMITS.size), speed: finite(input.speed, DEFAULT_SETTINGS.speed, ...LIMITS.speed), motion: finite(input.motion, DEFAULT_SETTINGS.motion, ...LIMITS.motion), smoothness: finite(input.smoothness, DEFAULT_SETTINGS.smoothness, ...LIMITS.smoothness), shape: typeof input.shape === 'string' && (SHAPES as readonly string[]).includes(input.shape) ? input.shape as ParticleShape : DEFAULT_SETTINGS.shape, color: typeof input.color === 'string' && /^#[0-9a-f]{6}$/i.test(input.color) ? input.color.toLowerCase() : DEFAULT_SETTINGS.color, colorMode: input.colorMode === 'single' ? 'single' : 'palette', transition: input.transition === 'entry' || input.transition === 'center' ? input.transition : 'blend' };
}
export function loadParticleConfig(storage: Storage | null, mobile = false): SectionParticleConfig {
  if (!storage) return {};
  try { const parsed: unknown = JSON.parse(storage.getItem(PARTICLE_STORAGE_KEY) || '{}'); if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}; const result: SectionParticleConfig = {}; for (const [key, value] of Object.entries(parsed)) if (!['__proto__', 'prototype', 'constructor'].includes(key)) result[key] = normalizeSettings(value, mobile); return result; } catch { return {}; }
}
export function saveParticleConfig(storage: Storage | null, config: SectionParticleConfig) { try { if (!storage) return false; storage.setItem(PARTICLE_STORAGE_KEY, JSON.stringify(config)); return true; } catch { return false; } }
export function clearParticleConfig(storage: Storage | null) { try { if (!storage) return false; storage.removeItem(PARTICLE_STORAGE_KEY); return true; } catch { return false; } }
