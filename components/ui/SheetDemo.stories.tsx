import type { Meta, StoryObj } from '@storybook/react';

import { SheetDemo as SheetDemoComponent } from '@/components/ui/SheetDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: SheetDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SheetDemoComponent>;

export default meta;
type Story = StoryObj<typeof SheetDemoComponent>;

export const SheetDemo = {
  args: {},
} satisfies Story;
