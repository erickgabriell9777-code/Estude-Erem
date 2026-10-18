"use client";

import type { ComponentProps } from "react";
import { DialogContent as Content } from "@/components/ui/dialog";
import { AlertDialogContent as AlertContent } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export * from "@/components/ui/dialog";
export * from "@/components/ui/alert-dialog";

// Remove the primitive's half-screen translations at the composition boundary.
// Position every app dialog with insets and margins, independent of animations.
const positioning = "app-modal top-0 left-0 translate-x-0 translate-y-0";
export function DialogContent({ className, ...props }: ComponentProps<typeof Content>) {
  return <Content {...props} className={cn(positioning, className)} />;
}
export function AlertDialogContent({ className, ...props }: ComponentProps<typeof AlertContent>) {
  return <AlertContent {...props} className={cn(positioning, className)} />;
}
