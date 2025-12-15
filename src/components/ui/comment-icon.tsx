import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CommentModal } from '@/components/ui/comment-modal';
import { cn } from '@/lib/utils';

interface CommentIconProps {
  hasComments?: boolean;
  commentCount?: number;
  className?: string;
  size?: 'sm' | 'md';
}

export function CommentIcon({ 
  hasComments = false, 
  commentCount = 0,
  className,
  size = 'sm'
}: CommentIconProps) {
  const [isOpen, setIsOpen] = useState(false);

  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const buttonSize = size === 'sm' ? 'h-5 w-5' : 'h-6 w-6';

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className={cn(
              buttonSize,
              "relative text-muted-foreground hover:text-foreground cursor-pointer",
              className
            )}
          >
            <MessageCircle className={iconSize} />
            {hasComments && commentCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[14px] h-[14px] px-0.5 text-[9px] font-medium bg-primary text-primary-foreground rounded-full">
                {commentCount}
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Коментар</TooltipContent>
      </Tooltip>

      <CommentModal 
        open={isOpen} 
        onOpenChange={setIsOpen}
        initialComments={hasComments ? [{ id: '1', text: 'Приклад коментаря', date: '15.12.2025' }] : []}
      />
    </>
  );
}
