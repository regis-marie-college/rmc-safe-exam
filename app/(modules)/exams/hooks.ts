"use client";

import { useEffect } from "react";

// Hook to track page/tab visibility
export function usePageVisibility(student: { last_name: string; first_name: string; middle_name: string }) {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sendResponse(student, "User switched tab or minimized browser!");
      } else {
        sendResponse(student, "User returned to this tab");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [student]);
}

// Hook to detect window focus/blur
export function useWindowFocus(student: { last_name: string; first_name: string; middle_name: string }) {
  useEffect(() => {
    const handleBlur = () => sendResponse(student, "User is interacting outside this window!");
    const handleFocus = () => sendResponse(student, "User returned to the window!");

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [student]);
}

export function sendResponse(
  student: {
    last_name: string;
    first_name: string;
    middle_name: string;
  },
  message: string
) {
  if (!student.last_name || !student.first_name) return;

  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSciDSli2YRvhqo6wcxVaru8OhR4exKuo6nERcz0AZF7dDYpmQ/formResponse";

  const data = new FormData();
  data.append("entry.310397405", student.last_name);
  data.append("entry.1401036627", student.first_name);
  data.append("entry.680089442", student.middle_name);
  data.append("entry.362710045", message);

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
