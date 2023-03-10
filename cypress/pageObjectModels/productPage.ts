import { mainPage } from "./mainPage";
import { cartPage } from "./cartPage";
import { valueFilter } from "../const/regExp";

class ProductPage {

    private productTitleOnProductPage: string = "";
    private productPriceOnProductPage: number = null;

    // Locators

    private offersLocator: string = "//span[contains(text(), 'Предложения')]";
    private headerLocator: string = "//h1[contains(@class, 'catalog-masthead')]";
    private sortOffersSelectLocator: string = "//select[@class='input-style__real']";
    private firstOfferAddToCartButtonLocator: string = "(//a[contains(text(), 'В корзину')])[2]";
    private cartCounterLocator: string = "//a[@class='b-top-profile__cart']/span";
    private productPriceOnProductPageLocator: string = "//div[@class='offers-description__price offers-description__price_primary']";

    // Elements

    private get offersElement() {
        return cy.xpath(this.offersLocator);
    }

    private get headerElement() {
        return cy.xpath(this.headerLocator);
    }

    private get sortOffersSelectElement() {
        return cy.xpath(this.sortOffersSelectLocator);
    }

    private get firstOfferAddToCartButtonElement() {
        return cy.xpath(this.firstOfferAddToCartButtonLocator);
    }

    private get cartCounterElement() {
        return cy.xpath(this.cartCounterLocator);
    }

    private get productPriceOnProductPageElement() {
        return cy.xpath(this.productPriceOnProductPageLocator);
    }

    // Methods

    goToOffersAndValidate() {
        this.offersElement.click();
        this.headerElement.should('contain.text', 'Цены');
    }

    sortOffersByAscending() {
        this.sortOffersSelectElement
            .contains('возрастанию')
            .invoke('index')
            .then((index) => {
                this.sortOffersSelectElement.select(index);
            })
    }

    getProductTitleFromProductPage() {
        this.headerElement.invoke('text').then((title) => {
            this.productTitleOnProductPage = title.trim().split(' ').join(' ');
        })
    }

    getProductPriceFromProductPage() {
        this.productPriceOnProductPageElement.invoke('text').then((price) => {
            this.productPriceOnProductPage = +price.trim().replace(valueFilter, '');
        })
    }

    addBestOfferToCartAndVerify() {
        let initialCartCounterValue: number = null;
        this.getProductTitleFromProductPage();
        this.getProductPriceFromProductPage();
        this.goToOffersAndValidate();
        this.cartCounterElement.invoke('text')
            .then((value) => {
                initialCartCounterValue = +value;
            })
        this.sortOffersByAscending();
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
            productPriceInCart = +price.trim().replace(valueFilter, '');
            expect(productPriceInCart).equal(this.productPriceOnProductPage);
        })
    }
}

export const productPage: ProductPage = new ProductPage();