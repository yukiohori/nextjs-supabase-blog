'use client';

import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/legacy/image';
import Link from 'next/link';

type ImageCardProps = {
  image: string | null;
  title?: string;
  link: string;
};

const ImageCard = ({ image, title, link }: ImageCardProps) => {
  return (
    <div className="relative m-auto w-full max-w-lg overflow-hidden rounded-lg">
      <Link href={link}>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          {image && (
            <Image
              src={image}
              alt={title}
              layout="fill"
              loading="lazy"
              objectFit="cover"
            />
          )}

          {title && (
            <div className="absolute flex h-full w-full items-center justify-center bg-black/60">
              <p className="text-lg font-bold text-white">{title}</p>
            </div>
          )}
        </AspectRatio>
      </Link>
    </div>
  );
};

export { ImageCard };
