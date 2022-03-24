describe("Appointments", () => {
  beforeEach(() => {
    //resets server
    cy.request("GET", "/api/debug/reset");
    //Visits the root of our web server
    cy.visit("/");
    // checks if it's loaded
    cy.contains('Monday');
  })

  xit("should book an interview", () => {
    //Clicks on the "Add" button in the second appointment
    cy.get("[alt='Add']")
      .first()
      .click()
      //Enters their name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")
      //Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click()
      //Clicks the save button
    cy.contains('Save')
      .click()
      //Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  xit("should edit an interview", () => {
    //Clicks the edit button for the existing appointment
    cy.get("[alt='Edit']")
      .first()
      .click({force: true});
    //Changes the name and interviewer
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones")
    cy.get("[alt='Tori Malcolm']")
      .click()
      //Clicks the save button
    cy.contains('Save')
      .click()
    //Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {;

    //Clicks the delete button for the existing appointment
    cy.get("[alt='Delete']")
      .first()
      .click({force: true});
    //Clicks the confirm button
    cy.contains("Confirm")
      .first()
      .click();
    //Sees that the appointment slot is empty
    cy.contains("Deleting").should('exist')
    cy.contains("Deleting").should("not.exist")
    cy.contains(".appointment__card--show", "Archie Coh").should("not.exist");
    
    

  });

  

//Booking
//The plan for testing the booking of an interview is more manageable.
//
//Editing
//If we edit the existing appointment booked for "Archie Cohen", then we don't need to create an appointment first.
//
//Canceling
//We can also perform a test to cancel an existing interview. It is for this reason that we need to reset the database after each test. If one test cancels and interview and the next test expects that interview to exist, then our tests can break for reasons unrelated to our code quality.
//
})