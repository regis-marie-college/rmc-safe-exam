"use client";

import { usePageVisibility, useWindowFocus } from "@/app/(modules)/exam/hooks";

export default function Screen() {
  usePageVisibility();
  useWindowFocus();

  return (
    <div>
      <h1>Test Page</h1>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeCY_rkVMtqUn48CuTMwoIiaCXGsDT-eK0nPY1Drv6yFlQ2ZQ/viewform?embedded=true"
        width="640"
        height="462"
      >
        Loading…
      </iframe>
    </div>
  );
}
