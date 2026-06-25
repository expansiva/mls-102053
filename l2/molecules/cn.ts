/// <mls fileReference="_102053_/l2/molecules/cn.ts" enhancement="_blank"/>

export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}
