import type { Meta, StoryObj } from '@storybook/react';

import { Textarea as TextareaComponent } from '@/components/ui/Textarea';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: TextareaComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TextareaComponent>;

export default meta;
type Story = StoryObj<typeof TextareaComponent>;

export const Textarea = {
  args: {},
} satisfies Story;
