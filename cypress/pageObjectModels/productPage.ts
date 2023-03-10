import { mainPage } from "./mainPage";
import { cartPage } from "./cartPage";
import { valueFilter } from "../const/regExp";

class ProductPage {

    private productTitleOnProductPage: string = "";
    private productPriceBestOffer: number = null;

    // Locators

    private offersLocator: string = "//span[contains(text(), 'Предложения')]";
    private headerLocator: string = "//h1[contains(@class, 'catalog-masthead')]";
    private sortOffersSelectLocator: string = "//select[@class='input-style__real']";
    private firstOfferAddToCartButtonLocator: string = "(//a[contains(text(), 'В корзину')])[2]";
    private cartCounterLocator: string = "//a[@class='b-top-profile__cart']/span";
    private productPriceBestOfferLocator: string = "((//a[contains(text(), 'В корзину')])[2]/../../../div/div/div)[1]";
    private acceptNewWonderfulDeliveryLocator: string = "//span[contains(text(), 'Все ясно, спасибо')]";

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

    private get productPriceBestOfferElement() {
        return cy.xpath(this.productPriceBestOfferLocator);
    }

    private get acceptNewWonderfulDeliveryElement() {
        return cy.xpath(this.acceptNewWonderfulDeliveryLocator);
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

    getProductPriceBestOffer() {
        this.productPriceBestOfferElement.invoke('text').then((price) => {
            this.productPriceBestOffer = +price.replace(valueFilter, '');
        })
    }

    addBestOfferToCartAndVerify() {
        let initialCartCounterValue: number = null;
        this.getProductTitleFromProductPage();
        this.goToOffersAndValidate();
        this.getProductPriceBestOffer();
        this.cartCounterElement.invoke('text')
            .then((value) => {
                initialCartCounterValue = +value;
            })
        this.sortOffersByAscending();
        this.acceptNewWonderfulDeliveryElement.click();
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
}

export const productPage: ProductPage = new ProductPage();