import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Reminder } from '@/lib/types';
import { demoReminders } from '@/lib/demo-data';

export function ReminderPanel() {
  const [reminders, setReminders] = useState<Reminder[]>(demoReminders);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({ text: '', date: '' });

  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const handleAddReminder = () => {
    if (newReminder.text && newReminder.date) {
      setReminders(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: newReminder.text,
          date: new Date(newReminder.date),
          completed: false,
        },
      ]);
      setNewReminder({ text: '', date: '' });
      setIsAddOpen(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Нагадування</CardTitle>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Створити нагадування
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Нове нагадування</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Текст нагадування</Label>
                <Input
                  value={newReminder.text}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Введіть текст..."
                />
              </div>
              <div className="space-y-2">
                <Label>Дата</Label>
                <Input
                  type="date"
                  value={newReminder.date}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Скасувати
                </Button>
                <Button onClick={handleAddReminder}>Створити</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-2">
        {reminders.map(reminder => (
          <div
            key={reminder.id}
            className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <Checkbox
              checked={reminder.completed}
              onCheckedChange={() => toggleReminder(reminder.id)}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                {reminder.text}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatDate(reminder.date)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => deleteReminder(reminder.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
