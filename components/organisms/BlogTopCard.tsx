import { clerkClient } from '@clerk/nextjs';
import { ImageMinus } from 'lucide-react';
import Image from 'next/legacy/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import type { BlogCategoryRow } from '@/types/database';

type BlogTopCardProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  createdAt: string;
  userId: string;
  category?: BlogCategoryRow[];
};

const BlogTopCard = async ({
  title,
  description,
  image,
  link,
  userId,
  createdAt,
  category = [],
}: BlogTopCardProps) => {
  const user = await clerkClient.users.getUser(userId);

  return (
    <div className="relative flex max-w-2xl flex-col overflow-hidden rounded-lg border bg-white">
      <Link
        href={link}
        className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
      >
        {image ? (
          <Image
            src={image}
            layout="fill"
            loading="lazy"
            alt="Photo by Magicle"
            className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
          />
        ) : (
          <div className="absolute flex h-full w-full items-center justify-center bg-black/60 text-white">
            <ImageMinus size={50} />
          </div>
        )}
        <div className="absolute flex flex-row flex-wrap px-2">
          {category.map((cat) => (
            <Badge className="mr-2 mt-2" key={cat.id}>
              {cat.name}
            </Badge>
          ))}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          <Link
            href="/"
            className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
          >
            {title}
          </Link>
        </h2>

        <p className="mb-8 line-clamp-5 text-gray-500">{description}</p>

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
              <span className="block text-indigo-500">
                {user.firstName} {user.lastName}
              </span>
              <span className="block text-sm text-gray-400">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BlogTopCard };
