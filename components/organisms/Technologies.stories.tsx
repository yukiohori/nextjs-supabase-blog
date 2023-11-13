import type { Meta, StoryObj } from '@storybook/react';

import { Technologies as TechnologiesComponent } from '@/components/organisms/Technologies';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Atomic Design/Organisms',
  component: TechnologiesComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TechnologiesComponent>;

export default meta;
type Story = StoryObj<typeof TechnologiesComponent>;

export const Technologies = {} satisfies Story;
