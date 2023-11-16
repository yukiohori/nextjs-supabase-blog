import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TUTORIAL PAGE',
  description:
    'This is a tutorial page. You can see all the tutorials in this page.',
};

const TutorialIndex = () => {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 pb-8 md:px-8">
      <h1 className="mb-6 pt-32 text-center text-3xl font-bold">TUTORIAL</h1>
      <div className="min-h-[400px] w-full overflow-hidden" />
    </div>
  );
};

export default TutorialIndex;
