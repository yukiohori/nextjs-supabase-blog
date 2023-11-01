'use client';

import { useRouter } from 'next/navigation';

type IDeleteBlogEntryProps = {
  id: number;
};

const DeleteBlogEntry = (props: IDeleteBlogEntryProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`/api/Blog`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.id,
      }),
    });

    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleDelete();
      }}
    >
      <svg
        className="h-6 w-6 stroke-current"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </button>
  );
};

export { DeleteBlogEntry };
