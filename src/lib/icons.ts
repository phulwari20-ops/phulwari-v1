import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * Dynamically resolves any Lucide icon by name (case-insensitive, ignoring hyphens/spaces).
 * Defaults to Sparkles if not found.
 */
export function resolveLucideIcon(
  iconName?: string | null,
  fallback = LucideIcons.Sparkles
): React.ComponentType<{ className?: string; style?: React.CSSProperties }> {
  if (!iconName) return fallback as any;

  const normalized = iconName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  const foundKey = Object.keys(LucideIcons).find(
    (key) => key.toLowerCase() === normalized
  );

  if (foundKey && (LucideIcons as any)[foundKey]) {
    return (LucideIcons as any)[foundKey];
  }

  return fallback as any;
}
