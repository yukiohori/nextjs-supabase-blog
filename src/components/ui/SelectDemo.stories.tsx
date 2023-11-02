import type { Meta, StoryObj } from '@storybook/react';

import { SelectDemo as SelectDemoComponent } from '@/components/ui/SelectDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: SelectDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SelectDemoComponent>;

export default meta;
type Story = StoryObj<typeof SelectDemoComponent>;

export const SelectDemo = {
  args: {},
} satisfies Story;
