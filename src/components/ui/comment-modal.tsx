import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  text: string;
  date: string;
}

interface CommentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialComments?: Comment[];
}

export function CommentModal({ open, onOpenChange, initialComments = [] }: CommentModalProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleSave = () => {
    if (editingId) {
      // Save edit
      setComments(prev => 
        prev.map(c => c.id === editingId ? { ...c, text: editText } : c)
      );
      setEditingId(null);
      setEditText('');
    } else if (newComment.trim()) {
      // Add new comment
      const comment: Comment = {
        id: Date.now().toString(),
        text: newComment.trim(),
        date: new Date().toLocaleDateString('uk-UA'),
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleDelete = () => {
    if (editingId) {
      setComments(prev => prev.filter(c => c.id !== editingId));
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sm font-medium">Коментарі</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 py-2">
          {/* Existing comments list */}
          {comments.length > 0 && (
            <ScrollArea className="max-h-[200px] pr-2">
              <div className="space-y-2">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    onClick={() => handleEdit(comment)}
                    className={cn(
                      "p-2.5 rounded-md text-sm cursor-pointer transition-colors",
                      "bg-muted/50 hover:bg-muted",
                      editingId === comment.id && "ring-1 ring-primary bg-muted"
                    )}
                  >
                    <p className="text-foreground">{comment.text}</p>
                    <span className="text-[10px] text-muted-foreground mt-1 block">
                      {comment.date}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Text area for new/edit comment */}
          <Textarea
            value={editingId ? editText : newComment}
            onChange={(e) => editingId ? setEditText(e.target.value) : setNewComment(e.target.value)}
            placeholder={editingId ? "Редагувати коментар…" : "Новий коментар…"}
            className="min-h-[100px] resize-none text-sm"
          />

          {/* Action buttons - always visible at bottom */}
          <div className="flex items-center gap-2 pt-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEdit.bind(null, comments[comments.length - 1])}
              disabled={comments.length === 0 || editingId !== null}
              className="text-xs h-7 px-3"
            >
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDelete}
              disabled={editingId === null}
              className="text-xs h-7 px-3 text-destructive hover:text-destructive"
            >
              Delete
            </Button>
            <div className="flex-1" />
            {editingId && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCancel}
                className="text-xs h-7 px-3"
              >
                Скасувати
              </Button>
            )}
            <Button 
              size="sm" 
              onClick={handleSave}
              disabled={editingId ? !editText.trim() : !newComment.trim()}
              className="text-xs h-7 px-3"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
