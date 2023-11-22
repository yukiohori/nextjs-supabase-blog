'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import Editor from '@/components/organisms/Editor';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { useBlog } from '@/hooks/useBlog';
import { useBlogCategory } from '@/hooks/useBlogCategory';
import { useCategory } from '@/hooks/useCategory';
import useUpload from '@/hooks/useUpload';
import type { Category } from '@/types/database';
import { BlogSchema } from '@/validations/blogValidation';

type CategoryCheckbox = Category & {
  checked: boolean;
};

const BlogEditApp = () => {
  const router = useRouter();
  const { categoryList } = useCategory(true);
  const [thumbnail, setThumbnail] = useState<string>('');
  const { uploadImage } = useUpload();
  const { insertBlog } = useBlog();
  const { updateBlogCategory } = useBlogCategory();
  const imageFile = useRef<File>();
  const [categoryCheckboxList, setCategoryCheckboxList] = useState<
    CategoryCheckbox[]
  >([]);

  const form = useForm<z.infer<typeof BlogSchema>>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        imageFile.current = file;
        const imageUrlUploaded = URL.createObjectURL(file);
        setThumbnail(imageUrlUploaded);
      }
    }
  };

  const handleContentChange = (html: string) => {
    form.setValue('content', html);
  };

  const handleInsertBlog = async (values: z.infer<typeof BlogSchema>) => {
    const { title, description, content } = values;
    let imageUrl = '';
    if (imageFile.current) {
      imageUrl = await uploadImage(imageFile.current, 'blog');
    }
    const insertedBlog = await insertBlog({
      title,
      description,
      thumbnail: imageUrl,
      content,
    });
    if (insertedBlog) {
      const { id: blogId } = insertedBlog;
      const selectedCategory = categoryCheckboxList
        .filter((item) => item.checked)
        .map((item) => {
          return {
            blog_id: blogId,
            category_id: item.id,
          };
        });
      await updateBlogCategory(selectedCategory);
    }
    router.push('/dashboard/blog');
  };

  useEffect(() => {
    if (categoryList.length) {
      setCategoryCheckboxList(
        categoryList.map((item) => ({
          ...item,
          checked: false,
        })),
      );
    }
  }, [categoryList]);

  return (
    <div>
      <h2 className="mb-4 text-center text-3xl font-bold">ADD BLOG</h2>
      <Form {...form}>
        <form className="mb-4" onSubmit={form.handleSubmit(handleInsertBlog)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="text-lg font-bold">Title</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Insert Title here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="text-lg font-bold">Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full"
                    placeholder="Insert Description here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="my-4 grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-lg font-bold" htmlFor="picture">
              Thumbnail
            </Label>
            <Input id="picture" type="file" onChange={handleImageChange} />
          </div>
          {thumbnail ? (
            <div className="relative my-4 h-36 w-full max-w-[200px]">
              <Image
                src={thumbnail}
                alt=""
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ) : (
            <div className="relative my-4 flex h-36 w-full max-w-[200px] items-center justify-center rounded-md border-2 border-dotted">
              <p>Preview</p>
            </div>
          )}
          <Label className="mt-6 text-lg font-bold">Categories</Label>
          <div className="mb-6 flex flex-row flex-wrap">
            {categoryCheckboxList.map((item) => (
              <div
                key={item.id}
                className="mr-6 mt-2 flex flex-row items-center"
              >
                <Checkbox
                  id={`check${item.id}`}
                  className="mr-2"
                  onCheckedChange={(checked) => {
                    setCategoryCheckboxList((prev) =>
                      prev.map((prevItem) => {
                        if (prevItem.id === item.id) {
                          return {
                            ...prevItem,
                            checked: checked as boolean,
                          };
                        }
                        return prevItem;
                      }),
                    );
                  }}
                  checked={item.checked}
                />
                <Label className="cursor-pointer" htmlFor={`check${item.id}`}>
                  {item.name}
                </Label>
              </div>
            ))}
          </div>
          <Label className="mt-6 text-lg font-bold">Content</Label>
          <Editor getHTML={handleContentChange} />
          <Button
            className="mr-4 mt-4"
            type="button"
            onClick={() => {
              router.push('/dashboard/blog');
            }}
          >
            Cancel
          </Button>
          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogEditApp;
