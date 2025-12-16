"use client";

import { sendResponse, usePageVisibility, useWindowFocus } from "@/app/(modules)/exams/hooks";
import { ChangeEvent, useState } from "react";

export default function Screen() {
  const [student, setStudent] = useState({
    last_name: "",
    first_name: "",
    middle_name: "",
  });

  usePageVisibility(student);
  useWindowFocus(student);

  const [submitted, setSubmitted] = useState(false);

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    setStudent((s) => ({ ...s, [target.name]: target.value }));
  };

  const submitInfo = () => {
    sendResponse(student, "Started exam");
    setSubmitted(true);
  };

  return (
    <div className="screen-holder">
      {!submitted && (
        <div className="form-holder">
          <form>
            <div className="form-group full">
              <label htmlFor="last_name">Last Name</label>
              <input type="text" id="last_name" name="last_name" onChange={inputChange} value={student.last_name} />
            </div>

            <div className="form-group full">
              <label htmlFor="first_name">First Name</label>
              <input type="text" id="first_name" name="first_name" onChange={inputChange} value={student.first_name} />
            </div>

            <div className="form-group full">
              <label htmlFor="middle_name">Middle Name</label>
              <input
                type="text"
                id="middle_name"
                name="middle_name"
                onChange={inputChange}
                value={student.middle_name}
              />
            </div>

            <p>When you click on Submit, this will start the exam. Make sure you are ready</p>
            <button type="button" onClick={submitInfo}>
              Submit
            </button>
          </form>
        </div>
      )}

      {submitted && (
        <div className="frame-holder">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeCY_rkVMtqUn48CuTMwoIiaCXGsDT-eK0nPY1Drv6yFlQ2ZQ/viewform?embedded=true"
            width="98%"
            height="768"
          >
            Loading…
          </iframe>
        </div>
      )}
    </div>
  );
}
