import { Terminal } from 'lucide-react';
import type { Metadata } from 'next';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User dashboard',
};

const Dashboard = () => (
  <div className="flex flex-col space-y-2">
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Welcome!</AlertTitle>
      <AlertDescription>
        You can create categories and Blogs from the sidebar.
      </AlertDescription>
    </Alert>
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Row Level Security</AlertTitle>
      <AlertDescription>
        You can edit and delete only your own blogs and categories.
      </AlertDescription>
    </Alert>
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Coming soon..</AlertTitle>
      <AlertDescription>Blog Preview Tab is coming soon.</AlertDescription>
    </Alert>
  </div>
);

export default Dashboard;
