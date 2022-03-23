import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


describe("Appliction", () => {//AXIOS FUNCTIONS
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
        
    fireEvent.click(getByText('Tuesday'));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });

  //SCHEDULER CAN LOAD DATA
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />)

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0]
    
     
    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: {value: "New Student"}
    })

    fireEvent.click(getByText(appointment, "Save"))

    // console.log(prettyDOM(appointment, "Save"))

    // debug()

    expect(getByText(appointment, "Loading"));
  });

  //ASYNCH TEST WAITS FOR COMPONENT TO UPDATE

  //USE CONTAINERS TO FIND SPECIFIC DOM NODES

  //CHAIN PROMISES TO HANDLE ASYNCH TESTING

  // OVERRIDE MOCK IMPLEMENTATIONS

  //SETUP AND TEARDOWN FUNCITONS TO PERFORM COMMON TASKS
})