import { clerkClient } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/dist/types/server';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  user: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { id } = req.query;
  const user = await clerkClient.users.getUser(id as string);
  res.status(200).json({ user });
}
