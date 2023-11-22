import { clerkClient } from '@clerk/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { UserClerk } from '@/types/clerk';

type ResponseData = {
  user: UserClerk;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { id } = req.query;
  const user = await clerkClient.users.getUser(id as string);
  res.status(200).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    },
  });
}
