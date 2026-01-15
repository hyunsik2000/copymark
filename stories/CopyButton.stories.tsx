import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect } from "react";
import { CopyButton } from "../src/components/CopyButton";
import { CopymarkToaster, CopymarkToastProvider } from "../src/ui/toast";

function ClipboardMock({
  mode,
  children,
}: {
  mode: "success" | "fail";
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const clipboard = (navigator as any).clipboard ?? ((navigator as any).clipboard = {});
    const original = clipboard.writeText;

    clipboard.writeText =
      mode === "fail"
        ? async () => {
            throw new Error("Mocked clipboard failure");
          }
        : async () => {};

    return () => {
      if (original) clipboard.writeText = original;
    };
  }, [mode]);

  return <>{children}</>;
}

const meta: Meta<typeof CopyButton> = {
  title: "Copymark/CopyButton",
  component: CopyButton,
  argTypes: {
    value: { control: "text" },
  },
  decorators: [
    (Story) => (
      <CopymarkToastProvider>
        <CopymarkToaster />
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </CopymarkToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    value: "DEFAULT-COPY",
    children: "Copy (No-Toast)",
  },
  render: (args) => <CopyButton {...args} />,
};

export const Success: Story = {
  args: {
    value: "SUCCESS-COPY",
    children: "Copy (Success)",
  },
  render: (args) => (
    <ClipboardMock mode="success">
      <CopyButton {...args} />
    </ClipboardMock>
  ),
};

export const Fail: Story = {
  args: {
    value: "FAIL-COPY",
    children: "Copy (Fail)",
    messages: {
      errorTitle: "실패",
      errorDescription: "클립보드 권한을 확인해주세요.",
    },
  },
  render: (args) => (
    <ClipboardMock mode="fail">
      <CopyButton {...args} />
    </ClipboardMock>
  ),
};
