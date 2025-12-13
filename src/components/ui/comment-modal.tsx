import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CommentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommentModal({ open, onOpenChange }: CommentModalProps) {
  const [comment, setComment] = useState('');

  const handleSave = () => {
    onOpenChange(false);
  };

  const handleCancel = () => {
    setComment('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-sm">Коментар</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Коментар…"
            className="min-h-[120px] resize-none text-sm"
          />
          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Скасувати
            </Button>
            <Button size="sm" onClick={handleSave}>
              Зберегти
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
