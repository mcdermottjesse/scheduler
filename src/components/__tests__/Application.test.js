import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  prettyDOM,
  queryByText,
  getByPlaceholderText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    //this getByText example does not need container passed to it
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  //can also implent test as per below

  // it("changes the schedule when a new day is selected", async () => {
  //   const { getByText } = render(<Application />);
  //   await waitForElement(() => getByText("Monday"));
  //   fireEvent.click(getByText("Tuesday"));
  //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
  // });

  it("loads data, books an interview and reduces the spots remaining fot the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    //this getByText example needs container passed to it and is imported at top
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    })
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"))
    // debug()
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
   
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
      );
      expect(getByText(day, "no spots remaining")).toBeInTheDocument();
      // debug()
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    
    // const appointments = getAllByTestId(container, "appointment");
    // const appointment = appointments[1];

    //can use above or below
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(getByAltText(appointment, "Delete"));
    // debug()
    expect(getByText(appointment, "Are you sure you want to delete")).toBeInTheDocument();

    // fireEvent.click(queryByText(appointment, "Confirm"));
    fireEvent.click(getByText(appointment, "Confirm"))

    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

     const day = getAllByTestId(container, "day").find(day =>
     queryByText(day, "Monday")
      );
      expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

    debug()

  })
});
