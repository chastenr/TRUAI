"use client";

import { openLeadDemo } from "./DemoLeadModal";

type DemoModalButtonProps = {
  mode?: "lead" | "showing";
  property?: string;
  message?: string;
  className?: string;
  children: React.ReactNode;
};

export default function DemoModalButton({
  mode = "lead",
  property,
  message,
  className,
  children,
}: DemoModalButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openLeadDemo({ mode, property, message })}
      className={className}
    >
      {children}
    </button>
  );
}
