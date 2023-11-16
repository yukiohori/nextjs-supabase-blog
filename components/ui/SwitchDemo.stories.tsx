import type { Meta, StoryObj } from '@storybook/react';

import { SwitchDemo as SwitchDemoComponent } from '@/components/ui/SwitchDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: SwitchDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SwitchDemoComponent>;

export default meta;
type Story = StoryObj<typeof SwitchDemoComponent>;

export const SwitchDemo = {
  args: {},
} satisfies Story;
