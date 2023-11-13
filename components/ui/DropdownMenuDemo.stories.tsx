import type { Meta, StoryObj } from '@storybook/react';

import { DropdownMenuDemo as DropdownMenuDemoComponent } from '@/components/ui/DropdownMenuDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: DropdownMenuDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DropdownMenuDemoComponent>;

export default meta;
type Story = StoryObj<typeof DropdownMenuDemoComponent>;

export const DropdownMenuDemo = {
  args: {},
} satisfies Story;
