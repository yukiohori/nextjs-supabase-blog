import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';

type AlertDialogProps = {
  title: string;
  description: string;
  open: boolean;
  closeText?: string;
  confirmText?: string;
  confirmAction: () => void;
  onOpenChange: (open: boolean) => void;
};

export const ConfirmDialog = ({
  title,
  description,
  open,
  closeText = 'Cancel',
  confirmText = 'Continue',
  confirmAction,
  onOpenChange,
}: AlertDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{closeText}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmAction}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
