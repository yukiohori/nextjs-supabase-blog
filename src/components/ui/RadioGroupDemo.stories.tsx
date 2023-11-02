import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroupDemo as RadioGroupDemoComponent } from '@/components/ui/RadioGroupDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: RadioGroupDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RadioGroupDemoComponent>;

export default meta;
type Story = StoryObj<typeof RadioGroupDemoComponent>;

export const RadioGroupDemo = {
  args: {
    children: 'RadioGroupDemo',
  },
} satisfies Story;
