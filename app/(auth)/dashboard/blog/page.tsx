/* eslint-disable react/no-danger */

'use client';

import { useAuth } from '@clerk/nextjs';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { Loading } from '@/components/atoms/Loading';
import { ConfirmDialog } from '@/components/organisms/AlertDialog';
import { BlogCard } from '@/components/organisms/BlogCard';
import { Button } from '@/components/ui/Button';
import { useBlog } from '@/hooks/useBlog';

const DashboardBlog = () => {
  const { userId } = useAuth();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const { deleteBlog, blogList, isLoading } = useBlog(true);
  const selectedBlogId = useRef<number | null>(null);

  const deleteSelectedCategory = async () => {
    if (selectedBlogId.current) {
      await deleteBlog(selectedBlogId.current);
      selectedBlogId.current = null;
    }
  };

  return (
    <>
      <h2 className="mb-4 text-center text-3xl font-bold">BLOG</h2>
      <div className="mt-6">
        <Link href="/dashboard/blog/edit">
          <Button>
            <Plus />
          </Button>
        </Link>
      </div>
      <div className="relative mt-6 min-h-[140px] w-full overflow-hidden">
        {isLoading && (
          <div
            className={clsx(
              'absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center',
              blogList.length && 'bg-black/40',
            )}
          >
            <Loading />
          </div>
        )}
        {!isLoading && blogList?.length > 0 && (
          <div className="mb-4 flex flex-col space-y-4">
            {blogList.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
                image={blog.thumbnail}
                category={blog.categories}
                permission={userId === blog.user_id}
                onDelete={() => {
                  selectedBlogId.current = blog.id;
                  setOpenConfirmDialog(true);
                }}
              />
            ))}
          </div>
        )}
      </div>
      <ConfirmDialog
        title="Are you absolutely sure?"
        description="  This action cannot be undone. This will permanently delete the blog."
        open={openConfirmDialog}
        onOpenChange={setOpenConfirmDialog}
        confirmAction={deleteSelectedCategory}
      />
    </>
  );
};

export default DashboardBlog;
