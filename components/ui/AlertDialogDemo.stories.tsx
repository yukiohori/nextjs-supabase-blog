import type { Meta, StoryObj } from '@storybook/react';

import { AlertDialogDemo as AlertDialogDemoComponent } from '@/components/ui/AlertDialogDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: AlertDialogDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AlertDialogDemoComponent>;

export default meta;
type Story = StoryObj<typeof AlertDialogDemoComponent>;

export const AlertDialogDemo = {
  args: {
    children: 'AlertDialogDemo',
  },
} satisfies Story;
