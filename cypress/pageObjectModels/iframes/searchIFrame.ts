class SearchIFrame {

    // Locators

    private searchIFrameLocator: string = "//iframe[@class='modal-iframe']";
    private searchResultItemCategoryLocator: string = "(//div[contains(@class, 'result__item_category')]//a)[1]";
    private searchFieldLocator: string = "//input[@placeholder='Поиск']";
    private searchResultsFirstItemLocator = '(//a[@class="product__title-link"])[1]';
    private productButtonLocator: string = "//a[contains(@class, 'product__button')]";
    private productPriceLocator: string = "//a[contains(@class, 'product__price-value')]";
    private productTitleOnProductPageLocator: string = "//h1[contains(@class, 'catalog-masthead')]";

    // Elements

    private get searchIFrameElement() {
        return cy.getIFrameBody(this.searchIFrameLocator);
    }

    private get productTitleOnProductPageElement() {
        return cy.xpath(this.productTitleOnProductPageLocator);
    }

    // Methods

    validateSearchIFrameIsVisible() {
        this.searchIFrameElement.should('be.visible');
    }

    performSearch(searchQuery: string) {
        this.searchIFrameElement
            .xpath(this.searchFieldLocator)
            .should('be.enabled')
            .clear().type(searchQuery);
    }

    validateCategorySearchResults(categoryLink: string) {
        this.searchIFrameElement
            .xpath(this.searchResultItemCategoryLocator)
            .should('have.attr', 'href').and('equal', categoryLink);
    }

    validateSearchResults(searchQuery: string) {
        this.searchIFrameElement
            .each((title) => {
                cy.wrap(title).should("be.visible").and('contain.text', searchQuery);
            });

        this.searchIFrameElement
            .xpath(this.productButtonLocator)
            .each((element) => {
                cy.wrap(element).should("be.visible");
            });

        this.searchIFrameElement
            .xpath(this.productPriceLocator)
            .each((element) => {
                cy.wrap(element).should("be.visible");
            });
    }

    clearSearchFieldAndValidateEmpty() {
        this.searchIFrameElement
            .xpath(this.searchFieldLocator)
            .clear().should('be.empty');
    }

    goToFirstFoundedProductAndValidate(searchQuery: string) {

        let productTitleOnSearchPage: string = "";
        let productTitleOnProductPage: string = "";

        this.searchIFrameElement
            .xpath(this.searchResultsFirstItemLocator)
            .should("contain.text", searchQuery).invoke('text').then((title) => {
                productTitleOnSearchPage = title;
            });

        this.searchIFrameElement
            .xpath(this.searchResultsFirstItemLocator)
            .should("contain.text", searchQuery)
            .click();

        this.productTitleOnProductPageElement.invoke('text').then((title) => {
            productTitleOnProductPage = title;
            expect(productTitleOnProductPage.trim().replace('\n', '')).to.contain(productTitleOnSearchPage.trim());
        })
    }

}

export const searchIFrame: SearchIFrame = new SearchIFrame();