import * as React from "react";
import { cn } from "@/lib/utils";

/** Structured Liquidity profile header — avatar beside a glass identity card. */
export function ProfileHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-profile", className)} {...props} />;
}

export function ProfileAvatar({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("sl-ava", "sl-profile-ava", className)} {...props} />;
}

export function ProfileId({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("sl-profile-id", className)} {...props} />;
}

export function ProfileName({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("sl-profile-name", className)} {...props} />;
}

export function ProfileRole({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("sl-profile-role", className)} {...props} />;
}
