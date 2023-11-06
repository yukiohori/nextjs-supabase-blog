import type { Meta, StoryObj } from '@storybook/react';

import { Alert as AlertComponent } from '@/components/ui/Alert';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: AlertComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AlertComponent>;

export default meta;
type Story = StoryObj<typeof AlertComponent>;

export const Alert = {
  args: {
    children: 'Alert',
  },
} satisfies Story;
