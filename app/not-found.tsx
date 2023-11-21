import { XOctagon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <XOctagon size={48} />
      <h1 className="my-4 text-4xl font-bold">Not Found</h1>
      <p className="mb-4">Could not find requested resource</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
