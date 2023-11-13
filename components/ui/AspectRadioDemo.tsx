import Image from 'next/image';

import { AspectRatio } from '@/components/ui/AspectRatio';

export function AspectRadioDemo() {
  return (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src="/assets/images/home.webp"
          alt="Image Demo"
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
}
