'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/legacy/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Loading } from '@/components/atoms/Loading';
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
import type { Blog, BlogCategoryRow, Category } from '@/types/database';
import { BlogSchema } from '@/validations/blogValidation';

type CategoryCheckbox = Category & {
  checked: boolean;
};

const BlogEditApp = () => {
  const router = useRouter();
  const params = useParams();
  const { categoryList } = useCategory(true);
  const { fetchBlogById, updateBlog } = useBlog();
  const [blog, setBlog] = useState<Blog>();
  const [thumbnail, setThumbnail] = useState<string>('');
  const { uploadImage } = useUpload();
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

  const handleUpdateBlog = async (values: z.infer<typeof BlogSchema>) => {
    if (!params?.slug) return;
    const blogId = Number(params.slug);
    const { title, description, content } = values;
    let imageUrl = '';
    if (imageFile.current) {
      imageUrl = await uploadImage(imageFile.current, 'blog');
    }
    const success = await updateBlog({
      id: blogId,
      title,
      description,
      thumbnail: imageUrl || blog?.thumbnail || '',
      content,
    });
    if (success) {
      const selectedCategory = categoryCheckboxList
        .filter((item) => item.checked)
        .map((item) => {
          return {
            blog_id: blogId,
            category_id: item.id,
          };
        });
      await updateBlogCategory(selectedCategory, blogId);
    }
    router.push('/dashboard/blog');
  };

  useEffect(() => {
    const fetchBlog = async () => {
      if (params && params.slug) {
        const blogData = await fetchBlogById(Number(params.slug));
        if (blogData) {
          const {
            title,
            description,
            thumbnail: blogThumb,
            content,
          } = blogData;
          form.setValue('title', title);
          form.setValue('description', description);
          form.setValue('content', content);
          setBlog(blogData);
          setThumbnail(blogThumb);
        }
      }
    };
    if (params && params.slug) {
      fetchBlog();
    }
  }, [fetchBlogById, form, params, setBlog]);

  useEffect(() => {
    if (categoryList.length) {
      setCategoryCheckboxList(
        categoryList.map((item) => ({
          ...item,
          checked:
            blog?.categories?.some(
              (category: BlogCategoryRow) => category.id === item.id,
            ) || false,
        })),
      );
    }
  }, [categoryList, blog]);

  if (!blog)
    return (
      <div className="relative mt-6 min-h-[140px] w-full overflow-hidden">
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
          <Loading />
        </div>
      </div>
    );

  return (
    <div>
      <h2 className="mb-4 text-center text-3xl font-bold">EDIT BLOG</h2>
      <Form {...form}>
        <form className="mb-4" onSubmit={form.handleSubmit(handleUpdateBlog)}>
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
          <Editor
            getHTML={handleContentChange}
            defaultContent={form.getValues('content')}
          />
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
