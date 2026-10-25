export type Os = 'mac' | 'linux';
export type DetectedOs = Os | 'windows';

/** Reads the visitor's operating system. Call it after hydration only. Anything unknown counts as macOS. */
export function detectOs(): DetectedOs {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = (nav.userAgentData?.platform || nav.platform || '').toLowerCase();
  if (platform.includes('win')) return 'windows';
  if (platform.includes('mac') || platform.includes('iphone') || platform.includes('ipad')) return 'mac';
  if (platform.includes('linux') || platform.includes('x11') || platform.includes('cros')) return 'linux';
  return 'mac';
}
