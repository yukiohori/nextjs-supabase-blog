import type { Meta, StoryObj } from '@storybook/react';

import { Input as InputComponent } from '@/components/ui/Input';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: InputComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof InputComponent>;

export default meta;
type Story = StoryObj<typeof InputComponent>;

export const Input = {
  args: { value: 'Input', placeholder: 'Input' },
} satisfies Story;
