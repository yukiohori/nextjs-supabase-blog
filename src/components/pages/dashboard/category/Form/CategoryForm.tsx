import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import Image from 'next/legacy/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
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
import useUpload from '@/hooks/useUpload';
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
  const { uploadImage } = useUpload();
  const [thumbnail, setThumbnail] = useState<string>('');
  const imageFile = useRef<File>();

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      image_url: defaultValues?.image_url ?? '',
      show: defaultValues?.show ?? true,
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        imageFile.current = file;
        const imageUrlUploaded = URL.createObjectURL(file);
        // const imageUrlUploaded = await uploadImage(file, 'category');
        setThumbnail(imageUrlUploaded);
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    let imageUrl = values.image_url;
    if (imageFile.current) {
      imageUrl = await uploadImage(imageFile.current, 'category');
    }
    const success = await onFormSubmit({
      ...defaultValues,
      ...values,
      image_url: imageUrl,
    });
    if (success) {
      form.reset();
      setOpen(false);
    }
  };

  useEffect(() => {
    form.reset({
      name: defaultValues?.name ?? '',
      image_url: defaultValues?.image_url ?? '',
      show: defaultValues?.show ?? true,
    });
    setThumbnail(defaultValues?.image_url ?? '');
  }, [defaultValues, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[570px] sm:h-[510px]">
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-4">
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
            <div className="my-4 grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" onChange={handleImageChange} />
            </div>
            {thumbnail ? (
              <div className="relative my-4 h-full max-h-36 w-full max-w-[200px]">
                <Image
                  src={thumbnail}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ) : (
              <div className="relative my-4 flex h-full max-h-36 w-full max-w-[200px] items-center justify-center rounded-md border-2 border-dotted">
                <p>Preview</p>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showStatus"
                checked={form.watch('show')}
                onCheckedChange={(value) => {
                  form.setValue('show', value as boolean);
                }}
              />
              <Label htmlFor="showStatus">Show Status</Label>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button className="mb-4 md:mb-0" type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
