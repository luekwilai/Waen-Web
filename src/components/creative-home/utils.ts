import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Defer heavy work (e.g. loading three.js) until the page has loaded and the main thread is idle,
// so it does not compete with the first render. Returns a cancel function.
export function runWhenIdle(task: () => void, timeout = 2000) {
  let idleId: number | undefined;
  let timerId: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(task, { timeout });
    else timerId = setTimeout(task, 200);
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
  return () => {
    window.removeEventListener('load', schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timerId !== undefined) clearTimeout(timerId);
  };
}
