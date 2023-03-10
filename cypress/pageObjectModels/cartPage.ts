class CartPage {

    // Locators

    private productTitleInCartLocator: string = "//div[contains(@class, 'cart-form__offers-item_secondary')]/div/div[contains(@class, 'data')]/div/a";
    private productPriceInCartLocator: string = "(//div[contains(@class, 'cart-form__description_condensed-another')]/span)[2]";
    private deleteProductButtonLocator: string = "//a[contains(@class, 'cart-form__button_remove')]";

    // Elements

    private get productTitleInCartElement() {
        return cy.xpath(this.productTitleInCartLocator);
    }

    private get productPriceInCartElement() {
        return cy.xpath(this.productPriceInCartLocator);
    }

    private get deleteProductButtonElement() {
        return cy.xpath(this.deleteProductButtonLocator);
    }

    // Methods

    getProductTitleInCart() {
        return this.productTitleInCartElement;
    }

    getProductPriceInCart() {
        return this.productPriceInCartElement;
    }

    clearCart() {
        this.deleteProductButtonElement.click({ force: true });
    }

}

export const cartPage: CartPage = new CartPage();