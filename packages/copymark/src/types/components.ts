// Types for component props

import type { ReactNode } from "react";
import type { UseCopyValueOptions } from "./hooks";

type CopyBaseProps = {
  value: string;
  children?: ReactNode;
  className?: string;
} & UseCopyValueOptions;

export type CopyButtonProps = CopyBaseProps;
export type CopyTextProps = CopyBaseProps;
