import { cn } from '@/lib/utils';
import { Wine } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 font-headline text-lg font-bold', className)}>
      <Wine className="h-6 w-6" />
      <span>LiquorStore.ai</span>
    </div>
  );
}
