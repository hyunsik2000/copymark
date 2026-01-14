// Types for component props

import type { ReactNode } from "react";
import type { UseCopyValueOptions } from "./hooks";

export type CopyButtonProps = {
  value: string;
  children?: ReactNode;
  className?: string;
} & UseCopyValueOptions;

export type CopyTextProps = {
  value: string;
  children?: ReactNode;
  className?: string;
} & UseCopyValueOptions;
