import type { Meta, StoryObj } from '@storybook/react';

import { CodeBlock as CodeBlockComponent } from '@/components/organisms/CodeBlock';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Atomic Design/Organisms',
  component: CodeBlockComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CodeBlockComponent>;

export default meta;
type Story = StoryObj<typeof CodeBlockComponent>;

export const CodeBlock = {
  args: {
    children: `Code
Copy 
`,
  },
} satisfies Story;
