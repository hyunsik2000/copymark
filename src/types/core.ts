// Core types for copy functionality

export type CopyMethod = "clipboard";

export type CopyResult =
  | { ok: true; method: CopyMethod }
  | { ok: false; method: CopyMethod; error: unknown };
