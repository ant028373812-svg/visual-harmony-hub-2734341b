import { TaskPanel } from '@/components/dashboard/TaskPanel';
import { ReminderPanel } from '@/components/dashboard/ReminderPanel';

export function Dashboard() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskPanel />
        <ReminderPanel />
      </div>
    </div>
  );
}
