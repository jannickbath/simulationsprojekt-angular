/// <reference types="cypress" />

describe('Typeracer', () => {
    // before(() => {
    //   // Check if popup window is displayed correctly
    //   cy.visit('http://localhost:4200/');
    //   cy.get(".game-setup").should("exist");
    // });

    // beforeEach(() => {
    //   cy.visit('http://localhost:4200/');
    //   // Close the popup window
    //   cy.get(".game-setup .close-button").click();
    // })

    // function focusAndPressKeyInTextbox(char: string) {
    //   cy.get(".textbox").click(); // focus textbox
    //   cy.get('.input-div').type(char);
    // }

    // async function useTextBoxContent(cb: (text: string) => void) {
    //   cy.get(".input-div").invoke("text").then(cb);
    // }

    // it('Renders correctly with initial text', () => {
    // //   cy.wait(400);
    // //   cy.get('.textbox').should('exist');
    // //   cy.get('.textbox').should("not.be.empty");
    // });

    it("Renders", () => {
        cy.visit("http://localhost:4200/");
        // cy.wait(400);
        cy.get("div.description");
    })

    // it("Has a before element that is shown by default and hidden on focus", () => {
    //   cy.get(".textbox").pseudoElement("::before", "opacity").should("eq", "1");
    //   cy.get(".textbox").click().wait(500);
    //   cy.get(".textbox").pseudoElement("::before", "opacity").should("eq", "0");
    // });

    // it('Handles correct key press', () => {
    //   cy.wait(400);
    //   useTextBoxContent(text => {
    //     const correctKey = text[0];
    //     focusAndPressKeyInTextbox(correctKey);
        
    //     cy.get('.previous-text span').last()
    //       .should('have.text', correctKey)
    //       .get("b").should("not.exist");
    //   });    
    // });
  
    // it('Handles incorrect key press', () => {
    //   cy.wait(400);
    //   useTextBoxContent(text => {
    //     const incorrectKey = text[0] == "z" ? "x" : "z";
    //     focusAndPressKeyInTextbox(incorrectKey);
    //     cy.get('.previous-text span').last()
    //       .should("exist")
    //       .get("b").should("exist");
    //   });
    // });
  
    // it('Handles backspace key press', () => {
    //   cy.wait(400);
    //   useTextBoxContent(text => {
    //     const incorrectKey = text[0] == "z" ? "x" : "z";
    //     focusAndPressKeyInTextbox(incorrectKey);
    //     cy.get('.input-div').type('{backspace}');
    //     cy.get('.previous-text span').should("not.exist");
    //   });
    // });

    // it("Can handle opponent generation", () => {
    //   cy.get(".car").should("have.length", 1);
    //   cy.get(".generate-opponents").click(); // 2
    //   cy.get(".car").should("have.length", 2);

    //   // Check if max amount can be exceeded
    //   cy.get(".generate-opponents").click(); // 3
    //   cy.get(".generate-opponents").click(); // 4
    //   cy.get(".generate-opponents").click(); // 5
    //   cy.get(".car").should("have.length", 4);
    // });

    // it("Has working bots", () => {
    //   cy.get(".generate-opponents").click();
    //   cy.get(".generate-opponents").click();

    //   cy.wait(200);
    //   cy.get(".start-button").click();
    //   cy.wait(1000);
      
    //   cy.get('.car:not(.own)').should((el) => {
    //     const numericValueOfLeftProperty = parseFloat(el.css("left"));
    //     expect(numericValueOfLeftProperty).to.be.greaterThan(0); // 0%
    //   });
    // });

    // it("Has a working player car", () => {
    //   cy.wait(200);
    //   cy.get(".start-button").click();

    //   cy.get('.car.own').should((el) => {
    //     const numericValueOfLeftProperty = parseFloat(el.css("left"));
    //     expect(numericValueOfLeftProperty).to.be.eq(0); // 0%
    //   });

    //   // Check for player car movement
    //   useTextBoxContent(text => {
    //     for (let i = 0; i < text.length; i++) {
    //       const correctKey = text[i];
    //       focusAndPressKeyInTextbox(correctKey);
    //     }
    //     focusAndPressKeyInTextbox(" "); // Workaround for current bug

    //     cy.get('.popup.winner').should("exist");
    //     cy.get(".popup.winner h2").should("contain.text", "Player");
    //     cy.get('.popup.winner .close-button').click();

    //     // Check if the automatic reset works. (After the game is over)
    //     cy.get('.car.own').should((el) => {
    //       const numericValueOfLeftProperty = parseFloat(el.css("left"));
    //       expect(numericValueOfLeftProperty).to.be.eq(0); // 0%
    //     });
    //   });
    // });

    // it("Has a working restart button", () => {
    //   const gameToggleButton = cy.get(".start-button");
    //   cy.wait(400);
    //   gameToggleButton.click(); // start
      
    //   useTextBoxContent(text => {
    //     for (let i = 0; i < 10; i++) {
    //       const correctKey = text[i];
    //       focusAndPressKeyInTextbox(correctKey);
    //     }
    //   });

    //   cy.get('.car.own').should((el) => {
    //     const numericValueOfLeftProperty = parseFloat(el.css("left"));
    //     expect(numericValueOfLeftProperty).to.be.above(0); // > 0%
    //   });

    //   gameToggleButton.click(); // restart
      
    //   cy.get('.car.own').should((el) => {
    //     const numericValueOfLeftProperty = parseFloat(el.css("left"));
    //     expect(numericValueOfLeftProperty).to.be.eq(0); // == 0%
    //   });
    // })
});
  