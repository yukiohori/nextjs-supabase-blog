import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar as SidebarComponent } from '@/components/pages/dashboard/Sidebar';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Dashboard/UI',
  component: SidebarComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SidebarComponent>;

export default meta;
type Story = StoryObj<typeof SidebarComponent>;

export const Sidebar = {
  args: {
    logout: <p>Logout</p>,
  },
} satisfies Story;
