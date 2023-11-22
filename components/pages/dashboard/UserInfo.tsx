import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Skeleton } from '@/components/ui/Skeleton';
import type { UserClerk } from '@/types/clerk';

type UserInfoProps = {
  userId: string;
  createdAt?: string;
};

const UserInfo = ({ userId, createdAt }: UserInfoProps) => {
  const [user, setUser] = useState<UserClerk>();
  const userRequested = useRef(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/user?id=${userId}`);
      const { user: userInfo } = await response.json();
      setUser(userInfo);
    };
    if (!userRequested.current) {
      userRequested.current = true;
      getUser();
    }
  }, [userId]);

  return user ? (
    <div className="mt-auto flex items-end justify-between">
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
          <Image
            src={user.imageUrl}
            layout="fill"
            loading="lazy"
            alt={`Profile picture of ${user.firstName} ${user.lastName}`}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <span className="block text-sm text-indigo-500">
            {user.firstName} {user.lastName}
          </span>
          {createdAt && (
            <span className="block text-xs text-gray-400">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        {createdAt && <Skeleton className="h-4 w-[200px]" />}
      </div>
    </div>
  );
};

export { UserInfo };
