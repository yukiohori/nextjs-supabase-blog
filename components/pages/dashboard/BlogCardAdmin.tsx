import { ImageMinus, Pencil, Trash } from 'lucide-react';
import Image from 'next/legacy/image';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { BlogCategoryRow } from '@/types/database';

import { UserInfo } from './UserInfo';

type BlogCardAdminProps = {
  title: string;
  userId: string;
  description: string;
  image: string | null;
  createdAt: string;
  category?: BlogCategoryRow[];
  permission?: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const BlogCardAdmin = ({
  title,
  description,
  image,
  userId,
  createdAt,
  category = [],
  onEdit,
  permission = false,
  onDelete,
}: BlogCardAdminProps) => {
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
          <UserInfo userId={userId} createdAt={createdAt} />
          <div className="flex-1" />
          <Button disabled={!permission} onClick={onEdit}>
            <Pencil />
          </Button>
          <Button
            disabled={!permission}
            onClick={onDelete}
            variant="destructive"
          >
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { BlogCardAdmin };
