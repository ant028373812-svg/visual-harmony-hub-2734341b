import { cn } from '@/lib/utils';

type StatusType = 'default' | 'active' | 'pending' | 'completed' | 'warning' | 'info';

interface StatusBadgeProps {
  status: string;
  type?: StatusType;
  className?: string;
}

// Unified status color mapping - muted, Notion-style colors
const statusMap: Record<string, StatusType> = {
  // Active / Ordered states
  'Активний': 'active',
  'Актив': 'active',
  'Замовлено': 'active',
  'new': 'info',
  
  // Pending / In-progress states
  'Очікує': 'pending',
  'Очіку': 'pending',
  'Товар в дорозі': 'pending',
  'Чекає': 'pending',
  'На відділенні': 'pending',
  'checked': 'pending',
  'Відправлено': 'pending',
  
  // Completed / Success states
  'Завершено': 'completed',
  'Доставлено': 'completed',
  'Рефнуто': 'completed',
  'Оплачено': 'completed',
  'sent_to_ref': 'completed',
  
  // Warning / Attention states
  'Повертається': 'warning',
  'Перенести': 'warning',
  'Очікує перенести': 'warning',
  'Скасовано': 'warning',
  'Не оплачено': 'warning',
  'Видав фактуру': 'warning',
};

// Unified muted color palette - works in both light and dark themes
const styles: Record<StatusType, string> = {
  default: 'bg-muted/60 text-muted-foreground border-border',
  active: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/25',
  pending: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/25',
  completed: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
  warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25',
  info: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/25',
};

export function StatusBadge({ status, type, className }: StatusBadgeProps) {
  const statusType = type || statusMap[status] || 'default';

  return (
    <span
      className={cn(
        // Unified shape: rounded rectangle, compact, centered
        'inline-flex items-center justify-center',
        'px-2 py-1',
        'rounded-md',
        'text-xs font-medium',
        'border',
        'cursor-pointer',
        'hover:opacity-80 transition-opacity',
        styles[statusType],
        className
      )}
    >
      {status}
    </span>
  );
}

// Export the getStatusStyle function for use in other components
export function getStatusStyle(status: string): string {
  const statusType = statusMap[status] || 'default';
  return styles[statusType];
}

export { styles as statusStyles, statusMap };
