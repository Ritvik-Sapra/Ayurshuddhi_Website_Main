"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, REVEAL_VIEWPORT, stagger } from "@/frontend/lib/motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Element to render: use "ul" with "li" items so lists keep their semantics. */
  as?: "div" | "ul" | "ol";
};

type StaggerItemProps = Omit<StaggerProps, "as"> & { as?: "div" | "li" };

/**
 * Container for a grid or list: when it scrolls into view its `StaggerItem` children reveal one
 * after another. Only the container watches the viewport; the items just carry variants.
 */
export function StaggerGroup({ children, className, as = "div" }: StaggerProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
    >
      {children}
    </Tag>
  );
}

/** One revealed child of a `StaggerGroup`. */
export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
