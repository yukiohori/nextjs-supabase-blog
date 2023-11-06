import { z } from 'zod';

export const CategorySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Category name must be at least 2 characters.',
    })
    .max(20, {
      message: 'Category name must be less than 20 characters.',
    }),
  image_url: z.string().nullable(),
  show: z.boolean(),
});
