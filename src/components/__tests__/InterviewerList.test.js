import React from "react";

import { render, cleanup } from "@testing-library/react";

import InterviewerList from "components/InterviewerList";

afterEach(cleanup);

const interviewers = []

it("renders without crashing", () => {
  render(<InterviewerList interviewers={interviewers}/>);
});


