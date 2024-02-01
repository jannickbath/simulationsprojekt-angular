/// <reference types="cypress" />

describe('Typeracer', () => {
    /**
     * Checks if setup screens are showed properly.
     */
    before(() => {
      cy.visit('http://localhost:4200/');
      cy.get(".game-setup").should("exist");
      cy.get(".bot-setup").should("exist");
    });

    /**
     * Closes the setup screens before each test.
     */
    beforeEach(() => {
      cy.visit('http://localhost:4200/');
      cy.get(".game-setup .close-button").click();
      cy.get(".bot-setup .close-button").click();

      // Check if the textbox has fetched content
      cy.wait(2000);
      useTextBoxContent((text) => {
        cy.wrap(text).should("not.be.empty");
      })
    })

    /**
     * Types a single character into the textbox component.
     * 
     * @param char The character to be typed
     */
    function focusAndPressKeyInTextbox(char: string) {
      cy.get(".textbox").focus(); // focus textbox
      cy.get('.textbox').type(char);
    }

    /**
     * Lets you execute a callback function that provides the contents of the textbox component.
     * 
     * @param cb The callback to be executed, given the textbox content as a parameter
     */
    async function useTextBoxContent(cb: (text: string) => void) {
      cy.get(".textbox").invoke("text").then(cb);
    }

    /**
     * Checks if all components are rendered and visible.
     */
    // it("Components render", () => {
    //     cy.get("app-textbox").should("exist").should("be.visible");
    //     cy.get("app-controls").should("exist").should("be.visible");
    //     cy.get("app-utility").should("exist").should("be.visible");
    //     cy.get("app-open-setup").should("exist").should("be.visible");
    //     cy.get("app-open-bots").should("exist").should("be.visible");
    //     cy.get("app-tracks").should("exist").should("be.visible");
    //     cy.get("app-car").should("exist").should("be.visible");
    // })

    // it("Has working Bots", () => {
    //   cy.get(".game-state-toggle").click();
    //   cy.wait(1000);
      
    //   cy.get('.car-default').should((el) => {
    //     const numericValueOfLeftProperty = parseFloat(el.css("left"));
    //     expect(numericValueOfLeftProperty).to.be.greaterThan(0); // 0%
    //   });

    //   cy.get(".game-state-toggle").click();
    //   cy.wait(200);

    //   cy.get('.car-default').should((el) => {
    //     const numericValueOfLeftProperty = parseFloat(el.css("left"));
    //     expect(numericValueOfLeftProperty).to.be.equal(0); // 0%
    //   });
    // });

    it('Handles correct key press', () => {
      cy.get(".game-state-toggle").click();
      cy.wait(300);

      useTextBoxContent(text => {
        const correctKey = text[0];
        focusAndPressKeyInTextbox(correctKey);

        cy.get('.textbox span.correct').last()
          .should('have.text', correctKey)
          .get(".textbox span.invalid").should("not.exist");

        cy.get('.car-brick').should((el) => {
          const numericValueOfLeftProperty = parseFloat(el.css("left"));
          expect(numericValueOfLeftProperty).to.be.greaterThan(0); // 0%
        });
      });
      cy.get(".game-state-toggle").click();  
    });
  
    it('Handles incorrect key press', () => {
      cy.get(".game-state-toggle").click();
      cy.wait(200);

      useTextBoxContent(text => {
        const incorrectKey = text[0] == "z" ? "x" : "z";
        focusAndPressKeyInTextbox(incorrectKey);
        
        cy.get('.textbox span.invalid').last()
          .should("exist")
          .get(".textbox span.correct").should("not.exist");

        cy.get('.car-brick').should((el) => {
          const numericValueOfLeftProperty = parseFloat(el.css("left"));
          expect(numericValueOfLeftProperty).to.be.equal(0); // 0%
        });
      });
      cy.get(".game-state-toggle").click();
    });
  
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
  