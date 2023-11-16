import type { Meta, StoryObj } from '@storybook/react';

import { Toggle as ToggleComponent } from '@/components/ui/Toggle';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: ToggleComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ToggleComponent>;

export default meta;
type Story = StoryObj<typeof ToggleComponent>;

export const Toggle = {
  args: {
    children: 'Toggle',
  },
} satisfies Story;
