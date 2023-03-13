class CartPage {

    // Locators

    private productTitleInCartLocator: string = "//div[contains(@class, 'cart-form__offers-item_secondary')]/div/div[contains(@class, 'data')]/div/a";
    private productPriceInCartLocator: string = "(//div[contains(@class, 'cart-form__description_condensed-another')]/span)[2]";
    private deleteProductButtonLocator: string = "//a[contains(@class, 'cart-form__button_remove')]";

    // Elements

    private get productTitleInCartElement(): Cypress.Chainable {
        return cy.xpath(this.productTitleInCartLocator);
    }

    private get productPriceInCartElement(): Cypress.Chainable {
        return cy.xpath(this.productPriceInCartLocator);
    }

    private get deleteProductButtonElement(): Cypress.Chainable {
        return cy.xpath(this.deleteProductButtonLocator);
    }

    // Methods

    getProductTitleInCart(): Cypress.Chainable {
        return this.productTitleInCartElement;
    }

    getProductPriceInCart(): Cypress.Chainable {
        return this.productPriceInCartElement;
    }

    clearCart(): void {
        this.deleteProductButtonElement.click({ force: true });
    }

}

export const cartPage: CartPage = new CartPage();