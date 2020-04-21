describe("Main screen", () => {
  const backendUrl = Cypress.config("backendUrl");

  beforeEach(() => {
    cy.visit("/");
  });

  it("Car list rendered properly and have at least one car", () => {
    // Start the server that waits for routes
    cy.server();

    // create alias
    cy.route("GET", `${backendUrl}/cars`).as("getCars");

    // if we get the cars, then check whether we have at least 1 car
    cy.wait("@getCars").then(xhr => {
      const carList = cy.get("[data-testid=car-list]");

      carList.find("[data-testid=car]").then(cars => {
        expect(cars).length.greaterThan(1);
      });
    });
  });
});
