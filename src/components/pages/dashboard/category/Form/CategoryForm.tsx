import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import type {
  Category,
  CategoryInsert,
  CategoryUpdate,
} from '@/types/database';
import { RequestFormType } from '@/utils/constants';
import { CategorySchema } from '@/validations/categoryValidation';

type CategoryFormProps = {
  open: boolean;
  upsertType: RequestFormType;
  defaultValues?: Category;
  setOpen: (open: boolean) => void;
  onFormSubmit: (category: CategoryInsert | CategoryUpdate) => Promise<boolean>;
};

export const CategoryForm = ({
  open,
  upsertType,
  defaultValues,
  setOpen,
  onFormSubmit,
}: CategoryFormProps) => {
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
    },
  });

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    const success = await onFormSubmit(
      upsertType === RequestFormType.Insert
        ? values
        : { ...defaultValues, ...values },
    );
    if (success) {
      form.reset();
      setOpen(false);
    }
  };

  useEffect(() => {
    form.reset({
      name: defaultValues?.name ?? '',
    });
  }, [defaultValues, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{`${
                upsertType === RequestFormType.Insert ? 'Insert' : 'Edit'
              } Category`}</DialogTitle>
              <DialogDescription>
                {`You can ${
                  upsertType === RequestFormType.Insert
                    ? 'insert a new'
                    : 'edit selected'
                } category here.`}
              </DialogDescription>
            </DialogHeader>
            <div className="my-4 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Insert Category name here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
