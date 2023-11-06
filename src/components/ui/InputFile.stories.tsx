import type { Meta, StoryObj } from '@storybook/react';

import { InputFile as InputFileComponent } from '@/components/ui/InputFile';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Shadcn/UI',
  component: InputFileComponent,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof InputFileComponent>;

export default meta;
type Story = StoryObj<typeof InputFileComponent>;

export const InputFile = {
  args: { value: 'InputFile', placeholder: 'InputFile' },
} satisfies Story;
