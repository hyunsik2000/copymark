import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CopyText } from "../src/components/CopyText";
import { CopymarkToaster, CopymarkToastProvider } from "../src/ui/toast";

const meta: Meta<typeof CopyText> = {
  title: "Copymark/CopyText",
  component: CopyText,
  argTypes: {
    value: { control: "text" },
    successText: { control: "text" },
    errorText: { control: "text" },
    showHintOnError: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyText>;

export const Default: Story = {
  args: {
    value: "COUPON-2026",
    children: "쿠폰 코드 복사하기",
    successText: "Copied!",
    errorText: "Copy failed",
    showHintOnError: true,
  },
  render: (args) => (
    <div style={{ padding: 24, fontSize: 16 }}>
      <CopyText {...args} />
      <p style={{ marginTop: 12, opacity: 0.7 }}>
        텍스트를 클릭하면 클립보드로 복사됩니다.
      </p>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    value: "https://example.com/invite/very-very-long-link",
    children: "초대 링크 복사하기",
    showHintOnError: true,
  },
  render: (args) => (
    <CopymarkToastProvider>
      <CopymarkToaster />
      <div style={{ padding: 24, fontSize: 16 }}>
        <CopyText {...args} />
      </div>
    </CopymarkToastProvider>
  ),
};
