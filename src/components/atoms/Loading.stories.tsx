import type { Meta, StoryObj } from '@storybook/react';

import { Loading as LoadingComponent } from '@/components/atoms/Loading';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Atomic Design/Atoms',
  component: LoadingComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LoadingComponent>;

export default meta;
type Story = StoryObj<typeof LoadingComponent>;

export const Loading = {
  args: {
    children: 'Loading',
  },
} satisfies Story;
