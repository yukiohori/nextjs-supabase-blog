'use client';

import { Button } from '@/components/ui/Button';
import { ToastAction } from '@/components/ui/Toast';
import { Toaster } from '@/components/ui/Toaster';
import { useToast } from '@/hooks/useToast';

export function ToastDemo() {
  const { toast } = useToast();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up ',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });
        }}
      >
        Add to calendar
      </Button>
      <Toaster />
    </>
  );
}
