import Image from 'next/legacy/image';
import Link from 'next/link';

type CardProps = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const Card = ({ title, description, image, link }: CardProps) => {
  return (
    <div className="flex max-w-md flex-col overflow-hidden rounded-lg border bg-white">
      <Link
        href={link}
        className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
      >
        <Image
          src={image}
          layout="fill"
          loading="lazy"
          alt="Photo by Minh Pham"
          className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          <Link
            href="/"
            className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
          >
            {title}
          </Link>
        </h2>

        <p className="mb-8 text-gray-500">{description}</p>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
              <Image
                src="/assets/images/home.webp"
                layout="fill"
                loading="lazy"
                alt="Photo by Brock Wegner"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div>
              <span className="block text-indigo-500">Mike Lane</span>
              <span className="block text-sm text-gray-400">July 19, 2021</span>
            </div>
          </div>

          <span className="rounded border px-2 py-1 text-sm text-gray-500">
            Article
          </span>
        </div>
      </div>
    </div>
  );
};

export { Card };
