import type { Meta, StoryObj } from '@storybook/react';

import { ToastDemo as ToastDemoComponent } from '@/components/ui/ToastDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: ToastDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ToastDemoComponent>;

export default meta;
type Story = StoryObj<typeof ToastDemoComponent>;

export const ToastDemo = {
  args: {},
} satisfies Story;
