import { UserProfile } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Profile',
  description: 'User Profile',
};

const UserProfilePage = () => (
  <div className="flex items-center justify-center pb-6">
    <UserProfile />
  </div>
);

export default UserProfilePage;
