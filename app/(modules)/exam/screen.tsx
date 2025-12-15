"use client";

import { usePageVisibility, useWindowFocus } from "@/app/(modules)/exam/hooks";

export default function Screen() {
  usePageVisibility();
  useWindowFocus();

  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}
