import type { Meta, StoryObj } from '@storybook/react';

import { ImageCard as ImageCardComponent } from '@/components/molecules/ImageCard';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Atomic Design/Molecules',
  component: ImageCardComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ImageCardComponent>;

export default meta;
type Story = StoryObj<typeof ImageCardComponent>;

export const ImageCard = {
  args: {
    title: 'Title',
    image: '/assets/images/home.webp',
    link: '/',
  },
} satisfies Story;
