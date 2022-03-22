import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// IT RENDERS
xit("renders without crashing", () => {
  render(<Application />);
});

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday"));
})

//AXIOS FUNCTIONS

//SCHEDULER CAN LOAD DATA

//ASYNCH TEST WAITS FOR COMPONENT TO UPDATE

//USE CONTAINERS TO FIND SPECIFIC DOM NODES

//CHAIN PROMISES TO HANDLE ASYNCH TESTING

// OVERRIDE MOCK IMPLEMENTATIONS

//SETUP AND TEARDOWN FUNCITONS TO PERFORM COMMON TASKS