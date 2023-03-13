class ComparsionPage {

    // Locators

    private productTitleLocator: string = "//table[contains(@class, 'main')]/tbody/tr/th/div/div/a/span";

    // Elements

    private get productTitleElements(): Cypress.Chainable {
        return cy.xpath(this.productTitleLocator);
    }

    // Methods

    getProductsTitlesInComparsion(): Cypress.Chainable {
        return this.productTitleElements;
    }

}

export const comparsionPage: ComparsionPage = new ComparsionPage();