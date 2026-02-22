import { describe, expect, it, vi, beforeEach } from "vitest";
import { copyText } from "../copyText";

declare global {
  interface Navigator {
    clipboard?: {
      writeText: (text: string) => Promise<void>;
    };
  }
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("copyText (Clipboard API only)", () => {
  it("copies with Clipboard API when supported", async () => {
    navigator.clipboard = { writeText: vi.fn().mockResolvedValue(undefined) };

    const result = await copyText("hello");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.method).toBe("clipboard");
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
  });

  it("returns error when Clipboard API fails", async () => {
    navigator.clipboard = {
      writeText: vi.fn().mockRejectedValue(new Error("blocked")),
    };

    const result = await copyText("hello");
    expect(result.ok).toBe(false);
    if (!result.ok)
      expect(String((result.error as Error).message)).toContain("blocked");
  });

  it("returns error when Clipboard API is not supported", async () => {
    // 지원 안 하는 상황을 만들기
    navigator.clipboard = undefined;

    const result = await copyText("hello");
    expect(result.ok).toBe(false);
    if (!result.ok)
      expect(String((result.error as Error).message)).toContain(
        "not supported"
      );
  });
});
