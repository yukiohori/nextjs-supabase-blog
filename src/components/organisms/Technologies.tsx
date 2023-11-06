import Image from 'next/legacy/image';

const Technologies = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
          Technologies Used
        </h2>

        <div className="grid gap-4 rounded-lg bg-gray-100 p-6 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8">
          <div className="relative flex items-center justify-center">
            <Image
              src="/assets/images/nextjs.svg"
              loading="lazy"
              width={100}
              height={100}
              alt="NextJS Logo"
            />
          </div>
          <div className="relative flex items-center justify-center">
            <Image
              src="/assets/images/supabase.svg"
              loading="lazy"
              width={300}
              height={160}
              alt="Supabase Logo"
            />
          </div>
          <div className="relative flex items-center justify-center">
            <Image
              src="/assets/images/clerk.png"
              loading="lazy"
              layout="fixed"
              width={200}
              height={65}
              alt="Clerk Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Technologies };
