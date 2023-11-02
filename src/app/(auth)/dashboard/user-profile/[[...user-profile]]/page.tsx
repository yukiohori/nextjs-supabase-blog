import { UserProfile } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Profile',
  description: 'User Profile',
};

const UserProfilePage = () => (
  <div>
    <UserProfile />
  </div>
);

export default UserProfilePage;
