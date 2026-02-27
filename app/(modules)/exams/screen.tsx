"use client";

import { sendResponse, usePageVisibility, useWindowFocus } from "@/app/(modules)/exams/hooks";
import { ChangeEvent, useEffect, useState } from "react";

export default function Screen() {
  const [student, setStudent] = useState({
    last_name: "",
    first_name: "",
    middle_name: "",
  });

  usePageVisibility(student);
  useWindowFocus(student);

  const [submitted, setSubmitted] = useState(false);

  // ✅ 45 minutes = 2700 seconds
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  // ✅ COUNTDOWN EFFECT
  useEffect(() => {
    if (!submitted) return;
    if (timeLeft <= 0) {
      sendResponse(student, "Time expired");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [submitted, timeLeft, student]);

  const formatTime = (total: number) => {
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setStudent((s) => ({ ...s, [target.name]: target.value }));
  };

  const submitInfo = () => {
    sendResponse(student, "Started exam");
    setSubmitted(true);
  };

  const isWarning = timeLeft <= 5 * 60;

  return (
    <div className="screen-holder">
      {!submitted && (
        <div className="form-holder">
          <form>
            <div className="form-group">
              <label>Last Name</label>
              <input name="last_name" onChange={inputChange} value={student.last_name} />
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input name="first_name" onChange={inputChange} value={student.first_name} />
            </div>

            <div className="form-group">
              <label>Middle Name</label>
              <input name="middle_name" onChange={inputChange} value={student.middle_name} />
            </div>

            <div className="form-group">
              <p>When you click Submit, the 45-minute exam timer will start.</p>
            </div>

            <button type="button" onClick={submitInfo}>
              Submit
            </button>
          </form>
        </div>
      )}

      {submitted && (
        <div className="frame-holder">
          {/* ✅ COUNTDOWN DISPLAY */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "36px",
              background: isWarning ? "#7a0000" : "#111",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "bold",
              zIndex: 9999,
            }}
          >
            ⏱ {formatTime(timeLeft)}
          </div>

          {/* ✅ OPTIONAL: show expired overlay */}
          {timeLeft <= 0 && (
            <div
              style={{
                padding: 20,
                textAlign: "center",
                fontSize: 24,
                fontWeight: "bold",
                color: "red",
              }}
            >
              Time is up.
            </div>
          )}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdQQQcrTfRtDI3fIzVzzLU1RY83ABOlogNbRBdI7TVP8soLaw/viewform?embedded=true"
            width="98%"
            height="900"
          >
            Loading…
          </iframe>
        </div>
      )}
    </div>
  );
}
