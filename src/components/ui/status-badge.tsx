import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
  onClick?: () => void;
}

// Unified soft, muted color palette - no borders, no outlines
const getStatusColor = (status: string): string => {
  const statusLower = status.toLowerCase();
  
  // Completed / Success states - soft green
  if (statusLower.includes('доставлено') || 
      statusLower.includes('завершено') || 
      statusLower.includes('рефнуто') || 
      statusLower.includes('оплачено') ||
      statusLower.includes('відправлено')) {
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
  }
  
  // Warning / Attention states - soft amber/yellow
  if (statusLower.includes('повертається') || 
      statusLower.includes('перенести') || 
      statusLower.includes('очікує') ||
      statusLower.includes('чекає') ||
      statusLower.includes('перезамовить')) {
    return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
  }
  
  // Active / Ordered states - soft blue
  if (statusLower.includes('замовлено') || 
      statusLower.includes('актив') ||
      statusLower.includes('новий')) {
    return 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300';
  }
  
  // In-progress states - soft slate/gray
  if (statusLower.includes('в дорозі') || 
      statusLower.includes('перевірено') ||
      statusLower.includes('на відділенні')) {
    return 'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300';
  }
  
  // Action required states - soft purple
  if (statusLower.includes('видав виписку') || 
      statusLower.includes('взяти лейбл')) {
    return 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300';
  }
  
  // Default - neutral gray
  return 'bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-300';
};

export function StatusBadge({ status, className, onClick }: StatusBadgeProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        // Shape: rectangle with slight rounding
        'inline-flex items-center justify-center',
        'rounded-md',
        // Size: compact, auto-width
        'px-2 py-1',
        'text-xs font-medium',
        'whitespace-nowrap',
        // NO borders, NO outlines, NO focus rings
        'border-0 outline-none ring-0',
        // Soft muted colors
        getStatusColor(status),
        // Pointer cursor if clickable
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
    >
      {status}
    </span>
  );
}

export { getStatusColor };
