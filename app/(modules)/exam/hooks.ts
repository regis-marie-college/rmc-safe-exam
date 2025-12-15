"use client";

import { useEffect } from "react";

// Hook to track page/tab visibility
export function usePageVisibility() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sendResponse("User switched tab or minimized browser!");
      } else {
        sendResponse("User returned to this tab");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}

// Hook to detect window focus/blur
export function useWindowFocus() {
  useEffect(() => {
    const handleBlur = () => sendResponse("User is interacting outside this window!");
    const handleFocus = () => sendResponse("User returned to the window!");

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
}

function sendResponse(message: string) {
  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSciDSli2YRvhqo6wcxVaru8OhR4exKuo6nERcz0AZF7dDYpmQ/formResponse";

  const data = new FormData();
  data.append("entry.310397405", "last");
  data.append("entry.1401036627", "first");
  data.append("entry.680089442", "middle");
  data.append("entry.362710045", message);

  console.log(data);

  fetch(formURL, {
    method: "POST",
    body: data,
    mode: "no-cors",
  })
    .then(() => {
      console.log("Submitted");
    })
    .catch(() => {
      console.error("Failed to send");
    });
}
