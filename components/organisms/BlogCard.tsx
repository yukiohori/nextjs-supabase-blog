import { clerkClient } from '@clerk/nextjs';
import { ImageMinus } from 'lucide-react';
import Image from 'next/legacy/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { BlogCategoryRow } from '@/types/database';

type BlogCardProps = {
  id: number;
  title: string;
  userId: string;
  description: string;
  image: string | null;
  createdAt: string;
  category?: BlogCategoryRow[];
};

const BlogCard = async ({
  id,
  title,
  description,
  image,
  userId,
  createdAt,
  category = [],
}: BlogCardProps) => {
  const user = await clerkClient.users.getUser(userId);

  return (
    <div className="flex min-h-[240px] w-full flex-col overflow-hidden rounded-lg border shadow-lg sm:flex-row">
      <div className="relative h-[300px] w-full sm:h-full sm:min-h-[280px] sm:max-w-sm">
        {image ? (
          <Image
            src={image}
            alt={title}
            layout="fill"
            loading="lazy"
            objectFit="cover"
            className="w-full"
          />
        ) : (
          <div className="absolute flex h-full w-full items-center justify-center bg-black/60 text-white">
            <ImageMinus size={50} />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col p-4">
        <div className="flex-1">
          <h3 className="line-clamp-1">{title}</h3>
          <p className="line-clamp-4">{description}</p>
          <div className="mt-2 flex flex-row flex-wrap">
            {category.map((cat) => (
              <Badge className="mr-2 mt-2" key={cat.id}>
                {cat.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-row justify-end space-x-4 sm:mt-0">
          <div className="mt-auto flex items-end justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                <Image
                  src={user.imageUrl}
                  layout="fill"
                  loading="lazy"
                  alt={`Photo by ${user.firstName} ${user.lastName}`}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div>
                <span className="block text-sm text-indigo-500">
                  {user.firstName} {user.lastName}
                </span>
                <span className="block text-xs text-gray-400">
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1" />
          <Link href={`/blog/${id}`}>
            <Button>Read More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { BlogCard };
