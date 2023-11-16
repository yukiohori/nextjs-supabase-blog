import type { Meta, StoryObj } from '@storybook/react';

import { Badge as BadgeComponent } from '@/components/ui/Badge';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: BadgeComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BadgeComponent>;

export default meta;
type Story = StoryObj<typeof BadgeComponent>;

export const Badge = {
  args: {
    children: 'Badge',
  },
} satisfies Story;
