import type { Meta, StoryObj } from '@storybook/react';

import { AccordionDemo as AccordionDemoComponent } from '@/components/ui/AccordionDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: AccordionDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AccordionDemoComponent>;

export default meta;
type Story = StoryObj<typeof AccordionDemoComponent>;

export const AccordionDemo = {
  args: {
    children: 'AccordionDemo',
  },
} satisfies Story;
