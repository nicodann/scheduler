import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

import axios from "../../__mocks__/axios"

  //SETUP AND TEARDOWN FUNCITONS TO PERFORM COMMON TASKS
afterEach(cleanup);


describe("Application", () => {
  //AXIOS FUNCTIONS
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
        
    fireEvent.click(getByText('Tuesday'));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    //SCHEDULER CAN LOAD DATA
    const { container } = render(<Application />)

    await waitForElement(() => getByText(container, "Archie Cohen"))
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0]
    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: {value: "Lydia Miller-Jones"}
    })

    fireEvent.click(getByText(appointment, "Save"))

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    //BOOKS AN INTERVIEW
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    
    //VERIFY SPOTS HAVE CHANGED
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application
    // 2. Wait until the text "Archie Cohen" is displayed
    // 3. Click the "Delete" button on the first booked appointment (Archie Cohen?)
    // 4. Check that the element with the text "Confirm" is displayed
    // 5. Click the "Confirm" button on that same element
    // 5.b) Check that the element with the text "Deleting" is displayed
    // 6. Wait until the element with the text "Add" is displayed
    // 7. Check for said element
    // 8. Check that the Dyalist Item with text "Monday" also has text "2 spots remaining"
    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      );
      
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
      
  });
    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application
    // 2. Wait until the text "Archie Cohen" is displayed
    // 3. Click the "Edit" button on the first booked appointment (Archie Cohen?)
    // 4. Change the input value? getByPlaceholdertext
    // 5. Click the "Save" button (getByAltText)
    // 6. Check that the name Text is in the appointment
    // 7. Check that the spots remaining = 1
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: {value: "Lydia Miller-Jones"}
    })

    fireEvent.click(getByText(appointment, "Save"))

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    
    
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

  // 5.
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    // 1. Render the Application
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0]
    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: {value: "Lydia Miller-Jones"}
    })

    fireEvent.click(getByText(appointment, "Save"))

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Cannot Save"));

    expect(getByText(appointment, "Cannot Save")).toBeInTheDocument();

  });

  // 6.
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      );
      
    fireEvent.click(getByAltText(appointment, "Delete"));
    
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    
    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Cannot Delete"));

    expect(getByText(appointment, "Cannot Delete")).toBeInTheDocument();

  });

})