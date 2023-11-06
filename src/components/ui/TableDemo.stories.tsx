import type { Meta, StoryObj } from '@storybook/react';

import { TableDemo as TableDemoComponent } from '@/components/ui/TableDemo';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: TableDemoComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TableDemoComponent>;

export default meta;
type Story = StoryObj<typeof TableDemoComponent>;

export const TableDemo = {
  args: {},
} satisfies Story;
