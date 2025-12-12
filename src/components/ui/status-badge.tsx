import { cn } from '@/lib/utils';

type StatusType = 'active' | 'pending' | 'waiting' | 'completed' | 'canceled';

interface StatusBadgeProps {
  status: string;
  type?: StatusType;
  className?: string;
}

const statusMap: Record<string, StatusType> = {
  'Активний': 'active',
  'Актив': 'active',
  'Замовлено': 'active',
  'Очікує': 'pending',
  'Очіку': 'pending',
  'Товар в дорозі': 'pending',
  'Чекає': 'waiting',
  'На відділенні': 'waiting',
  'Завершено': 'completed',
  'Доставлено': 'completed',
  'Рефнуто': 'completed',
  'Оплачено': 'completed',
  'Скасовано': 'canceled',
  'Не оплачено': 'canceled',
};

export function StatusBadge({ status, type, className }: StatusBadgeProps) {
  const statusType = type || statusMap[status] || 'pending';

  const styles: Record<StatusType, string> = {
    active: 'bg-status-active/20 text-status-active border-status-active/30',
    pending: 'bg-status-pending/20 text-status-pending border-status-pending/30',
    waiting: 'bg-status-waiting/20 text-status-waiting border-status-waiting/30',
    completed: 'bg-status-completed/20 text-status-completed border-status-completed/30',
    canceled: 'bg-status-canceled/20 text-status-canceled border-status-canceled/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
        styles[statusType],
        className
      )}
    >
      {status}
    </span>
  );
}
