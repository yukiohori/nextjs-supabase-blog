import { z } from 'zod';

export const BlogSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(100, {
      message: 'Title must be less than 100 characters.',
    }),
  content: z.string().min(2, {
    message: 'Content must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Description must be at least 2 characters.',
  }),
});
