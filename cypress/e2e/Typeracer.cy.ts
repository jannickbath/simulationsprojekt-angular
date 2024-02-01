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
    it("Components render", () => {
        cy.get("app-textbox").should("exist").should("be.visible");
        cy.get("app-controls").should("exist").should("be.visible");
        cy.get("app-utility").should("exist").should("be.visible");
        cy.get("app-open-setup").should("exist").should("be.visible");
        cy.get("app-open-bots").should("exist").should("be.visible");
        cy.get("app-tracks").should("exist").should("be.visible");
        cy.get("app-car").should("exist").should("be.visible");
    })

    /**
     * Checks if bots are moving and progress is updated.
     */
    it("Has working Bots", () => {
      cy.get(".game-state-toggle").click();
      cy.wait(1000);
      
      cy.get('.car-default').should((el) => {
        const numericValueOfLeftProperty = parseFloat(el.css("left"));
        expect(numericValueOfLeftProperty).to.be.greaterThan(0); // 0%
      });

      cy.get(".game-state-toggle").click();
      cy.wait(200);

      cy.get('.car-default').should((el) => {
        const numericValueOfLeftProperty = parseFloat(el.css("left"));
        expect(numericValueOfLeftProperty).to.be.equal(0); // 0%
      });
    });

    /**
     * Checks if textbox displays correct keypress. And if progress is updated accordingly.
     */
    it('Handles correct key press', () => {
      cy.get(".game-state-toggle").click();
      cy.wait(300);

      useTextBoxContent(text => {
        const correctKey = text[0];
        focusAndPressKeyInTextbox(correctKey);
        cy.wait(100);

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
  
    /**
     * Checks if textbox shows invalid keypress and does not update progress.
     */
    it('Handles incorrect key press', () => {
      cy.get(".game-state-toggle").click();
      cy.wait(200);

      useTextBoxContent(text => {
        const incorrectKey = text[0] == "z" ? "x" : "z";
        focusAndPressKeyInTextbox(incorrectKey);
        cy.wait(100);
        
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
  
    /**
     * Checks if the textbox handles backspace input correctly.
     */
    it('Handles backspace key press', () => {
      cy.get(".game-state-toggle").click();
      cy.wait(200);
      
      useTextBoxContent(text => {
        const correctKey = text[0];
        focusAndPressKeyInTextbox(correctKey);
        cy.get('.textbox').type('{backspace}');
        cy.get('.textbox span.correct').should("not.exist");
      });
      cy.get(".game-state-toggle").click();
    });
});
  