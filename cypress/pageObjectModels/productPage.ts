import { mainPage } from "./mainPage";
import { cartPage } from "./cartPage";
import { valueFilter } from "../const/regExp";

class ProductPage {

    private productTitleOnProductPage: string = "";
    private productPriceBestOffer: number = null;
    private initialProductsInComparsion: number = 0;
    private productsInComparsionAfterAdding: number = 0;

    // Locators

    private offersLocator: string = "//span[contains(text(), 'Предложения')]";
    private headerLocator: string = "//h1[contains(@class, 'catalog-masthead')]";
    private sortOffersSelectLocator: string = "//select[@class='input-style__real']";
    private firstOfferAddToCartButtonLocator: string = "(//a[contains(text(), 'В корзину')])[2]";
    private cartCounterLocator: string = "//a[@class='b-top-profile__cart']/span";
    private productPriceBestOfferLocator: string = "((//a[contains(text(), 'В корзину')])[2]/../../../div/div/div)[1]";
    private acceptNewWonderfulDeliveryLocator: string = "//span[contains(text(), 'Все ясно, спасибо')]";
    private addToComparsionButtonLocator: string = "//span[contains(@class,'i-checkbox_yellow')]/span";
    private productsInComparsionLocator: string = "//span[@data-bind='html: $root.text']";

    // Elements

    private get offersElement(): Cypress.Chainable {
        return cy.xpath(this.offersLocator);
    }

    private get headerElement(): Cypress.Chainable {
        return cy.xpath(this.headerLocator);
    }

    private get sortOffersSelectElement(): Cypress.Chainable {
        return cy.xpath(this.sortOffersSelectLocator);
    }

    private get firstOfferAddToCartButtonElement(): Cypress.Chainable {
        return cy.xpath(this.firstOfferAddToCartButtonLocator);
    }

    private get cartCounterElement(): Cypress.Chainable {
        return cy.xpath(this.cartCounterLocator);
    }

    private get productPriceBestOfferElement(): Cypress.Chainable {
        return cy.xpath(this.productPriceBestOfferLocator);
    }

    private get acceptNewWonderfulDeliveryElement(): Cypress.Chainable {
        return cy.xpath(this.acceptNewWonderfulDeliveryLocator);
    }

    private get addToComparsionButtonElement(): Cypress.Chainable {
        return cy.xpath(this.addToComparsionButtonLocator);
    }

    private get productsInComparsionElement(): Cypress.Chainable {
        return cy.xpath(this.productsInComparsionLocator);
    }

    // Methods

    goToOffersAndValidate(): void {
        this.offersElement.click();
        this.headerElement.should('contain.text', 'Цены');
    }

    sortOffersByAscending(): void {
        this.sortOffersSelectElement
            .contains('возрастанию')
            .invoke('index')
            .then((index) => {
                this.sortOffersSelectElement.select(index);
            })
    }

    getProductTitleFromProductPage(): void {
        this.headerElement.invoke('text').then((title) => {
            this.productTitleOnProductPage = title.trim().split(' ').join(' ');
        })
    }

    getProductPriceBestOffer(): void {
        this.productPriceBestOfferElement.invoke('text').then((price) => {
            this.productPriceBestOffer = +price.replace(valueFilter, '');
        })
    }

    addBestOfferToCartAndVerify(): void {
        let initialCartCounterValue: number = null;
        this.getProductTitleFromProductPage();
        this.goToOffersAndValidate();
        this.getProductPriceBestOffer();
        this.cartCounterElement.invoke('text')
            .then((value) => {
                initialCartCounterValue = +value;
            })
        this.sortOffersByAscending();
        // Sometimes other element can cover that element (User still can click on it)
        this.acceptNewWonderfulDeliveryElement.click({ force: true });
        this.firstOfferAddToCartButtonElement.click();
        // Close popup if appears (There's some random popups, that will be closed after page reload)
        cy.reload();
        cy.xpath("(//a[contains(text(), 'В корзину')])[2]").should('be.visible');
        this.cartCounterElement.invoke('text')
            .then((value) => {
                expect(+value).equal(initialCartCounterValue + 1)
            })
        mainPage.goToCart();
        cartPage.getProductTitleInCart().invoke('text').then((title) => {
            let productTitleInCart: string = "";
            productTitleInCart = title.trim();
            expect(productTitleInCart).contain(this.productTitleOnProductPage);
        })
        cartPage.getProductPriceInCart().invoke('text').then((price) => {
            let productPriceInCart: number = null;
            productPriceInCart = +price.replace(valueFilter, '');
            expect(productPriceInCart).equal(this.productPriceBestOffer);
        })
    }

    addProductToComparsionAndVerify(addedToComparsionProductsTitles: string[]): string[] {
        this.getProductTitleFromProductPage();
        this.addToComparsionButtonElement.click();
        this.productsInComparsionElement.invoke('text')
            .then((text) => {
                this.initialProductsInComparsion++;
                this.productsInComparsionAfterAdding = +text.replace(valueFilter, '');
                expect(this.productsInComparsionAfterAdding).eq(this.initialProductsInComparsion);
                addedToComparsionProductsTitles.push(this.productTitleOnProductPage);
            });
        return addedToComparsionProductsTitles;
    }

    returnToCatalogPage(): void {
        cy.go('back');
    }
}

export const productPage: ProductPage = new ProductPage();