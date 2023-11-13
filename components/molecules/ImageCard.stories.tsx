import type { Meta, StoryObj } from '@storybook/react';

import { Card as CardComponent } from '@/components/molecules/Card';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Atomic Design/Molecules',
  component: CardComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardComponent>;

export default meta;
type Story = StoryObj<typeof CardComponent>;

export const Card = {
  args: {
    title: 'Title',
    description: 'Description',
    image: '/assets/images/home.webp',
    link: '/',
  },
} satisfies Story;
