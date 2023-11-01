'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { BlogSchema } from '@/validations/BlogValidation';

type IBlogFormProps =
  | {
      edit: true;
      id: number;
      defaultValues: z.infer<typeof BlogSchema>;
      handleStopEditing: () => void;
    }
  | { edit?: false };

const BlogForm = (props: IBlogFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<z.infer<typeof BlogSchema>>({
    resolver: zodResolver(BlogSchema),
    defaultValues: props.edit ? props.defaultValues : undefined,
  });
  const router = useRouter();

  const handleCreate = handleSubmit(async (data) => {
    if (props.edit) {
      await fetch(`/api/Blog`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: props.id,
          ...data,
        }),
      });

      props.handleStopEditing();
    } else {
      await fetch(`/api/Blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setFocus('username');
      reset();
    }

    router.refresh();
  });

  return (
    <form onSubmit={handleCreate}>
      <div>
        <label className="text-sm font-bold text-gray-700" htmlFor="username">
          Username
          <input
            id="username"
            className="mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
            {...register('username')}
          />
        </label>
        {errors.username?.message && (
          <div className="my-2 text-xs italic text-red-500">
            {errors.username?.message}
          </div>
        )}
      </div>

      <div className="mt-3">
        <label className="text-sm font-bold text-gray-700" htmlFor="body">
          Body
          <input
            id="body"
            className="mt-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:ring focus:ring-blue-300/50"
            {...register('body')}
          />
        </label>
        {errors.body?.message && (
          <div className="my-2 text-xs italic text-red-500">
            {errors.body?.message}
          </div>
        )}
      </div>

      <div className="mt-5">
        <button
          className="rounded bg-blue-500 px-5 py-1 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export { BlogForm };
