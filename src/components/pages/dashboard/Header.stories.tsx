import type { Meta, StoryObj } from '@storybook/react';

import { Header as HeaderComponent } from '@/components/pages/dashboard/Header';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Dashboard/UI',
  component: HeaderComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof HeaderComponent>;

export const Header = {} satisfies Story;
