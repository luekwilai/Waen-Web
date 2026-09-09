export const PARTICLE_STORAGE_KEY = 'waenweb-particle-background-v1';
export const PARTICLE_SETTING_KEY = 'creative.particleBackground';
export const SHAPES = ['none', 'galaxy', 'code', 'process', 'bars', 'question', 'w', 'heart', 'star', 'globe', 'ring', 'wave', 'helix', 'infinity', 'cube', 'pyramid', 'torus', 'flower', 'butterfly', 'diamond', 'spiral'] as const;
export type ParticleShape = (typeof SHAPES)[number];
export type ParticleTransition = 'blend' | 'entry' | 'center';
export type ParticleSettings = { count: number; size: number; speed: number; motion: number; smoothness: number; shape: ParticleShape; color: string; colorMode: 'palette' | 'single'; transition: ParticleTransition };
export type SectionParticleConfig = Record<string, ParticleSettings>;
export const DEFAULT_SETTINGS: ParticleSettings = { count: 1500, size: 1, speed: 0.5, motion: 0.15, smoothness: 0.3, shape: 'none', color: '#ccfa80', colorMode: 'palette', transition: 'blend' };
const LIMITS = { count: [300, 4000], size: [0.5, 3], speed: [0, 2], motion: [0, 1], smoothness: [0, 1] } as const;
const RESERVED_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
const MAX_SECTIONS = 40;
const MAX_SECTION_KEY_LENGTH = 80;
const finite = (value: unknown, fallback: number, min: number, max: number) => typeof value === 'number' && Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
export function normalizeSettings(value: unknown, mobile = false): ParticleSettings {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return { count: Math.round(finite(input.count, mobile ? 600 : DEFAULT_SETTINGS.count, ...LIMITS.count)), size: finite(input.size, DEFAULT_SETTINGS.size, ...LIMITS.size), speed: finite(input.speed, DEFAULT_SETTINGS.speed, ...LIMITS.speed), motion: finite(input.motion, DEFAULT_SETTINGS.motion, ...LIMITS.motion), smoothness: finite(input.smoothness, DEFAULT_SETTINGS.smoothness, ...LIMITS.smoothness), shape: typeof input.shape === 'string' && (SHAPES as readonly string[]).includes(input.shape) ? input.shape as ParticleShape : DEFAULT_SETTINGS.shape, color: typeof input.color === 'string' && /^#[0-9a-f]{6}$/i.test(input.color) ? input.color.toLowerCase() : DEFAULT_SETTINGS.color, colorMode: input.colorMode === 'single' ? 'single' : 'palette', transition: input.transition === 'entry' || input.transition === 'center' ? input.transition : 'blend' };
}
export function loadParticleConfig(storage: Storage | null, mobile = false): SectionParticleConfig {
  if (!storage) return {};
  try { const parsed: unknown = JSON.parse(storage.getItem(PARTICLE_STORAGE_KEY) || '{}'); if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}; const result: SectionParticleConfig = {}; for (const [key, value] of Object.entries(parsed)) if (!['__proto__', 'prototype', 'constructor'].includes(key)) result[key] = normalizeSettings(value, mobile); return result; } catch { return {}; }
}
export function validateParticleConfig(value: unknown): { config: SectionParticleConfig } | { error: string } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { error: 'Particle config must be an object' };
  const entries = Object.entries(value);
  if (entries.length > MAX_SECTIONS) return { error: 'Too many particle sections' };
  const config: SectionParticleConfig = {};
  for (const [key, settings] of entries) {
    if (RESERVED_KEYS.has(key) || key.length === 0 || key.length > MAX_SECTION_KEY_LENGTH) return { error: 'Invalid particle section key' };
    if (!settings || typeof settings !== 'object' || Array.isArray(settings)) return { error: 'Invalid particle section settings' };
    const input = settings as Record<string, unknown>;
    if (Object.keys(input).some(name => RESERVED_KEYS.has(name))) return { error: 'Invalid particle setting key' };
    const bounded = (name: keyof typeof LIMITS) => typeof input[name] === 'number' && Number.isFinite(input[name]) && input[name] >= LIMITS[name][0] && input[name] <= LIMITS[name][1];
    if (!bounded('count') || !bounded('size') || !bounded('speed') || !bounded('motion') || !bounded('smoothness')) return { error: 'Particle numeric value out of range' };
    if (typeof input.shape !== 'string' || !(SHAPES as readonly string[]).includes(input.shape)) return { error: 'Invalid particle shape' };
    if (typeof input.color !== 'string' || !/^#[0-9a-f]{6}$/i.test(input.color)) return { error: 'Invalid particle color' };
    if (input.colorMode !== 'palette' && input.colorMode !== 'single') return { error: 'Invalid particle color mode' };
    if (input.transition !== 'blend' && input.transition !== 'entry' && input.transition !== 'center') return { error: 'Invalid particle transition' };
    config[key] = normalizeSettings(settings);
  }
  return { config };
}
export function saveParticleConfig(storage: Storage | null, config: SectionParticleConfig) { try { if (!storage) return false; storage.setItem(PARTICLE_STORAGE_KEY, JSON.stringify(config)); return true; } catch { return false; } }
export function clearParticleConfig(storage: Storage | null) { try { if (!storage) return false; storage.removeItem(PARTICLE_STORAGE_KEY); return true; } catch { return false; } }
