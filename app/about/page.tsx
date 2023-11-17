import type { Metadata } from 'next';

import { Technologies } from '@/components/organisms/Technologies';

export const metadata: Metadata = {
  title: 'ABOUT PAGE',
  description: 'This is a about page. You can see about this page.',
};

const AboutIndex = () => {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 pb-8 md:px-8">
      <h1 className="mb-6 pt-32 text-center text-5xl font-bold">
        Welcome to My Tech Journey
      </h1>
      <div className="mt-10 min-h-[400px] w-full overflow-hidden">
        <p className="m-auto mb-4 max-w-lg text-center">
          At{' '}
          <span className="font-bold">
            &quot;NextJS Supabase Blog Starter&quot;
          </span>
          , I am passionately dedicated to crafting cutting-edge web
          applications that stand out with their functionality and employ the
          latest and greatest technologies. My unwavering commitment to
          innovation drives me to employ the following key technologies:
        </p>
        <Technologies />
        <h3 className="my-10 text-center font-bold">
          Next.js - Shaping the Future of React
        </h3>
        <p className="m-auto max-w-lg text-center">
          <span className="font-bold">Next.js</span> serves as the backbone of
          my web applications. It&apos;s a robust React framework that empowers
          me to create lightning-fast, SEO-friendly, and server-rendered
          applications.
          <br />
          With <span className="font-bold">Next.js</span>, I&apos;ve embraced
          the future of web development.
        </p>
        <h3 className="my-10 text-center font-bold">
          Supabase - Unleashing the Power of PostgreSQL
        </h3>
        <p className="m-auto max-w-lg text-center">
          When it comes to managing databases,{' '}
          <span className="font-bold">Supabase</span> is my trusted platform.
          It&apos;s an open-source alternative to Firebase, offering real-time
          database capabilities, authentication, and more.
          <br />
          <span className="font-bold">Supabase</span> harnesses the strength of
          PostgreSQL, providing a dependable and scalable database solution.
        </p>
        <h3 className="my-10 text-center font-bold">
          Clerk - Elevating User Authentication
        </h3>
        <p className="m-auto max-w-lg text-center">
          For user authentication, I rely on{' '}
          <span className="font-bold">Clerk</span>. This platform offers secure
          user management right out of the box, all while enabling seamless
          customization of the user experience.
          <br />
          With <span className="font-bold">Clerk</span>, I ensure that user data
          remains protected and accessible solely to authorized users.
        </p>
        <h3 className="my-10 text-center font-bold">
          Tailwind CSS - Crafting Stylish and Efficient UI
        </h3>
        <p className="m-auto max-w-lg text-center">
          <span className="font-bold">Tailwind CSS</span> is my preferred CSS
          framework. It allows me to design stunning and responsive user
          interfaces with minimal effort.
          <br />
          <span className="font-bold">Tailwind&apos;s</span> utility-first
          approach streamlines my design process, guaranteeing a polished and
          consistent appearance for my applications.
        </p>
        <ol className="m-auto mb-10 mt-14 max-w-lg text-center font-bold">
          <li>Shadcn/UI</li>
          <li>Jest</li>
          <li>Playwright</li>
          <li>Framer Motion</li>
          <li>Tiptap</li>
          <li>Storybook</li>
        </ol>
        <p className="m-auto max-w-lg text-center">
          In addition to these core technologies, I continuously explore and
          integrate other tools and libraries that enhance the functionality and
          aesthetics of my web applications. My commitment to staying at the
          forefront of technology ensures that my users enjoy the best possible
          experience.
          <br />
          <br />
          Thank you for embarking on this tech journey with me. I am thrilled to
          continue pushing the boundaries of what&apos;s achievable on the web.
          If you have any questions or desire further insights into my
          technology stack, please do not hesitate to reach out.
        </p>
      </div>
    </div>
  );
};

export default AboutIndex;
