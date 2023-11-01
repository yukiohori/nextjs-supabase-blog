import { z } from 'zod';

export const BlogSchema = z.object({
  username: z.string().nonempty(),
  body: z.string().nonempty(),
});

export const EditBlogSchema = z.object({
  id: z.coerce.number(),
  username: z.string().nonempty(),
  body: z.string().nonempty(),
});

export const DeleteBlogSchema = z.object({
  id: z.coerce.number(),
});
