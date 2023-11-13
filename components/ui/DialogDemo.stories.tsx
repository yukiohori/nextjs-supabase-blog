import type { Meta, StoryObj } from '@storybook/react';

import { DialogDemo as DialogDemoComponent } from '@/components/ui/DialogDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: DialogDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DialogDemoComponent>;

export default meta;
type Story = StoryObj<typeof DialogDemoComponent>;

export const DialogDemo = {
  args: {},
} satisfies Story;
