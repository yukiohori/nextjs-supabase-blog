import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox as CheckboxComponent } from '@/components/ui/Checkbox';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: CheckboxComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CheckboxComponent>;

export default meta;
type Story = StoryObj<typeof CheckboxComponent>;

export const Checkbox = {
  args: {},
} satisfies Story;
