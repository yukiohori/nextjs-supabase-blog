import type { Meta, StoryObj } from '@storybook/react';

import { AspectRadioDemo as AspectRadioDemoComponent } from '@/components/ui/AspectRadioDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: AspectRadioDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AspectRadioDemoComponent>;

export default meta;
type Story = StoryObj<typeof AspectRadioDemoComponent>;

export const AspectRadioDemo = {
  args: {},
} satisfies Story;
