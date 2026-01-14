import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CopyButton } from "../src/components/CopyButton";
import { CopymarkToaster, CopymarkToastProvider } from "../src/ui/toast";

const meta: Meta<typeof CopyButton> = {
  title: "Copymark/CopyButton",
  component: CopyButton,
  argTypes: {
    value: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    value: "HELLO-COPYMARK",
  },
  render: (args) => (
    <div style={{ padding: 24 }}>
      <CopyButton {...args} />
    </div>
  ),
};

export const CopyLink: Story = {
  args: {
    value: "https://example.com",
  },
  render: (args) => (
    <CopymarkToastProvider>
      <CopymarkToaster />
        <CopyButton   value="Hello World"
  theme="blue"
  duration={3000}
  messages={{
    successTitle: "성공!",
    successDescription: "복사 완료되었습니다.",
    errorTitle: "실패",
    errorDescription: "다시 시도해주세요."
  }} />
    </CopymarkToastProvider>
  ),
};
