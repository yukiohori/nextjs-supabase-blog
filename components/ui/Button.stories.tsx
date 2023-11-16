import type { Meta, StoryObj } from '@storybook/react';

import { Button as BtnComponent } from '@/components/ui/Button';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: BtnComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BtnComponent>;

export default meta;
type Story = StoryObj<typeof BtnComponent>;

export const Button = {
  args: {
    children: 'Button',
    className: 'p-2',
  },
} satisfies Story;
