import type { Meta, StoryObj } from '@storybook/react';

import { Label as LabelComponent } from '@/components/ui/Label';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: LabelComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LabelComponent>;

export default meta;
type Story = StoryObj<typeof LabelComponent>;

export const Label = {
  args: {
    children: 'Label',
  },
} satisfies Story;
